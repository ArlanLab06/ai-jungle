export const assets = {
  hero: "/images/hero-jungle.webp",
  education: "/images/zone-education.webp",
  healthcare: "/images/zone-healthcare.webp",
  business: "/images/zone-business.webp",
  dailyLife: "/images/zone-daily-life.webp",
  finalTemple: "/images/final-temple.webp",
  byteCat: "/images/byte-cat.png",
  fog: "/images/fog-overlay.webp",
  noise: "/images/noise.png",
} as const;

export type AssetKey = keyof typeof assets;
