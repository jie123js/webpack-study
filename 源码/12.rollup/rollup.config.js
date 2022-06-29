//import babel from '@rollup/plugin-babel';
//import babel from './plugins/plugin-babel';
//不支持加载node_modules里的模块
//import resolve from '@rollup/plugin-node-resolve';
//也不支持commonjs
//import commonjs from '@rollup/plugin-commonjs';
//import typescript from '@rollup/plugin-typescript';
//import typescript2 from 'rollup-plugin-typescript2';
//import { terser } from 'rollup-plugin-terser';
//import postcss from 'rollup-plugin-postcss';
//import serve from 'rollup-plugin-serve';
export default {
  input: './src/main.js',
  output: {
    file: 'dist/bundle.es.js',//输出的文件的路径和名称
    //dir: 'dist',
    format: 'es',//amd/es//iife/umd/cjs
    /* name: 'bundleName',
    globals: {//external plugins
      'jquery': 'jQuery',//告诉rollup不要打包jquery,而是读取 window.jQuery
      'lodash': "_"//告诉rollup不要打包lodash,而是读取 window._
    } */
  },
  /*
  plugins: [
    babel({
      babelHelpers: 'bundled',
      exclude: /node_modules/
    }),
    resolve(),
    commonjs(),
    typescript2(),
    //terser(),
    postcss(),
    serve({
      open: true,
      port: 8080,
      contentBase: './dist'
    }) 
  ],
  external: [
    'lodash', 'jquery'
  ]
  */
}
/**
 * 插件有两种
 * rollup-plugin-babel 社区的
 * @rollup/plugin-babel 官方的
 */