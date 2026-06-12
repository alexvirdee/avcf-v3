/**
 * Organized AVCF imagery copied from AVCF-Legacy and the AVCF design system.
 * Hero photos are 1920×1280; prayas-* tiles are 450×250 (gallery-size only).
 *
 * Logo: the 2026 "Modern Legacy" elephant-A mark (Concept 1 from the design
 * system's explorations/Logo Concepts 2026.html). The legacy elephant wordmark
 * remains in AVCF-Legacy for archival use only.
 */
export const LOGOS = {
  mark: "/avcf/logos/avcf-mark.svg",
  markWhite: "/avcf/logos/avcf-mark-white.svg",
  markBlack: "/avcf/logos/avcf-mark-black.svg",
  markMono: "/avcf/logos/avcf-mark-mono.svg",
  appIcon: "/avcf/logos/avcf-appicon.svg",
} as const;

export const PHOTOS = {
  heroChildren: "/avcf/photos/hero3.jpg",
  celebration: "/avcf/photos/hero2.jpg",
  classroom: "/avcf/photos/hero1.jpg",
  community: "/avcf/photos/details.jpg",
  donors: "/avcf/photos/donorhappy.jpg",
} as const;

export const GALLERY = [
  { src: "/avcf/photos/prayas-1.jpg", label: "Morning assembly at Prayas", span: 2 },
  { src: "/avcf/photos/prayas-2.jpg", label: "Celebrating festival day", span: 1 },
  { src: "/avcf/photos/prayas-9.jpg", label: "New classroom, new friends", span: 1 },
  { src: "/avcf/photos/prayas-5.jpg", label: "Learning together", span: 1 },
  { src: "/avcf/photos/prayas-13.jpg", label: "Play time", span: 1 },
  { src: "/avcf/photos/prayas-3.jpg", label: "The Prayas family", span: 2 },
] as const;

export const TEAM_PHOTOS = {
  lindsay: "/avcf/team/lindsay.jpg",
  aleena: "/avcf/team/aleena.jpg",
  andrew: "/avcf/team/andrew.png",
  oscar: "/avcf/team/oscar.jpg",
  alex: "/avcf/team/alex.jpg",
  tim: "/avcf/team/tim.jpg",
  sat: "/avcf/team/sat.jpg",
  harj: "/avcf/team/harj.jpg",
} as const;
