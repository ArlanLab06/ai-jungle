export const zoneBackgrounds = {
  education: "/images/zone-education.png",
  healthcare: "/images/zone-healthcare.png",
  business: "/images/zone-business.png",
  dailyLife: "/images/zone-daily-life.png",
} as const;

export const assets = {
  hero: "/images/hero-jungle.png",
  education: zoneBackgrounds.education,
  healthcare: zoneBackgrounds.healthcare,
  business: zoneBackgrounds.business,
  dailyLife: zoneBackgrounds.dailyLife,
  finalTemple: "/images/final-temple.png",
  byteCat: "/images/byte-cat-main.png",
  byteCatFallback: "/images/byte-cat.png",
  fog: "/images/fog-overlay.webp",
  noise: "/images/noise.png",
} as const;

export type AssetKey = keyof typeof assets;
export type ZoneBackgroundKey = keyof typeof zoneBackgrounds;
