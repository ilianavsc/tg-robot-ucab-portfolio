"""Genera tesis/capitulo_3.md y el .docx del Capítulo III a partir de cap3_src.md,
usando como plantilla el Word del Capítulo I (formato del tomo UCAB: Times New Roman 12,
interlineado 1,5, carta, márgenes de 2,5 cm, títulos de capítulo a 16 pt y subtítulos a 14 pt,
encabezado con línea inferior y pie con número de página y línea superior).
Uso: python3 -I build2.py <plantilla_cap1.docx> <src.md> <out.docx> <out.md> [paginas.json]
"""
import sys, re, json, copy
import docx
from lxml import etree

PLANTILLA, SRC, OUT_DOCX, OUT_MD = sys.argv[1:5]
PAGES = json.load(open(sys.argv[5])) if len(sys.argv) > 5 else {}

REFS = {
 "upel": "Universidad Pedagógica Experimental Libertador, *Manual de trabajos de grado de especialización y maestría y tesis doctorales*, 5.ª ed. Caracas, Venezuela: FEDUPEL, 2016.",
 "valerino": "E. Valerino, G. Yáber y M. Cemborain, *Metodología de la investigación paso a paso*. México: Trillas, 2010.",
 "sampieri": "R. Hernández Sampieri, C. Fernández Collado y P. Baptista Lucio, *Metodología de la investigación*, 5.ª ed. México D. F., México: McGraw-Hill, 2010.",
 "hurtado": "J. Hurtado de Barrera, *Metodología de la investigación: guía para una comprensión holística de la ciencia*, 4.ª ed. Caracas, Venezuela: Quirón Ediciones, 2010.",
 "arias": "F. G. Arias, *El proyecto de investigación: introducción a la metodología científica*, 6.ª ed. Caracas, Venezuela: Episteme, 2012.",
 "ramirez": "R. Ramirez, C.-Y. Huang, C.-A. Liao, P.-T. Lin, H.-W. Lin y S.-H. Liang, “A practice of BLE RSSI measurement for indoor positioning,” *Sensors*, vol. 21, n.º 15, art. 5181, 2021, doi: 10.3390/s21155181.",
 "esp32": "Espressif Systems, *ESP32 Series Datasheet*. Accedido: 9 nov. 2026. [En línea]. Disponible: https://www.espressif.com/sites/default/files/documentation/esp32_datasheet_en.pdf",
 "mqtt5": "A. Banks, E. Briggs, K. Borgendale y R. Gupta, Eds., *MQTT Version 5.0*, OASIS Standard, 7 mar. 2019. [En línea]. Disponible: https://docs.oasis-open.org/mqtt/mqtt/v5.0/os/mqtt-v5.0-os.html",
 "astrom": "K. J. Åström y R. M. Murray, *Feedback Systems: An Introduction for Scientists and Engineers*. Princeton, NJ, EE. UU.: Princeton University Press, 2008.",
 "mpu6050": "TDK InvenSense, *MPU-6000 and MPU-6050 Product Specification*, Rev. 3.4, 2013. Accedido: 9 nov. 2026. [En línea]. Disponible: https://invensense.tdk.com/products/motion-tracking/6-axis/mpu-6050/",
 "usinskis": "V. Ušinskis, M. Nowicki, A. Dzedzickis y V. Bučinskas, “Sensor-fusion based navigation for autonomous mobile robot,” *Sensors*, vol. 25, n.º 4, art. 1248, 2025, doi: 10.3390/s25041248.",
 "borenstein": "J. Borenstein y L. Feng, “Measurement and correction of systematic odometry errors in mobile robots,” *IEEE Trans. Robot. Autom.*, vol. 12, n.º 6, pp. 869-880, dic. 1996, doi: 10.1109/70.544770.",
 "fawcett": "T. Fawcett, “An introduction to ROC analysis,” *Pattern Recognit. Lett.*, vol. 27, n.º 8, pp. 861-874, 2006, doi: 10.1016/j.patrec.2005.10.010.",
 "lee": "S. Lee, H. Kim, D.-K. Hong y H. Ju, “Correlation analysis of MQTT loss and delay according to QoS level,” en *Proc. Int. Conf. Inf. Netw. (ICOIN)*, 2013, pp. 714-717, doi: 10.1109/ICOIN.2013.6496715.",
 "siegwart": "R. Siegwart, I. R. Nourbakhsh y D. Scaramuzza, *Introduction to Autonomous Mobile Robots*, 2.ª ed. Cambridge, MA, EE. UU.: MIT Press, 2011.",
 "gum": "Joint Committee for Guides in Metrology, *Evaluation of Measurement Data: Guide to the Expression of Uncertainty in Measurement*, JCGM 100:2008, Sèvres, Francia: BIPM, 2008.",
 "clopper": "C. J. Clopper y E. S. Pearson, “The use of confidence or fiducial limits illustrated in the case of the binomial,” *Biometrika*, vol. 26, n.º 4, pp. 404-413, dic. 1934, doi: 10.2307/2331986.",
}

src = open(SRC, encoding="utf-8").read()
orden = []
def num(m):
    k = m.group(1)
    if k not in REFS: raise SystemExit("cita sin referencia: " + k)
    if k not in orden: orden.append(k)
    return "[%d]" % (orden.index(k) + 1)
cuerpo = re.sub(r"\[@(\w+)\]", num, src)
if set(REFS) - set(orden): raise SystemExit("referencias sin citar: %s" % (set(REFS) - set(orden)))
biblio = [(i + 1, REFS[k]) for i, k in enumerate(orden)]

# ---------------- Markdown (versión web, sincronizada con el Word) ----------------
cabecera_md = """> Versión web del documento «Capítulo III. Marco metodológico» (formato del tomo UCAB · citas IEEE), sincronizada con el Word oficial `entregas/capitulo-3/Capitulo III TG FERRER, SEMPRUN.docx`. Los índices con número de página se omitieron.

![Figura](media/capitulo_2/image1.png)

UNIVERSIDAD CATÓLICA ANDRÉS BELLO

Facultad de Ingeniería

Escuela de Ingeniería en Telecomunicaciones

Trabajo de Grado:

*“Robot móvil para búsqueda y transporte de componentes en el laboratorio de la UCAB con aplicación de solicitudes y alertas”*

Norma de citación y referenciación: IEEE

REALIZADO POR:

Semprun Cascitelli, Iliana Vanessa

Ferrer Pinto, Andrea Valentina

TUTOR:

Ing. Cante Mata, Biagio Domenico

Caracas, noviembre de 2026

"""
md = cabecera_md + cuerpo.rstrip() + "\n\n# Bibliografía\n\n" + "\n\n".join("[%d] %s" % (n, t) for n, t in biblio) + "\n"
open(OUT_MD, "w", encoding="utf-8").write(md)

# ---------------- Bloques ----------------
def bloques(texto):
    lineas = texto.split("\n"); i = 0; out = []
    while i < len(lineas):
        l = lineas[i]
        if not l.strip(): i += 1; continue
        m = re.match(r"^(#{1,4}) (.*)$", l)
        if m: out.append(("h%d" % len(m.group(1)), m.group(2))); i += 1; continue
        if l.startswith("|"):
            filas = []
            while i < len(lineas) and lineas[i].startswith("|"):
                celdas = [c.strip() for c in lineas[i].strip().strip("|").split("|")]
                if not all(re.fullmatch(r"-{3,}", c) for c in celdas): filas.append(celdas)
                i += 1
            out.append(("tabla", filas)); continue
        m = re.match(r"^- (.*)$", l)
        if m: out.append(("viñeta", m.group(1))); i += 1; continue
        m = re.match(r"^(\d+)\. (.*)$", l)
        if m: out.append(("num", (m.group(1), m.group(2)))); i += 1; continue
        m = re.match(r"^\*\*Tabla (\d+)\.\*\* (.*)$", l)
        if m: out.append(("leyenda", (m.group(1), m.group(2)))); i += 1; continue
        m = re.match(r"^\*(Fuente: .*)\*$", l)
        if m: out.append(("fuente", m.group(1))); i += 1; continue
        out.append(("p", l)); i += 1
    return out
B = bloques(cuerpo)

# ---------------- Word ----------------
W = "http://schemas.openxmlformats.org/wordprocessingml/2006/main"
WQ = "{%s}" % W
NS = 'xmlns:w="%s"' % W
def q(t): return t.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
def runs(texto, base=""):
    out = []
    for parte in re.split(r"(\*\*[^*]+\*\*|\*[^*]+\*)", texto):
        if not parte: continue
        rpr = base
        if parte.startswith("**"): parte = parte[2:-2]; rpr += "<w:b/><w:bCs/>"
        elif parte.startswith("*"): parte = parte[1:-1]; rpr += "<w:i/><w:iCs/>"
        out.append('<w:r><w:rPr>%s</w:rPr><w:t xml:space="preserve">%s</w:t></w:r>' % (rpr, q(parte)))
    return "".join(out)
def P(ppr, contenido):
    return etree.fromstring('<w:p %s><w:pPr>%s</w:pPr>%s</w:p>' % (NS, ppr, contenido))
def campo(instr, resultado_xml):
    return ('<w:r><w:fldChar w:fldCharType="begin"/></w:r><w:r><w:instrText xml:space="preserve"> %s </w:instrText></w:r>'
            '<w:r><w:fldChar w:fldCharType="separate"/></w:r>%s<w:r><w:fldChar w:fldCharType="end"/></w:r>') % (instr, resultado_xml)

# Formatos tomados del Word del Capítulo I
PPR = {
 "h1": '<w:pStyle w:val="Heading1"/>%s<w:tabs><w:tab w:val="clear" w:pos="720"/><w:tab w:val="right" w:pos="9026" w:leader="dot"/></w:tabs><w:spacing w:lineRule="auto" w:line="360" w:before="0" w:after="360"/><w:ind w:hanging="0" w:start="0" w:end="567"/><w:jc w:val="center"/>',
 "h2": '<w:pStyle w:val="Heading2"/><w:keepNext w:val="true"/><w:spacing w:lineRule="auto" w:line="300" w:before="240" w:after="240"/><w:ind w:hanging="0" w:start="0"/>',
 "h3": '<w:pStyle w:val="Heading3"/><w:keepNext w:val="true"/><w:spacing w:lineRule="auto" w:line="300" w:before="120" w:after="240"/><w:ind w:hanging="0" w:start="0"/>',
 "p": '<w:pStyle w:val="Normal"/><w:spacing w:lineRule="auto" w:line="360" w:before="0" w:after="240"/><w:ind w:firstLine="709" w:end="0"/><w:jc w:val="both"/>',
 "viñeta": '<w:pStyle w:val="ListParagraph"/><w:numPr><w:ilvl w:val="0"/><w:numId w:val="4"/></w:numPr><w:spacing w:lineRule="auto" w:line="360" w:before="0" w:after="80"/><w:jc w:val="both"/>',
 "num": '<w:pStyle w:val="ListParagraph"/><w:tabs><w:tab w:val="left" w:pos="709"/></w:tabs><w:spacing w:lineRule="auto" w:line="360" w:before="0" w:after="80"/><w:ind w:start="709" w:hanging="425"/><w:jc w:val="both"/>',
 "leyenda": '<w:pStyle w:val="Normal"/><w:keepNext w:val="true"/><w:spacing w:before="80" w:after="0"/><w:jc w:val="center"/>',
 "fuente": '<w:pStyle w:val="Normal"/><w:spacing w:before="40" w:after="240"/><w:jc w:val="center"/>',
 "ref": '<w:pStyle w:val="Normal"/><w:tabs><w:tab w:val="clear" w:pos="720"/><w:tab w:val="left" w:pos="567" w:leader="none"/></w:tabs><w:spacing w:lineRule="auto" w:line="276" w:before="0" w:after="160"/><w:ind w:hanging="567" w:start="567" w:end="0"/>',
}
ANCHOS = {
 1: ([2000, 2400, 4626], 22), 2: ([3600, 5426], 22),
 3: ([700, 3313, 3313, 1700], 20), 4: ([2000, 1000, 1000, 2713, 2313], 20),
 5: ([1900, 2300, 3726, 1100], 22), 6: ([1400, 1650, 1600, 2476, 1900], 20),
 7: ([2400, 3626, 3000], 22), 8: ([700, 3426, 1100, 2300, 1500], 22),
}
BORDE = ''.join('<w:%s w:val="single" w:sz="4" w:space="0" w:color="000000"/>' % b for b in ("top", "start", "bottom", "end"))
def celda(texto, ancho, sz, encabezado, mantener):
    shd = '<w:shd w:fill="F2F2F2" w:val="clear"/>' if encabezado else ''
    base = '<w:sz w:val="%d"/><w:szCs w:val="%d"/>' % (sz, sz) + ('<w:b/><w:bCs/>' if encabezado else '')
    return ('<w:tc><w:tcPr><w:tcW w:w="%d" w:type="dxa"/><w:tcBorders>%s</w:tcBorders>%s<w:vAlign w:val="center"/></w:tcPr>'
            '<w:p><w:pPr><w:pStyle w:val="Normal"/>%s<w:spacing w:before="0" w:after="0" w:line="240" w:lineRule="auto"/>%s</w:pPr>%s</w:p></w:tc>'
            % (ancho, BORDE, shd, '<w:keepNext w:val="true"/>' if (encabezado or mantener) else '',
               '<w:jc w:val="center"/>' if encabezado else '', runs(texto, base)))
def tabla(filas, n):
    anchos, sz = ANCHOS[n]
    assert all(len(f) == len(anchos) for f in filas), ("columnas", n)
    xml = ('<w:tbl %s><w:tblPr><w:tblW w:w="9026" w:type="dxa"/><w:jc w:val="center"/><w:tblInd w:w="0" w:type="dxa"/>'
           '<w:tblLayout w:type="fixed"/><w:tblCellMar><w:top w:w="60" w:type="dxa"/><w:start w:w="100" w:type="dxa"/>'
           '<w:bottom w:w="60" w:type="dxa"/><w:end w:w="100" w:type="dxa"/></w:tblCellMar></w:tblPr><w:tblGrid>%s</w:tblGrid>'
           % (NS, "".join('<w:gridCol w:w="%d"/>' % a for a in anchos)))
    for j, f in enumerate(filas):
        trpr = '<w:trPr><w:cantSplit/>%s</w:trPr>' % ('<w:tblHeader/>' if j == 0 else '')
        xml += '<w:tr>%s%s</w:tr>' % (trpr, "".join(celda(c, a, sz, j == 0, j == len(filas) - 1) for c, a in zip(f, anchos)))
    return etree.fromstring(xml + '</w:tbl>')

doc = docx.Document(PLANTILLA)
body = doc.element.body
hijos = list(body)
# Plantilla del Cap. I: 0-13 portada (fin de sección en 13), 14 «Índice general», 15 TOC,
# 16-18 índice de figuras, 19 «Índice de tablas», 20 entradas, 21 fin de sección, 22+ cuerpo.
def texto(el): return "".join(el.itertext())
assert "Índice general" in texto(hijos[14]) and "Índice de tablas" in texto(hijos[19])
assert hijos[13].find(".//" + WQ + "sectPr") is not None and hijos[21].find(".//" + WQ + "sectPr") is not None
for el in hijos[22:]:
    if el.tag != WQ + "sectPr": body.remove(el)
for el in hijos[16:19] + [hijos[20]]: body.remove(el)

def cambiar_texto(el, viejo, nuevo):
    ts = el.findall(".//" + WQ + "t"); completo = "".join(t.text or "" for t in ts)
    assert viejo in completo, (viejo, completo)
    ts[0].text = completo.replace(viejo, nuevo)
    for t in ts[1:]: t.text = ""
cambiar_texto(hijos[3], "Capítulo I. Planteamiento del proyecto", "Capítulo III. Marco metodológico")
cambiar_texto(hijos[13], "octubre de 2026", "noviembre de 2026")

# Índice general: campo TOC con su resultado en caché (actualizable en Word con F9)
sdt = hijos[15]; cont = sdt.find(WQ + "sdtContent")
for p in list(cont): cont.remove(p)
titulos = [(b[0], b[1]) for b in B if b[0] in ("h1", "h2", "h3")] + [("h1", "Bibliografía")]
for k, (nivel, t) in enumerate(titulos):
    sangria = {"h1": "", "h2": ' w:start="360"', "h3": ' w:start="720"'}[nivel]
    ppr_xml = ('<w:pStyle w:val="Normal"/><w:tabs><w:tab w:val="clear" w:pos="720"/><w:tab w:val="right" w:pos="9026" w:leader="dot"/></w:tabs>'
               '<w:spacing w:lineRule="auto" w:line="300" w:before="0" w:after="80"/><w:ind%s w:end="567"/>' % sangria)
    ini = ('<w:r><w:fldChar w:fldCharType="begin"/></w:r><w:r><w:instrText xml:space="preserve"> TOC \\o "1-3" \\h \\z \\u </w:instrText></w:r><w:r><w:fldChar w:fldCharType="separate"/></w:r>' if k == 0 else "")
    fin = '<w:r><w:fldChar w:fldCharType="end"/></w:r>' if k == len(titulos) - 1 else ""
    cont.append(P(ppr_xml, ini + '<w:r><w:t xml:space="preserve">%s</w:t><w:tab/><w:t>%s</w:t></w:r>' % (q(t), PAGES.get(t, "0")) + fin))

# Índice de tablas: campo TOC \c "Tabla"
PPR_IT = '<w:pStyle w:val="Normal"/><w:tabs><w:tab w:val="clear" w:pos="720"/><w:tab w:val="right" w:pos="9026" w:leader="dot"/></w:tabs><w:spacing w:lineRule="auto" w:line="300" w:before="0" w:after="80"/><w:ind w:end="567"/>'
leyendas = [b[1] for b in B if b[0] == "leyenda"]
pos = list(body).index(hijos[19]) + 1
for k, (n, titulo) in enumerate(leyendas):
    ini = ('<w:r><w:fldChar w:fldCharType="begin"/></w:r><w:r><w:instrText xml:space="preserve"> TOC \\h \\z \\c "Tabla" </w:instrText></w:r><w:r><w:fldChar w:fldCharType="separate"/></w:r>' if k == 0 else "")
    fin = '<w:r><w:fldChar w:fldCharType="end"/></w:r>' if k == len(leyendas) - 1 else ""
    body.insert(pos, P(PPR_IT, ini + '<w:r><w:t xml:space="preserve">Tabla %s. %s</w:t><w:tab/><w:t>%s</w:t></w:r>' % (n, q(titulo), PAGES.get("Tabla %s." % n, "0")) + fin)); pos += 1

# Cuerpo
sect_final = body[-1]
def agregar(el): sect_final.addprevious(el)
ntabla = 0
for tipo, val in B:
    if tipo == "h1": agregar(P(PPR["h1"] % "", runs(val)))
    elif tipo in ("h2", "h3"): agregar(P(PPR[tipo], runs(val)))
    elif tipo == "p": agregar(P(PPR["p"], runs(val)))
    elif tipo == "viñeta": agregar(P(PPR["viñeta"], runs(val)))
    elif tipo == "num": agregar(P(PPR["num"], '<w:r><w:t>%s.</w:t><w:tab/></w:r>' % val[0] + runs(val[1])))
    elif tipo == "tabla": ntabla += 1; agregar(tabla(val, ntabla))
    elif tipo == "leyenda":
        assert int(val[0]) == ntabla
        b11 = '<w:b/><w:bCs/><w:sz w:val="22"/><w:szCs w:val="22"/>'
        agregar(P(PPR["leyenda"],
            '<w:r><w:rPr>%s</w:rPr><w:t xml:space="preserve">Tabla </w:t></w:r>' % b11 +
            campo("SEQ Tabla \\* ARABIC", '<w:r><w:rPr>%s</w:rPr><w:t>%s</w:t></w:r>' % (b11, val[0])) +
            '<w:r><w:rPr>%s</w:rPr><w:t xml:space="preserve">. </w:t></w:r>' % b11 +
            runs(val[1], '<w:sz w:val="22"/><w:szCs w:val="22"/>')))
    elif tipo == "fuente": agregar(P(PPR["fuente"], runs(val, '<w:i/><w:iCs/><w:sz w:val="20"/><w:szCs w:val="20"/>')))
agregar(P(PPR["h1"] % '<w:pageBreakBefore w:val="true"/>', runs("Bibliografía")))
for n, t in biblio: agregar(P(PPR["ref"], '<w:r><w:t>[%d]</w:t><w:tab/></w:r>' % n + runs(t)))

# Quitar imágenes de la plantilla que ya no se usan
xml_doc = etree.tostring(doc.element, encoding=str)
for rid, rel in list(doc.part.rels.items()):
    if rel.reltype.endswith("/image") and ('"%s"' % rid) not in xml_doc: del doc.part.rels[rid]
doc.save(OUT_DOCX)
# Metadatos del documento, editados directamente en docProps/core.xml (sin duplicar la parte)
import zipfile, shutil, os
tmp = OUT_DOCX + ".tmp"
with zipfile.ZipFile(OUT_DOCX) as zi, zipfile.ZipFile(tmp, "w", zipfile.ZIP_DEFLATED) as zo:
    for it in zi.infolist():
        datos = zi.read(it.filename)
        if it.filename == "docProps/core.xml":
            x = datos.decode("utf-8")
            autoras = "Semprun Cascitelli, Iliana Vanessa; Ferrer Pinto, Andrea Valentina"
            x = re.sub(r"<dc:title>.*?</dc:title>|<dc:title/>", "<dc:title>Capítulo III. Marco metodológico</dc:title>", x)
            x = re.sub(r"<dc:creator>.*?</dc:creator>|<dc:creator/>", "<dc:creator>%s</dc:creator>" % autoras, x)
            x = re.sub(r"<cp:lastModifiedBy>.*?</cp:lastModifiedBy>", "<cp:lastModifiedBy>%s</cp:lastModifiedBy>" % autoras, x)
            datos = x.encode("utf-8")
        zo.writestr(it, datos)
shutil.move(tmp, OUT_DOCX)
print("tablas:", ntabla, "| referencias:", len(biblio), "| títulos en el índice:", len(titulos))
