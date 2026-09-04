import React from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { RefreshCcw, ShieldCheck, HeartHandshake, AlertCircle } from "lucide-react";

export const metadata = {
  title: "Return & Refund Policy | MIBELLA Atelier",
  description: "Read about MIBELLA's 100% quality freshness guarantee and refund policies.",
};

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-[#F3E7D3] text-[#6B1E2D] flex flex-col justify-between">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="gold" className="mb-3 text-[10px] tracking-widest">
            HAPPINESS GUARANTEE
          </Badge>
          <h1 className="font-serif text-4xl sm:text-5xl font-medium text-[#6B1E2D]">
            Return & Refund Policy
          </h1>
          <p className="mt-3 text-sm text-[#8C3A4B]">
            We stand behind every bloom we arrange and every keepsake we box.
          </p>
        </div>

        {/* Content Body */}
        <div className="bg-[#F8F1E7] border border-[#E0CEB7] rounded-3xl p-6 sm:p-10 shadow-sm space-y-8 text-sm leading-relaxed text-[#6B1E2D]/90">
          <section className="space-y-3">
            <h2 className="font-serif text-xl font-semibold text-[#6B1E2D] flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-[#C5A880]" />
              1. The MIBELLA Freshness & Quality Promise
            </h2>
            <p>
              Your delight is our highest standard. If your floral arrangement does not arrive fresh, vibrant, and properly hydrated, or if any keepsake item inside your custom box arrives damaged, <strong>we will replace it immediately free of charge or issue a full refund</strong>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-semibold text-[#6B1E2D] flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-[#C5A880]" />
              2. Custom & Perishable Nature
            </h2>
            <p>
              Due to the bespoke nature of our items:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#8C3A4B]">
              <li>
                <strong>Personalized Keepsake Boxes:</strong> Boxes customized with custom calligraphy, names, and curated contents cannot be returned for buyer&apos;s remorse once shipped.
              </li>
              <li>
                <strong>Fresh Cut Florals:</strong> As living, perishable botanicals, flowers cannot be returned by courier. If there is a freshness defect upon arrival, please photograph it within <strong>24 hours</strong> of delivery and contact us.
              </li>
              <li>
                <strong>Gourmet Confections:</strong> For health and food safety reasons, food and chocolate items cannot be accepted for return once opened.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-semibold text-[#6B1E2D] flex items-center gap-2">
              <RefreshCcw className="h-5 w-5 text-[#C5A880]" />
              3. How to Claim a Replacement or Refund
            </h2>
            <p>
              If your gift experiences any transit damage or defect:
            </p>
            <ol className="list-decimal pl-5 space-y-1 text-[#8C3A4B]">
              <li>Take 2–3 clear photographs of the package, stems, or damaged items.</li>
              <li>WhatsApp our client concierge at <strong>+92 (300) 000-MIBELLA</strong> or email <strong>care@mibella.pk</strong> within 24 hours of delivery.</li>
              <li>Our team will respond within <strong>2 hours</strong> during business hours to arrange an immediate replacement or process a refund.</li>
            </ol>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-semibold text-[#6B1E2D] flex items-center gap-2">
              <HeartHandshake className="h-5 w-5 text-[#C5A880]" />
              4. Refund Processing Timelines
            </h2>
            <p>
              Approved refunds are credited back to the original method of payment:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-[#8C3A4B]">
              <li><strong>JazzCash / EasyPaisa / Bank Transfer:</strong> Processed within 24–48 hours.</li>
              <li><strong>Credit / Debit Cards:</strong> 5–7 business days depending on your issuing Pakistani bank.</li>
              <li><strong>MIBELLA Store Credit:</strong> Issued immediately with an additional 10% courtesy bonus.</li>
            </ul>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
