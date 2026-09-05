import { useEffect, useState } from 'react';
import { continueRender, delayRender } from 'remotion';
import { loadBrandFonts } from './fonts';

export const useBrandFonts = (): void => {
  const [handle] = useState(() => delayRender('Loading brand fonts'));

  useEffect(() => {
    loadBrandFonts()
      .then(() => continueRender(handle))
      .catch((err) => {
        console.error(err);
        continueRender(handle);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
