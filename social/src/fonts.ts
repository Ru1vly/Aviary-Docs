import { loadFont } from '@remotion/fonts';
import { staticFile } from 'remotion';
import { font } from './theme';

let fontsPromise: Promise<unknown> | null = null;

export const loadBrandFonts = (): Promise<unknown> => {
  if (!fontsPromise) {
    fontsPromise = Promise.all([
      loadFont({
        family: font.display,
        url: staticFile('fonts/Lancelot-Regular.ttf'),
        weight: '400',
      }),
      loadFont({
        family: font.ui,
        url: staticFile('fonts/GeistMono-VariableFont_wght.ttf'),
        weight: '400',
      }),
      loadFont({
        family: font.ui,
        url: staticFile('fonts/GeistMono-VariableFont_wght.ttf'),
        weight: '600',
      }),
      // The Gen-Z cuts set headlines in heavy mono — Lancelot can't carry
      // all-caps slang or digits (see the display-font caveat in the README).
      loadFont({
        family: font.ui,
        url: staticFile('fonts/GeistMono-VariableFont_wght.ttf'),
        weight: '700',
      }),
      loadFont({
        family: font.ui,
        url: staticFile('fonts/GeistMono-VariableFont_wght.ttf'),
        weight: '900',
      }),
      loadFont({
        family: font.code,
        url: staticFile('fonts/UbuntuMono-Regular.ttf'),
        weight: '400',
      }),
      loadFont({
        family: font.code,
        url: staticFile('fonts/UbuntuMono-Bold.ttf'),
        weight: '700',
      }),
    ]);
  }
  return fontsPromise;
};
