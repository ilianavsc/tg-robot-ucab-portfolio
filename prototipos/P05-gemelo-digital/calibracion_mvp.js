/* ==========================================================================
 * P05 · Gemelo Digital · Calibración (Escaneos 3–5), Operación MVP y Parada Programable
 * --------------------------------------------------------------------------
 * Extiende Escaneo 1 (primer_escaneo.js) y Escaneo 2 (segundo_escaneo.js) sin
 * modificar su comportamiento ni reimplementar la máquina de estados teach-and-repeat:
 *
 *  · Fase 3 (Calibración · Escaneos 3, 4 y 5 en pista despejada):
 *    Verifica cada escaneo contra los viajes previos y unifica el perfil por
 *    segmento (S1, S2, S3): distancia, estabilidad TCRT5000, paredes de
 *    referencia HC-SR04P y confianza (%). Al completar el Escaneo 5/5 marca la
 *    ruta como "Calibrada · Lista para operación mínima (MVP)".
 *
 *  · Fase 4 (Operación MVP · habilitada tras 5/5):
 *    Permite enviar misiones a PC1, PC2 o PC3 y habilita por primera vez el
 *    control de obstáculos reales. Contrasta el eco HC-SR04P contra el perfil
 *    unificado de paredes fijas del segmento para distinguir un objeto real de
 *    una pared de referencia. Cuenta viajes operativos verificados (0/8 → 8/8).
 *
 *  · Parada programable (desbloqueada con viajesOperativos >= 8):
 *    Permite fijar una parada exacta en S1, S2 o S3 (porcentaje/metros o clic
 *    en mapa), detener el robot en ese punto, registrarlo y reanudar o volver a Base.
 *
 * Sin DOM: window.CalibracionMVP en la página, require() en Node.
 * ========================================================================== */
(function (raiz, fabrica) {
  var M = fabrica();
  if (typeof module === "object" && module.exports) module.exports = M;
  else raiz.CalibracionMVP = M;
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  var C = Object.freeze({
    TOTAL_ESCANEOS: 5,
    META_VIAJES_PARADA: 8,
    TOLERANCIA_PARED_CM: 12,
    UMBRAL_CRITICO_CM: 20,
    UMBRAL_PRECAUCION_CM: 50,
    PARADA_TOLERANCIA_M: 0.08
  });

  var FASES_EXT = Object.freeze({
    1: Object.freeze({ id: 1, nombre: "Escaneo 1 · Muestreo base", corto: "Escaneo 1" }),
    2: Object.freeze({ id: 2, nombre: "Escaneo 2 · Ruta con 3 segmentos", corto: "Escaneo 2" }),
    3: Object.freeze({ id: 3, nombre: "Calibración · Escaneos 3–5", corto: "Calibración 3–5" }),
    4: Object.freeze({ id: 4, nombre: "Operación MVP · Misiones y obstáculos", corto: "Operación MVP" })
  });

  /* Paleta cerrada (S1–S3) vs. nueva paleta lineal de 6 colores distintos (I1–I3 ida, R1–R3 regreso) */
  var PALETA_CERRADA = Object.freeze({ S1: "#00F2FE", S2: "#FBBF24", S3: "#A78BFA" });
  var PALETA_LINEAL = Object.freeze({
    I1: "#2DD4BF", I2: "#4ADE80", I3: "#60A5FA",
    R1: "#FB7185", R2: "#F97316", R3: "#E879F9"
  });

  function r(x, d) { var k = Math.pow(10, d); return Math.round(x * k) / k; }
  function clamp(x, a, b) { return x < a ? a : (x > b ? b : x); }

  function crearEstadoLineal() {
    return {
      activo: false,
      escaneando: false,
      sentidoActual: "ida", /* "ida" | "regreso" */
      vista: "ambos",       /* "ida" | "regreso" | "ambos" */
      paradaS: null,
      largoIda: 0,
      largoRegreso: 0,
      segmentosIda: [],
      segmentosRegreso: [],
      pcsIda: [],
      pcsRegreso: [],
      muestras: [],
      completo: false,
      tFinS: 0
    };
  }

  function estabilidadMuestra(tcrt) {
    if (!tcrt || !(tcrt[0] || tcrt[1] || tcrt[2] || tcrt[3])) return 0;
    return (tcrt[1] || tcrt[2]) && !tcrt[0] && !tcrt[3] ? 100 : 72;
  }

  function crearPerfilVacio(largoM, SE) {
    var segs = SE.segmentos(largoM || 9.0), out = {};
    segs.forEach(function (sg) {
      out[sg.id] = {
        id: sg.id,
        nombre: sg.nombre,
        desdeM: sg.desdeM,
        hastaM: sg.hastaM,
        distanciaM: r(sg.hastaM - sg.desdeM, 2),
        muestras: 0,
        escaneos: 0,
        estabilidadTcrtPct: 0,
        paredFrenteCm: null,
        paredAtrasCm: 200,
        confianzaPct: 0
      };
    });
    return out;
  }

  /* Crea el estado maestro de calibración (3–5), operación MVP y parada programable */
  function crearEstado(PE, SE, largoM) {
    var L = largoM || 9.0;
    return {
      largoM: L,
      escaneosCompletos: { 1: false, 2: false, 3: false, 4: false, 5: false },
      registrosCalib: { 3: PE.crear(), 4: PE.crear(), 5: PE.crear() },
      escaneoCalibActivo: 3, /* 3, 4 o 5 */
      calibrada: false,
      perfilUnificado: crearPerfilVacio(L, SE),
      /* Operación MVP (fase 4) */
      regMvp: PE.crear(),
      destinoMvp: "PC3", /* "PC1" | "PC2" | "PC3" */
      operacionRealActiva: false, /* obstáculos SOLO en Operación real (post-calibración), nunca en Paso 4 de calibración/verificación */
      viajesOperativos: 0,
      historialMisiones: [],
      eventosOperativos: [],
      obstaculoActivo: null, /* { sM, seg, cm, tipo, esObjetoReal, refCm } */
      /* Parada programable: temporal (sin re-escaneo ni receptor) vs. fijada (permanente >= 8 viajes) */
      paradaProgramada: null, /* { seg, pct, sM, etiqueta, activa, tipo: "temporal" | "fijada", requiereReceptor: boolean } */
      enParadaProgramada: false,
      paradaCumplidaEnViaje: false,
      confirmacionReceptorActiva: false,
      /* Punto 5 (Extensión): Re-escaneo lineal continuo Ida [0, s_parada] (I1–I3) y Regreso [s_parada, L] (R1–R3) */
      lineal: crearEstadoLineal()
    };
  }

  function reiniciar(est, PE, SE, largoM) {
    var nuevo = crearEstado(PE, SE, largoM || est.largoM);
    Object.keys(nuevo).forEach(function (k) { est[k] = nuevo[k]; });
    return est;
  }

  function conteoEscaneos(est) {
    var n = 0, k;
    for (k = 1; k <= C.TOTAL_ESCANEOS; k++) if (est.escaneosCompletos[k]) n++;
    return n;
  }

  function siguienteEscaneoCalib(est) {
    if (!est.escaneosCompletos[3]) return 3;
    if (!est.escaneosCompletos[4]) return 4;
    if (!est.escaneosCompletos[5]) return 5;
    return 5;
  }

  /* Obstáculos estrictamente bloqueados en Escaneos 1–5 (incl. Paso 4) y en verificación/re-escaneo;
     solo permitidos en Operación real (post-calibración) */
  function obstaculosPermitidos(fase, est) {
    return fase === 4 && Boolean(est && est.calibrada && est.operacionRealActiva) && !(est.lineal && est.lineal.escaneando);
  }

  function setOperacionReal(est, activa) {
    if (!est || !est.calibrada) { if (est) est.operacionRealActiva = false; return false; }
    est.operacionRealActiva = Boolean(activa);
    if (!est.operacionRealActiva) est.obstaculoActivo = null;
    return est.operacionRealActiva;
  }

  function paradaDesbloqueada(est) {
    return Boolean(est && est.calibrada && est.viajesOperativos >= C.META_VIAJES_PARADA);
  }

  /* Genera muestras de referencia sintéticas coherentes para un escaneo rápido (3–5) si no se corrió cuadro a cuadro */
  function generarMuestrasVerificacion(numEscaneo, largoM, SE, baseMuestras) {
    var pcs = SE.puntosControl(largoM), vel = 0.41, pasoS = vel * 2, s = 0, t = 0, n = 1, res = [];
    /* Variación mínima determinista por pasada para reflejar verificación real entre escaneos */
    var sesgoAtras = (numEscaneo - 3) * 1.2;
    while (s < largoM - 0.05) {
      var seg = SE.segmentoDe(s, largoM);
      var ref = baseMuestras && baseMuestras.length ? baseMuestras[Math.min(baseMuestras.length - 1, n - 1)] : null;
      var atrasBase = ref && ref.paredes_ref ? ref.paredes_ref.atras_cm : (185 + (seg === "S2" ? 15 : 0));
      var frenteBase = ref && ref.paredes_ref ? ref.paredes_ref.frente_cm : null;
      res.push({
        n: n,
        t_s: r(t, 2),
        s_m: r(s, 3),
        x: ref ? ref.x : r(s * 0.4, 3),
        y: ref ? ref.y : 0,
        angulo: ref ? ref.angulo : 0,
        tcrt: (n % 4 === 0 && numEscaneo === 3) ? [0, 1, 1, 1] : [0, 1, 1, 0],
        tcrt_n: [0.08, 0.92, 0.91, 0.09],
        frente_cm: frenteBase,
        atras_cm: r(atrasBase + sesgoAtras, 1),
        paredes_ref: { frente_cm: frenteBase, atras_cm: r(atrasBase + sesgoAtras, 1), linea_base: true },
        yaw_deg: ref ? ref.yaw_deg : 0,
        omega_dps: 0,
        v_ms: vel,
        pwm_izq: 0.72,
        pwm_der: 0.72,
        seg: seg,
        escaneo: numEscaneo,
        final: false
      });
      n++; s += pasoS; t += 2;
    }
    res.push({
      n: n, t_s: r(largoM / vel, 2), s_m: r(largoM, 3), x: 0, y: 0, angulo: 0,
      tcrt: [0, 1, 1, 0], tcrt_n: [0.05, 0.95, 0.94, 0.05],
      frente_cm: null, atras_cm: r(195 + sesgoAtras, 1),
      paredes_ref: { frente_cm: null, atras_cm: r(195 + sesgoAtras, 1), linea_base: true },
      yaw_deg: 0, omega_dps: 0, v_ms: vel, pwm_izq: 0.72, pwm_der: 0.72,
      seg: "S3", escaneo: numEscaneo, final: true
    });
    return res;
  }

  /* Unifica/promedia lecturas de todos los escaneos completados por segmento (S1, S2, S3) */
  function unificarPorSegmento(est, reg1, reg2, SE, largoM) {
    var L = largoM || est.largoM || 9.0;
    est.largoM = L;
    var segs = SE.segmentos(L);
    var fuentes = [];
    if (reg1 && reg1.muestras && reg1.muestras.length) fuentes.push({ n: 1, ms: reg1.muestras });
    if (reg2 && reg2.muestras && reg2.muestras.length) fuentes.push({ n: 2, ms: reg2.muestras });
    [3, 4, 5].forEach(function (k) {
      var rk = est.registrosCalib[k];
      if (rk && rk.muestras && rk.muestras.length) fuentes.push({ n: k, ms: rk.muestras });
    });

    var numComp = conteoEscaneos(est);
    var bonoViajes = Math.min(3.5, est.viajesOperativos * 0.45);
    var perfil = {};

    segs.forEach(function (sg) {
      var sumaTcrt = 0, cnt = 0, sumaF = 0, cntF = 0, sumaA = 0, cntA = 0, escSeg = 0;
      fuentes.forEach(function (ft) {
        var vio = false;
        ft.ms.forEach(function (m) {
          var sid = m.seg || SE.segmentoDe(m.s_m, L);
          if (sid !== sg.id) return;
          vio = true;
          cnt++;
          sumaTcrt += estabilidadMuestra(m.tcrt);
          var pf = m.paredes_ref ? m.paredes_ref.frente_cm : m.frente_cm;
          var pa = m.paredes_ref ? m.paredes_ref.atras_cm : m.atras_cm;
          if (pf !== null && pf !== undefined && pf > 0) { sumaF += pf; cntF++; }
          if (pa !== null && pa !== undefined && pa > 0) { sumaA += pa; cntA++; }
        });
        if (vio) escSeg++;
      });

      var estTcrt = cnt ? r(sumaTcrt / cnt, 1) : 0;
      var baseConf = numComp === 0 ? 0 : (54 + numComp * 8.2 + (estTcrt > 0 ? (estTcrt - 80) * 0.12 : 0) + bonoViajes);
      if (cnt === 0 && numComp > 0) baseConf = 58 + numComp * 7.5 + bonoViajes;

      perfil[sg.id] = {
        id: sg.id,
        nombre: sg.nombre,
        desdeM: sg.desdeM,
        hastaM: sg.hastaM,
        distanciaM: r(sg.hastaM - sg.desdeM, 2),
        muestras: cnt,
        escaneos: Math.max(escSeg, numComp),
        estabilidadTcrtPct: cnt ? estTcrt : (numComp > 0 ? 96.0 : 0),
        paredFrenteCm: cntF ? r(sumaF / cntF, 1) : null,
        paredAtrasCm: cntA ? r(sumaA / cntA, 1) : 200,
        confianzaPct: numComp > 0 ? r(clamp(baseConf, 55, 99.5), 1) : 0
      };
    });

    est.perfilUnificado = perfil;
    return perfil;
  }

  /* Marca un escaneo (1..5) como completado y actualiza la unificación + estado Calibrada */
  function registrarEscaneoCompletado(est, numEscaneo, reg1, reg2, SE, largoM) {
    if (numEscaneo < 1 || numEscaneo > C.TOTAL_ESCANEOS) return false;
    est.escaneosCompletos[numEscaneo] = true;
    /* Si se completa el escaneo 3, 4 o 5 directamente desde Calibración, asegura base 1 y 2 marcadas */
    if (numEscaneo >= 3) {
      est.escaneosCompletos[1] = true;
      est.escaneosCompletos[2] = true;
    }
    est.escaneoCalibActivo = siguienteEscaneoCalib(est);
    unificarPorSegmento(est, reg1, reg2, SE, largoM);
    if (conteoEscaneos(est) >= C.TOTAL_ESCANEOS) {
      est.calibrada = true;
    }
    return true;
  }

  /* Completa de forma rápida el siguiente escaneo de verificación (3, 4 o 5) o todos hasta 5/5 */
  function completarEscaneoRapido(est, numEscaneo, reg1, reg2, SE, largoM, pistaId) {
    var k = numEscaneo || siguienteEscaneoCalib(est);
    if (k < 3) k = 3;
    if (k > 5) k = 5;
    var rk = est.registrosCalib[k];
    var baseMs = (reg2 && reg2.muestras && reg2.muestras.length) ? reg2.muestras : (reg1 && reg1.muestras ? reg1.muestras : []);
    rk.muestras = generarMuestrasVerificacion(k, largoM || est.largoM, SE, baseMs);
    rk.activo = false;
    rk.completo = true;
    rk.motivo = null;
    rk.pista = pistaId || "B";
    rk.tFinS = rk.muestras.length ? rk.muestras[rk.muestras.length - 1].t_s : 0;
    registrarEscaneoCompletado(est, k, reg1, reg2, SE, largoM);
    return rk;
  }

  function completarCalibracionCompleta(est, reg1, reg2, SE, largoM, pistaId) {
    [3, 4, 5].forEach(function (k) {
      if (!est.escaneosCompletos[k]) completarEscaneoRapido(est, k, reg1, reg2, SE, largoM, pistaId);
    });
    return est.calibrada;
  }

  /* Contrasta una lectura HC-SR04P frontal contra el perfil unificado de paredes del segmento */
  function evaluarEcoUltrasonico(est, sM, largoM, frenteCm, SE) {
    var seg = SE.segmentoDe(sM, largoM);
    var pf = est.perfilUnificado && est.perfilUnificado[seg] ? est.perfilUnificado[seg] : null;
    var refCm = pf ? pf.paredFrenteCm : null;

    if (!frenteCm || frenteCm <= 0) {
      return { tipo: "despejado", esObjetoReal: false, seg: seg, frenteCm: null, refCm: refCm, severidad: "libre", texto: "Pista despejada" };
    }
    /* Si el segmento tiene una pared fija registrada cerca de esta distancia y no es impacto crítico, es pared fija */
    if (refCm !== null && Math.abs(frenteCm - refCm) <= C.TOLERANCIA_PARED_CM && frenteCm >= 25) {
      return {
        tipo: "pared_fija",
        esObjetoReal: false,
        seg: seg,
        frenteCm: r(frenteCm, 1),
        refCm: refCm,
        severidad: "libre",
        texto: "Pared fija de referencia en " + seg + " (" + r(frenteCm, 0) + " cm ≈ ref " + r(refCm, 0) + " cm) · sin falso positivo"
      };
    }
    var sev = frenteCm < C.UMBRAL_CRITICO_CM ? "critica" : (frenteCm < C.UMBRAL_PRECAUCION_CM ? "precaucion" : "aviso");
    return {
      tipo: "objeto_real",
      esObjetoReal: true,
      seg: seg,
      frenteCm: r(frenteCm, 1),
      refCm: refCm,
      severidad: sev,
      texto: "Objeto real detectado en " + seg + " a " + r(frenteCm, 0) + " cm (ref. pared: " + (refCm === null ? "despejado" : r(refCm, 0) + " cm") + ")"
    };
  }

  /* Registra un evento operativo (obstáculo detectado, parada programada, misión completada) */
  function registrarEvento(est, tipo, seg, sM, detalle) {
    var ev = {
      id: est.eventosOperativos.length + 1,
      tipo: tipo,
      seg: seg,
      s_m: r(sM, 2),
      detalle: detalle
    };
    est.eventosOperativos.push(ev);
    return ev;
  }

  /* Posición objetivo en metros para un destino MVP ("PC1" | "PC2" | "PC3") */
  function sDestinoMvp(destino, largoM, SE) {
    var pcs = SE.puntosControl(largoM);
    for (var i = 0; i < pcs.length; i++) if (pcs[i].id === destino) return pcs[i].posicionM;
    return largoM;
  }

  /* Registra un viaje operativo completado, refuerza confianza de segmentos y avanza 0/8 → 8/8 */
  function completarViajeOperativo(est, destino, largoM, reg1, reg2, SE, sAlcanzadoM) {
    if (!est.calibrada) return false;
    est.viajesOperativos += 1;
    var sFin = sAlcanzadoM != null ? sAlcanzadoM : sDestinoMvp(destino || est.destinoMvp, largoM, SE);
    var segFin = SE.segmentoDe(sFin, largoM);
    est.historialMisiones.push({
      viaje: est.viajesOperativos,
      destino: destino || est.destinoMvp,
      s_m: r(sFin, 2),
      seg: segFin,
      paradaUsada: Boolean(est.paradaCumplidaEnViaje)
    });
    registrarEvento(est, "MISION_COMPLETADA", segFin, sFin,
      "Viaje operativo #" + est.viajesOperativos + " completado hasta " + (destino || est.destinoMvp) + " (" + r(sFin, 2) + " m)");
    unificarPorSegmento(est, reg1, reg2, SE, largoM);
    return true;
  }

  /* Auxiliar para pruebas/evaluación rápida: completa viajes hasta llegar a 8/8 */
  function simularLoteHasta8(est, largoM, reg1, reg2, SE) {
    if (!est.calibrada) return 0;
    var agregados = 0;
    while (est.viajesOperativos < C.META_VIAJES_PARADA) {
      completarViajeOperativo(est, est.destinoMvp || "PC3", largoM, reg1, reg2, SE);
      agregados++;
    }
    return agregados;
  }

  /* Programar parada temporal (viaje puntual en circuito cerrado: no requiere re-escaneo ni confirmación del receptor) */
  function programarParada(est, segId, pct, largoM, SE, tipo) {
    if (!paradaDesbloqueada(est)) return null;
    var segs = SE.segmentos(largoM), sg = null, i;
    for (i = 0; i < segs.length; i++) if (segs[i].id === segId) sg = segs[i];
    if (!sg) return null;
    var p = clamp(Number(pct), 5, 95);
    var sM = r(sg.desdeM + (sg.hastaM - sg.desdeM) * (p / 100), 2);
    var modoTipo = tipo === "fijada" ? "fijada" : "temporal";
    est.paradaProgramada = {
      seg: sg.id,
      pct: Math.round(p),
      sM: sM,
      etiqueta: "Parada · " + sg.id + " (" + sM.toFixed(1) + " m)",
      activa: true,
      tipo: modoTipo,
      requiereReceptor: modoTipo === "fijada"
    };
    est.enParadaProgramada = false;
    est.paradaCumplidaEnViaje = false;
    if (modoTipo === "fijada") est.confirmacionReceptorActiva = true;
    return est.paradaProgramada;
  }

  /* Programa parada a partir de una distancia s exacta (ej. clic sobre el mapa o ajuste fino −/+ 0,1 m) */
  function programarParadaEnS(est, sM, largoM, SE, tipo) {
    if (!paradaDesbloqueada(est)) return null;
    var sClamped = clamp(sM, 0.3, largoM - 0.3);
    var segId = SE.segmentoDe(sClamped, largoM);
    var segs = SE.segmentos(largoM), sg = segs[0];
    for (var i = 0; i < segs.length; i++) if (segs[i].id === segId) sg = segs[i];
    var pct = ((sClamped - sg.desdeM) / Math.max(0.1, sg.hastaM - sg.desdeM)) * 100;
    return programarParada(est, segId, pct, largoM, SE, tipo);
  }

  function quitarParada(est) {
    est.paradaProgramada = null;
    est.enParadaProgramada = false;
    est.paradaCumplidaEnViaje = false;
    est.confirmacionReceptorActiva = false;
    est.lineal = crearEstadoLineal();
  }

  /* ---- Punto 5 (Extensión): Re-escaneo Lineal Continuo SIN vuelta en U ----
   * Ida (I1–I3):    Base (0) → Parada (s_parada), dividido en 3 tercios iguales.
   * Regreso (R1–R3): continúa HACIA ADELANTE por el resto del circuito [s_parada, L] → Base (L),
   *                  dividido en 3 tercios iguales. Sin solapamiento; largoIda + largoRegreso = L. */
  function calcularRutaLineal(paradaS, largoTotalM) {
    var Ltot = r(Math.max(1.0, Number(largoTotalM) || 9.0), 2);
    var sP = r(clamp(Number(paradaS) || (Ltot / 2), 0.3, Ltot - 0.3), 2);
    var lIda = sP;
    var lReg = r(Ltot - sP, 2);

    var i1 = r(lIda / 3, 2), i2 = r((2 * lIda) / 3, 2);
    var pcsIda = [
      { id: "PC-I1", etiqueta: "PC-I1", posicionM: i1, recorridoM: i1 },
      { id: "PC-I2", etiqueta: "PC-I2", posicionM: i2, recorridoM: i2 },
      { id: "PC-I3", etiqueta: "Parada (PC-I3)", posicionM: sP, recorridoM: lIda }
    ];
    var segmentosIda = [
      { id: "I1", sentido: "ida", desde: "Base", hasta: "PC-I1", nombre: "Base → PC-I1", desdeM: 0, hastaM: i1, color: PALETA_LINEAL.I1 },
      { id: "I2", sentido: "ida", desde: "PC-I1", hasta: "PC-I2", nombre: "PC-I1 → PC-I2", desdeM: i1, hastaM: i2, color: PALETA_LINEAL.I2 },
      { id: "I3", sentido: "ida", desde: "PC-I2", hasta: "Parada (PC-I3)", nombre: "PC-I2 → Parada", desdeM: i2, hastaM: sP, color: PALETA_LINEAL.I3 }
    ];

    var r1 = r(sP + lReg / 3, 2), r2 = r(sP + (2 * lReg) / 3, 2);
    var pcsRegreso = [
      { id: "PC-R1", etiqueta: "PC-R1", posicionM: r1, recorridoM: r(lReg / 3, 2) },
      { id: "PC-R2", etiqueta: "PC-R2", posicionM: r2, recorridoM: r((2 * lReg) / 3, 2) },
      { id: "PC-R3", etiqueta: "Base (PC-R3)", posicionM: Ltot, recorridoM: lReg }
    ];
    var segmentosRegreso = [
      { id: "R1", sentido: "regreso", desde: "Parada", hasta: "PC-R1", nombre: "Parada → PC-R1", desdeM: sP, hastaM: r1, recDesdeM: 0, recHastaM: r(lReg / 3, 2), color: PALETA_LINEAL.R1 },
      { id: "R2", sentido: "regreso", desde: "PC-R1", hasta: "PC-R2", nombre: "PC-R1 → PC-R2", desdeM: r1, hastaM: r2, recDesdeM: r(lReg / 3, 2), recHastaM: r((2 * lReg) / 3, 2), color: PALETA_LINEAL.R2 },
      { id: "R3", sentido: "regreso", desde: "PC-R2", hasta: "Base (PC-R3)", nombre: "PC-R2 → Base", desdeM: r2, hastaM: Ltot, recDesdeM: r((2 * lReg) / 3, 2), recHastaM: lReg, color: PALETA_LINEAL.R3 }
    ];

    return {
      paradaS: sP, largoTotalM: Ltot, largoIda: lIda, largoRegreso: lReg,
      pcsIda: pcsIda, segmentosIda: segmentosIda,
      pcsRegreso: pcsRegreso, segmentosRegreso: segmentosRegreso
    };
  }

  function segmentoLinealDe(sM, paradaS, sentido, largoTotalM) {
    var Ltot = Math.max(1.0, Number(largoTotalM) || 9.0);
    var sP = clamp(Number(paradaS) || (Ltot / 2), 0.3, Ltot - 0.3);
    if (sentido === "regreso" || sM >= sP + 1e-6) {
      var lReg = Math.max(0.3, Ltot - sP);
      var u = Math.max(0, sM - sP);
      if (u < lReg / 3 - 1e-6) return "R1";
      if (u < (2 * lReg) / 3 - 1e-6) return "R2";
      return "R3";
    }
    if (sM < sP / 3 - 1e-6) return "I1";
    if (sM < (2 * sP) / 3 - 1e-6) return "I2";
    return "I3";
  }

  /* Flujo de botón "Fijar" (permanente): solo tras confirmación del usuario inicia el re-escaneo lineal
     continuo y activa la confirmación obligatoria del receptor en destino */
  function confirmarFijarYReescanear(est, largoTotalM) {
    if (!paradaDesbloqueada(est) || !est.paradaProgramada) return null;
    est.paradaProgramada.tipo = "fijada";
    est.paradaProgramada.requiereReceptor = true;
    est.confirmacionReceptorActiva = true;
    return iniciarReescaneoLineal(est, largoTotalM);
  }

  function iniciarReescaneoLineal(est, largoTotalM) {
    if (!paradaDesbloqueada(est) || !est.paradaProgramada) return null;
    var Ltot = largoTotalM || est.largoM || 9.0;
    var calc = calcularRutaLineal(est.paradaProgramada.sM, Ltot);
    est.obstaculoActivo = null;
    est.enParadaProgramada = false;
    est.paradaProgramada.tipo = "fijada";
    est.paradaProgramada.requiereReceptor = true;
    est.confirmacionReceptorActiva = true;
    est.lineal = {
      activo: true,
      escaneando: true,
      sentidoActual: "ida",
      vista: "ambos",
      paradaS: calc.paradaS,
      largoTotalM: calc.largoTotalM,
      largoIda: calc.largoIda,
      largoRegreso: calc.largoRegreso,
      segmentosIda: calc.segmentosIda,
      segmentosRegreso: calc.segmentosRegreso,
      pcsIda: calc.pcsIda,
      pcsRegreso: calc.pcsRegreso,
      muestras: [],
      completo: false,
      tFinS: 0
    };
    registrarEvento(est, "REESCANEO_LINEAL_INICIO", est.paradaProgramada.seg, calc.paradaS,
      "Parada fijada · Re-escaneo continuo iniciado (pista despejada): Ida [0–" + calc.paradaS.toFixed(2) + " m] + Regreso [" + calc.paradaS.toFixed(2) + "–" + calc.largoTotalM.toFixed(2) + " m] · confirmación de receptor activa");
    return est.lineal;
  }

  function registrarMuestraLineal(est, muestraBase, sentido) {
    if (!est.lineal || !est.lineal.activo) return null;
    var sent = sentido || est.lineal.sentidoActual;
    var seg = segmentoLinealDe(muestraBase.s_m, est.lineal.paradaS, sent, est.lineal.largoTotalM);
    var copia = Object.assign({}, muestraBase, {
      n: est.lineal.muestras.length + 1,
      sentido: sent,
      seg: seg
    });
    est.lineal.muestras.push(copia);
    return copia;
  }

  function completarReescaneoLinealRapido(est, trazado, largoTotalM) {
    if (!paradaDesbloqueada(est) || !est.paradaProgramada) return null;
    var Ltot = largoTotalM || (trazado ? trazado.L : est.largoM) || 9.0;
    if (!est.lineal || !est.lineal.activo || est.lineal.paradaS !== est.paradaProgramada.sM || est.lineal.largoTotalM !== r(Ltot, 2)) {
      iniciarReescaneoLineal(est, Ltot);
    }
    var lin = est.lineal, sP = lin.paradaS, L = lin.largoTotalM, vel = 0.41, pasoS = vel * 2;
    lin.muestras = [];
    var s, pt, ang;
    /* Tramo 1: Ida continua [0, sP] (I1, I2, I3) */
    for (s = 0; s < sP - 0.05; s += pasoS) {
      pt = trazado ? trazado.puntoEn(s) : { x: r(s, 3), y: 0 };
      ang = trazado ? trazado.rumboPistaGrados(s) : 0;
      registrarMuestraLineal(est, {
        t_s: r(s / vel, 2), s_m: r(s, 3), x: r(pt.x, 3), y: r(pt.y, 3), angulo: r(ang, 1),
        tcrt: [0, 1, 1, 0], tcrt_n: [0.07, 0.93, 0.92, 0.08],
        frente_cm: null, atras_cm: 192,
        paredes_ref: { frente_cm: null, atras_cm: 192, linea_base: true },
        yaw_deg: r(ang, 1), omega_dps: 0, v_ms: vel, pwm_izq: 0.72, pwm_der: 0.72, final: false
      }, "ida");
    }
    pt = trazado ? trazado.puntoEn(sP) : { x: r(sP, 3), y: 0 };
    ang = trazado ? trazado.rumboPistaGrados(sP) : 0;
    registrarMuestraLineal(est, {
      t_s: r(sP / vel, 2), s_m: r(sP, 3), x: r(pt.x, 3), y: r(pt.y, 3), angulo: r(ang, 1),
      tcrt: [0, 1, 1, 0], tcrt_n: [0.05, 0.95, 0.95, 0.05],
      frente_cm: null, atras_cm: 190,
      paredes_ref: { frente_cm: null, atras_cm: 190, linea_base: true },
      yaw_deg: r(ang, 1), omega_dps: 0, v_ms: vel, pwm_izq: 0.72, pwm_der: 0.72, final: false
    }, "ida");
    /* Tramo 2: Regreso continuo HACIA ADELANTE [sP, L] (R1, R2, R3) hasta volver a Base */
    for (s = sP + pasoS; s < L - 0.05; s += pasoS) {
      pt = trazado ? trazado.puntoEn(s) : { x: r(s, 3), y: 0 };
      ang = trazado ? trazado.rumboPistaGrados(s) : 0;
      registrarMuestraLineal(est, {
        t_s: r(s / vel, 2), s_m: r(s, 3), x: r(pt.x, 3), y: r(pt.y, 3), angulo: r(ang, 1),
        tcrt: [0, 1, 1, 0], tcrt_n: [0.08, 0.92, 0.91, 0.09],
        frente_cm: null, atras_cm: 194,
        paredes_ref: { frente_cm: null, atras_cm: 194, linea_base: true },
        yaw_deg: r(ang, 1), omega_dps: 0, v_ms: vel, pwm_izq: 0.72, pwm_der: 0.72, final: false
      }, "regreso");
    }
    /* Asegura al menos 1 muestra en cada tercio de regreso aunque lReg sea corto */
    [lin.segmentosRegreso[0], lin.segmentosRegreso[1]].forEach(function (sg) {
      var sMed = r((sg.desdeM + sg.hastaM) / 2, 3);
      if (!lin.muestras.some(function (m) { return m.seg === sg.id; })) {
        pt = trazado ? trazado.puntoEn(sMed) : { x: sMed, y: 0 };
        ang = trazado ? trazado.rumboPistaGrados(sMed) : 0;
        registrarMuestraLineal(est, {
          t_s: r(sMed / vel, 2), s_m: sMed, x: r(pt.x, 3), y: r(pt.y, 3), angulo: r(ang, 1),
          tcrt: [0, 1, 1, 0], tcrt_n: [0.07, 0.93, 0.92, 0.08],
          frente_cm: null, atras_cm: 193,
          paredes_ref: { frente_cm: null, atras_cm: 193, linea_base: true },
          yaw_deg: r(ang, 1), omega_dps: 0, v_ms: vel, pwm_izq: 0.72, pwm_der: 0.72, final: false
        }, "regreso");
      }
    });
    pt = trazado ? trazado.puntoEn(L) : { x: r(L, 3), y: 0 };
    ang = trazado ? trazado.rumboPistaGrados(Math.max(0, L - 0.01)) : 0;
    registrarMuestraLineal(est, {
      t_s: r(L / vel, 2), s_m: r(L, 3), x: r(pt.x, 3), y: r(pt.y, 3), angulo: r(ang, 1),
      tcrt: [0, 1, 1, 0], tcrt_n: [0.05, 0.95, 0.94, 0.05],
      frente_cm: null, atras_cm: 196,
      paredes_ref: { frente_cm: null, atras_cm: 196, linea_base: true },
      yaw_deg: r(ang, 1), omega_dps: 0, v_ms: vel, pwm_izq: 0.72, pwm_der: 0.72, final: true
    }, "regreso");

    lin.escaneando = false;
    lin.completo = true;
    lin.sentidoActual = "regreso";
    lin.tFinS = r(L / vel, 2);
    registrarEvento(est, "REESCANEO_LINEAL_COMPLETO", "R3", L,
      "Re-escaneo continuo completo: Ida I1–I3 (" + lin.largoIda.toFixed(2) + " m) + Regreso R1–R3 (" + lin.largoRegreso.toFixed(2) + " m) = " + L.toFixed(2) + " m · confirmación del receptor habilitada");
    return lin;
  }

  function filtrarMuestrasLineal(muestras, filtro) {
    if (!filtro || filtro === "todos") return muestras.slice();
    if (filtro === "ida" || filtro === "regreso") {
      return muestras.filter(function (m) { return m.sentido === filtro; });
    }
    return muestras.filter(function (m) { return m.seg === filtro; });
  }

  function resumenLinealPorSegmento(muestras) {
    var c = { ida: 0, regreso: 0, I1: 0, I2: 0, I3: 0, R1: 0, R2: 0, R3: 0 };
    muestras.forEach(function (m) {
      if (m.sentido === "ida") c.ida++;
      else if (m.sentido === "regreso") c.regreso++;
      if (c[m.seg] !== undefined) c[m.seg]++;
    });
    return c;
  }

  function salirModoLineal(est) {
    if (!est.lineal) return;
    est.lineal.activo = false;
    est.lineal.escaneando = false;
  }

  return {
    C: C,
    FASES_EXT: FASES_EXT,
    PALETA_CERRADA: PALETA_CERRADA,
    PALETA_LINEAL: PALETA_LINEAL,
    crearEstado: crearEstado,
    reiniciar: reiniciar,
    conteoEscaneos: conteoEscaneos,
    siguienteEscaneoCalib: siguienteEscaneoCalib,
    obstaculosPermitidos: obstaculosPermitidos,
    setOperacionReal: setOperacionReal,
    paradaDesbloqueada: paradaDesbloqueada,
    unificarPorSegmento: unificarPorSegmento,
    registrarEscaneoCompletado: registrarEscaneoCompletado,
    completarEscaneoRapido: completarEscaneoRapido,
    completarCalibracionCompleta: completarCalibracionCompleta,
    evaluarEcoUltrasonico: evaluarEcoUltrasonico,
    registrarEvento: registrarEvento,
    sDestinoMvp: sDestinoMvp,
    completarViajeOperativo: completarViajeOperativo,
    simularLoteHasta8: simularLoteHasta8,
    programarParada: programarParada,
    programarParadaEnS: programarParadaEnS,
    quitarParada: quitarParada,
    calcularRutaLineal: calcularRutaLineal,
    segmentoLinealDe: segmentoLinealDe,
    confirmarFijarYReescanear: confirmarFijarYReescanear,
    iniciarReescaneoLineal: iniciarReescaneoLineal,
    registrarMuestraLineal: registrarMuestraLineal,
    completarReescaneoLinealRapido: completarReescaneoLinealRapido,
    filtrarMuestrasLineal: filtrarMuestrasLineal,
    resumenLinealPorSegmento: resumenLinealPorSegmento,
    salirModoLineal: salirModoLineal
  };
});
