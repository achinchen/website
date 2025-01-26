import { defineConfig, presetUno, presetWebFonts } from 'unocss';

export default defineConfig({
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
