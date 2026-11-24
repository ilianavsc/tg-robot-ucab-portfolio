// Construye el Inspector de hardware de P02 a partir de estas fuentes:
//   ../inspector3d.js   simulador 3D del circuito (main.js + three.js) en un solo archivo IIFE
//   ../inspector3d.css  estilos del 3D (style.css)
//   ../index.html       inserta app.html (circuito 3D + panel de consolas) entre <!--APP:inicio--> y <!--APP:fin-->
//   ../simulador.html   versión de pantalla completa, autocontenida (fuentes, estilos, estado central y 3D)
//
//   cd prototipos/P02-sensores/codigo
//   npm install --no-save three@0.187.0 esbuild      # una sola vez (o apunta NODE_PATH a una carpeta con ambos)
//   node construir.mjs
//
// Solo hace falta para regenerar; lo publicado funciona sin Node.
import {readFileSync, writeFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createRequire} from 'node:module';

const aqui = dirname(fileURLToPath(import.meta.url));
const raiz = join(aqui, '..', '..', '..');
const require = createRequire(import.meta.url);
let esbuild;
try {
  esbuild = require(process.env.NODE_PATH ? join(process.env.NODE_PATH.split(':')[0], 'esbuild') : 'esbuild');
} catch {
  console.error('Falta esbuild y three: ejecuta "npm install --no-save three@0.187.0 esbuild" en esta carpeta.');
  process.exit(1);
}
const leer = (p) => readFileSync(p, 'utf8');

const r = await esbuild.build({
  entryPoints: [join(aqui, 'main.js')],
  bundle: true,
  minify: true,
  format: 'iife',
  target: 'es2020',
  write: false,
  legalComments: 'none',
  nodePaths: process.env.NODE_PATH ? process.env.NODE_PATH.split(':') : [],
  absWorkingDir: aqui,
});
const js = r.outputFiles[0].text;
const cab = '/* P02 · Inspector de hardware: simulador 3D del circuito (SIL, datos sintéticos). Generado por codigo/construir.mjs; three.js MIT. */\n';
writeFileSync(join(aqui, '..', 'inspector3d.js'), cab + js);
const css3d = leer(join(aqui, 'style.css'));
writeFileSync(join(aqui, '..', 'inspector3d.css'), '/* Generado por codigo/construir.mjs desde codigo/style.css */\n' + css3d);

// la misma interfaz (app.html) en la página del portafolio…
const app = leer(join(aqui, 'app.html')).trimEnd();
const indexRuta = join(aqui, '..', 'index.html');
const index = leer(indexRuta);
const ini = '<!--APP:inicio-->';
const fin = '<!--APP:fin-->';
if (!index.includes(ini) || !index.includes(fin)) throw new Error('index.html no tiene los marcadores <!--APP:inicio--> y <!--APP:fin-->');
writeFileSync(indexRuta, index.slice(0, index.indexOf(ini) + ini.length) + '\n' + app + '\n' + index.slice(index.indexOf(fin)));

// …y en simulador.html, autocontenido
const sinCierre = (t) => t.replace(/<\/script/gi, '<\\/script');
const css = leer(join(aqui, 'fuentes.css')) + css3d + leer(join(raiz, 'assets', 'css', 'inspector_hw.css'));
const html = leer(join(aqui, 'plantilla.html'))
  .replace('/*CSS*/', () => css)
  .replace('<!--APP-->', () => app)
  .replace('/*ESTADO*/', () => sinCierre(leer(join(raiz, 'assets', 'inspector_hw.js'))))
  .replace('/*JS*/', () => sinCierre(js));
writeFileSync(join(aqui, '..', 'simulador.html'), html);
console.log(`inspector3d.js: ${(js.length / 1024).toFixed(0)} KB · simulador.html: ${(html.length / 1024).toFixed(0)} KB`);
