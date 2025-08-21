/* Vue dosyaları için */
declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

/* JS dosyaları için */
declare module '*.js';

/* Router özel tanımı (index.js) */
declare module './router/index.js';
