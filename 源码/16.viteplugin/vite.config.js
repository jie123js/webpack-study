import { defineConfig } from 'vite';
//import vue from '@vitejs/plugin-vue';
//import vue from './plugins/plugin-vue';
//import jsx from '@vitejs/plugin-vue-jsx';
import jsx from './plugins/plugin-vue-jsx.js';
export default defineConfig({
  plugins: [jsx({})]
});