export default defineNuxtConfig({
  css: [
    'bootstrap/dist/css/bootstrap.min.css'
  ],

  vite: {
    define: {
      'process.env.DEBUG': false,
    },
  },

  build: {
    transpile: ['bootstrap'],
  },

  compatibilityDate: '2024-09-22',
})