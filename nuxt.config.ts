// https://nuxt.com/docs/api/configuration/nuxt-config
const theVersion = '0.03'
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  devServer: {
    // host: '0.0.0.0',
    port: 8080
  },

  ssr: false,
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:3000',
      theVersion: theVersion
    }
  },
  app: {
    head: {
      charset: 'utf-16',
      viewport: 'width=device-width, initial-scale=1',
      title: 'TekatekiSiroh',
      meta: [
        { name: 'description', content: 'TekatekiSiroh' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'mobile-web-app-capable', content: 'yes' }
      ],
      link: [
        { rel: 'icon', href: '/splash_screens/icon.png' },
        { rel: 'apple-touch-startup-image', media: 'screen and (device-width: 440px) and (device-height: 956px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)', href: '/splash_screens/iPhone_16_Pro_Max_landscape.png' },
        { rel: 'apple-touch-startup-image', media: 'screen and (device-width: 402px) and (device-height: 874px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)', href: '/splash_screens/iPhone_16_Pro_landscape.png' },
        { rel: 'apple-touch-startup-image', media: 'screen and (device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)', href: '/splash_screens/iPhone_16_Plus__iPhone_15_Pro_Max__iPhone_15_Plus__iPhone_14_Pro_Max_landscape.png' },
        { rel: 'apple-touch-startup-image', media: 'screen and (device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)', href: '/splash_screens/iPhone_16__iPhone_15_Pro__iPhone_15__iPhone_14_Pro_landscape.png' },
        { rel: 'apple-touch-startup-image', media: 'screen and (device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)', href: '/splash_screens/iPhone_14_Plus__iPhone_13_Pro_Max__iPhone_12_Pro_Max_landscape.png' },
        { rel: 'apple-touch-startup-image', media: 'screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)', href: '/splash_screens/iPhone_14__iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12_landscape.png' },
        { rel: 'apple-touch-startup-image', media: 'screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)', href: '/splash_screens/iPhone_13_mini__iPhone_12_mini__iPhone_11_Pro__iPhone_XS__iPhone_X_landscape.png' },
        { rel: 'apple-touch-startup-image', media: 'screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)', href: '/splash_screens/iPhone_11_Pro_Max__iPhone_XS_Max_landscape.png' },
        { rel: 'apple-touch-startup-image', media: 'screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)', href: '/splash_screens/iPhone_11__iPhone_XR_landscape.png' },
        { rel: 'apple-touch-startup-image', media: 'screen and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)', href: '/splash_screens/iPhone_8_Plus__iPhone_7_Plus__iPhone_6s_Plus__iPhone_6_Plus_landscape.png' },
        { rel: 'apple-touch-startup-image', media: 'screen and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)', href: '/splash_screens/iPhone_8__iPhone_7__iPhone_6s__iPhone_6__4.7__iPhone_SE_landscape.png' },
        { rel: 'apple-touch-startup-image', media: 'screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)', href: '/splash_screens/4__iPhone_SE__iPod_touch_5th_generation_and_later_landscape.png' },
        { rel: 'apple-touch-startup-image', media: 'screen and (device-width: 1032px) and (device-height: 1376px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)', href: '/splash_screens/13__iPad_Pro_M4_landscape.png' },
        { rel: 'apple-touch-startup-image', media: 'screen and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)', href: '/splash_screens/12.9__iPad_Pro_landscape.png' },
        { rel: 'apple-touch-startup-image', media: 'screen and (device-width: 834px) and (device-height: 1210px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)', href: '/splash_screens/11__iPad_Pro_M4_landscape.png' },
        { rel: 'apple-touch-startup-image', media: 'screen and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)', href: '/splash_screens/11__iPad_Pro__10.5__iPad_Pro_landscape.png' },
        { rel: 'apple-touch-startup-image', media: 'screen and (device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)', href: '/splash_screens/10.9__iPad_Air_landscape.png' },
        { rel: 'apple-touch-startup-image', media: 'screen and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)', href: '/splash_screens/10.5__iPad_Air_landscape.png' },
        { rel: 'apple-touch-startup-image', media: 'screen and (device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)', href: '/splash_screens/10.2__iPad_landscape.png' },
        { rel: 'apple-touch-startup-image', media: 'screen and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)', href: '/splash_screens/9.7__iPad_Pro__7.9__iPad_mini__9.7__iPad_Air__9.7__iPad_landscape.png' },
        { rel: 'apple-touch-startup-image', media: 'screen and (device-width: 744px) and (device-height: 1133px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)', href: '/splash_screens/8.3__iPad_Mini_landscape.png' },
        { rel: 'apple-touch-startup-image', media: 'screen and (device-width: 440px) and (device-height: 956px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)', href: '/splash_screens/iPhone_16_Pro_Max_portrait.png' },
        { rel: 'apple-touch-startup-image', media: 'screen and (device-width: 402px) and (device-height: 874px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)', href: '/splash_screens/iPhone_16_Pro_portrait.png' },
        { rel: 'apple-touch-startup-image', media: 'screen and (device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)', href: '/splash_screens/iPhone_16_Plus__iPhone_15_Pro_Max__iPhone_15_Plus__iPhone_14_Pro_Max_portrait.png' },
        { rel: 'apple-touch-startup-image', media: 'screen and (device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)', href: '/splash_screens/iPhone_16__iPhone_15_Pro__iPhone_15__iPhone_14_Pro_portrait.png' },
        { rel: 'apple-touch-startup-image', media: 'screen and (device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)', href: '/splash_screens/iPhone_14_Plus__iPhone_13_Pro_Max__iPhone_12_Pro_Max_portrait.png' },
        { rel: 'apple-touch-startup-image', media: 'screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)', href: '/splash_screens/iPhone_14__iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12_portrait.png' },
        { rel: 'apple-touch-startup-image', media: 'screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)', href: '/splash_screens/iPhone_13_mini__iPhone_12_mini__iPhone_11_Pro__iPhone_XS__iPhone_X_portrait.png' },
        { rel: 'apple-touch-startup-image', media: 'screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)', href: '/splash_screens/iPhone_11_Pro_Max__iPhone_XS_Max_portrait.png' },
        { rel: 'apple-touch-startup-image', media: 'screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)', href: '/splash_screens/iPhone_11__iPhone_XR_portrait.png' },
        { rel: 'apple-touch-startup-image', media: 'screen and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)', href: '/splash_screens/iPhone_8_Plus__iPhone_7_Plus__iPhone_6s_Plus__iPhone_6_Plus_portrait.png' },
        { rel: 'apple-touch-startup-image', media: 'screen and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)', href: '/splash_screens/iPhone_8__iPhone_7__iPhone_6s__iPhone_6__4.7__iPhone_SE_portrait.png' },
        { rel: 'apple-touch-startup-image', media: 'screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)', href: '/splash_screens/4__iPhone_SE__iPod_touch_5th_generation_and_later_portrait.png' },
        { rel: 'apple-touch-startup-image', media: 'screen and (device-width: 1032px) and (device-height: 1376px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)', href: '/splash_screens/13__iPad_Pro_M4_portrait.png' },
        { rel: 'apple-touch-startup-image', media: 'screen and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)', href: '/splash_screens/12.9__iPad_Pro_portrait.png' },
        { rel: 'apple-touch-startup-image', media: 'screen and (device-width: 834px) and (device-height: 1210px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)', href: '/splash_screens/11__iPad_Pro_M4_portrait.png' },
        { rel: 'apple-touch-startup-image', media: 'screen and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)', href: '/splash_screens/11__iPad_Pro__10.5__iPad_Pro_portrait.png' },
        { rel: 'apple-touch-startup-image', media: 'screen and (device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)', href: '/splash_screens/10.9__iPad_Air_portrait.png' },
        { rel: 'apple-touch-startup-image', media: 'screen and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)', href: '/splash_screens/10.5__iPad_Air_portrait.png' },
        { rel: 'apple-touch-startup-image', media: 'screen and (device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)', href: '/splash_screens/10.2__iPad_portrait.png' },
        { rel: 'apple-touch-startup-image', media: 'screen and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)', href: '/splash_screens/9.7__iPad_Pro__7.9__iPad_mini__9.7__iPad_Air__9.7__iPad_portrait.png' },
        { rel: 'apple-touch-startup-image', media: 'screen and (device-width: 744px) and (device-height: 1133px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)', href: '/splash_screens/8.3__iPad_Mini_portrait.png' },
      ]
    }
  },
  css: ['@/assets/main.scss'],
  modules: ['@nuxt/eslint', '@nuxt/test-utils', '@nuxt/image', 'vuetify-nuxt-module', 'dayjs-nuxt', '@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt', '@unocss/nuxt', '@vite-pwa/nuxt', '@nuxtjs/device', '@nuxtjs/storybook'],
  pwa: {
    strategies: 'generateSW',
    registerType: 'autoUpdate',
    manifest: {
      short_name: 'Tekateki Siroh',
      name: 'Tekateki Siroh',
      description: 'Tekateki Siroh',
      background_color: '#00bcd4',
      theme_color: '#00bcd4',
      icons: [
        {
          src: '/splash_screens/icon.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: ['any']
        }
      ],
      id: `tts/v${theVersion}`,
      start_url: '/?source=pwa',
      display: 'standalone',
      scope: '/',
      screenshots: [
        {
          src: '/splash_screens/4__iPhone_SE__iPod_touch_5th_generation_and_later_portrait.png',
          type: 'image/png',
          sizes: '640x1136'
        },
        {
          src: '/splash_screens/iPhone_11__iPhone_XR_landscape.png',
          type: 'image/png',
          sizes: '1792x828',
          form_factor: 'wide'
        }
      ]
    },
    workbox: {
      cacheId: 'tekateksiroh',
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'google-fonts-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        },
        {
          urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'gstatic-fonts-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
            },
            cacheableResponse: {
              statuses: [0, 200]
            },
          }
        }
      ],
      navigateFallback: 'null',
      globPatterns: ['**/*.{js,css,html,png,svg,ico}']
    },
    client: {
      installPrompt: true
    },
    devOptions: {
      suppressWarnings: true,
      enabled: true,
      type: 'module'
    }
  },
  vuetify: {
    moduleOptions: {},
    vuetifyOptions: {
      icons: {
        defaultSet: 'unocss-mdi',
      },
      theme: {
        defaultTheme: 'light',
      },
    }
  },
  dayjs: {
    plugins: ['duration']
  }
})