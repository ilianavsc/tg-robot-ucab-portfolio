// Construye ../inspector3d.js: el robot 3D del Inspector unificado (three.js incluido), en un solo archivo IIFE.
//
//   cd prototipos/P02-sensores/codigo
//   npm install --no-save three@0.187.0 esbuild      # una sola vez (o apunta NODE_PATH a una carpeta con ambos)
//   node construir_inspector.mjs
//
// El robot 3D lee y escribe en window.SimulationState (assets/inspector_hw.js).
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
  entryPoints: [join(aqui, 'inspector3d.js')],
  bundle: true,
  minify: true,
  format: 'iife',
  target: 'es2020',
  write: false,
  legalComments: 'none',
  nodePaths: process.env.NODE_PATH ? process.env.NODE_PATH.split(':') : [],
  absWorkingDir: aqui,
});
const cab = '/* P02 · Robot 3D del Inspector de hardware unificado (SIL, datos sintéticos). Generado por codigo/construir_inspector.mjs; three.js MIT. */\n';
const salida = join(aqui, '..', 'inspector3d.js');
writeFileSync(salida, cab + r.outputFiles[0].text);
console.log(`inspector3d.js: ${(r.outputFiles[0].text.length / 1024).toFixed(0)} KB`);
