export default defineNuxtConfig({
  compatibilityDate: '2025-01-10',
  devtools: { enabled: true },
  modules: ['@nuxt/icon', '@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  nitro: {
    preset: 'cloudflare-module',
  },
  vite: {
    optimizeDeps: {
      include: ['maplibre-gl'],
    },
  },
});
