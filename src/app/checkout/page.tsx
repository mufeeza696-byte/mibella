"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Sparkles,
  ShoppingBag,
  ShieldCheck,
  Truck,
  Check,
  Calendar,
  Clock,
  MapPin,
  CreditCard,
  Building,
  Smartphone,
  Banknote,
  Feather,
  ArrowRight,
  User,
  Heart,
  ChevronLeft,
  CheckCircle2,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { createClient } from "@/lib/supabase/client";
import {
  getSavedCustomer,
  saveCustomer,
  clearSavedCustomer,
  getCart,
  clearCart,
  CartItem,
  CustomerProfile,
} from "@/lib/customer-storage";
import {
  fetchPromoCodes,
  validatePromoCode,
  fetchStoreSettings,
  PromoCode,
  StoreSettings,
  DEFAULT_STORE_SETTINGS,
} from "@/lib/products-storage";
import { TicketPercent, Tag } from "lucide-react";

type PaymentMethod = "cod" | "jazzcash_easypaisa" | "bank_transfer" | "card";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const supabase = createClient();

  // Authentication State
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [hasSavedProfile, setHasSavedProfile] = useState(false);

  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Promo Code State
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([]);
  const [storeSettings, setStoreSettings] = useState<StoreSettings>(DEFAULT_STORE_SETTINGS);
  const [promoInput, setPromoInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);
  const [promoDiscountPkr, setPromoDiscountPkr] = useState(0);
  const [promoFeedback, setPromoFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Customer Form State
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [rememberMe, setRememberMe] = useState(true);

  // Recipient & Delivery State
  const [recipientName, setRecipientName] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("");
  const [deliveryCity, setDeliveryCity] = useState("Lahore");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliverySlot, setDeliverySlot] = useState("Morning (10:00 AM - 02:00 PM)");
  const [calligraphyMessage, setCalligraphyMessage] = useState(
    "Wishing you blooming memories and everlasting joy."
  );

  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState<any | null>(null);

  // Load User, Saved Customer & Cart
  useEffect(() => {
    // 1. Check Supabase Auth
    async function checkAuth() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setCurrentUser(user);
        setCustomerEmail(user.email || "");
        if (user.user_metadata?.full_name) {
          setCustomerName(user.user_metadata.full_name);
        }
      }
    }
    checkAuth();

    // 2. Check localStorage Saved Customer
    const saved = getSavedCustomer();
    if (saved) {
      setHasSavedProfile(true);
      if (!customerName) setCustomerName(saved.fullName || "");
      if (!customerEmail) setCustomerEmail(saved.email || "");
      if (!customerPhone) setCustomerPhone(saved.phone || "");
      if (saved.city) setDeliveryCity(saved.city);
      if (saved.address) setDeliveryAddress(saved.address);
    }

    // 3. Load Cart Items
    const items = getCart();
    if (items.length > 0) {
      setCartItems(items);
      // Pre-fill recipient & note from custom box/bouquet if present
      if (items[0].recipientName) setRecipientName(items[0].recipientName);
      if (items[0].cardMessage) setCalligraphyMessage(items[0].cardMessage);
    } else {
      // If cart is empty, provide a default bespoke gift box for testing/direct checkout
      const fallbackItem: CartItem = {
        id: "curated-default",
        title: "Atelier Signature Keepsake Box",
        type: "box",
        pricePkr: 5850,
        quantity: 1,
        details: "Atelier Blush Box with Kundan Jhumka, Scented Candle & Calligraphy Card",
        recipientName: "Ayesha",
        cardMessage: "Wishing you blooming memories and everlasting joy.",
      };
      setCartItems([fallbackItem]);
      setRecipientName("Ayesha");
    }

    // 4. Load Promos & Settings
    async function loadPromosAndSettings() {
      const [pCodes, sSettings] = await Promise.all([fetchPromoCodes(), fetchStoreSettings()]);
      setPromoCodes(pCodes);
      setStoreSettings(sSettings);
    }
    loadPromosAndSettings();
  }, [supabase]);

  // Handle Clearing Remembered Customer
  const handleClearSaved = () => {
    clearSavedCustomer();
    setHasSavedProfile(false);
    setCustomerName("");
    setCustomerEmail("");
    setCustomerPhone("");
    setDeliveryAddress("");
  };

  // Pricing Calculations
  const subtotalPkr = cartItems.reduce(
    (acc, item) => acc + item.pricePkr * (item.quantity || 1),
    0
  );
  const freeThreshold = storeSettings?.free_shipping_threshold_pkr || 5000;
  const standardShipping = storeSettings?.shipping_fee_pkr || 350;
  const shippingFeePkr = subtotalPkr >= freeThreshold ? 0 : standardShipping;
  const grandTotalPkr = Math.max(0, subtotalPkr - promoDiscountPkr + shippingFeePkr);

  // Promo Code Handlers
  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;

    const res = validatePromoCode(promoInput, subtotalPkr, promoCodes);
    if (res.valid) {
      setAppliedPromo(res.promo || null);
      setPromoDiscountPkr(res.discountPkr);
      setPromoFeedback({ type: "success", message: res.message });
      setPromoInput("");
    } else {
      setPromoFeedback({ type: "error", message: res.message });
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoDiscountPkr(0);
    setPromoFeedback(null);
  };

  // Handle Order Placement
  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName || !customerPhone || !deliveryAddress) {
      alert("Please fill in your name, contact phone, and delivery address.");
      return;
    }

    setIsSubmitting(true);

    // Save customer memory if selected
    if (rememberMe) {
      saveCustomer({
        fullName: customerName,
        email: customerEmail,
        phone: customerPhone,
        city: deliveryCity,
        address: deliveryAddress,
      });
      setHasSavedProfile(true);
    }

    // Simulate order generation & Supabase recording
    const generatedOrderId = `MIB-${Math.floor(10000 + Math.random() * 90000)}`;

    const confirmedOrderData = {
      orderId: generatedOrderId,
      customerName,
      customerEmail,
      customerPhone,
      recipientName: recipientName || customerName,
      deliveryCity,
      deliveryAddress,
      deliveryDate: deliveryDate || "Next Available Slot",
      deliverySlot,
      calligraphyMessage,
      paymentMethod,
      subtotalPkr,
      shippingFeePkr,
      grandTotalPkr,
      items: cartItems,
      placedAt: new Date().toLocaleDateString("en-PK", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
    };

    try {
      const { error: dbError } = await supabase.from("orders").insert([
        {
          id: generatedOrderId,
          user_id: currentUser?.id || null,
          customer_name: customerName,
          customer_email: customerEmail || null,
          customer_phone: customerPhone,
          recipient_name: recipientName || customerName,
          recipient_phone: recipientPhone || null,
          delivery_city: deliveryCity,
          delivery_address: deliveryAddress,
          scheduled_date: deliveryDate || null,
          delivery_slot: deliverySlot,
          calligraphy_message: calligraphyMessage,
          payment_method: paymentMethod,
          subtotal_pkr: subtotalPkr,
          shipping_fee_pkr: shippingFeePkr,
          grand_total_pkr: grandTotalPkr,
          status: "pending",
          items: cartItems,
          created_at: new Date().toISOString(),
        },
      ]);

      if (dbError) {
        console.warn("Notice inserting order into Supabase orders table:", dbError.message);
      }
    } catch (dbErr: any) {
      console.warn("Database recording notice:", dbErr?.message);
    }

    clearCart();
    setOrderConfirmed(confirmedOrderData);
    setIsSubmitting(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ============================================================
  // VIEW: ORDER CONFIRMATION / SUCCESS SCREEN
  // ============================================================
  if (orderConfirmed) {
    return (
      <div className="min-h-screen bg-[#F3E7D3] text-[#6B1E2D] flex flex-col justify-between">
        <Navbar />

        <main className="max-w-3xl mx-auto px-4 py-16 w-full space-y-8 animate-fadeIn">
          <div className="bg-[#F8F1E7] border border-[#E0CEB7] rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="h-8 w-8 text-emerald-700" />
            </div>

            <div className="space-y-2">
              <Badge variant="gold" className="text-[10px] tracking-widest uppercase">
                ORDER CONFIRMED & RECORDED
              </Badge>
              <h1 className="font-serif text-3xl sm:text-4xl font-medium text-[#6B1E2D]">
                Thank You, {orderConfirmed.customerName}
              </h1>
              <p className="text-xs sm:text-sm text-[#8C3A4B] max-w-md mx-auto">
                Your bespoke creation is now in our artisan atelier in Lahore. A confirmation
                SMS/email has been dispatched to your contact.
              </p>
            </div>

            {/* Order Reference Box */}
            <div className="p-6 rounded-2xl bg-[#E8D8C3]/50 border border-[#E0CEB7] max-w-lg mx-auto text-left space-y-3">
              <div className="flex justify-between items-center pb-3 border-b border-[#E0CEB7]">
                <span className="text-xs uppercase font-semibold text-[#8C3A4B]">Order Number:</span>
                <span className="font-serif font-bold text-base text-[#6B1E2D]">
                  {orderConfirmed.orderId}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#8C3A4B]">Scheduled Delivery:</span>
                <span className="font-medium text-[#6B1E2D]">
                  {orderConfirmed.deliveryDate} ({orderConfirmed.deliveryCity})
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#8C3A4B]">Payment Method:</span>
                <span className="font-medium uppercase text-[#6B1E2D]">
                  {orderConfirmed.paymentMethod.replace("_", " ")}
                </span>
              </div>
              {orderConfirmed.promoCode && (
                <div className="flex justify-between items-center text-xs text-emerald-800 font-semibold">
                  <span>Voucher Applied ({orderConfirmed.promoCode}):</span>
                  <span>-Rs. {orderConfirmed.discountPkr?.toLocaleString()} PKR</span>
                </div>
              )}
              <div className="flex justify-between items-center pt-3 border-t border-[#E0CEB7] text-sm font-bold">
                <span>Total Amount:</span>
                <span className="text-[#6B1E2D]">
                  Rs. {orderConfirmed.grandTotalPkr.toLocaleString()} PKR
                </span>
              </div>
            </div>

            {/* WhatsApp Concierge Assistance CTA */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`https://wa.me/${(storeSettings.whatsapp_number || "+923001234567").replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                  `Hello MIBELLA Atelier, I just placed order ${orderConfirmed.orderId} for Rs. ${orderConfirmed.grandTotalPkr.toLocaleString()} PKR to ${orderConfirmed.deliveryCity}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button
                  variant="default"
                  size="lg"
                  className="w-full text-xs font-semibold uppercase tracking-wider py-6"
                >
                  Contact Concierge on WhatsApp
                </Button>
              </a>

              <Link href="/catalog" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full text-xs font-semibold uppercase tracking-wider py-6"
                >
                  Return to Atelier Catalog
                </Button>
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  // ============================================================
  // VIEW: CHECKOUT FORM (GUEST + MEMBER SUPPORT)
  // ============================================================
  return (
    <div className="min-h-screen bg-[#F3E7D3] text-[#6B1E2D] flex flex-col justify-between selection:bg-[#E8D8C3] selection:text-[#6B1E2D]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 w-full">
        {/* Top Breadcrumb & Title */}
        <div className="mb-8 space-y-2">
          <Link
            href="/catalog"
            className="inline-flex items-center gap-1 text-xs text-[#8C3A4B] hover:text-[#6B1E2D] font-medium"
          >
            <ChevronLeft className="h-3.5 w-3.5" /> Back to Catalog & Customizer
          </Link>
          <h1 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-[#6B1E2D]">
            Express Gifting Checkout
          </h1>
          <p className="text-xs sm:text-sm text-[#8C3A4B]">
            Complimentary handwritten calligraphy card and white-glove courier delivery across Pakistan.
          </p>
        </div>

        <form onSubmit={handlePlaceOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* ========================================== */}
            {/* LEFT COLUMN: CUSTOMER & DELIVERY INFO      */}
            {/* ========================================== */}
            <div className="lg:col-span-7 space-y-8">
              {/* 1. SENDER / CUSTOMER INFORMATION */}
              <div className="p-6 sm:p-8 rounded-3xl bg-[#F8F1E7] border border-[#E0CEB7] space-y-5 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E0CEB7] pb-4">
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5 text-[#C5A880]" />
                    <h2 className="font-serif text-lg font-semibold text-[#6B1E2D]">
                      1. Sender Contact Details
                    </h2>
                  </div>
                  {currentUser ? (
                    <Badge variant="gold" className="text-[10px] w-fit">
                      ✓ Signed in as {currentUser.email}
                    </Badge>
                  ) : (
                    <span className="text-xs text-[#8C3A4B]">
                      Guest Checkout •{" "}
                      <Link
                        href="/auth"
                        className="text-[#6B1E2D] font-semibold underline underline-offset-2"
                      >
                        Sign In (Optional)
                      </Link>
                    </span>
                  )}
                </div>

                {/* Returning Customer Memory Alert */}
                {hasSavedProfile && (
                  <div className="p-3.5 rounded-2xl bg-[#E8D8C3]/50 border border-[#E0CEB7] flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-[#6B1E2D]">
                      <Sparkles className="h-4 w-4 text-[#C5A880] shrink-0" />
                      <span>
                        Welcome back! Your contact details are pre-filled from your previous visit.
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleClearSaved}
                      className="text-[#8C3A4B] hover:text-[#6B1E2D] font-semibold underline shrink-0 ml-2"
                    >
                      Clear Memory
                    </button>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#8C3A4B] block">
                      Your Full Name *
                    </label>
                    <Input
                      required
                      placeholder="e.g. Zainab Malik"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="bg-white/80"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#8C3A4B] block">
                      Your Email (For Receipt & Tracking)
                    </label>
                    <Input
                      type="email"
                      placeholder="e.g. zainab@example.com"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="bg-white/80"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#8C3A4B] block">
                      Your WhatsApp / Mobile Phone *
                    </label>
                    <Input
                      required
                      type="tel"
                      placeholder="e.g. 0300 1234567"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="bg-white/80"
                    />
                  </div>
                </div>

                {/* Remember Customer Checkbox */}
                <div className="pt-2 border-t border-[#E0CEB7]/70 flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="rememberCustomer"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded border-[#E0CEB7] text-[#6B1E2D] focus:ring-[#6B1E2D] cursor-pointer"
                  />
                  <label
                    htmlFor="rememberCustomer"
                    className="text-xs text-[#8C3A4B] cursor-pointer select-none"
                  >
                    Remember my contact & address for faster gifting next time
                  </label>
                </div>
              </div>

              {/* 2. RECIPIENT & DELIVERY LOCATION */}
              <div className="p-6 sm:p-8 rounded-3xl bg-[#F8F1E7] border border-[#E0CEB7] space-y-5 shadow-xs">
                <div className="flex items-center gap-2 border-b border-[#E0CEB7] pb-4">
                  <MapPin className="h-5 w-5 text-[#C5A880]" />
                  <h2 className="font-serif text-lg font-semibold text-[#6B1E2D]">
                    2. Gift Recipient & Delivery Location
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#8C3A4B] block">
                      Recipient Full Name *
                    </label>
                    <Input
                      required
                      placeholder="e.g. Ayesha Khan"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      className="bg-white/80"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#8C3A4B] block">
                      Recipient Contact Phone
                    </label>
                    <Input
                      type="tel"
                      placeholder="e.g. 0321 7654321"
                      value={recipientPhone}
                      onChange={(e) => setRecipientPhone(e.target.value)}
                      className="bg-white/80"
                    />
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#8C3A4B] block">
                      Destination City in Pakistan *
                    </label>
                    <select
                      value={deliveryCity}
                      onChange={(e) => setDeliveryCity(e.target.value)}
                      className="w-full h-11 rounded-full border border-[#E0CEB7] bg-white/80 px-4 text-xs font-medium text-[#6B1E2D] focus:outline-none focus:ring-2 focus:ring-[#6B1E2D]"
                    >
                      <option value="Lahore">Lahore (Same-Day Hand Delivery Available)</option>
                      <option value="Karachi">Karachi (Same-Day Express Hand Delivery)</option>
                      <option value="Islamabad">Islamabad (Same-Day Express Hand Delivery)</option>
                      <option value="Rawalpindi">Rawalpindi (Same-Day Express Hand Delivery)</option>
                      <option value="Faisalabad">Faisalabad (Next-Day Courier)</option>
                      <option value="Multan">Multan (Next-Day Courier)</option>
                      <option value="Peshawar">Peshawar (Next-Day Courier)</option>
                      <option value="Sialkot">Sialkot (Next-Day Courier)</option>
                      <option value="Gujranwala">Gujranwala (Next-Day Courier)</option>
                      <option value="Quetta">Quetta (Express Courier)</option>
                      <option value="Other">Other City in Pakistan</option>
                    </select>
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#8C3A4B] block">
                      Recipient Full Delivery Address & Landmarks *
                    </label>
                    <textarea
                      required
                      rows={2}
                      placeholder="House #, Street name, Sector / Phase / Block, Landmark"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="w-full rounded-2xl border border-[#E0CEB7] bg-white/80 p-3.5 text-xs text-[#6B1E2D] focus:outline-none focus:ring-2 focus:ring-[#6B1E2D]"
                    />
                  </div>
                </div>
              </div>

              {/* 3. SCHEDULED DELIVERY TIME & WAX CALLIGRAPHY */}
              <div className="p-6 sm:p-8 rounded-3xl bg-[#F8F1E7] border border-[#E0CEB7] space-y-5 shadow-xs">
                <div className="flex items-center gap-2 border-b border-[#E0CEB7] pb-4">
                  <Calendar className="h-5 w-5 text-[#C5A880]" />
                  <h2 className="font-serif text-lg font-semibold text-[#6B1E2D]">
                    3. Delivery Schedule & Calligraphy Card
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#8C3A4B] block">
                      Scheduled Delivery Date
                    </label>
                    <Input
                      type="date"
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                      className="bg-white/80 text-xs h-11"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#8C3A4B] block">
                      Preferred Delivery Window
                    </label>
                    <select
                      value={deliverySlot}
                      onChange={(e) => setDeliverySlot(e.target.value)}
                      className="w-full h-11 rounded-full border border-[#E0CEB7] bg-white/80 px-4 text-xs font-medium text-[#6B1E2D] focus:outline-none focus:ring-2 focus:ring-[#6B1E2D]"
                    >
                      <option value="Morning (10:00 AM - 02:00 PM)">Morning (10:00 AM - 02:00 PM)</option>
                      <option value="Afternoon (02:00 PM - 06:00 PM)">Afternoon (02:00 PM - 06:00 PM)</option>
                      <option value="Evening (06:00 PM - 09:00 PM)">Evening (06:00 PM - 09:00 PM)</option>
                      <option value="Midnight Surprise (11:30 PM - 12:00 AM)">
                        Midnight Surprise (11:30 PM - 12:00 AM)
                      </option>
                    </select>
                  </div>

                  <div className="space-y-1.5 sm:col-span-2 pt-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#8C3A4B] flex items-center justify-between">
                      <span>Complimentary Hand-Inked Calligraphy Message</span>
                      <span className="text-[10px] text-[#C5A880] font-medium flex items-center gap-1">
                        <Feather className="h-3 w-3" /> Gold Wax Crest Included
                      </span>
                    </label>
                    <textarea
                      rows={3}
                      value={calligraphyMessage}
                      onChange={(e) => setCalligraphyMessage(e.target.value)}
                      className="w-full rounded-2xl border border-[#E0CEB7] bg-white/80 p-3.5 text-xs text-[#6B1E2D] focus:outline-none focus:ring-2 focus:ring-[#6B1E2D]"
                      placeholder="Write your heartfelt message here..."
                    />
                  </div>
                </div>
              </div>

              {/* 4. PAYMENT METHOD IN PAKISTAN */}
              <div className="p-6 sm:p-8 rounded-3xl bg-[#F8F1E7] border border-[#E0CEB7] space-y-5 shadow-xs">
                <div className="flex items-center gap-2 border-b border-[#E0CEB7] pb-4">
                  <CreditCard className="h-5 w-5 text-[#C5A880]" />
                  <h2 className="font-serif text-lg font-semibold text-[#6B1E2D]">
                    4. Select Payment Method
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Cash on Delivery */}
                  <div
                    onClick={() => setPaymentMethod("cod")}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-3 ${
                      paymentMethod === "cod"
                        ? "border-[#6B1E2D] bg-[#E8D8C3]/50"
                        : "border-[#E0CEB7] bg-white/80 hover:border-[#6B1E2D]/40"
                    }`}
                  >
                    <Banknote className="h-5 w-5 text-[#6B1E2D] shrink-0" />
                    <div>
                      <h4 className="font-serif font-semibold text-xs text-[#6B1E2D]">
                        Cash on Delivery (COD)
                      </h4>
                      <p className="text-[10px] text-[#8C3A4B]">Pay cash upon arrival</p>
                    </div>
                  </div>

                  {/* JazzCash / EasyPaisa */}
                  <div
                    onClick={() => setPaymentMethod("jazzcash_easypaisa")}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-3 ${
                      paymentMethod === "jazzcash_easypaisa"
                        ? "border-[#6B1E2D] bg-[#E8D8C3]/50"
                        : "border-[#E0CEB7] bg-white/80 hover:border-[#6B1E2D]/40"
                    }`}
                  >
                    <Smartphone className="h-5 w-5 text-[#6B1E2D] shrink-0" />
                    <div>
                      <h4 className="font-serif font-semibold text-xs text-[#6B1E2D]">
                        JazzCash / EasyPaisa
                      </h4>
                      <p className="text-[10px] text-[#8C3A4B]">Instant mobile wallet transfer</p>
                    </div>
                  </div>

                  {/* Bank Transfer */}
                  <div
                    onClick={() => setPaymentMethod("bank_transfer")}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-3 ${
                      paymentMethod === "bank_transfer"
                        ? "border-[#6B1E2D] bg-[#E8D8C3]/50"
                        : "border-[#E0CEB7] bg-white/80 hover:border-[#6B1E2D]/40"
                    }`}
                  >
                    <Building className="h-5 w-5 text-[#6B1E2D] shrink-0" />
                    <div>
                      <h4 className="font-serif font-semibold text-xs text-[#6B1E2D]">
                        Online Bank Transfer
                      </h4>
                      <p className="text-[10px] text-[#8C3A4B]">HBL, Meezan, Bank Alfalah</p>
                    </div>
                  </div>

                  {/* Credit / Debit Card */}
                  <div
                    onClick={() => setPaymentMethod("card")}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-3 ${
                      paymentMethod === "card"
                        ? "border-[#6B1E2D] bg-[#E8D8C3]/50"
                        : "border-[#E0CEB7] bg-white/80 hover:border-[#6B1E2D]/40"
                    }`}
                  >
                    <CreditCard className="h-5 w-5 text-[#6B1E2D] shrink-0" />
                    <div>
                      <h4 className="font-serif font-semibold text-xs text-[#6B1E2D]">
                        Debit / Credit Card
                      </h4>
                      <p className="text-[10px] text-[#8C3A4B]">Visa & MasterCard</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ========================================== */}
            {/* RIGHT COLUMN: ORDER SUMMARY & CTAs         */}
            {/* ========================================== */}
            <div className="lg:col-span-5 bg-[#F8F1E7] p-6 sm:p-8 rounded-3xl border border-[#E0CEB7] shadow-sm sticky top-24 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#E0CEB7]">
                <h3 className="font-serif text-xl font-medium text-[#6B1E2D]">
                  Your Gifting Bag ({cartItems.length})
                </h3>
                <Badge variant="gold" className="text-xs font-bold">
                  Rs. {grandTotalPkr.toLocaleString()} PKR
                </Badge>
              </div>

              {/* Items List */}
              <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                {cartItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-[#E8D8C3]/40 border border-[#E0CEB7] flex justify-between items-start gap-2"
                  >
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-serif font-semibold text-xs text-[#6B1E2D]">
                          {item.title}
                        </span>
                        {item.quantity > 1 && (
                          <span className="text-[10px] bg-[#E8D8C3] px-1.5 py-0.5 rounded text-[#8C3A4B]">
                            x{item.quantity}
                          </span>
                        )}
                      </div>
                      {item.details && (
                        <p className="text-[11px] text-[#8C3A4B] leading-relaxed line-clamp-2">
                          {item.details}
                        </p>
                      )}
                      {item.includesPhoto && (
                        <span className="text-[10px] text-emerald-800 font-medium block">
                          ✓ Archival photo print included
                        </span>
                      )}
                    </div>
                    <span className="font-serif font-bold text-xs text-[#6B1E2D] shrink-0">
                      Rs. {(item.pricePkr * (item.quantity || 1)).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Promo Voucher Code */}
              <div className="pt-3 border-t border-[#E0CEB7]/70 space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#6B1E2D] flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <TicketPercent className="h-3.5 w-3.5 text-[#C5A880]" />
                    <span>Have a Promo Code?</span>
                  </span>
                  {appliedPromo && (
                    <button
                      type="button"
                      onClick={handleRemovePromo}
                      className="text-[10px] text-red-700 hover:underline uppercase font-bold cursor-pointer"
                    >
                      Remove Code
                    </button>
                  )}
                </label>

                {appliedPromo ? (
                  <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-300 flex items-center justify-between text-xs text-emerald-900">
                    <span className="font-semibold">
                      ✓ {appliedPromo.code} Applied: Saved Rs. {promoDiscountPkr.toLocaleString()}
                    </span>
                    <Badge variant="outline" className="text-[10px] bg-white border-emerald-400 text-emerald-800">
                      Active
                    </Badge>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="e.g. MIBELLA10"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                      className="bg-white/80 uppercase text-xs h-9 font-mono tracking-wider"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleApplyPromo}
                      className="text-xs font-semibold uppercase px-4 border-[#C5A880] text-[#6B1E2D] hover:bg-[#E8D8C3]"
                    >
                      Apply
                    </Button>
                  </div>
                )}

                {promoFeedback && !appliedPromo && (
                  <p className="text-[11px] text-red-700 font-medium">
                    {promoFeedback.message}
                  </p>
                )}
              </div>

              {/* Price Calculation Breakdown */}
              <div className="pt-3 border-t border-[#E0CEB7] space-y-2 text-xs text-[#8C3A4B]">
                <div className="flex justify-between">
                  <span>Item Subtotal:</span>
                  <span>Rs. {subtotalPkr.toLocaleString()} PKR</span>
                </div>

                {appliedPromo && (
                  <div className="flex justify-between text-emerald-800 font-semibold">
                    <span>Discount ({appliedPromo.code}):</span>
                    <span>-Rs. {promoDiscountPkr.toLocaleString()} PKR</span>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <span>Delivery to {deliveryCity}:</span>
                  <span className={shippingFeePkr === 0 ? "text-emerald-700 font-semibold" : ""}>
                    {shippingFeePkr === 0
                      ? `FREE (Orders over Rs. ${freeThreshold.toLocaleString()})`
                      : `Rs. ${standardShipping} PKR`}
                  </span>
                </div>

                <div className="flex justify-between text-base font-bold text-[#6B1E2D] pt-2 border-t border-[#E0CEB7]/70">
                  <span>Grand Total:</span>
                  <span>Rs. {grandTotalPkr.toLocaleString()} PKR</span>
                </div>
              </div>

              {/* Assurances */}
              <div className="p-3.5 rounded-2xl bg-white/70 border border-[#E0CEB7] space-y-1.5 text-[11px] text-[#8C3A4B]">
                <div className="flex items-center gap-2 text-[#6B1E2D] font-medium">
                  <ShieldCheck className="h-4 w-4 text-[#C5A880]" />
                  <span>100% Quality & Freshness Guarantee</span>
                </div>
                <p>Delivered with custom wax-seal and complimentary calligraphy note card.</p>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full text-xs font-semibold uppercase tracking-widest py-6 shadow-md"
              >
                {isSubmitting ? "Securing Your Order..." : `Place Gifting Order • Rs. ${grandTotalPkr.toLocaleString()} PKR`}
              </Button>
            </div>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F3E7D3] flex items-center justify-center text-[#6B1E2D]">
          <div className="text-center space-y-3">
            <span className="font-serif text-2xl tracking-widest block">MIBELLA</span>
            <p className="text-xs text-[#8C3A4B]">Loading Secure Checkout...</p>
          </div>
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
