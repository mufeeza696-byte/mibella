# MIBELLA — Customized Gift Boxes & Bouquets Platform
## Complete Project Specification & Technical Proposal

---

### Executive Summary

**MIBELLA** is an upscale, interactive e-commerce platform crafted to revolutionize the gifting experience. Unlike traditional online florists or standard gift shops, MIBELLA empowers customers to curate, assemble, and personalize custom gift boxes and artisanal floral bouquets through an intuitive, interactive builder.

This document outlines the complete scope of work, user experience specifications, architectural design, database planning, and delivery milestones. It serves as both a client proposal and the master blueprint for design and technical execution.

---

### 1. Platform Vision & Core Value Proposition

* **Personalized Gifting Experience:** Moving beyond rigid, pre-packaged baskets. Customers can select everything from the box style and ribbons to individual items (perfumes, chocolates, candles, mugs, accessories) and fresh floral stems.
* **Frictionless Journey:** A fluid step-by-step visual customizer with real-time price calculation and live visual preview.
* **Premium Unboxing Aesthetic:** Designed for the modern luxury consumer, focusing on warm, elegant visuals, smooth micro-interactions, and mobile responsiveness.
* **Smart Gifting Logistics:** Support for scheduled delivery dates, personalized printed message cards with optional photo uploads, and recipient-first delivery workflows.

---

### 2. Key Features & Functional Specifications

#### 2.1 The Custom Gift Box Builder
* **Step 1: Box Selection:** Choose box size (Small, Medium, Grande, Deluxe), color finish (Matte Blush, Ivory Cream, Midnight Black, Earth Sage), and shape (Square, Rectangular, Round Hatbox).
* **Step 2: Item Curation:** Filter curated items by category (Treats & Confections, Self-Care & Fragrance, Keepsakes, Drinkware). Visual capacity indicators inform the user how many items fit comfortably.
* **Step 3: Greeting Card & Media Personalization:**
  * Select card theme (Birthday, Anniversary, Thank You, Romantic, Congratulations).
  * Write a custom message with live preview of typography.
  * Optional customer photo upload for a printed keepsake memory card.
* **Step 4: Ribbon & Finishing Touches:** Pick ribbon material/color (Silk Satin, Velvet, Linen) and unboxing seals (Wax seal, floral sprig accent).
* **Live Cost Tracker:** Dynamic pricing updates instantly as items are added or upgraded.

#### 2.2 The Custom Bouquet Builder
* **Stem & Flower Selection:** Select base blooms (Roses, Peonies, Lilies, Orchids, Tulips) and accent foliage (Eucalyptus, Baby's Breath, Ruscus).
* **Arrangement Size & Palette:** Choose color themes (Pastel Romance, Vibrant Sunshine, Monochrome Classic) and volume.
* **Packaging & Wrapping:** Selection of wrapping paper textures (Kraft, Matte Pearl, Translucent Frost) and matching satin ties.
* **Add-On Accents:** Option to attach balloons, mini chocolates, or plush keepsakes directly to the bouquet.

#### 2.3 Ready-to-Ship Curated Collections
* Pre-designed, ready-to-order gift hampers and bouquets for rapid gifting (express delivery).
* Categorized by occasion, recipient (For Her, For Him, Corporate), and price point.

#### 2.4 Gifting & Checkout Logistics
* **Dual Checkout Flow:** Seamless guest checkout (no mandatory account creation before purchase) alongside saved customer accounts.
* **Delivery Date & Time Slot Picker:** Customers select the exact date they want their gift delivered.
* **Recipient Details vs. Buyer Details:** Clear separation so receipts and invoices are sent strictly to the buyer, while the package contains only gift presentation materials.
* **Multiple Payment Methods:** Credit/Debit Cards, Google Pay / Apple Pay, and local preferred payment gateways.

#### 2.5 User Accounts & Customer Portal
* **Order Tracking & Live Status:** Real-time progress updates (*Received*, *Handcrafted & Packed*, *Out for Delivery*, *Delivered*).
* **Saved Gift Box Designs:** Ability to save unfinished box designs to complete later.
* **Recipient Address Book:** Save addresses for family, friends, and colleagues with important recurring dates (Birthdays, Anniversaries) and reminder alerts.

#### 2.6 Admin & Merchant Management Portal
* **Visual Order Management:** Admins view packing slips complete with photos of selected items, custom card messages, and delivery dates.
* **Customization Catalog Manager:** Easily add/remove gift items, floral inventory, box types, and ribbons, with stock-level monitoring.
* **Promotions & Promo Codes:** Percentage or fixed amount discounts, gift-with-purchase campaigns.
* **Analytics & Reports:** Average order value, best-selling gift items, top delivery destinations, and seasonal peak trends.

---

### 3. Technical Architecture & Tech Stack

| Layer | Technology | Key Benefit & Client Value |
| :--- | :--- | :--- |
| **Frontend Framework** | **Next.js (App Router, React, TypeScript)** | Lightning-fast page loads, superior Google SEO indexing, zero-lag server-side rendering, and rock-solid code reliability. |
| **Styling & Design System** | **Tailwind CSS + Shadcn UI** | High-end luxury aesthetics with fully customizable, responsive, and accessible components. Mobile-first design. |
| **Client State Management** | **TanStack React Query** | Instantaneous, cached data fetching; zero page flickering during custom box building and cart updates. |
| **Authentication & Database** | **Supabase (PostgreSQL & Auth)** | Enterprise-grade database security (Row Level Security), social logins (Google, Apple, Email), and lightning-fast queries. |
| **Media & Asset Storage** | **Supabase Storage (CDN backed)** | Secure hosting for high-resolution product photography and customer-uploaded card photos. |
| **Hosting & Deployment** | **Vercel / Cloud Edge** | 99.99% uptime, worldwide low-latency content distribution, and automated CI/CD pipelines. |

---

### 4. Database Architecture (High-Level Schema)

* **`users` / `profiles`:** Customer accounts, contact info, loyalty points, user roles (`customer`, `admin`).
* **`categories` & `products`:** Base gift items, flower varieties, ready-to-ship gifts, pricing, dimensions, and inventory counts.
* **`custom_boxes` & `box_options`:** Box dimensions, capacity limits, color variations, and ribbon options.
* **`custom_box_items`:** Individual items selected inside an unfinished or ordered custom box.
* **`orders` & `order_items`:** Full transaction history, buyer info, recipient shipping info, scheduled delivery date, tracking numbers, and payment status.
* **`gift_cards_messages`:** Custom greeting card text, chosen card template, and uploaded image URLs.

---

### 5. Implementation Roadmap & Project Phases

1. **Phase 1 — Project Architecture & Database Modeling:** Next.js project initialization, Shadcn UI setup, Supabase environment configuration, and database tables.
2. **Phase 2 — The Interactive Customizer & Catalog:** Step-by-step custom box builder, bouquet selector, dynamic price calculation, and curated product listings.
3. **Phase 3 — Cart, Gifting Logistics & Checkout:** Cart drawer, calendar date-slot picker, custom card personalization engine, and payment integration.
4. **Phase 4 — Admin Fulfillment Portal & User Accounts:** Admin dashboard for reviewing customized packing slips, updating order statuses, and customer tracking portals.
5. **Phase 5 — Testing, SEO & Launch:** End-to-end purchasing tests, mobile responsiveness audits, SEO metadata optimization, and domain launch.

---

### 6. Client Input Checklist (Ready for Client Review)

To tailor the visual identity and catalog precisely to the brand vision, the client is invited to provide:
1. **Brand Identity:** Logo files (vector/SVG preferred), preferred brand colors (or moodboards), and brand typography.
2. **Product Catalog & Inventory Data:** Initial list of gift items, bouquet offerings, box styles, and pricing models.
3. **Inspiration & Competitor References:** Links to websites whose aesthetics, customizer flows, or unboxing experiences you admire.
4. **Payment Gateway Preference:** Preferred merchant account (Stripe, PayPal, or regional gateways).
5. **Delivery Parameters:** Local delivery radius, standard courier coverage, and minimum lead time required for custom handcrafted boxes/bouquets.
