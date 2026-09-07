import { createClient } from "@/lib/supabase/client";
import { SIGNATURE_COLLECTIONS, SAMPLE_BOX_ITEMS } from "@/lib/catalog-data";

// ============================================================
// Types
// ============================================================

export interface Product {
  id: string;
  name: string;
  category: string;
  type: "box" | "bouquet" | "item";
  price_pkr: number;
  sale_price_pkr?: number;
  stock: number;
  badge?: string;
  description: string;
  inclusions: string[];
  image: string;
  images: string[];
  is_featured: boolean;
  created_at?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  created_at?: string;
}

export interface PromoCode {
  id: string;
  code: string;
  discount_percent?: number;
  discount_pkr?: number;
  min_order_pkr?: number;
  is_active: boolean;
  created_at?: string;
}

export interface StoreSettings {
  id?: string;
  shipping_fee_pkr: number;
  free_shipping_threshold_pkr: number;
  whatsapp_number: string;
  support_email: string;
  announcement_banner: string;
}

// ============================================================
// Initial Seed Data
// ============================================================

export const DEFAULT_CATEGORIES: Category[] = [
  { id: "cat-sig-boxes", name: "Signature Gift Boxes", slug: "signature-boxes", description: "Bespoke handcrafted magnetic keepsake chests with wax seal." },
  { id: "cat-sig-bouquets", name: "Handcrafted Bouquets", slug: "signature-bouquets", description: "Fresh stem arrangements wrapped in Korean frosted paper." },
  { id: "cat-jewelry", name: "Jewelry & Adornments", slug: "jewelry", description: "Ethnic jhumkay, crystal pendants, and delicate accessories." },
  { id: "cat-crochet", name: "Handmade Crochet", slug: "crochet", description: "Artisanal crochet floral keychains and wrist gajras." },
  { id: "cat-candles", name: "Scented Candles & Treats", slug: "treats-candles", description: "Botanical soy candles, ceramic mugs, and chocolates." },
  { id: "cat-makeup", name: "Makeup & Pampering", slug: "makeup", description: "Velvet lipsticks, eyeshadow palettes, and beauty essentials." },
];

export const DEFAULT_PROMO_CODES: PromoCode[] = [
  { id: "promo-1", code: "MIBELLA10", discount_percent: 10, min_order_pkr: 3000, is_active: true },
  { id: "promo-2", code: "EIDMUBARAK", discount_percent: 15, min_order_pkr: 5000, is_active: true },
  { id: "promo-3", code: "WELCOME500", discount_pkr: 500, min_order_pkr: 4000, is_active: true },
];

export const DEFAULT_STORE_SETTINGS: StoreSettings = {
  shipping_fee_pkr: 350,
  free_shipping_threshold_pkr: 5000,
  whatsapp_number: "+923001234567",
  support_email: "concierge@mibella.pk",
  announcement_banner: "✨ Complimentary hand-inked calligraphy card with gold wax crest on all bespoke orders across Pakistan.",
};

export const INITIAL_PRODUCTS: Product[] = [
  ...SIGNATURE_COLLECTIONS.map((col) => ({
    id: col.id,
    name: col.title,
    category: col.category === "box" ? "Signature Gift Boxes" : "Handcrafted Bouquets",
    type: col.category as "box" | "bouquet",
    price_pkr: col.pricePkr,
    stock: 25,
    badge: col.tag,
    description: col.description,
    inclusions: col.includes,
    image:
      col.category === "box"
        ? "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop"
        : "https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=800&auto=format&fit=crop",
    images: [],
    is_featured: true,
  })),
  ...SAMPLE_BOX_ITEMS.map((item) => ({
    id: item.id,
    name: item.name,
    category:
      item.category === "Jewelry"
        ? "Jewelry & Adornments"
        : item.category === "Crochet"
        ? "Handmade Crochet"
        : item.category === "Makeup"
        ? "Makeup & Pampering"
        : "Scented Candles & Treats",
    type: "item" as const,
    price_pkr: item.pricePkr,
    stock: 40,
    badge: item.tag,
    description: item.description,
    inclusions: [item.name],
    image:
      item.category === "Jewelry"
        ? "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop"
        : item.category === "Crochet"
        ? "https://images.unsplash.com/photo-1584589167171-541ce45f1eea?q=80&w=800&auto=format&fit=crop"
        : item.category === "Makeup"
        ? "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop"
        : "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=800&auto=format&fit=crop",
    images: [],
    is_featured: false,
  })),
];

// ============================================================
// Storage Keys
// ============================================================
const PRODUCTS_KEY = "mibella_products";
const CATEGORIES_KEY = "mibella_categories";
const PROMOS_KEY = "mibella_promos";
const SETTINGS_KEY = "mibella_settings";

// ============================================================
// Products Operations
// ============================================================

export async function fetchProducts(): Promise<Product[]> {
  const supabase = createClient();
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data && data.length > 0) {
      if (typeof window !== "undefined") {
        localStorage.setItem(PRODUCTS_KEY, JSON.stringify(data));
      }
      return data;
    }
  } catch {
    // Supabase table or connection error: fall back to local storage
  }

  if (typeof window !== "undefined") {
    const local = localStorage.getItem(PRODUCTS_KEY);
    if (local) {
      try {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch {}
    }
    // First time initialization
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(INITIAL_PRODUCTS));
  }
  return INITIAL_PRODUCTS;
}

export async function addProduct(product: Product): Promise<Product> {
  const supabase = createClient();
  const productWithDate = {
    ...product,
    created_at: new Date().toISOString(),
  };

  try {
    const { data, error } = await supabase
      .from("products")
      .insert([productWithDate])
      .select()
      .single();

    if (!error && data) {
      updateLocalProducts(data, "add");
      return data;
    }
  } catch {}

  // Fallback to local storage
  updateLocalProducts(productWithDate, "add");
  return productWithDate;
}

export async function updateProduct(id: string, updates: Partial<Product>): Promise<void> {
  const supabase = createClient();
  try {
    await supabase.from("products").update(updates).eq("id", id);
  } catch {}

  // Update local storage
  if (typeof window !== "undefined") {
    const local = localStorage.getItem(PRODUCTS_KEY);
    if (local) {
      try {
        const products: Product[] = JSON.parse(local);
        const index = products.findIndex((p) => p.id === id);
        if (index !== -1) {
          products[index] = { ...products[index], ...updates };
          localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
        }
      } catch {}
    }
  }
}

export async function deleteProduct(id: string): Promise<void> {
  const supabase = createClient();
  try {
    await supabase.from("products").delete().eq("id", id);
  } catch {}

  if (typeof window !== "undefined") {
    const local = localStorage.getItem(PRODUCTS_KEY);
    if (local) {
      try {
        const products: Product[] = JSON.parse(local);
        const filtered = products.filter((p) => p.id !== id);
        localStorage.setItem(PRODUCTS_KEY, JSON.stringify(filtered));
      } catch {}
    }
  }
}

function updateLocalProducts(product: Product, action: "add" | "update") {
  if (typeof window === "undefined") return;
  try {
    const local = localStorage.getItem(PRODUCTS_KEY);
    const products: Product[] = local ? JSON.parse(local) : [...INITIAL_PRODUCTS];
    if (action === "add") {
      products.unshift(product);
    } else {
      const idx = products.findIndex((p) => p.id === product.id);
      if (idx !== -1) products[idx] = product;
    }
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  } catch {}
}

// ============================================================
// Image Upload Helper (Supabase Storage with DataURL fallback)
// ============================================================

export async function uploadProductImage(file: File): Promise<string> {
  const supabase = createClient();
  const fileExt = file.name.split(".").pop() || "jpg";
  const fileName = `prod_${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
  const filePath = `catalog/${fileName}`;

  try {
    const { error } = await supabase.storage
      .from("product-images")
      .upload(filePath, file, { cacheControl: "3600", upsert: true });

    if (!error) {
      const { data } = supabase.storage.from("product-images").getPublicUrl(filePath);
      if (data?.publicUrl) return data.publicUrl;
    }
  } catch {}

  // Fallback to Data URL
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.readAsDataURL(file);
  });
}

// ============================================================
// Categories Operations
// ============================================================

export async function fetchCategories(): Promise<Category[]> {
  const supabase = createClient();
  try {
    const { data, error } = await supabase.from("categories").select("*").order("name");
    if (!error && data && data.length > 0) {
      if (typeof window !== "undefined") {
        localStorage.setItem(CATEGORIES_KEY, JSON.stringify(data));
      }
      return data;
    }
  } catch {}

  if (typeof window !== "undefined") {
    const local = localStorage.getItem(CATEGORIES_KEY);
    if (local) {
      try {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch {}
    }
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(DEFAULT_CATEGORIES));
  }
  return DEFAULT_CATEGORIES;
}

export async function addCategory(category: Omit<Category, "id">): Promise<Category> {
  const supabase = createClient();
  const newCat: Category = {
    ...category,
    id: `cat-${Date.now()}`,
    created_at: new Date().toISOString(),
  };

  try {
    const { data, error } = await supabase.from("categories").insert([newCat]).select().single();
    if (!error && data) {
      updateLocalCategories(data);
      return data;
    }
  } catch {}

  updateLocalCategories(newCat);
  return newCat;
}

export async function deleteCategory(id: string): Promise<void> {
  const supabase = createClient();
  try {
    await supabase.from("categories").delete().eq("id", id);
  } catch {}

  if (typeof window !== "undefined") {
    const local = localStorage.getItem(CATEGORIES_KEY);
    if (local) {
      try {
        const list: Category[] = JSON.parse(local);
        localStorage.setItem(CATEGORIES_KEY, JSON.stringify(list.filter((c) => c.id !== id)));
      } catch {}
    }
  }
}

function updateLocalCategories(category: Category) {
  if (typeof window === "undefined") return;
  try {
    const local = localStorage.getItem(CATEGORIES_KEY);
    const list: Category[] = local ? JSON.parse(local) : [...DEFAULT_CATEGORIES];
    list.push(category);
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(list));
  } catch {}
}

// ============================================================
// Promo Codes Operations
// ============================================================

export async function fetchPromoCodes(): Promise<PromoCode[]> {
  const supabase = createClient();
  try {
    const { data, error } = await supabase.from("promo_codes").select("*").order("created_at");
    if (!error && data && data.length > 0) {
      if (typeof window !== "undefined") {
        localStorage.setItem(PROMOS_KEY, JSON.stringify(data));
      }
      return data;
    }
  } catch {}

  if (typeof window !== "undefined") {
    const local = localStorage.getItem(PROMOS_KEY);
    if (local) {
      try {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch {}
    }
    localStorage.setItem(PROMOS_KEY, JSON.stringify(DEFAULT_PROMO_CODES));
  }
  return DEFAULT_PROMO_CODES;
}

export async function addPromoCode(promo: Omit<PromoCode, "id">): Promise<PromoCode> {
  const supabase = createClient();
  const newPromo: PromoCode = {
    ...promo,
    id: `promo-${Date.now()}`,
    created_at: new Date().toISOString(),
  };

  try {
    const { data, error } = await supabase.from("promo_codes").insert([newPromo]).select().single();
    if (!error && data) {
      updateLocalPromos(data);
      return data;
    }
  } catch {}

  updateLocalPromos(newPromo);
  return newPromo;
}

export async function deletePromoCode(id: string): Promise<void> {
  const supabase = createClient();
  try {
    await supabase.from("promo_codes").delete().eq("id", id);
  } catch {}

  if (typeof window !== "undefined") {
    const local = localStorage.getItem(PROMOS_KEY);
    if (local) {
      try {
        const list: PromoCode[] = JSON.parse(local);
        localStorage.setItem(PROMOS_KEY, JSON.stringify(list.filter((p) => p.id !== id)));
      } catch {}
    }
  }
}

function updateLocalPromos(promo: PromoCode) {
  if (typeof window === "undefined") return;
  try {
    const local = localStorage.getItem(PROMOS_KEY);
    const list: PromoCode[] = local ? JSON.parse(local) : [...DEFAULT_PROMO_CODES];
    list.unshift(promo);
    localStorage.setItem(PROMOS_KEY, JSON.stringify(list));
  } catch {}
}

export function validatePromoCode(
  code: string,
  subtotalPkr: number,
  allPromos: PromoCode[]
): { valid: boolean; discountPkr: number; message: string; promo?: PromoCode } {
  const cleanCode = code.trim().toUpperCase();
  const match = allPromos.find((p) => p.code.toUpperCase() === cleanCode && p.is_active);

  if (!match) {
    return { valid: false, discountPkr: 0, message: "Invalid or expired promo code." };
  }

  if (match.min_order_pkr && subtotalPkr < match.min_order_pkr) {
    return {
      valid: false,
      discountPkr: 0,
      message: `Minimum order amount of Rs. ${match.min_order_pkr.toLocaleString()} required for ${match.code}.`,
    };
  }

  let discount = 0;
  if (match.discount_percent) {
    discount = Math.round((subtotalPkr * match.discount_percent) / 100);
  } else if (match.discount_pkr) {
    discount = Math.min(match.discount_pkr, subtotalPkr);
  }

  return {
    valid: true,
    discountPkr: discount,
    message: `Promo code ${match.code} applied! Saved Rs. ${discount.toLocaleString()}.`,
    promo: match,
  };
}

// ============================================================
// Store Settings Operations
// ============================================================

export async function fetchStoreSettings(): Promise<StoreSettings> {
  const supabase = createClient();
  try {
    const { data, error } = await supabase
      .from("store_settings")
      .select("*")
      .eq("id", "global_settings")
      .single();

    if (!error && data) {
      if (typeof window !== "undefined") {
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(data));
      }
      return data;
    }
  } catch {}

  if (typeof window !== "undefined") {
    const local = localStorage.getItem(SETTINGS_KEY);
    if (local) {
      try {
        return JSON.parse(local);
      } catch {}
    }
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(DEFAULT_STORE_SETTINGS));
  }
  return DEFAULT_STORE_SETTINGS;
}

export async function updateStoreSettings(settings: StoreSettings): Promise<void> {
  const supabase = createClient();
  try {
    await supabase.from("store_settings").upsert({
      id: "global_settings",
      ...settings,
      updated_at: new Date().toISOString(),
    });
  } catch {}

  if (typeof window !== "undefined") {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }
}
