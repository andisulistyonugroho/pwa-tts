// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  devServer: {
    port: 8080
  },
  ssr: false,
  modules: ['vuetify-nuxt-module',
    '@vite-pwa/nuxt'
  ],
  pwa: {
    manifest: {
      name: 'SIROHIFY',
      short_name: 'Sirohify',
      description: 'sirohify',
      background_color: '#000000',
      theme_color: '#000000',
    },
    workbox: {
      navigateFallback: '/',
    },
    devOptions: {
      suppressWarnings: true,
      enabled: true,
      type: 'module'
    }
  },
  vuetify: {
    moduleOptions: {
      /* module specific options */
    },
    vuetifyOptions: {
      /* vuetify options */
    }
  }
})