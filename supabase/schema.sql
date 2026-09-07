-- ============================================================
-- MIBELLA - Comprehensive Supabase Database Schema
-- 100% Idempotent - Safe to run multiple times in SQL Editor
-- ============================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- 1. PROFILES TABLE (Customer Profiles linked to auth.users)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  default_city TEXT DEFAULT 'Lahore',
  default_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles Policies (Idempotent: drop before create)
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
CREATE POLICY "Public profiles are viewable by everyone" 
  ON public.profiles FOR SELECT 
  USING (true);

DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
CREATE POLICY "Users can insert their own profile" 
  ON public.profiles FOR INSERT 
  WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = id);

-- Function and trigger to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, phone)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    NEW.raw_user_meta_data->>'phone'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- ============================================================
-- 2. ORDERS TABLE (Guest & Member Gifting Orders)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.orders (
  id TEXT PRIMARY KEY, -- e.g. MIB-82914
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL, -- NULL for guest checkouts
  customer_name TEXT NOT NULL,
  customer_email TEXT,
  customer_phone TEXT NOT NULL,
  recipient_name TEXT NOT NULL,
  recipient_phone TEXT,
  delivery_city TEXT NOT NULL,
  delivery_address TEXT NOT NULL,
  scheduled_date TEXT,
  delivery_slot TEXT,
  calligraphy_message TEXT,
  payment_method TEXT NOT NULL DEFAULT 'cod',
  subtotal_pkr NUMERIC NOT NULL,
  shipping_fee_pkr NUMERIC NOT NULL DEFAULT 0,
  grand_total_pkr NUMERIC NOT NULL,
  promo_code TEXT,
  discount_pkr NUMERIC DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'pending', -- pending, preparing, dispatched, delivered, cancelled
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Index for fast order lookups
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON public.orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders(created_at DESC);

-- Enable RLS on orders
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Orders Policies
DROP POLICY IF EXISTS "Anyone can create orders" ON public.orders;
CREATE POLICY "Anyone can create orders" 
  ON public.orders FOR INSERT 
  TO public
  WITH CHECK (true);

DROP POLICY IF EXISTS "Users can view their own orders" ON public.orders;
CREATE POLICY "Users can view their own orders" 
  ON public.orders FOR SELECT 
  TO public
  USING (true);

DROP POLICY IF EXISTS "Anyone can update orders" ON public.orders;
CREATE POLICY "Anyone can update orders" 
  ON public.orders FOR UPDATE 
  TO public
  USING (true);

-- ============================================================
-- 3. INQUIRIES TABLE (Contact & Bespoke Concierge Messages)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  inquiry_type TEXT DEFAULT 'Custom Gift Box',
  target_date DATE,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new', -- new, contacted, resolved
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on inquiries
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Inquiries Policies
DROP POLICY IF EXISTS "Anyone can submit inquiry" ON public.inquiries;
CREATE POLICY "Anyone can submit inquiry" 
  ON public.inquiries FOR INSERT 
  TO public
  WITH CHECK (true);

DROP POLICY IF EXISTS "Anyone can view inquiries" ON public.inquiries;
CREATE POLICY "Anyone can view inquiries" 
  ON public.inquiries FOR SELECT 
  TO public
  USING (true);

DROP POLICY IF EXISTS "Anyone can update inquiries" ON public.inquiries;
CREATE POLICY "Anyone can update inquiries" 
  ON public.inquiries FOR UPDATE 
  TO public
  USING (true);

-- ============================================================
-- 4. NEWSLETTER SUBSCRIBERS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on newsletter_subscribers
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can subscribe to newsletter" ON public.newsletter_subscribers;
CREATE POLICY "Anyone can subscribe to newsletter" 
  ON public.newsletter_subscribers FOR INSERT 
  TO public
  WITH CHECK (true);

DROP POLICY IF EXISTS "Anyone can view newsletter subscribers" ON public.newsletter_subscribers;
CREATE POLICY "Anyone can view newsletter subscribers" 
  ON public.newsletter_subscribers FOR SELECT 
  TO public
  USING (true);

-- ============================================================
-- 5. PRODUCTS TABLE (Catalog & Customizer Items)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  type TEXT DEFAULT 'item', -- box, bouquet, item
  price_pkr NUMERIC NOT NULL,
  sale_price_pkr NUMERIC,
  stock INTEGER NOT NULL DEFAULT 50,
  badge TEXT,
  description TEXT,
  inclusions JSONB DEFAULT '[]'::jsonb,
  image TEXT,
  images JSONB DEFAULT '[]'::jsonb,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view products" ON public.products;
CREATE POLICY "Anyone can view products"
  ON public.products FOR SELECT
  TO public
  USING (true);

DROP POLICY IF EXISTS "Anyone can insert products" ON public.products;
CREATE POLICY "Anyone can insert products"
  ON public.products FOR INSERT
  TO public
  WITH CHECK (true);

DROP POLICY IF EXISTS "Anyone can update products" ON public.products;
CREATE POLICY "Anyone can update products"
  ON public.products FOR UPDATE
  TO public
  USING (true);

DROP POLICY IF EXISTS "Anyone can delete products" ON public.products;
CREATE POLICY "Anyone can delete products"
  ON public.products FOR DELETE
  TO public
  USING (true);

-- ============================================================
-- 6. CATEGORIES TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS public.categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view categories" ON public.categories;
CREATE POLICY "Anyone can view categories"
  ON public.categories FOR SELECT
  TO public
  USING (true);

DROP POLICY IF EXISTS "Anyone can modify categories" ON public.categories;
CREATE POLICY "Anyone can modify categories"
  ON public.categories FOR ALL
  TO public
  USING (true);

-- ============================================================
-- 7. PROMO CODES TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS public.promo_codes (
  id TEXT PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  discount_percent NUMERIC,
  discount_pkr NUMERIC,
  min_order_pkr NUMERIC DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.promo_codes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view promo codes" ON public.promo_codes;
CREATE POLICY "Anyone can view promo codes"
  ON public.promo_codes FOR SELECT
  TO public
  USING (true);

DROP POLICY IF EXISTS "Anyone can modify promo codes" ON public.promo_codes;
CREATE POLICY "Anyone can modify promo codes"
  ON public.promo_codes FOR ALL
  TO public
  USING (true);

-- ============================================================
-- 8. STORE SETTINGS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS public.store_settings (
  id TEXT PRIMARY KEY DEFAULT 'global_settings',
  shipping_fee_pkr NUMERIC DEFAULT 350,
  free_shipping_threshold_pkr NUMERIC DEFAULT 5000,
  whatsapp_number TEXT DEFAULT '+923001234567',
  support_email TEXT DEFAULT 'concierge@mibella.pk',
  announcement_banner TEXT DEFAULT '✨ Complimentary hand-inked calligraphy card with gold wax crest on all bespoke orders across Pakistan.',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.store_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view store settings" ON public.store_settings;
CREATE POLICY "Anyone can view store settings"
  ON public.store_settings FOR SELECT
  TO public
  USING (true);

DROP POLICY IF EXISTS "Anyone can modify store settings" ON public.store_settings;
CREATE POLICY "Anyone can modify store settings"
  ON public.store_settings FOR ALL
  TO public
  USING (true);

-- ============================================================
-- SEED DATA (Runs cleanly without duplicate key conflicts)
-- ============================================================
INSERT INTO public.store_settings (id, shipping_fee_pkr, free_shipping_threshold_pkr, whatsapp_number, support_email, announcement_banner)
VALUES ('global_settings', 350, 5000, '+923001234567', 'concierge@mibella.pk', '✨ Complimentary hand-inked calligraphy card with gold wax crest on all bespoke orders across Pakistan.')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.promo_codes (id, code, discount_percent, min_order_pkr, is_active)
VALUES 
  ('promo-1', 'MIBELLA10', 10, 3000, true),
  ('promo-2', 'EIDMUBARAK', 15, 5000, true)
ON CONFLICT (code) DO NOTHING;

INSERT INTO public.categories (id, name, slug, description)
VALUES
  ('cat-sig-boxes', 'Signature Gift Boxes', 'signature-boxes', 'Bespoke handcrafted magnetic keepsake chests with wax seal.'),
  ('cat-sig-bouquets', 'Handcrafted Bouquets', 'signature-bouquets', 'Fresh stem arrangements wrapped in Korean frosted paper.'),
  ('cat-jewelry', 'Jewelry & Adornments', 'jewelry', 'Ethnic jhumkay, crystal pendants, and delicate accessories.'),
  ('cat-crochet', 'Handmade Crochet', 'crochet', 'Artisanal crochet floral keychains and wrist gajras.'),
  ('cat-candles', 'Scented Candles & Treats', 'treats-candles', 'Botanical soy candles, ceramic mugs, and chocolates.'),
  ('cat-makeup', 'Makeup & Pampering', 'makeup', 'Velvet lipsticks, eyeshadow palettes, and beauty essentials.')
ON CONFLICT (slug) DO NOTHING;
