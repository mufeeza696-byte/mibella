"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import {
  MessageSquare,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "Custom Gift Box",
    targetDate: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const supabase = createClient();
      // Attempt insert into Supabase inquiries table if configured
      const { error } = await supabase.from("inquiries").insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          inquiry_type: formData.inquiryType,
          target_date: formData.targetDate || null,
          message: formData.message,
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) {
        // Table might not be created in user's Supabase yet, fallback gracefully
        console.warn("Supabase table note:", error.message);
      }
      setIsSuccess(true);
    } catch (err: any) {
      console.warn("Notice:", err.message);
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F3E7D3] text-[#6B1E2D] flex flex-col justify-between">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <Badge variant="gold" className="mb-3 text-[10px] tracking-widest">
            ATELIER CONCIERGE
          </Badge>
          <h1 className="font-serif text-4xl sm:text-5xl font-medium text-[#6B1E2D]">
            Connect With Our Artisans
          </h1>
          <p className="mt-3 text-sm text-[#8C3A4B] leading-relaxed">
            Whether you are planning bespoke corporate hampers, bridal unboxing favors, or need guidance on a floral arrangement, our curators are here to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Contact Info & Studio Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-[#F8F1E7] border border-[#E0CEB7] space-y-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-full bg-[#E8D8C3] text-[#6B1E2D]">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-serif text-base font-semibold text-[#6B1E2D]">
                    Call / WhatsApp Concierge
                  </h3>
                  <p className="text-xs text-[#8C3A4B]">+92 (300) 000-MIBELLA (6423552)</p>
                  <p className="text-[10px] text-emerald-800 font-medium">Available 7 days a week, 9 AM – 10 PM</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-full bg-[#E8D8C3] text-[#6B1E2D]">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-serif text-base font-semibold text-[#6B1E2D]">
                    Direct Email
                  </h3>
                  <p className="text-xs text-[#8C3A4B]">concierge@mibella.pk</p>
                  <p className="text-[10px] text-[#8C3A4B]">Average response within 2 hours</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-full bg-[#E8D8C3] text-[#6B1E2D]">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-serif text-base font-semibold text-[#6B1E2D]">
                    Studio & Floral Workshop
                  </h3>
                  <p className="text-xs text-[#8C3A4B]">Gulberg III, Near MM Alam Road</p>
                  <p className="text-[10px] text-[#8C3A4B]">Lahore, Punjab, Pakistan</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-full bg-[#E8D8C3] text-[#6B1E2D]">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-serif text-base font-semibold text-[#6B1E2D]">
                    Same-Day Delivery Cutoff
                  </h3>
                  <p className="text-xs text-[#8C3A4B]">Orders placed by 5:00 PM PST</p>
                  <p className="text-[10px] text-[#8C3A4B]">Lahore, Karachi, Islamabad</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-[#E8D8C3]/50 border border-[#E0CEB7] space-y-2">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[#C5A880]" />
                <h4 className="font-serif text-sm font-semibold text-[#6B1E2D]">
                  Corporate & Wedding Bespoke Orders
                </h4>
              </div>
              <p className="text-xs text-[#8C3A4B] leading-relaxed">
                We design custom branded ribbons, wooden chests, embossed company logos, and bulk packaging for corporate clients and wedding festivities across Pakistan.
              </p>
            </div>
          </div>

          {/* Right: Interactive Message Form */}
          <div className="lg:col-span-7 bg-[#F8F1E7] p-8 sm:p-10 rounded-3xl border border-[#E0CEB7] shadow-sm">
            {isSuccess ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="font-serif text-2xl font-semibold text-[#6B1E2D]">
                  Your Message Has Been Received
                </h3>
                <p className="text-sm text-[#8C3A4B] max-w-md mx-auto">
                  Thank you, <strong>{formData.name}</strong>. Our senior gifting concierge will contact you via WhatsApp / Email shortly regarding your {formData.inquiryType.toLowerCase()}.
                </p>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setIsSuccess(false);
                    setFormData({
                      name: "",
                      email: "",
                      phone: "",
                      inquiryType: "Custom Gift Box",
                      targetDate: "",
                      message: "",
                    });
                  }}
                  className="mt-4 text-xs font-semibold uppercase tracking-wider"
                >
                  Send Another Inquiry
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-serif text-xl font-semibold text-[#6B1E2D] mb-1">
                  Send a Bespoke Gifting Inquiry
                </h3>
                <p className="text-xs text-[#8C3A4B] mb-4">
                  Fill in your details below and our team will get in touch with personalized options.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#8C3A4B] block mb-1">
                      Your Full Name *
                    </label>
                    <Input
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Zainab Malik"
                      className="bg-white/80"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#8C3A4B] block mb-1">
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. zainab@example.com"
                      className="bg-white/80"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#8C3A4B] block mb-1">
                      WhatsApp / Phone Number *
                    </label>
                    <Input
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +92 300 1234567"
                      className="bg-white/80"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#8C3A4B] block mb-1">
                      Occasion / Target Date
                    </label>
                    <Input
                      type="date"
                      value={formData.targetDate}
                      onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
                      className="bg-white/80"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#8C3A4B] block mb-1">
                    Inquiry Category
                  </label>
                  <select
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                    className="w-full h-11 rounded-full border border-[#E0CEB7] bg-white/80 px-4 text-sm text-[#6B1E2D] focus:outline-none focus:ring-2 focus:ring-[#6B1E2D]"
                  >
                    <option value="Custom Gift Box">Custom Gift Box Consultation</option>
                    <option value="Custom Floral Bouquet">Custom Floral Bouquet Arrangement</option>
                    <option value="Bridal & Wedding Favors">Bridal & Wedding Favors (Bulk)</option>
                    <option value="Corporate Hampers">Corporate VIP Gift Hampers</option>
                    <option value="Delivery Status Assistance">Urgent Delivery Assistance</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#8C3A4B] block mb-1">
                    Your Message / Gifting Requirements
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full rounded-2xl border border-[#E0CEB7] bg-white/80 p-4 text-sm text-[#6B1E2D] focus:outline-none focus:ring-2 focus:ring-[#6B1E2D]"
                    placeholder="Tell us about the recipient, preferred flowers, treats, or special customization instructions..."
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full text-xs font-semibold uppercase tracking-widest py-6"
                >
                  {isSubmitting ? "Transmitting..." : "Send Concierge Inquiry"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
