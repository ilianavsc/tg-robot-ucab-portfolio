/* P06 · Ruta lineal · interfaz: escena 2.5D en canvas, alarma (visual + Web Audio), panel con 2 pestañas.
   Todo lee y escribe en window.SimulationState (ruta_lineal.js). Sin librerías. */
(function () {
  'use strict';
  var S = window.SimulationState;
  if (!S) return;
  var G = S.GEO;
  var L = S.LIMITES;
  var $ = function (id) { return document.getElementById(id); };
  var todos = function (sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); };
  var reducido = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Colores del canvas: se leen de tokens.css (--tg-*, --tg-dark-*, --tg-sim-*); el segundo valor es solo el respaldo
  var T = window.TGTokens || {paleta: function (d) { var o = {}; Object.keys(d).forEach(function (k) { o[k] = d[k][1]; }); return o; }};
  var COL = T.paleta({
    tinta: ['--tg-border-strong', '#0F172A'], cian: ['--tg-dark-accent', '#00F2FE'], ok: ['--tg-dark-ok', '#34D399'],
    aviso: ['--tg-dark-warning-solid', '#F59E0B'], peligro: ['--tg-dark-danger-solid', '#EF4444'], violeta: ['--tg-purple', '#6B4EE6'],
    alarma: ['--tg-dark-alarm', '#A78BFA'], tenue: ['--tg-dark-text-subtle', '#849495'], linea: ['--tg-dark-off', '#262A31'],
    claro: ['--tg-dark-text-strong', '#E0FDFF'], coral: ['--tg-coral', '#F2603D'], verde: ['--tg-accent', '#0F9D84'],
    blanco: ['--tg-surface', '#FFFFFF'], apagado: ['--tg-text-muted', '#475569'],
    piso: ['--tg-sim-piso', '#E4ECE9'], pisoClaro: ['--tg-sim-piso-claro', '#F4F7F6'], pisoOscuro: ['--tg-sim-piso-oscuro', '#DCE5E2'],
    detalle: ['--tg-sim-detalle', '#F7FAF9'], pared: ['--tg-sim-pared', '#C5D2CD'], paredExtremo: ['--tg-sim-pared-extremo', '#B3C3BD'],
    cinta: ['--tg-sim-cinta', '#0B0C0E'], chasis: ['--tg-sim-chasis', '#1E3A5F'], rueda: ['--tg-sim-rueda', '#1D2025'],
    pcb: ['--tg-sim-pcb', '#2F6F55'], ultrasonico: ['--tg-sim-ultrasonico', '#2A63B5'], obstaculo: ['--tg-sim-obstaculo', '#EA580C'],
    obstaculoClaro: ['--tg-sim-obstaculo-claro', '#FB923C'], obstaculoOscuro: ['--tg-sim-obstaculo-oscuro', '#C2410C'], obstaculoBorde: ['--tg-sim-obstaculo-borde', '#7C2D12']
  });

  // ---------------------------------------------------------------- canvas nítido
  function preparar(c) {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = c.clientWidth, h = c.clientHeight;
    if (!w || !h) return null;
    if (c.width !== Math.round(w * dpr) || c.height !== Math.round(h * dpr)) {
      c.width = Math.round(w * dpr);
      c.height = Math.round(h * dpr);
    }
    var ctx = c.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    return {ctx: ctx, w: w, h: h};
  }
  function rr(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }
  function etiqueta(ctx, txt, x, y, fondo, color, alinear) {
    ctx.font = '700 11px "JetBrains Mono", ui-monospace, monospace';
    var w = ctx.measureText(txt).width + 12;
    var x0 = alinear === 'der' ? x - w : alinear === 'centro' ? x - w / 2 : x;
    rr(ctx, x0, y - 10, w, 20, 6);
    ctx.fillStyle = fondo;
    ctx.fill();
    ctx.fillStyle = color;
    ctx.textBaseline = 'middle';
    ctx.fillText(txt, x0 + 6, y + 0.5);
  }
  function rumboRad(e) {
    var rb = e.robot;
    return (rb.dir > 0 ? 0 : Math.PI) + (rb.yawGiro * Math.PI) / 180 + rb.psi;
  }

  // ---------------------------------------------------------------- escena
  var canvas = $('rl-canvas');
  function dibujarEscena(e) {
    var P = preparar(canvas);
    if (!P) return;
    var ctx = P.ctx, W = P.w, H = P.h;
    var estrecho = W < 560;
    var hOver = Math.round(H * (estrecho ? 0.46 : 0.5));
    // ---- vista general en perspectiva oblicua (2.5D)
    var mx = estrecho ? 18 : 40;
    var semi = G.anchoPasillo / 2;
    var pared = estrecho ? 12 : 18;
    // perspectiva oblicua: el ancho del pasillo se exagera para que se lea la línea y el robot
    var sy = Math.max(30, (hOver - 72 - pared) / (2 * semi));
    var sx = sy * (estrecho ? 0.3 : 0.42);
    var k = (W - mx * 2 - 2 * semi * sx) / G.largo; // px por metro a lo largo
    var ox = mx + 2 * semi * sx, oy = 30 + pared + semi * sy;
    var pr = function (x, y) { return [ox + x * k - (y + semi) * sx, oy - y * sy]; };
    // fondo
    ctx.fillStyle = COL.piso;
    ctx.fillRect(0, 0, W, H);
    // piso del pasillo
    var a = pr(0, semi), b = pr(G.largo, semi), c2 = pr(G.largo, -semi), d = pr(0, -semi);
    ctx.beginPath();
    ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.lineTo(c2[0], c2[1]); ctx.lineTo(d[0], d[1]); ctx.closePath();
    var grad = ctx.createLinearGradient(0, a[1], 0, d[1]);
    grad.addColorStop(0, COL.pisoOscuro);
    grad.addColorStop(1, COL.pisoClaro);
    ctx.fillStyle = grad;
    ctx.fill();
    // baldosas cada 1 m
    ctx.strokeStyle = 'rgba(20,33,61,0.08)';
    ctx.lineWidth = 1;
    for (var m = 1; m < G.largo; m++) {
      var p1 = pr(m, semi), p2 = pr(m, -semi);
      ctx.beginPath(); ctx.moveTo(p1[0], p1[1]); ctx.lineTo(p2[0], p2[1]); ctx.stroke();
    }
    // pared del fondo (lado izquierdo del sentido de ida) y paredes de los extremos
    ctx.fillStyle = COL.pared;
    ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.lineTo(b[0], b[1] - pared); ctx.lineTo(a[0], a[1] - pared); ctx.closePath(); ctx.fill();
    ctx.fillStyle = COL.paredExtremo;
    [[a, d], [b, c2]].forEach(function (q) {
      ctx.beginPath(); ctx.moveTo(q[0][0], q[0][1]); ctx.lineTo(q[1][0], q[1][1]); ctx.lineTo(q[1][0], q[1][1] - pared); ctx.lineTo(q[0][0], q[0][1] - pared); ctx.closePath(); ctx.fill();
    });
    ctx.strokeStyle = COL.tinta;
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.lineTo(c2[0], c2[1]); ctx.lineTo(d[0], d[1]); ctx.closePath(); ctx.stroke();
    // zona de la base
    var z1 = pr(0, semi), z2 = pr(G.marcaBase + 0.2, semi), z3 = pr(G.marcaBase + 0.2, -semi), z4 = pr(0, -semi);
    ctx.fillStyle = 'rgba(15,157,132,0.14)';
    ctx.beginPath(); ctx.moveTo(z1[0], z1[1]); ctx.lineTo(z2[0], z2[1]); ctx.lineTo(z3[0], z3[1]); ctx.lineTo(z4[0], z4[1]); ctx.closePath(); ctx.fill();
    // línea guía negra
    var l1 = pr(G.marcaBase, 0), l2 = pr(G.marcaParada, 0);
    ctx.strokeStyle = COL.cinta;
    ctx.lineWidth = Math.max(3, G.cinta * sy * 2.2);
    ctx.lineCap = 'butt';
    ctx.beginPath(); ctx.moveTo(l1[0], l1[1]); ctx.lineTo(l2[0], l2[1]); ctx.stroke();
    // marcas transversales (base y parada)
    [G.marcaBase, G.marcaParada].forEach(function (mxm) {
      var q1 = pr(mxm, 0.06), q2 = pr(mxm, -0.06);
      ctx.lineWidth = Math.max(4, G.anchoMarca * k);
      ctx.beginPath(); ctx.moveTo(q1[0], q1[1]); ctx.lineTo(q2[0], q2[1]); ctx.stroke();
    });
    // bandera del destino
    var fl = pr(G.marcaParada, semi * 0.75);
    ctx.strokeStyle = COL.tinta;
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(fl[0], fl[1]); ctx.lineTo(fl[0], fl[1] - 26); ctx.stroke();
    ctx.fillStyle = e.ruta.estado === 'ESPERA_REPOSICION' ? COL.violeta : COL.coral;
    ctx.beginPath(); ctx.moveTo(fl[0], fl[1] - 26); ctx.lineTo(fl[0] + 14, fl[1] - 21); ctx.lineTo(fl[0], fl[1] - 16); ctx.closePath(); ctx.fill();
    // marcas de distancia
    ctx.fillStyle = COL.tenue;
    ctx.font = '600 10px "JetBrains Mono", ui-monospace, monospace';
    ctx.textBaseline = 'top';
    ctx.textAlign = 'center';
    for (m = 0; m <= G.largo; m++) {
      var t = pr(m, -semi);
      if (!estrecho || m % 2 === 0) ctx.fillText(m + ' m', t[0], t[1] + 5);
    }
    ctx.textAlign = 'left';
    var eb = pr(0.05, semi);
    etiqueta(ctx, estrecho ? 'BASE' : 'BASE · INICIO', eb[0] - 4, eb[1] - pared - 14, COL.verde, COL.blanco);
    var ed = pr(G.largo - 0.05, semi);
    etiqueta(ctx, estrecho ? 'DESTINO' : 'PARADA · DESTINO', ed[0] + 4, ed[1] - pared - 14, e.ruta.estado === 'ESPERA_REPOSICION' ? COL.violeta : COL.coral, COL.blanco, 'der');
    // obstáculo
    if (e.obstaculo) {
      var po = pr(e.obstaculo.x, 0);
      var ro = Math.max(5, G.radioObstaculo * k);
      ctx.fillStyle = COL.obstaculoOscuro;
      ctx.fillRect(po[0] - ro, po[1] - 22, ro * 2, 22);
      ctx.beginPath(); ctx.ellipse(po[0], po[1], ro, ro * 0.45, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = COL.obstaculoClaro;
      ctx.beginPath(); ctx.ellipse(po[0], po[1] - 22, ro, ro * 0.45, 0, 0, Math.PI * 2); ctx.fill();
    }
    // robot: haz del HC-SR04 + caja extruida + flecha de rumbo
    var rb = e.robot;
    var th = rumboRad(e);
    var cx = rb.x, cy = rb.y;
    var dF = e.hcsr04.distanciaM;
    var colZona = e.hcsr04.zona === 'critica' ? 'rgba(239,68,68,0.28)' : e.hcsr04.zona === 'precaucion' ? 'rgba(245,158,11,0.24)' : 'rgba(0,180,200,0.14)';
    var alcance = Math.min(isFinite(dF) ? dF : 0.8, 0.8);
    var fx = cx + Math.cos(th) * G.usAdelante, fy = cy + Math.sin(th) * G.usAdelante;
    var ang = 0.26;
    var h1 = pr(fx, fy), h2 = pr(fx + Math.cos(th + ang) * alcance, fy + Math.sin(th + ang) * alcance), h3 = pr(fx + Math.cos(th - ang) * alcance, fy + Math.sin(th - ang) * alcance);
    ctx.fillStyle = colZona;
    ctx.beginPath(); ctx.moveTo(h1[0], h1[1]); ctx.lineTo(h2[0], h2[1]); ctx.lineTo(h3[0], h3[1]); ctx.closePath(); ctx.fill();
    var esquinas = [[G.largoRobot / 2, G.anchoRobot / 2], [G.largoRobot / 2, -G.anchoRobot / 2], [-G.largoRobot / 2, -G.anchoRobot / 2], [-G.largoRobot / 2, G.anchoRobot / 2]].map(function (q) {
      return pr(cx + q[0] * Math.cos(th) - q[1] * Math.sin(th), cy + q[0] * Math.sin(th) + q[1] * Math.cos(th));
    });
    var alto = estrecho ? 7 : 10;
    ctx.fillStyle = 'rgba(20,33,61,0.25)';
    ctx.beginPath(); esquinas.forEach(function (q, i) { if (i) ctx.lineTo(q[0] + 3, q[1] + 3); else ctx.moveTo(q[0] + 3, q[1] + 3); }); ctx.closePath(); ctx.fill();
    ctx.fillStyle = COL.chasis;
    ctx.beginPath(); esquinas.forEach(function (q, i) { if (i) ctx.lineTo(q[0], q[1]); else ctx.moveTo(q[0], q[1]); }); ctx.closePath(); ctx.fill();
    ctx.fillStyle = e.ruta.estado === 'ESPERA_REPOSICION' ? COL.violeta : rb.dir > 0 ? COL.verde : COL.coral;
    ctx.strokeStyle = COL.tinta;
    ctx.lineWidth = 1.5;
    ctx.beginPath(); esquinas.forEach(function (q, i) { if (i) ctx.lineTo(q[0], q[1] - alto); else ctx.moveTo(q[0], q[1] - alto); }); ctx.closePath(); ctx.fill(); ctx.stroke();
    var pc = pr(cx, cy), pf = pr(cx + Math.cos(th) * 0.16, cy + Math.sin(th) * 0.16);
    ctx.strokeStyle = COL.blanco;
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(pc[0], pc[1] - alto); ctx.lineTo(pf[0], pf[1] - alto); ctx.stroke();
    // ---- vista de detalle (cenital, con zoom) alrededor del robot
    var top = hOver + 6, margen = estrecho ? 10 : 16;
    var alarma = $('rl-alarma');
    var topAlarma = (estrecho ? 8 : top + 30) + 'px';
    if (alarma.style.top !== topAlarma) alarma.style.top = topAlarma;
    var dx0 = margen, dy0 = top, dw = W - margen * 2, dh = H - top - margen;
    if (dh < 80) return;
    rr(ctx, dx0, dy0, dw, dh, 12);
    ctx.fillStyle = COL.detalle;
    ctx.fill();
    ctx.strokeStyle = COL.tinta;
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.save();
    rr(ctx, dx0, dy0, dw, dh, 12);
    ctx.clip();
    var z = Math.min(dw / 0.75, dh / 0.42);
    var ccx = dx0 + dw / 2, ccy = dy0 + dh / 2 + 6;
    var dpz = function (x, y) { return [ccx + (x - rb.x) * z, ccy - (y - rb.y * 0.5) * z]; };
    // cuadrícula de 5 cm
    ctx.strokeStyle = 'rgba(20,33,61,0.06)';
    ctx.lineWidth = 1;
    var x0 = Math.floor((rb.x - 0.6) / 0.05) * 0.05;
    for (var gx = x0; gx < rb.x + 0.6; gx += 0.05) {
      var g1 = dpz(gx, 0.5), g2 = dpz(gx, -0.5);
      ctx.beginPath(); ctx.moveTo(g1[0], g1[1]); ctx.lineTo(g2[0], g2[1]); ctx.stroke();
    }
    // cinta y marcas
    ctx.fillStyle = COL.cinta;
    var c0 = dpz(G.marcaBase, G.cinta / 2), c1 = dpz(G.marcaParada, -G.cinta / 2);
    ctx.fillRect(c0[0], c0[1], c1[0] - c0[0], c1[1] - c0[1]);
    [G.marcaBase, G.marcaParada].forEach(function (mxm) {
      var q1 = dpz(mxm - G.anchoMarca / 2, 0.06), q2 = dpz(mxm + G.anchoMarca / 2, -0.06);
      ctx.fillRect(q1[0], q1[1], q2[0] - q1[0], q2[1] - q1[1]);
    });
    // paredes de los extremos dentro del zoom
    [0, G.largo].forEach(function (xw) {
      if (Math.abs(xw - rb.x) < 0.8) {
        var w1 = dpz(xw, 0.5);
        ctx.fillStyle = COL.paredExtremo;
        ctx.fillRect(w1[0] - (xw === 0 ? 10 : 0), dy0, 10, dh);
      }
    });
    if (e.obstaculo && Math.abs(e.obstaculo.x - rb.x) < 0.9) {
      var oo = dpz(e.obstaculo.x, 0);
      ctx.fillStyle = COL.obstaculo;
      ctx.beginPath(); ctx.arc(oo[0], oo[1], G.radioObstaculo * z, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = COL.obstaculoBorde;
      ctx.stroke();
    }
    // robot en el marco propio
    var rc = dpz(rb.x, rb.y);
    ctx.save();
    ctx.translate(rc[0], rc[1]);
    ctx.rotate(-th);
    var lr = G.largoRobot * z, ar = G.anchoRobot * z;
    // haz del ultrasonido
    var alc = Math.min(isFinite(dF) ? dF : 0.5, 0.5) * z;
    ctx.fillStyle = colZona;
    ctx.beginPath(); ctx.moveTo(G.usAdelante * z, 0); ctx.lineTo(G.usAdelante * z + alc, Math.tan(ang) * alc); ctx.lineTo(G.usAdelante * z + alc, -Math.tan(ang) * alc); ctx.closePath(); ctx.fill();
    // chasis translúcido (se ve la cinta debajo)
    rr(ctx, -lr / 2, -ar / 2, lr, ar, 6);
    ctx.fillStyle = 'rgba(217,235,230,0.72)';
    ctx.fill();
    ctx.strokeStyle = COL.tinta;
    ctx.lineWidth = 2;
    ctx.stroke();
    // ruedas (eje adelantado 3 cm) y rueda loca
    ctx.fillStyle = COL.rueda;
    [-1, 1].forEach(function (s) { rr(ctx, 0.03 * z - 0.0325 * z, s * (ar / 2 + 0.002 * z) - (s > 0 ? 0 : 0.026 * z), 0.065 * z, 0.026 * z, 3); ctx.fill(); });
    ctx.beginPath(); ctx.arc(-0.07 * z, 0, 0.009 * z, 0, Math.PI * 2); ctx.fill();
    // HC-SR04 al frente
    ctx.fillStyle = COL.ultrasonico;
    ctx.fillRect(G.usAdelante * z - 0.012 * z, -0.0225 * z, 0.012 * z, 0.045 * z);
    // regleta TCRT5000 con los 4 sensores
    ctx.fillStyle = COL.pcb;
    ctx.fillRect(G.tcrtAdelante * z - 0.01 * z, -0.04 * z, 0.02 * z, 0.08 * z);
    var marca = e.tcrt5000.patron === '1111';
    G.tcrtLat.forEach(function (lat, i) {
      var on = e.tcrt5000.canales[i];
      ctx.beginPath();
      ctx.arc(G.tcrtAdelante * z, -lat * z, Math.max(3, 0.0045 * z), 0, Math.PI * 2);
      ctx.fillStyle = on ? (marca ? COL.alarma : COL.ok) : COL.apagado;
      ctx.fill();
      ctx.strokeStyle = COL.blanco;
      ctx.lineWidth = 1;
      ctx.stroke();
    });
    // flecha de rumbo
    ctx.strokeStyle = e.ruta.estado === 'ESPERA_REPOSICION' ? COL.violeta : COL.tinta;
    ctx.fillStyle = ctx.strokeStyle;
    ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(-0.05 * z, 0); ctx.lineTo(0.05 * z, 0); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0.07 * z, 0); ctx.lineTo(0.045 * z, 0.018 * z); ctx.lineTo(0.045 * z, -0.018 * z); ctx.closePath(); ctx.fill();
    ctx.restore();
    // arco del giro de 180°
    if (e.ruta.sub) {
      ctx.strokeStyle = COL.violeta;
      ctx.lineWidth = 3;
      ctx.setLineDash([6, 5]);
      ctx.beginPath();
      var r0 = (G.largoRobot / 2 + 0.04) * z;
      var ini = -(rb.dir > 0 ? 0 : Math.PI);
      ctx.arc(rc[0], rc[1], r0, ini, ini - Math.PI * e.ruta.giro, true);
      ctx.stroke();
      ctx.setLineDash([]);
    }
    ctx.restore();
    etiqueta(ctx, 'Vista de detalle · regleta ' + e.tcrt5000.patron, dx0 + 8, dy0 + 16, COL.tinta, COL.claro);
    if (e.ruta.sub) etiqueta(ctx, (e.ruta.sub === 'girando' ? 'Giro manual ' : 'Giro en base (supuesto) ') + Math.round(e.ruta.giro * 180) + '°', dx0 + dw - 8, dy0 + 16, COL.violeta, COL.blanco, 'der');
  }

  // ---------------------------------------------------------------- consolas (canvas)
  function dibujarRadar(e) {
    var P = preparar($('rl-cv-radar'));
    if (!P) return;
    var ctx = P.ctx, w = P.w, h = P.h;
    var cx = w / 2, cy = h - 8, R = Math.min(w * 0.46, h - 14);
    ctx.font = '9.5px "JetBrains Mono", monospace';
    var HC = window.TG_ROBOT.hcsr04;
    [[HC.paradaCm, 'rgba(239,68,68,0.6)'], [HC.precaucionCm, 'rgba(245,158,11,0.55)'], [HC.maxCm, 'rgba(0,242,254,0.32)']].forEach(function (q) {
      var r = (R * q[0]) / HC.maxCm;
      ctx.strokeStyle = q[1];
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(cx, cy, r, Math.PI, 0); ctx.stroke();
      ctx.fillStyle = COL.tenue;
      ctx.fillText(String(q[0]), cx + r - 12, cy - 2);
    });
    var z = e.hcsr04.zona;
    var col = z === 'critica' ? COL.peligro : z === 'precaucion' ? COL.aviso : COL.cian;
    ctx.fillStyle = z === 'critica' ? 'rgba(239,68,68,0.18)' : z === 'precaucion' ? 'rgba(245,158,11,0.14)' : 'rgba(0,242,254,0.08)';
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, R, -Math.PI / 2 - 0.5, -Math.PI / 2 + 0.5); ctx.closePath(); ctx.fill();
    var d = e.hcsr04.distanciaM * 100;
    if (d <= HC.maxCm) {
      ctx.fillStyle = col;
      ctx.beginPath(); ctx.arc(cx, cy - (R * d) / HC.maxCm, 5, 0, Math.PI * 2); ctx.fill();
    } else {
      ctx.fillStyle = COL.tenue;
      ctx.textAlign = 'center';
      ctx.fillText('> ' + HC.maxCm + ' cm', cx, 12);
      ctx.textAlign = 'left';
    }
  }
  function dibujarVelo(e) {
    var P = preparar($('rl-cv-velo'));
    if (!P) return;
    var ctx = P.ctx, w = P.w, h = P.h;
    var cx = w / 2, cy = h - 12, r = Math.min(w * 0.36, h - 26);
    var f = Math.max(0, Math.min(1, e.motores.v / L.vMax));
    ctx.lineCap = 'round';
    ctx.lineWidth = 8;
    ctx.strokeStyle = COL.linea;
    ctx.beginPath(); ctx.arc(cx, cy, r, Math.PI, 0); ctx.stroke();
    if (f > 0) {
      ctx.strokeStyle = e.robot.dir > 0 ? COL.cian : COL.aviso;
      ctx.beginPath(); ctx.arc(cx, cy, r, Math.PI, Math.PI + f * Math.PI); ctx.stroke();
    }
    ctx.lineCap = 'butt';
    ctx.fillStyle = COL.tenue;
    ctx.font = '9.5px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('0', cx - r, cy + 10);
    ctx.fillText((L.vMax / 2).toFixed(2), cx, cy - r - 5);
    ctx.fillText(L.vMax.toFixed(2), cx + r, cy + 10);
    ctx.textAlign = 'left';
    var an = Math.PI + f * Math.PI;
    ctx.strokeStyle = e.motores.bloqueado ? COL.peligro : COL.claro;
    ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(an) * (r - 10), cy + Math.sin(an) * (r - 10)); ctx.stroke();
    ctx.fillStyle = COL.cian;
    ctx.beginPath(); ctx.arc(cx, cy, 4, 0, Math.PI * 2); ctx.fill();
  }
  function dibujarBrujula(e) {
    var P = preparar($('rl-cv-brujula'));
    if (!P) return;
    var ctx = P.ctx, w = P.w, h = P.h;
    var R = Math.min(w, h) / 2 - 6, cx = w / 2, cy = h / 2;
    var al = e.mpu6050.alerta;
    var col = al === 'impacto' ? COL.peligro : al ? COL.aviso : COL.cian;
    ctx.strokeStyle = COL.linea;
    ctx.lineWidth = 6;
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = COL.tenue;
    ctx.font = '700 9px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    // 0° = sentido de ida (hacia el destino, a la derecha); 180° = retorno
    ctx.fillText('IDA 0°', cx + R + 28 < w ? cx + R + 22 : cx + R * 0.5, cy - (cx + R + 28 < w ? 0 : R * 0.55));
    ctx.fillText('180°', cx - R - 22 > 0 ? cx - R - 16 : cx - R * 0.55, cy + (cx - R - 22 > 0 ? 0 : R * 0.55));
    var yaw = (e.mpu6050.yawDeg * Math.PI) / 180;
    ctx.strokeStyle = col;
    ctx.fillStyle = col;
    ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(-yaw) * (R - 8), cy + Math.sin(-yaw) * (R - 8)); ctx.stroke();
    ctx.beginPath(); ctx.arc(cx + Math.cos(-yaw) * (R - 8), cy + Math.sin(-yaw) * (R - 8), 4, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = COL.claro;
    ctx.beginPath(); ctx.arc(cx, cy, 3.5, 0, Math.PI * 2); ctx.fill();
    ctx.textBaseline = 'alphabetic';
    ctx.textAlign = 'left';
  }

  // ---------------------------------------------------------------- panel (DOM)
  var txt = function (id, t) { var el = $(id); if (el && el.textContent !== t) el.textContent = t; };
  var cls = function (id, c) { var el = $(id); if (el && el.className !== c) el.className = c; };
  var signo = function (v, d) { return (v >= 0 ? '+' : '') + v.toFixed(d); };
  var fmtDist = function (m) { return !isFinite(m) ? 'sin eco' : m < 1 ? Math.round(m * 100) + ' cm' : m.toFixed(2) + ' m'; };
  var ultimoLog = '';

  // Un solo estado (SimulationState) y una sola función de pintado: lo común siempre;
  // cada pestaña solo cuando se ve (la oculta se pinta completa al abrirla).
  function renderPanel(e) {
    var verOp = !$('rl-pane-op').hidden;
    var verSen = !$('rl-pane-sen').hidden;
    var est = e.ruta.estado;
    var sim = $('rl-sim');
    sim.setAttribute('data-estado', est);
    sim.setAttribute('data-seguridad', e.seguridad.estado.toLowerCase());
    txt('rl-estado-chip', e.ruta.sub === 'girando' ? 'ESPERA_REPOSICION · girando' : e.ruta.sub === 'alineando' ? 'EN_BASE · giro automático (supuesto)' : est);
    txt('rl-seg-estado', e.seguridad.estado === 'PRECAUCION' ? 'PRECAUCIÓN' : e.seguridad.estado);
    txt('rl-seg-motivo', e.seguridad.motivo);
    // alarma visual
    $('rl-alarma').hidden = !(e.alarma.activa && !e.ruta.sub);
    if (verOp) renderOperacion(e, est);
    // botones (también el de la alarma, que está sobre la escena)
    todos('[data-accion="iniciar"]').forEach(function (b) { b.disabled = !(est === 'EN_BASE' && !e.ruta.sub); });
    todos('[data-accion="girar"]').forEach(function (b) { b.disabled = !(est === 'ESPERA_REPOSICION' && !e.ruta.sub); });
    todos('[data-accion="obstaculo"]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(!!e.obstaculo));
      var t = e.obstaculo ? '✓ Quitar obstáculo' : '⛔ Inyectar obstáculo';
      if (b.textContent !== t) b.textContent = t;
    });
    $('rl-quitar').disabled = !e.obstaculo;
    if (verSen) renderConsola(e, est);
    // ---- sonido
    var mute = $('rl-mute');
    mute.setAttribute('aria-pressed', String(e.alarma.silenciada));
    var mt = e.alarma.silenciada ? '🔕' : '🔔';
    if (mute.firstElementChild.textContent !== mt) mute.firstElementChild.textContent = mt;
    txt('rl-mute-tx', e.alarma.silenciada ? 'Silenciado' : 'Sonido');
  }

  // Pestaña Operación: máquina de estados, datos y registro
  function renderOperacion(e, est) {
    todos('[data-fsm]').forEach(function (li) { li.classList.toggle('activo', li.getAttribute('data-fsm') === est); });
    txt('rl-ciclo', String(e.ruta.ciclo));
    txt('rl-pos', e.robot.x.toFixed(2) + ' m');
    txt('rl-vel', e.motores.v.toFixed(2) + ' m/s');
    txt('rl-rumbo', Math.round(e.mpu6050.yawDeg) + '°');
    // registro
    var clave = e.eventos.length + '|' + (e.eventos[0] ? e.eventos[0].t + e.eventos[0].texto : '');
    if (clave !== ultimoLog) {
      ultimoLog = clave;
      $('rl-log').innerHTML = e.eventos.slice(0, 10).map(function (ev) {
        var t = String(ev.t.toFixed(1)).replace(/&/g, '');
        return '<li class="' + ev.tipo + '"><time>' + t + ' s</time><span>' + ev.texto.replace(/[&<>]/g, function (c) { return {'&': '&amp;', '<': '&lt;', '>': '&gt;'}[c]; }) + '</span></li>';
      }).join('');
    }
  }

  // Pestaña Consola de sensores: las 4 consolas leen el mismo estado
  function renderConsola(e, est) {
    // ---- TCRT5000
    var tc = e.tcrt5000;
    for (var i = 0; i < 4; i++) cls('rl-s' + (i + 1), tc.canales[i] ? 'on' : '');
    $('rl-leds').classList.toggle('marca', tc.patron === '1111');
    $('rl-leds').setAttribute('aria-label', 'Sensores S1 a S4: ' + tc.patron);
    txt('rl-patron', tc.patron);
    txt('rl-err', signo(tc.errorMm, 1) + ' mm');
    $('rl-err-m').style.left = 50 + Math.max(-1, Math.min(1, tc.errorMm / 30)) * 44 + '%';
    var tNota = tc.lectura === 'marca' ? (est === 'EN_BASE' ? 'Marca de la base (1111): fin de pista' : 'Marca de parada (1111): fin de pista') : tc.lectura === 'perdida' ? (e.ruta.sub ? 'Girando: la regleta sale de la cinta' : 'Línea perdida (0000)') : 'Siguiendo la línea guía';
    txt('rl-tcrt-nota', tNota);
    var bT = tc.lectura === 'marca' ? ['MARCA 1111', 'alarma'] : tc.lectura === 'perdida' ? ['SIN LÍNEA', e.ruta.sub ? 'aviso' : 'peligro'] : Math.abs(tc.errorMm) > 9 ? ['DERIVA', 'aviso'] : ['LÍNEA OK', 'ok'];
    txt('rl-b-tcrt', bT[0]);
    cls('rl-b-tcrt', 'rl-badge-s ' + bT[1]);
    $('rl-card-tcrt').setAttribute('data-estado', bT[1] === 'ok' ? 'normal' : bT[1]);
    // ---- HC-SR04
    var z = e.hcsr04.zona;
    var d = e.hcsr04.distanciaM;
    txt('rl-dist', fmtDist(d));
    cls('rl-dist', z === 'critica' ? 'peligro' : z === 'precaucion' ? 'aviso' : '');
    var bU = z === 'critica' ? ['< 20 cm', 'peligro'] : z === 'precaucion' ? ['PRECAUCIÓN', 'aviso'] : ['LIBRE', 'ok'];
    txt('rl-b-us', bU[0]);
    cls('rl-b-us', 'rl-badge-s ' + bU[1]);
    $('rl-card-us').setAttribute('data-estado', bU[1] === 'ok' ? 'normal' : bU[1]);
    // ---- Motores
    var m = e.motores;
    txt('rl-pwm-izq', m.pwmIzq + '%');
    txt('rl-pwm-der', m.pwmDer + '%');
    $('rl-bar-izq').style.width = Math.min(100, Math.abs(m.pwmIzq)) + '%';
    $('rl-bar-der').style.width = Math.min(100, Math.abs(m.pwmDer)) + '%';
    txt('rl-dir', m.direccion);
    var enEspera = est === 'ESPERA_REPOSICION';
    var bM = m.bloqueado && est !== 'EN_BASE' ? [enEspera ? 'BLOQUEADO' : 'PARADA', enEspera ? 'alarma' : 'peligro'] : m.direccion === 'DETENIDO' ? ['DETENIDO', 'aviso'] : [m.direccion, 'ok'];
    txt('rl-b-mot', bM[0]);
    cls('rl-b-mot', 'rl-badge-s ' + bM[1]);
    $('rl-card-mot').setAttribute('data-estado', bM[1] === 'ok' || bM[1] === 'aviso' ? 'normal' : bM[1]);
    txt('rl-bloqueo', m.bloqueado ? '■ ' + m.motivoBloqueo : 'Motores habilitados · ' + m.v.toFixed(2) + ' m/s');
    $('rl-bloqueo').classList.toggle('on', m.bloqueado && est !== 'EN_BASE');
    txt('rl-lbl-vel', e.consigna.toFixed(2) + ' m/s');
    sinc('rl-in-vel', e.consigna.toFixed(2));
    // ---- MPU-6050
    var mp = e.mpu6050;
    txt('rl-yaw', mp.yawDeg.toFixed(1) + '°');
    txt('rl-pr', signo(mp.pitchDeg, 1) + '° · ' + signo(mp.rollDeg, 1) + '°');
    txt('rl-g', mp.acelG.toFixed(2) + ' g');
    cls('rl-g', mp.alerta === 'impacto' ? 'peligro' : '');
    var bI = mp.alerta === 'impacto' ? ['IMPACTO', 'peligro'] : mp.alerta === 'inclinacion' ? ['INCLINACIÓN', 'aviso'] : e.ruta.sub ? ['GIRO ' + Math.round(e.ruta.giro * 180) + '°', 'alarma'] : ['ESTABLE', 'ok'];
    txt('rl-b-imu', bI[0]);
    cls('rl-b-imu', 'rl-badge-s ' + bI[1]);
    $('rl-card-imu').setAttribute('data-estado', bI[1] === 'ok' ? 'normal' : bI[1]);
    todos('[data-imu]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-imu') === mp.evento)); });
    // el rótulo del slider sale del estado (no del control): distancia pedida del obstáculo inyectado
    txt('rl-lbl-dist', (e.obstaculo && e.obstaculo.cm != null ? e.obstaculo.cm : Number($('rl-in-dist').value)) + ' cm');
    if (e.obstaculo && e.obstaculo.cm != null) sinc('rl-in-dist', String(e.obstaculo.cm));
    dibujarRadar(e);
    dibujarVelo(e);
    dibujarBrujula(e);
  }
  function sinc(id, v) {
    var el = $(id);
    if (el && el !== document.activeElement && el.value !== v) el.value = v;
  }

  // ---------------------------------------------------------------- alarma sonora (Web Audio, opcional)
  var audio = null;
  var ultimoPitido = 0;
  function asegurarAudio() {
    if (audio || !(window.AudioContext || window.webkitAudioContext)) return;
    try { audio = new (window.AudioContext || window.webkitAudioContext)(); } catch (err) { audio = null; }
  }
  function pitido(ahora) {
    if (!audio || audio.state !== 'running') return;
    if (ahora - ultimoPitido < 1400) return;
    ultimoPitido = ahora;
    [0, 0.22].forEach(function (off, i) {
      var o = audio.createOscillator();
      var g = audio.createGain();
      o.type = 'sine';
      o.frequency.value = i ? 660 : 880;
      var t0 = audio.currentTime + off;
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.exponentialRampToValueAtTime(0.18, t0 + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.18);
      o.connect(g);
      g.connect(audio.destination);
      o.start(t0);
      o.stop(t0 + 0.2);
    });
  }

  // ---------------------------------------------------------------- eventos de la interfaz
  var mt = $('rl-mute');
  if (mt && mt.lastElementChild) mt.lastElementChild.id = 'rl-mute-tx';
  $('rl-sim').addEventListener('click', function () {
    asegurarAudio();
    if (audio && audio.state === 'suspended') audio.resume();
  });
  todos('[data-accion]').forEach(function (b) {
    b.addEventListener('click', function () {
      var a = b.getAttribute('data-accion');
      if (a === 'iniciar') S.iniciarIda();
      else if (a === 'girar') S.girarYConfirmar();
      else if (a === 'obstaculo') { if (S.get().obstaculo) S.quitarObstaculo(); else S.inyectarObstaculo(); }
      else if (a === 'quitar') S.quitarObstaculo();
      else if (a === 'reiniciar') S.reiniciar();
    });
  });
  $('rl-mute').addEventListener('click', function () { S.silenciar(); });
  $('rl-in-dist').addEventListener('input', function (ev) {
    S.inyectarObstaculo(Number(ev.target.value)); // el rótulo se actualiza desde el estado
  });
  $('rl-in-vel').addEventListener('input', function (ev) { S.setConsigna(Number(ev.target.value)); });
  todos('[data-imu]').forEach(function (b) { b.addEventListener('click', function () { S.eventoImu(b.getAttribute('data-imu')); }); });
  // pestañas accesibles (clic y flechas)
  var tabs = todos('.rl-tab');
  function activar(tab, foco) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      $(t.getAttribute('aria-controls')).hidden = !on;
    });
    if (foco) tab.focus();
    renderPanel(S.get());
  }
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { activar(t); });
    t.addEventListener('keydown', function (ev) {
      if (ev.key === 'ArrowRight' || ev.key === 'ArrowLeft') {
        ev.preventDefault();
        activar(tabs[(i + (ev.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length], true);
      }
    });
  });

  // ---------------------------------------------------------------- bucle
  var previo = performance.now();
  var acDom = 0;
  S.subscribe(function (e, origen) {
    if (origen !== 'paso') renderPanel(e); // las acciones se ven al instante
  });
  var idCuadro = null;
  function bucle(ahora) {
    idCuadro = null;
    if (document.hidden) return; // sin agendar el siguiente: se reanuda en visibilitychange
    idCuadro = requestAnimationFrame(bucle);
    var dt = Math.min(0.1, (ahora - previo) / 1000);
    previo = ahora;
    var pasos = Math.max(1, Math.round(dt / (1 / 60)));
    for (var i = 0; i < pasos; i++) S.paso(dt / pasos);
    var e = S.get();
    dibujarEscena(e);
    acDom += dt;
    if (acDom > (reducido ? 0.15 : 0.08)) {
      acDom = 0;
      renderPanel(e);
    }
    if (e.alarma.activa && !e.alarma.silenciada && !e.ruta.sub) pitido(ahora);
  }
  if (window.ResizeObserver) new ResizeObserver(function () { dibujarEscena(S.get()); renderPanel(S.get()); }).observe($('rl-sim'));
  renderPanel(S.get());
  dibujarEscena(S.get());
  idCuadro = requestAnimationFrame(bucle);
  // pestaña oculta: se detiene el ciclo (y la alarma sonora); al volver se reanuda sin salto de tiempo
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      if (idCuadro != null) cancelAnimationFrame(idCuadro);
      idCuadro = null;
      if (audio && audio.state === 'running') audio.suspend();
    } else if (idCuadro == null) {
      previo = performance.now();
      if (audio && audio.state === 'suspended') audio.resume();
      idCuadro = requestAnimationFrame(bucle);
    }
  });
  window.RUTA_LINEAL = {estado: S, dibujarEscena: dibujarEscena};
})();
