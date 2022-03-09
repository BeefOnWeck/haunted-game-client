import path from 'path';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import copy from 'rollup-plugin-copy';
import css from 'rollup-plugin-css-only';
// import analyze from 'rollup-plugin-analyzer';
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
    // Bundle styles into bundle.css
    css({
      output: 'bundle.css' 
    }),
    // Copy Shoelace assets to shoelace
    copy({
      targets: [
        {
          src: path.resolve(__dirname, 'node_modules/@shoelace-style/shoelace/dist/assets'),
          dest: path.resolve(__dirname, 'shoelace')
        }
      ]
    }),
    // terser(),
    // analyze(),
    // babel({
    //   include: ['**.js', 'node_modules/**'],
    //   // babelHelpers: 'bundled',
    //   presets: ['@babel/preset-env'],
    //   plugins: ["@babel/plugin-transform-runtime"]
    // }),
    // copy({
    //   targets: [
    //     {
    //       src: path.resolve(__dirname, 'node_modules/@shoelace-style/shoelace/dist/assets'),
    //       dest: path.resolve(__dirname, 'dist/shoelace')
    //     }
    //   ]
    // }),
  ]
};