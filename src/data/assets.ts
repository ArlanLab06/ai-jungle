const productionBasePath = process.env.NODE_ENV === "production" ? "/ai-jungle" : "";

export function assetPath(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${productionBasePath}${normalizedPath}`;
}

export const zoneBackgrounds = {
  education: assetPath("/images/zone-education.png"),
  healthcare: assetPath("/images/zone-healthcare.png"),
  business: assetPath("/images/zone-business.png"),
  dailyLife: assetPath("/images/zone-daily-life.png"),
} as const;

export const assets = {
  hero: assetPath("/images/hero-jungle.png"),
  education: zoneBackgrounds.education,
  healthcare: zoneBackgrounds.healthcare,
  business: zoneBackgrounds.business,
  dailyLife: zoneBackgrounds.dailyLife,
  finalTemple: assetPath("/images/final-temple.png"),
  byteCat: assetPath("/images/byte-cat-main.png"),
  byteCatFallback: assetPath("/images/byte-cat.png"),
  fog: assetPath("/images/fog-overlay.webp"),
  noise: assetPath("/images/noise.png"),
  journeyMap: assetPath("/images/journey-map-bg.png"),
} as const;

export type AssetKey = keyof typeof assets;
export type ZoneBackgroundKey = keyof typeof zoneBackgrounds;
