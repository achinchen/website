import { defineConfig, presetUno, presetWebFonts } from 'unocss';

export default defineConfig({
  cli: {
    entry: [{
      patterns: ['./src/**/*.{ts,tsx}'],
      outFile: './src/app/styles/uno.css',
    }]
  },
  presets: [
    presetUno(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        sans: 'Noto+Sans+TC:400,500,700',
      },
    }),
  ],
});
