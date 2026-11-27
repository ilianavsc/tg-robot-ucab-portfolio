# Generador del Capítulo III

- `capitulo_3_fuente.md`: texto fuente del capítulo; las citas se escriben como `[@clave]` y se numeran en IEEE por orden de aparición.
- `generar_capitulo_3.py`: genera `tesis/capitulo_3.md` y el `.docx` usando como plantilla el Word del Capítulo I (formato del tomo UCAB).
- `paginas_indice.py`: lee el PDF exportado y calcula los números de página del índice general y del índice de tablas.

```bash
soffice --headless --convert-to docx --outdir /tmp "tesis/entregas/capitulo-1/Capitulo I TG - Semprun y Ferrer.doc"
```

```bash
echo '{}' > /tmp/paginas.json; for i in 1 2 3; do python3 -I scripts/tesis/generar_capitulo_3.py "/tmp/Capitulo I TG - Semprun y Ferrer.docx" scripts/tesis/capitulo_3_fuente.md "tesis/entregas/capitulo-3/Capitulo III TG FERRER, SEMPRUN.docx" tesis/capitulo_3.md /tmp/paginas.json && soffice --headless --convert-to pdf --outdir tesis/entregas/capitulo-3 "tesis/entregas/capitulo-3/Capitulo III TG FERRER, SEMPRUN.docx" && python3 -I scripts/tesis/paginas_indice.py "tesis/entregas/capitulo-3/Capitulo III TG FERRER, SEMPRUN.pdf" scripts/tesis/capitulo_3_fuente.md && cp paginas.json /tmp/paginas.json; done
```

En Word, el índice general y el índice de tablas son campos actualizables (clic derecho → Actualizar campos).

Para la entrega en Word 97-2003 (`.doc`), con el índice enlazado a cada título y tabla:

```bash
soffice --headless --convert-to 'doc:MS Word 97' --outdir tesis/entregas/capitulo-3 "tesis/entregas/capitulo-3/Capitulo III TG FERRER, SEMPRUN.docx"
```
