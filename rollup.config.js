import path from 'path';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import copy from 'rollup-plugin-copy';
import css from 'rollup-plugin-css-only';
import { terser } from "rollup-plugin-terser";

import process from 'process';
import dotenv from 'dotenv'

dotenv.config();

export default {
  input: 'src/index.js',
  output: {
    file: './dist/build.js',
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
    css({
      output: 'bundle.css' 
    }),
    copy({
      targets: [
        {
          src: path.resolve(__dirname, 'node_modules/@shoelace-style/shoelace/dist/assets'),
          dest: path.resolve(__dirname, './dist')
        },
        {
          src: path.resolve(__dirname, './index.html'),
          dest: path.resolve(__dirname, './dist')
        },
        {
          src: path.resolve(__dirname, './src/style.css'),
          dest: path.resolve(__dirname, './dist')
        }
      ]
    }),
    terser()
  ],
  preserveEntrySignatures: false,
};