// ============================================================
// MIBELLA - Centralized Catalog Data Layer (PKR Pricing)
// ============================================================

export interface CustomBoxItem {
  id: string;
  name: string;
  category: "Jewelry" | "Crochet" | "Coffee Cup & Snacks" | "Scented Candle" | "Makeup";
  pricePkr: number;
  tag: string;
  description: string;
}

export interface BoxStyle {
  id: string;
  name: string;
  size: string;
  pricePkr: number;
  colorHex: string;
  badge: string;
  description?: string;
}

export interface FlowerStem {
  id: string;
  name: string;
  origin: string;
  stemsCount: string;
  pricePkr: number;
  colorTone: string;
  description?: string;
}

export interface WrappingOption {
  id: string;
  name: string;
  finish: string;
  pricePkr: number;
}

export interface RibbonOption {
  id: string;
  name: string;
  pricePkr: number;
}

export interface BouquetAddon {
  id: string;
  name: string;
  pricePkr: number;
  tag: string;
}

export interface SignatureCollection {
  id: string;
  title: string;
  type: "Bespoke Gift Box" | "Handcrafted Bouquet" | "Wellness Gift Box";
  category: "box" | "bouquet";
  pricePkr: number;
  tag: string;
  itemsCount: string;
  includes: string[];
  bgAccent: string;
  description: string;
}

// ------------------------------------------------------------
// 1. BOX STYLES & VESSELS
// ------------------------------------------------------------
export const BOX_STYLES: BoxStyle[] = [
  {
    id: "box-blush",
    name: "Atelier Blush Keepsake Chest",
    size: "Medium (Fits 4-5 items)",
    pricePkr: 2800,
    colorHex: "#E8D8C3",
    badge: "Most Popular",
    description: "Hardbound magnetic keepsake box wrapped in blush peach textured linen with gold foil logo.",
  },
  {
    id: "box-noir",
    name: "Burgundy Velvet Prestige Box",
    size: "Large (Fits 6-7 items)",
    pricePkr: 3800,
    colorHex: "#6B1E2D",
    badge: "Signature",
    description: "Ultra-luxurious deep burgundy velvet finish with brass hardware and debossed crest.",
  },
  {
    id: "box-cream",
    name: "Ivory Linen Round Hatbox",
    size: "Grande (Fits 5-6 items)",
    pricePkr: 3200,
    colorHex: "#F8F1E7",
    badge: "Deluxe",
    description: "Cylindrical European-style hatbox in natural ivory linen weave with silk ribbon pull.",
  },
];

// ------------------------------------------------------------
// 2. CURATED BOX LUXURIES (From Design Notes)
// ------------------------------------------------------------
export const SAMPLE_BOX_ITEMS: CustomBoxItem[] = [
  // Jewelry
  {
    id: "item-jhumka",
    name: "Traditional Handcrafted Jhumkay",
    category: "Jewelry",
    pricePkr: 1250,
    tag: "Traditional",
    description: "Classic ethnic dangling jhumkay with delicate pearl droplets.",
  },
  {
    id: "item-pendant",
    name: "Delicate Minimalist Pendant",
    category: "Jewelry",
    pricePkr: 1450,
    tag: "Gold Finish",
    description: "Fine chain necklace with polished solitaire crystal pendant.",
  },
  {
    id: "item-tulip-bracelet",
    name: "Enamel Tulip Charm Bracelet",
    category: "Jewelry",
    pricePkr: 950,
    tag: "Trending",
    description: "Pastel enamel floral tulip link chain charm bracelet.",
  },
  {
    id: "item-earrings",
    name: "Sparkling Crystal Floral Earrings",
    category: "Jewelry",
    pricePkr: 850,
    tag: "Delicate",
    description: "Shimmering cubic zirconia floral stud earrings.",
  },
  {
    id: "item-bangles",
    name: "Festive Velvet & Metal Bangles Set",
    category: "Jewelry",
    pricePkr: 1150,
    tag: "Festive",
    description: "Rich matching bangles set with gold metallic accents.",
  },
  {
    id: "item-hair-clip",
    name: "Pearl & Crystal Hair Barrette Clip",
    category: "Jewelry",
    pricePkr: 450,
    tag: "Accessory",
    description: "Handcrafted faux pearl and crystal hair accent clip.",
  },
  {
    id: "item-hair-claw",
    name: "Aesthetic Matte French Hair Claw",
    category: "Jewelry",
    pricePkr: 550,
    tag: "Accessory",
    description: "Strong-grip aesthetic claw clip in pastel neutral finish.",
  },
  {
    id: "item-choker-set",
    name: "Regal Velvet & Pearl Choker Set",
    category: "Jewelry",
    pricePkr: 2450,
    tag: "Statement",
    description: "Intricate choker necklace with matching festive drop earrings.",
  },

  // Crochet
  {
    id: "item-crochet-keychain",
    name: "Handmade Crochet Flower Keychain",
    category: "Crochet",
    pricePkr: 750,
    tag: "Handmade",
    description: "Artisanal crochet woven floral bud charm with gold key ring.",
  },
  {
    id: "item-crochet-gajra",
    name: "Handmade Crochet Wrist Gajra",
    category: "Crochet",
    pricePkr: 950,
    tag: "Handcrafted",
    description: "Traditional wrist gajra lovingly hand-knitted with soft yarn.",
  },

  // Coffee Cup & Snacks
  {
    id: "item-coffee-cup",
    name: "Aesthetic Ceramic Coffee Cup",
    category: "Coffee Cup & Snacks",
    pricePkr: 1450,
    tag: "Stoneware",
    description: "Kiln-glazed speckled ceramic mug with smooth ergonomic handle.",
  },
  {
    id: "item-lays",
    name: "Crispy Salted Lays Potato Crisps",
    category: "Coffee Cup & Snacks",
    pricePkr: 350,
    tag: "Crunchy",
    description: "Classic golden wavy salted potato crisps pack.",
  },
  {
    id: "item-chocolate",
    name: "Gourmet Chocolates Selection",
    category: "Coffee Cup & Snacks",
    pricePkr: 950,
    tag: "Indulgence",
    description: "Assortment of rich dairy milk and hazelnut gourmet chocolates.",
  },

  // Scented Candle
  {
    id: "item-scented-candle",
    name: "Rose & Vanilla Scented Soy Candle",
    category: "Scented Candle",
    pricePkr: 1650,
    tag: "Aromatherapy",
    description: "Hand-poured 100% natural botanical wax candle with wooden wick.",
  },

  // Makeup
  {
    id: "item-eyeshadow",
    name: "9-Pan Rose & Nude Eyeshadow Palette",
    category: "Makeup",
    pricePkr: 1850,
    tag: "Glam",
    description: "Velvety matte and metallic shimmer wearable everyday shades.",
  },
  {
    id: "item-lipstick",
    name: "Velvet Matte Moisture Lipstick",
    category: "Makeup",
    pricePkr: 1250,
    tag: "Long-Wear",
    description: "Richly pigmented hydrating nude matte lipstick.",
  },
  {
    id: "item-lip-gloss",
    name: "Crystal Glass Shine Lip Gloss",
    category: "Makeup",
    pricePkr: 950,
    tag: "Plumping",
    description: "Non-sticky high-shine moisturizing crystal lip lacquer.",
  },
  {
    id: "item-mascara-lip-pencil",
    name: "Mascara & Lip Pencil Duo",
    category: "Makeup",
    pricePkr: 1200,
    tag: "Duo Essential",
    description: "Volumizing lash mascara paired with defining contour lip pencil.",
  },
  {
    id: "item-eyeliner",
    name: "Precision Waterproof Matte Eyeliner",
    category: "Makeup",
    pricePkr: 850,
    tag: "Smudge-Proof",
    description: "Ultra-fine tip intense black waterproof liquid eyeliner pen.",
  },
  {
    id: "item-highlighter",
    name: "Champagne Strobe Baked Highlighter",
    category: "Makeup",
    pricePkr: 1350,
    tag: "Radiant",
    description: "Illuminating pressed powder highlighter for instant dewy glow.",
  },
  {
    id: "item-nail",
    name: "Glossy Pastel Nail Polish & Kit",
    category: "Makeup",
    pricePkr: 650,
    tag: "Salon Finish",
    description: "Quick-dry chip-resistant glossy pastel nail lacquer.",
  },
  {
    id: "item-blush",
    name: "Silky Petal Peach Powder Blush",
    category: "Makeup",
    pricePkr: 1150,
    tag: "Soft Glow",
    description: "Finely milled blendable powder blush for healthy natural flush.",
  },
];

// ------------------------------------------------------------
// 3. FLORAL STEMS & BOUQUET OPTIONS
// ------------------------------------------------------------
export const BOUQUET_FLOWERS: FlowerStem[] = [
  {
    id: "flower-1",
    name: "Imported Red Naomi Roses",
    origin: "Ecuadorian Stems",
    stemsCount: "12 Long Stems",
    pricePkr: 4800,
    colorTone: "Deep Crimson",
    description: "Velvety dark crimson roses with extraordinary petal count and long vase life.",
  },
  {
    id: "flower-2",
    name: "Garden Peonies & Ranunculus",
    origin: "Dutch Garden",
    stemsCount: "10 Premium Stems",
    pricePkr: 5600,
    colorTone: "Blush & Ivory",
    description: "Soft layered pastel ruffled blooms exuding timeless romantic charm.",
  },
  {
    id: "flower-3",
    name: "Pure White Oriental Lilies",
    origin: "Fresh Cut Farm",
    stemsCount: "6 Fragrant Stems",
    pricePkr: 3900,
    colorTone: "Snow White",
    description: "Head-turning star-shaped pure white blooms with intoxicating sweet fragrance.",
  },
  {
    id: "flower-4",
    name: "Pastel Spring Tulips",
    origin: "Holland Stems",
    stemsCount: "15 Fresh Stems",
    pricePkr: 4500,
    colorTone: "Peach & Lilac",
    description: "Crisp, vibrant Dutch tulips in harmonious shades of peach and tender lavender.",
  },
  {
    id: "flower-5",
    name: "Eucalyptus & Baby's Breath",
    origin: "Lush Filler",
    stemsCount: "Generous Bunch",
    pricePkr: 1600,
    colorTone: "Sage Green & White",
    description: "Silver dollar eucalyptus foliage paired with cloud-like gypsophila fillers.",
  },
];

export const BOUQUET_WRAPPINGS: WrappingOption[] = [
  {
    id: "wrap-1",
    name: "Korean Frosted Matte Paper",
    finish: "Waterproof luxury soft-touch paper",
    pricePkr: 850,
  },
  {
    id: "wrap-2",
    name: "Vintage French Kraft Wrap",
    finish: "Organic textured ribbed paper",
    pricePkr: 650,
  },
  {
    id: "wrap-3",
    name: "Burgundy Velvet Elegance Wrap",
    finish: "Ultra-rich double lined fabric finish",
    pricePkr: 950,
  },
];

export const BOUQUET_RIBBONS: RibbonOption[] = [
  { id: "rib-1", name: "Silk Satin Ribbon Tie", pricePkr: 450 },
  { id: "rib-2", name: "Heavy French Velvet Ribbon", pricePkr: 750 },
  { id: "rib-3", name: "Gold Foil Monogram Ribbon", pricePkr: 900 },
];

export const BOUQUET_ADDONS: BouquetAddon[] = [
  { id: "add-1", name: "Box of 8 Ferrero Rocher", pricePkr: 1850, tag: "Sweets" },
  { id: "add-2", name: "Plush Cream Teddy Keepsake", pricePkr: 1450, tag: "Keepsake" },
  { id: "add-3", name: "Gold Acrylic 'Happy Birthday' Topper", pricePkr: 650, tag: "Accent" },
  { id: "add-4", name: "Mini French Botanical Mist (30ml)", pricePkr: 2200, tag: "Scent" },
];

// ------------------------------------------------------------
// 4. CURATED SIGNATURE COLLECTIONS
// ------------------------------------------------------------
export const SIGNATURE_COLLECTIONS: SignatureCollection[] = [
  {
    id: "col-1",
    title: "The Velvet Rose & Santal Suite",
    type: "Bespoke Gift Box",
    category: "box",
    pricePkr: 14500,
    tag: "Valentine's & Anniversaries",
    itemsCount: "5 Curated Luxuries",
    includes: [
      "Preserved Crimson Rose",
      "French Santal Candle",
      "Belgian Truffles",
      "Silk Ribbons",
      "Calligraphy Card",
    ],
    bgAccent: "from-[#6B1E2D]/15 to-[#E8D8C3]/40",
    description: "An opulent ensemble designed for moments that demand sheer devotion. Presented in a magnetic prestige box with wax crest sealing.",
  },
  {
    id: "col-2",
    title: "The Parisian Morning Blossom",
    type: "Handcrafted Bouquet",
    category: "bouquet",
    pricePkr: 8200,
    tag: "Fresh Stems",
    itemsCount: "18 Artisanal Stems",
    includes: [
      "Garden Peonies",
      "Blush Ranunculus",
      "Eucalyptus",
      "Korean Frosted Wrap",
      "Satin Bow",
    ],
    bgAccent: "from-[#F8F1E7] to-[#E8D8C3]/70",
    description: "Inspired by Parisian springtime flower markets. Hand-tied by our master florist in waterproof frosted wrap with hydration pack.",
  },
  {
    id: "col-3",
    title: "Golden Hour Spa & Serenity",
    type: "Wellness Gift Box",
    category: "box",
    pricePkr: 12800,
    tag: "Self-Care & Birthday",
    itemsCount: "6 Artisanal Keepsakes",
    includes: [
      "Mulberry Silk Mask",
      "Botanical Bath Soak",
      "Soy Candle",
      "Gold Tea Strainer",
      "Ceramic Mug",
    ],
    bgAccent: "from-[#E8D8C3]/50 to-[#F3E7D3]",
    description: "The quintessential restorative ritual. Crafted to bring spa tranquility and warmth into the comfort of her private sanctuary.",
  },
  {
    id: "col-4",
    title: "Crimson Passion Grand Bouquet",
    type: "Handcrafted Bouquet",
    category: "bouquet",
    pricePkr: 9900,
    tag: "Signature Florals",
    itemsCount: "24 Long Stems",
    includes: [
      "24 Red Naomi Roses",
      "Baby's Breath Accent",
      "Burgundy Velvet Wrap",
      "Gold Crest Tag",
    ],
    bgAccent: "from-[#6B1E2D]/20 to-[#F8F1E7]",
    description: "Two dozen velvety Ecuadorian-grade red roses arranged in an architectural spiraled bouquet enveloped in signature burgundy velvet.",
  },
  {
    id: "col-5",
    title: "The Ivory Hatbox & Truffle Hamper",
    type: "Bespoke Gift Box",
    category: "box",
    pricePkr: 16500,
    tag: "Deluxe Luxury",
    itemsCount: "7 Curated Luxuries",
    includes: [
      "Ivory Linen Hatbox",
      "Belgian Truffles",
      "Silk Pillowcase",
      "Rose Candle",
      "Calligraphy Card",
    ],
    bgAccent: "from-[#F8F1E7] to-[#E8D8C3]",
    description: "Our premier signature cylindrical hatbox packed with bespoke artisanal treats, hand-inked calligraphy, and gold wax detailing.",
  },
  {
    id: "col-6",
    title: "Pastel Symphony Garden Bouquet",
    type: "Handcrafted Bouquet",
    category: "bouquet",
    pricePkr: 7800,
    tag: "Seasonal Fresh",
    itemsCount: "16 Stems",
    includes: [
      "White Oriental Lilies",
      "Pastel Dutch Tulips",
      "Seeded Eucalyptus",
      "Kraft Wrap",
    ],
    bgAccent: "from-[#E8D8C3]/30 to-[#F8F1E7]",
    description: "A soft, radiant arrangement combining the fragrance of white lilies with springtime tulips in vintage French textured wrap.",
  },
];
