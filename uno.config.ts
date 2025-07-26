import { defineConfig, presetIcons, presetWebFonts } from 'unocss'
export default defineConfig({
  presets: [
    presetIcons({}),
    presetWebFonts({
      provider: 'google',
      fonts: {
        sans: [
          {
            name: 'Londrina Solid',
            weights: ['300', '700'],
            italic: true,
          },
          {
            name: 'sans-serif',
            provider: 'none',
          },
        ],
      }
    })
  ]
})