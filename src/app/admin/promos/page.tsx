"use client";

import React, { useState, useEffect } from "react";
import { TicketPercent, Plus, Trash2, Check, RefreshCw, Sparkles, Power } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  PromoCode,
  fetchPromoCodes,
  addPromoCode,
  deletePromoCode,
} from "@/lib/products-storage";

export default function AdminPromosPage() {
  const [promos, setPromos] = useState<PromoCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [code, setCode] = useState("");
  const [discountType, setDiscountType] = useState<"percent" | "fixed">("percent");
  const [discountValue, setDiscountValue] = useState("");
  const [minOrder, setMinOrder] = useState("3000");
  const [isActive, setIsActive] = useState(true);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchPromoCodes();
      setPromos(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreatePromo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim() || !discountValue) return;

    setIsSubmitting(true);
    try {
      const val = parseInt(discountValue) || 0;
      const created = await addPromoCode({
        code: code.trim().toUpperCase(),
        discount_percent: discountType === "percent" ? val : undefined,
        discount_pkr: discountType === "fixed" ? val : undefined,
        min_order_pkr: parseInt(minOrder) || 0,
        is_active: isActive,
      });

      setPromos((prev) => [created, ...prev]);
      setCode("");
      setDiscountValue("");
      showToast(`Promo code "${created.code}" created!`);
    } catch (err: any) {
      alert("Failed to create promo code: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeletePromo = async (id: string, codeName: string) => {
    if (!confirm(`Delete coupon "${codeName}"?`)) return;
    try {
      await deletePromoCode(id);
      setPromos((prev) => prev.filter((p) => p.id !== id));
      showToast(`Coupon "${codeName}" deleted.`);
    } catch (err: any) {
      alert("Failed to delete promo: " + err.message);
    }
  };

  return (
    <div className="space-y-8">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#6B1E2D] text-[#F8F1E7] px-5 py-3 rounded-2xl shadow-2xl text-xs font-semibold flex items-center gap-2.5 animate-in fade-in border border-[#C5A880]">
          <Check className="h-4 w-4 text-[#C5A880]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#F8F1E7] p-6 sm:p-8 rounded-3xl border border-[#E0CEB7] shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] uppercase tracking-widest font-bold text-[#8C3A4B]">
              Marketing & Incentives
            </span>
            <span className="text-xs text-[#8C3A4B]">•</span>
            <Badge variant="gold" className="text-[9px]">
              Coupons Active
            </Badge>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#6B1E2D]">
            Promo Codes & Discounts
          </h1>
          <p className="text-xs text-[#8C3A4B] mt-1 max-w-xl">
            Configure promotional voucher codes for seasonal events, wedding clients, and social campaigns. Codes apply in real-time during checkout.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={loadData}
          disabled={loading}
          className="text-xs font-semibold gap-1.5 border-[#E0CEB7] text-[#6B1E2D]"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Create Form */}
        <Card className="bg-[#F8F1E7] border-[#E0CEB7] h-fit">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-[#E0CEB7]">
              <Plus className="h-4 w-4 text-[#C5A880]" />
              <h2 className="font-serif text-base font-bold text-[#6B1E2D]">
                Create Promo Code
              </h2>
            </div>

            <form onSubmit={handleCreatePromo} className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#6B1E2D]">
                  Voucher Code *
                </label>
                <Input
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  placeholder="e.g. MIBELLA15"
                  className="bg-white/80 border-[#E0CEB7] text-xs h-9 rounded-xl font-mono uppercase tracking-widest"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#6B1E2D]">
                  Discount Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setDiscountType("percent")}
                    className={`py-1.5 text-xs font-semibold rounded-xl border transition-all ${
                      discountType === "percent"
                        ? "bg-[#6B1E2D] text-white border-[#6B1E2D]"
                        : "bg-white/70 text-[#6B1E2D] border-[#E0CEB7]"
                    }`}
                  >
                    Percentage (%)
                  </button>
                  <button
                    type="button"
                    onClick={() => setDiscountType("fixed")}
                    className={`py-1.5 text-xs font-semibold rounded-xl border transition-all ${
                      discountType === "fixed"
                        ? "bg-[#6B1E2D] text-white border-[#6B1E2D]"
                        : "bg-white/70 text-[#6B1E2D] border-[#E0CEB7]"
                    }`}
                  >
                    Fixed PKR (Rs.)
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#6B1E2D]">
                  {discountType === "percent" ? "Discount Percentage (%) *" : "Discount Amount (PKR) *"}
                </label>
                <Input
                  type="number"
                  required
                  value={discountValue}
                  onChange={(e) => setDiscountValue(e.target.value)}
                  placeholder={discountType === "percent" ? "e.g. 15" : "e.g. 1000"}
                  className="bg-white/80 border-[#E0CEB7] text-xs h-9 rounded-xl"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#6B1E2D]">
                  Minimum Order (PKR)
                </label>
                <Input
                  type="number"
                  value={minOrder}
                  onChange={(e) => setMinOrder(e.target.value)}
                  placeholder="e.g. 4000"
                  className="bg-white/80 border-[#E0CEB7] text-xs h-9 rounded-xl"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="promo-active"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="h-4 w-4 rounded accent-[#6B1E2D] cursor-pointer"
                />
                <label htmlFor="promo-active" className="text-xs font-semibold text-[#6B1E2D] cursor-pointer">
                  Activate voucher immediately
                </label>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#6B1E2D] hover:bg-[#822436] text-[#F8F1E7] text-xs font-semibold uppercase tracking-wider rounded-xl py-2 mt-2 shadow-sm"
              >
                {isSubmitting ? "Generating Code..." : "Publish Promo Code"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Promo Codes List */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8C3A4B]">
              Active Vouchers ({promos.length})
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {loading ? (
              <div className="col-span-2 text-center py-10 text-xs text-[#8C3A4B]">
                <RefreshCw className="h-4 w-4 animate-spin mx-auto text-[#6B1E2D] mb-2" />
                <span>Loading promo codes...</span>
              </div>
            ) : promos.length === 0 ? (
              <div className="col-span-2 text-center py-10 text-xs text-[#8C3A4B] bg-[#F8F1E7] rounded-2xl border border-[#E0CEB7]">
                <span>No active promo codes. Create your first code on the left.</span>
              </div>
            ) : (
              promos.map((promo) => (
                <Card
                  key={promo.id}
                  className="bg-[#F8F1E7] border-[#E0CEB7] hover:border-[#C5A880] transition-all rounded-2xl"
                >
                  <CardContent className="p-4 flex flex-col justify-between h-full space-y-3">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <div className="p-2 rounded-xl bg-[#6B1E2D] text-[#C5A880]">
                            <TicketPercent className="h-4 w-4" />
                          </div>
                          <div>
                            <span className="font-mono font-bold text-sm text-[#6B1E2D] tracking-wider block">
                              {promo.code}
                            </span>
                            <span className="text-[10px] text-emerald-800 font-semibold">
                              {promo.discount_percent
                                ? `${promo.discount_percent}% OFF TOTAL`
                                : `Rs. ${promo.discount_pkr?.toLocaleString()} OFF`}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => handleDeletePromo(promo.id, promo.code)}
                          title="Delete coupon"
                          className="text-[#8C3A4B] hover:text-red-700 p-1 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <div className="mt-3 text-[11px] text-[#8C3A4B] space-y-1">
                        <p>
                          Min. Order:{" "}
                          <strong className="text-[#6B1E2D]">
                            Rs. {(promo.min_order_pkr || 0).toLocaleString()}
                          </strong>
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[#E0CEB7]/60 flex items-center justify-between text-[11px]">
                      <span className="text-[#8C3A4B]">Status</span>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          promo.is_active
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-neutral-200 text-neutral-700"
                        }`}
                      >
                        {promo.is_active ? "Active in Checkout" : "Paused"}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
