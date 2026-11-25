// Construye ../simulador.html: un solo archivo con el JavaScript (three.js incluido), los estilos y las fuentes.
//
//   cd prototipos/P01-mqtt-base/simulador-3d/codigo
//   npm install --no-save three@0.187.0 esbuild      # una sola vez (o apunta NODE_PATH a una carpeta con ambos)
//   node construir.mjs
//
// Solo hace falta para regenerar simulador.html; el simulador ya publicado funciona sin Node.
import {readFileSync, writeFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createRequire} from 'node:module';

const aqui = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
let esbuild;
try {
  esbuild = require(process.env.NODE_PATH ? join(process.env.NODE_PATH.split(':')[0], 'esbuild') : 'esbuild');
} catch {
  console.error('Falta esbuild y three: ejecuta "npm install --no-save three@0.187.0 esbuild" en esta carpeta.');
  process.exit(1);
}

const r = await esbuild.build({
  entryPoints: [join(aqui, 'main.js')],
  bundle: true,
  minify: true,
  format: 'esm',
  target: 'es2020',
  write: false,
  legalComments: 'none',
  nodePaths: process.env.NODE_PATH ? process.env.NODE_PATH.split(':') : [],
  absWorkingDir: aqui,
});
const js = r.outputFiles[0].text.replace(/<\/script/gi, '<\\/script');
const css = readFileSync(join(aqui, 'fuentes.css'), 'utf8') + readFileSync(join(aqui, 'style.css'), 'utf8');
const html = readFileSync(join(aqui, 'plantilla.html'), 'utf8').replace('/*CSS*/', () => css).replace('/*JS*/', () => js);
const salida = join(aqui, '..', 'simulador.html');
writeFileSync(salida, html);
console.log(`simulador.html: ${(html.length / 1024).toFixed(0)} KB`);

// ---- Versión integrada en ../index.html (sin iframe): bundle IIFE + CSS acotado a #p01-sim
// Cada selector se antepone con #p01-sim; :root, html y body pasan a ser el contenedor; la regla de iframe sobra.
function acotar(css, raizSel = '#p01-sim') {
  let out = '';
  let i = 0;
  while (i < css.length) {
    const abre = css.indexOf('{', i);
    if (abre < 0) { out += css.slice(i); break; }
    const cab = css.slice(i, abre).trim();
    // fin del bloque (con llaves anidadas)
    let prof = 1, j = abre + 1;
    while (j < css.length && prof) { if (css[j] === '{') prof++; else if (css[j] === '}') prof--; j++; }
    const cuerpo = css.slice(abre + 1, j - 1);
    if (/^@(media|supports)/.test(cab)) out += `${cab}{${acotar(cuerpo, raizSel)}}`;
    else if (/^@/.test(cab)) out += `${cab}{${cuerpo}}`; // @keyframes, @font-face: tal cual
    else {
      const sels = cab.replace(/\/\*[\s\S]*?\*\//g, '').split(',').map((x) => x.trim()).filter(Boolean)
        .filter((x) => !/^\.embebido\b/.test(x) && x !== 'html') // sin iframe no hay .embebido; la raíz de la página es del portafolio
        .map((x) => (x === ':root' || x === 'body' || x === 'html,body' ? raizSel : x.replace(/^(html|body)\s+/, '').replace(/^/, raizSel + ' ')));
      if (sels.length) out += `${[...new Set(sels)].join(',')}{${cuerpo}}`;
    }
    i = j;
  }
  return out;
}
const r2 = await esbuild.build({
  entryPoints: [join(aqui, 'main.js')], bundle: true, minify: true, format: 'iife', target: 'es2020', write: false,
  legalComments: 'none', nodePaths: process.env.NODE_PATH ? process.env.NODE_PATH.split(':') : [], absWorkingDir: aqui,
});
writeFileSync(join(aqui, '..', 'simulador3d.js'), '/* P01 · simulador 3D de mensajes MQTT (SIL), integrado sin iframe. Generado por codigo/construir.mjs; three.js MIT. */\n' + r2.outputFiles[0].text);
writeFileSync(join(aqui, '..', 'simulador3d.css'), '/* Generado por codigo/construir.mjs desde codigo/style.css, acotado a #p01-sim */\n' + acotar(readFileSync(join(aqui, 'style.css'), 'utf8'))
  // en la página del portafolio el texto usa la fuente de los tokens (Inter); simulador.html conserva sus fuentes incrustadas
  .replace(/'Atkinson Hyperlegible',\s*(system-ui,\s*)?sans-serif/g, 'var(--tg-font-sans)'));
console.log(`simulador3d.js: ${(r2.outputFiles[0].text.length / 1024).toFixed(0)} KB · simulador3d.css listo`);
