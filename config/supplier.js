/**
 * Tiekėjas (Alibaba) – naudokite užsakymams tiekėjo platformoje.
 * @see https://odeco.en.alibaba.com/
 */
export const SUPPLIER = {
  name: 'ODECO (Alibaba)',
  catalogUrl: 'https://odeco.en.alibaba.com/?spm=a2700.galleryofferlist.wending_right.1.56b113a0owwHpL',
};

/** 300 % antkainis virš savikainos: kaina = savikaina × (1 + 3) */
export const MARKUP_PERCENT_ON_TOP = 300;

export function retailFromWholesale(wholesaleEur) {
  const w = Number(wholesaleEur);
  if (!Number.isFinite(w) || w < 0) return null;
  return w * (1 + MARKUP_PERCENT_ON_TOP / 100);
}
