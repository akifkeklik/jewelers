declare module '*.vue' {
    import Vue from 'vue'
    export default Vue
}

declare module '*.js';              // Tüm js dosyalarını tanı
declare module './router/index.js'; // Router için özel tanım
