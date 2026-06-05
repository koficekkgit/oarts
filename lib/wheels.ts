export type Tone = "silver" | "graphite" | "champagne" | "black";

export type Wheel = {
  slug: string;
  brand: string;
  model: string;
  finish: string;
  diameters: string;
  sizes: string[];
  boltPatterns: string[];
  /** Cena za sadu (4 ks) v Kč. null = cena na poptávku. */
  price: number | null;
  inStock: boolean;
  badge?: string;
  spokes: number;
  accent: string;
  tone: Tone;
  blurb: string;
};

// Placeholder text – nahradit reálnými popisy.
export const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.";

export const LOREM_SHORT =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.";

const SILVER = "#c9c5bb";
const CHAMPAGNE = "#d6d0c4";

export const wheels: Wheel[] = [
  {
    slug: "bbs-ci-r",
    brand: "BBS",
    model: "CI-R",
    finish: "Nürburgring Black",
    diameters: '19" – 20"',
    sizes: ["8.5x19", "9.5x19", "9x20", "10.5x20"],
    boltPatterns: ["5x112", "5x120"],
    price: null,
    inStock: false,
    badge: "Na míru",
    spokes: 5,
    accent: SILVER,
    tone: "graphite",
    blurb: LOREM_SHORT,
  },
  {
    slug: "bbs-ri-d",
    brand: "BBS",
    model: "RI-D",
    finish: "Diamond Silver",
    diameters: '19" – 21"',
    sizes: ["9x19", "10x19", "9.5x20", "11x20"],
    boltPatterns: ["5x112", "5x120", "5x114.3"],
    price: 142000,
    inStock: true,
    badge: "Forged",
    spokes: 10,
    accent: CHAMPAGNE,
    tone: "silver",
    blurb: LOREM_SHORT,
  },
  {
    slug: "bbs-fi-r",
    brand: "BBS",
    model: "FI-R",
    finish: "Satin Black",
    diameters: '20" – 21"',
    sizes: ["9.5x20", "11x20", "10x21", "12x21"],
    boltPatterns: ["5x112", "Center Lock"],
    price: null,
    inStock: false,
    badge: "Motorsport",
    spokes: 14,
    accent: SILVER,
    tone: "black",
    blurb: LOREM_SHORT,
  },
  {
    slug: "bbs-lm",
    brand: "BBS",
    model: "LM",
    finish: "Champagne / Polished Lip",
    diameters: '18" – 20"',
    sizes: ["8.5x18", "9.5x18", "9x19", "10.5x19"],
    boltPatterns: ["5x112", "5x114.3", "5x120"],
    price: 96000,
    inStock: true,
    badge: "Bestseller",
    spokes: 18,
    accent: CHAMPAGNE,
    tone: "champagne",
    blurb: LOREM_SHORT,
  },
  {
    slug: "vossen-hf5",
    brand: "Vossen",
    model: "HF-5",
    finish: "Brushed Gunmetal",
    diameters: '20" – 22"',
    sizes: ["9x20", "10.5x20", "9x21", "11x22"],
    boltPatterns: ["5x112", "5x114.3"],
    price: 78000,
    inStock: true,
    spokes: 5,
    accent: SILVER,
    tone: "graphite",
    blurb: LOREM_SHORT,
  },
  {
    slug: "vossen-s17-01",
    brand: "Vossen",
    model: "S17-01",
    finish: "Satin Graphite",
    diameters: '21" – 22"',
    sizes: ["9.5x21", "11x21", "10x22", "11.5x22"],
    boltPatterns: ["5x112", "5x120"],
    price: null,
    inStock: false,
    badge: "Na míru",
    spokes: 10,
    accent: SILVER,
    tone: "graphite",
    blurb: LOREM_SHORT,
  },
  {
    slug: "oz-superleggera",
    brand: "OZ Racing",
    model: "Superleggera III",
    finish: "Race Silver",
    diameters: '18" – 19"',
    sizes: ["8x18", "9x18", "8.5x19", "10x19"],
    boltPatterns: ["5x112", "5x114.3", "5x100"],
    price: 64000,
    inStock: true,
    spokes: 5,
    accent: SILVER,
    tone: "silver",
    blurb: LOREM_SHORT,
  },
  {
    slug: "rotiform-lsr",
    brand: "Rotiform",
    model: "LSR",
    finish: "Matte Black",
    diameters: '18" – 20"',
    sizes: ["8.5x18", "9.5x18", "9x19", "10x20"],
    boltPatterns: ["5x112", "5x120", "5x114.3"],
    price: 58000,
    inStock: true,
    spokes: 6,
    accent: SILVER,
    tone: "black",
    blurb: LOREM_SHORT,
  },
  {
    slug: "japan-racing-jr",
    brand: "Japan Racing",
    model: "JR-28",
    finish: "Champagne Gold",
    diameters: '17" – 19"',
    sizes: ["8x17", "8.5x18", "9.5x18", "8.5x19"],
    boltPatterns: ["5x112", "5x100", "4x108"],
    price: 21900,
    inStock: true,
    badge: "Skladová akce",
    spokes: 5,
    accent: CHAMPAGNE,
    tone: "champagne",
    blurb: LOREM_SHORT,
  },
  {
    slug: "oz-hlt",
    brand: "OZ Racing",
    model: "Leggera HLT",
    finish: "Star Graphite",
    diameters: '19" – 20"',
    sizes: ["8.5x19", "10x19", "9x20", "11x20"],
    boltPatterns: ["5x112", "5x120"],
    price: null,
    inStock: false,
    spokes: 10,
    accent: SILVER,
    tone: "graphite",
    blurb: LOREM_SHORT,
  },
];

export const brands = Array.from(new Set(wheels.map((w) => w.brand)));

export function getWheel(slug: string): Wheel | undefined {
  return wheels.find((w) => w.slug === slug);
}

export function formatPrice(price: number | null): string {
  if (price == null) return "Cena na poptávku";
  return new Intl.NumberFormat("cs-CZ").format(price) + " Kč";
}
