// Construye ../gemelo3d.js: el gemelo digital 3D de la ruta lineal (three.js incluido) en un solo archivo IIFE.
// El robot es el mismo modelo 3D oficial de P02/P04: se importa de prototipos/P04-simulador-1-esp32/codigo/robot.js
// (no se copia ni se modifica).
//
//   cd prototipos/P06-ruta-lineal/codigo
//   npm install --no-save three@0.187.0 esbuild      # una sola vez (o apunta NODE_PATH a una carpeta con ambos)
//   node construir.mjs
import {writeFileSync} from 'node:fs';
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
  entryPoints: [join(aqui, 'gemelo3d.js')],
  bundle: true,
  minify: true,
  format: 'iife',
  target: 'es2020',
  write: false,
  legalComments: 'none',
  nodePaths: process.env.NODE_PATH ? process.env.NODE_PATH.split(':') : [],
  absWorkingDir: aqui,
});
const cab = '/* P06 · Gemelo digital 3D de la ruta lineal (SIL, datos sintéticos). Robot 3D oficial de P02/P04. Generado por codigo/construir.mjs; three.js MIT. */\n';
writeFileSync(join(aqui, '..', 'gemelo3d.js'), cab + r.outputFiles[0].text);
console.log(`gemelo3d.js: ${(r.outputFiles[0].text.length / 1024).toFixed(0)} KB`);
