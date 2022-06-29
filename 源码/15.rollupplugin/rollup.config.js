//import build from './plugins/rollup-plugin-build.js';
//import polyfill from './plugins/rollup-plugin-inject-polyfill.js';
//import babel from './plugins/rollup-plugin-babel.js';
//import generation from './plugins/rollup-plugin-generation.js';
//import importPolyFill from './plugins/rollup-plugin-import-polyfill.js';
//import commonjs from '@rollup/plugin-commonjs';
//import commonjs from './plugins/rollup-plugin-commonjs';
//import resolve from '@rollup/plugin-node-resolve';
import resolve from './plugins/rollup-plugin-node-resolve.js';
//import alias from '@rollup/plugin-alias';
import alias from './plugins/rollup-plugin-alias.js';

export default {
  input: './src/index.js',
  //watch: true,
  output: {
    //file: 'dist/main.js',
    dir: 'dist'
  },
  /* //vite的写法
  resolve: {
    alias: {
      './xx.js': './yy.js'
    }
  }, */
  plugins: [
    resolve(),
    alias({
      entries: [
        { find: './xx.js', replacement: 'check-is-array' }
      ]
    }),

    //commonjs()
    //generation(),
    //importPolyFill(),
    //build(),
    /* babel({
      include: './src',
      //exclude: /node_modules/,
      extensions: [".js", ".jsx"]
    }), */
    //polyfill()
  ],
  watch: {
    clearScreen: false
  }
}