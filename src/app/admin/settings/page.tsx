"use client";

import React, { useState, useEffect } from "react";
import { Settings, Save, Check, RefreshCw, Truck, Phone, Mail, Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  StoreSettings,
  fetchStoreSettings,
  updateStoreSettings,
} from "@/lib/products-storage";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<StoreSettings>({
    shipping_fee_pkr: 350,
    free_shipping_threshold_pkr: 5000,
    whatsapp_number: "+923001234567",
    support_email: "concierge@mibella.pk",
    announcement_banner:
      "✨ Complimentary hand-inked calligraphy card with gold wax crest on all bespoke orders across Pakistan.",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  useEffect(() => {
    async function loadSettings() {
      setLoading(true);
      try {
        const s = await fetchStoreSettings();
        setSettings(s);
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateStoreSettings(settings);
      showToast("Store settings saved and updated across storefront!");
    } catch (err: any) {
      alert("Failed to save settings: " + err.message);
    } finally {
      setSaving(false);
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
              Store Configuration
            </span>
            <span className="text-xs text-[#8C3A4B]">•</span>
            <Badge variant="gold" className="text-[9px]">
              Global Atelier Parameters
            </Badge>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#6B1E2D]">
            Atelier Store Settings
          </h1>
          <p className="text-xs text-[#8C3A4B] mt-1 max-w-xl">
            Manage delivery fees across Pakistan, customer concierge contact details, and homepage announcements.
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6 max-w-3xl">
        {/* Delivery Rates */}
        <Card className="bg-[#F8F1E7] border-[#E0CEB7] rounded-3xl">
          <CardHeader className="border-b border-[#E0CEB7]/60 pb-4">
            <div className="flex items-center gap-2 text-[#6B1E2D]">
              <Truck className="h-5 w-5 text-[#C5A880]" />
              <CardTitle className="font-serif text-lg font-bold">
                Pakistan Shipping & Logistics
              </CardTitle>
            </div>
            <CardDescription className="text-xs text-[#8C3A4B]">
              Rates applied during checkout across Lahore, Karachi, Islamabad, and nationwide.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#6B1E2D]">
                Standard Courier Delivery Fee (PKR)
              </label>
              <Input
                type="number"
                required
                value={settings.shipping_fee_pkr}
                onChange={(e) =>
                  setSettings({ ...settings, shipping_fee_pkr: parseInt(e.target.value) || 0 })
                }
                className="bg-white/80 border-[#E0CEB7] text-xs h-10 rounded-xl"
              />
              <span className="text-[10px] text-[#8C3A4B]">
                Charged on orders below the free delivery threshold.
              </span>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#6B1E2D]">
                Free Delivery Threshold (PKR)
              </label>
              <Input
                type="number"
                required
                value={settings.free_shipping_threshold_pkr}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    free_shipping_threshold_pkr: parseInt(e.target.value) || 0,
                  })
                }
                className="bg-white/80 border-[#E0CEB7] text-xs h-10 rounded-xl"
              />
              <span className="text-[10px] text-[#8C3A4B]">
                Orders above this amount enjoy complimentary white-glove dispatch.
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Concierge & Support Contacts */}
        <Card className="bg-[#F8F1E7] border-[#E0CEB7] rounded-3xl">
          <CardHeader className="border-b border-[#E0CEB7]/60 pb-4">
            <div className="flex items-center gap-2 text-[#6B1E2D]">
              <Phone className="h-5 w-5 text-[#C5A880]" />
              <CardTitle className="font-serif text-lg font-bold">
                Client Concierge & Direct Channels
              </CardTitle>
            </div>
            <CardDescription className="text-xs text-[#8C3A4B]">
              Displayed on customer receipts, order confirmations, and footer.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#6B1E2D] flex items-center gap-1.5">
                <span>WhatsApp Hotline</span>
              </label>
              <Input
                required
                value={settings.whatsapp_number}
                onChange={(e) =>
                  setSettings({ ...settings, whatsapp_number: e.target.value })
                }
                placeholder="+923001234567"
                className="bg-white/80 border-[#E0CEB7] text-xs h-10 rounded-xl"
              />
              <span className="text-[10px] text-[#8C3A4B]">
                Format with country code: +923...
              </span>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#6B1E2D] flex items-center gap-1.5">
                <span>Support Email Address</span>
              </label>
              <Input
                type="email"
                required
                value={settings.support_email}
                onChange={(e) =>
                  setSettings({ ...settings, support_email: e.target.value })
                }
                placeholder="concierge@mibella.pk"
                className="bg-white/80 border-[#E0CEB7] text-xs h-10 rounded-xl"
              />
            </div>
          </CardContent>
        </Card>

        {/* Storefront Announcement */}
        <Card className="bg-[#F8F1E7] border-[#E0CEB7] rounded-3xl">
          <CardHeader className="border-b border-[#E0CEB7]/60 pb-4">
            <div className="flex items-center gap-2 text-[#6B1E2D]">
              <Megaphone className="h-5 w-5 text-[#C5A880]" />
              <CardTitle className="font-serif text-lg font-bold">
                Storefront Announcement Banner
              </CardTitle>
            </div>
            <CardDescription className="text-xs text-[#8C3A4B]">
              Top luxury header notification shown to all visiting clients.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-2">
            <textarea
              rows={2}
              value={settings.announcement_banner}
              onChange={(e) =>
                setSettings({ ...settings, announcement_banner: e.target.value })
              }
              placeholder="Enter announcement text..."
              className="w-full p-3 bg-white/80 border border-[#E0CEB7] rounded-xl text-xs text-[#6B1E2D] focus:outline-none"
            />
            <span className="text-[10px] text-[#8C3A4B] block">
              Leave blank if no announcement is currently running.
            </span>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={saving}
            className="bg-[#6B1E2D] hover:bg-[#822436] text-[#F8F1E7] text-xs font-semibold uppercase tracking-wider px-8 py-3 rounded-xl gap-2 shadow-md"
          >
            <Save className="h-4 w-4 text-[#C5A880]" />
            <span>{saving ? "Saving Configuration..." : "Save Store Settings"}</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
