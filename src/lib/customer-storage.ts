// ============================================================
// MIBELLA - Customer Memory & Cart Storage Utilities (Client-Safe)
// ============================================================

export interface CustomerProfile {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  savedAt?: string;
}

export interface CartItem {
  id: string;
  title: string;
  type: "box" | "bouquet" | "item";
  pricePkr: number;
  quantity: number;
  details?: string;
  image?: string | null;
  recipientName?: string;
  cardMessage?: string;
  photoCaption?: string;
  includesPhoto?: boolean;
}

const CUSTOMER_STORAGE_KEY = "mibella_saved_customer_profile";
const CART_STORAGE_KEY = "mibella_active_cart";

/**
 * Retrieve saved customer details from localStorage
 */
export function getSavedCustomer(): CustomerProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CUSTOMER_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as CustomerProfile;
  } catch (e) {
    console.error("Error reading saved customer profile", e);
    return null;
  }
}

/**
 * Save customer details to localStorage for future visits
 */
export function saveCustomer(profile: CustomerProfile): void {
  if (typeof window === "undefined") return;
  try {
    const dataWithTimestamp = {
      ...profile,
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem(CUSTOMER_STORAGE_KEY, JSON.stringify(dataWithTimestamp));
  } catch (e) {
    console.error("Error saving customer profile", e);
  }
}

/**
 * Clear customer memory from localStorage
 */
export function clearSavedCustomer(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(CUSTOMER_STORAGE_KEY);
  } catch (e) {
    console.error("Error clearing saved customer", e);
  }
}

/**
 * Retrieve active cart items
 */
export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as CartItem[];
  } catch (e) {
    return [];
  }
}

/**
 * Save active cart items
 */
export function saveCart(items: CartItem[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event("mibella-cart-updated"));
  } catch (e) {
    console.error("Error saving cart", e);
  }
}

/**
 * Add single item to cart
 */
export function addToCart(item: CartItem): void {
  const current = getCart();
  const existingIdx = current.findIndex((i) => i.id === item.id && i.type === item.type);
  if (existingIdx >= 0) {
    current[existingIdx].quantity += item.quantity || 1;
    saveCart(current);
  } else {
    saveCart([...current, item]);
  }
}

/**
 * Clear cart
 */
export function clearCart(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(CART_STORAGE_KEY);
    window.dispatchEvent(new Event("mibella-cart-updated"));
  } catch (e) {
    console.error("Error clearing cart", e);
  }
}
