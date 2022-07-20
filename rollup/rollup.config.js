import json from 'rollup-plugin-json';
import { terser } from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import babel, { getBabelOutputPlugin } from '@rollup/plugin-babel';
import copy from 'rollup-plugin-copy';
import typescript from 'rollup-plugin-typescript2';
export default {
  input: 'src/main.ts',
  output: [
    {
      file: 'dist/fine-touch.js',
      name: 'FineTouch',
      format: 'esm',
    },
    {
      file: 'dist/fine-touch.min.js',
      name: 'FineTouch',
      format: 'umd',
      plugins: [terser()],
    },
  ],
  external: [],
  plugins: [
    json(),
    resolve(),
    babel({
      babelHelpers: 'bundled',
    }),
    typescript(),
    copy({
      targets: [
        { src: 'index.html', dest: 'dist' },
        { src: 'static', dest: 'dist' },
      ],
    }),
  ],
};
