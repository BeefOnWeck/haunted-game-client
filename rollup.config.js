import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
// import { terser } from "rollup-plugin-terser";

import process from 'process';
import dotenv from 'dotenv'

dotenv.config();

export default {
  input: 'src/index.js',
  output: {
    file: './build.js',
    format: 'es'
  },
  plugins: [
    replace({
      'process.env.APP_SERVER_ORIGIN': JSON.stringify(process.env.APP_SERVER_ORIGIN),
      preventAssignment: true
    }),
    nodeResolve({
      browser: true,
    }),
    commonjs(),
    babel({
      include: ['**.js', 'node_modules/**'],
      babelHelpers: 'bundled',
      presets: ['@babel/preset-env'],
    }),
    // terser()
  ]
};