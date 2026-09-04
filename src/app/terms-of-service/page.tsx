import React from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { FileCheck, AlertCircle, Clock, Sparkles } from "lucide-react";

export const metadata = {
  title: "Terms of Service | MIBELLA Atelier",
  description: "Read the terms governing orders, custom gift boxes, bouquets, and deliveries with MIBELLA.",
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-[#F3E7D3] text-[#6B1E2D] flex flex-col justify-between">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="gold" className="mb-3 text-[10px] tracking-widest">
            TERMS & CONDITIONS
          </Badge>
          <h1 className="font-serif text-4xl sm:text-5xl font-medium text-[#6B1E2D]">
            Terms of Service
          </h1>
          <p className="mt-3 text-sm text-[#8C3A4B]">
            Last modified: September 2026 • Please read these terms carefully before placing an order.
          </p>
        </div>

        {/* Content Body */}
        <div className="bg-[#F8F1E7] border border-[#E0CEB7] rounded-3xl p-6 sm:p-10 shadow-sm space-y-8 text-sm leading-relaxed text-[#6B1E2D]/90">
          <section className="space-y-3">
            <h2 className="font-serif text-xl font-semibold text-[#6B1E2D] flex items-center gap-2">
              <FileCheck className="h-5 w-5 text-[#C5A880]" />
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing the <strong>MIBELLA</strong> website or commissioning a bespoke gift box or handcrafted floral arrangement, you agree to be bound by these Terms of Service and all applicable laws and regulations of Pakistan. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-semibold text-[#6B1E2D] flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-[#C5A880]" />
              2. Customization & Handcrafted Nature
            </h2>
            <p>
              Every custom box and bouquet crafted by MIBELLA is unique. Because we utilize natural floral stems and artisan-made confectioneries:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#8C3A4B]">
              <li>
                <strong>Botanical Variations:</strong> Fresh flowers are subject to seasonal climate variations in bloom size, shade, and open fullness. Our master florists guarantee equivalent or superior value and palette harmony.
              </li>
              <li>
                <strong>Calligraphy:</strong> Handwritten notes are inked by skilled calligraphers on cotton stock. Slight natural variations in stroke weight and slant celebrate the authentic handmade process.
              </li>
              <li>
                <strong>Box Item Availability:</strong> In rare cases where a specific gourmet item is out of stock, we will substitute it with an item of equal or higher value within the same category after attempting to notify you.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-semibold text-[#6B1E2D] flex items-center gap-2">
              <Clock className="h-5 w-5 text-[#C5A880]" />
              3. Scheduled Delivery & Recipient Protocol
            </h2>
            <p>
              We pride ourselves on punctuality for milestone moments like birthdays and anniversaries.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#8C3A4B]">
              <li>
                <strong>Accuracy of Details:</strong> It is the purchaser&apos;s responsibility to provide an accurate delivery address, active recipient telephone number, and gate instructions.
              </li>
              <li>
                <strong>Recipient Unavailability:</strong> If the recipient is unreachable or absent during hand-delivery, our courier will attempt to leave the package with building security, front desk, or a neighbor upon verbal confirmation, or coordinate a redelivery.
              </li>
              <li>
                <strong>Extreme Weather & Force Majeure:</strong> In rare cases of extreme urban weather, roadblocks, or public strikes, delivery times may be adjusted with immediate customer notification.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-semibold text-[#6B1E2D]">
              4. Pricing, Taxes & Currency
            </h2>
            <p>
              All prices displayed on MIBELLA are denominated in <strong>Pakistani Rupees (PKR / Rs.)</strong> and include standard luxury box presentation and ribbon tying. Standard delivery fees apply to orders below Rs. 5,000. Orders above Rs. 5,000 receive complimentary delivery.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-semibold text-[#6B1E2D] flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-[#C5A880]" />
              5. Cancellation of Custom Orders
            </h2>
            <p>
              Because customized gift boxes and fresh floral arrangements involve personalized inking, ribbon cut lengths, and perishable stems:
            </p>
            <p className="text-[#8C3A4B]">
              Cancellations are accepted up to <strong>24 hours prior</strong> to the scheduled delivery date. Once fresh stems have been cut and arranged or a calligraphy card has been inked, orders enter fulfillment and cannot be refunded.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-semibold text-[#6B1E2D]">
              6. Intellectual Property
            </h2>
            <p>
              All branding, trade names, imagery, customizer designs, and text appearing on MIBELLA are the exclusive property of MIBELLA Atelier and are protected under copyright and trademark laws.
            </p>
          </section>

          <section className="space-y-3 pt-4 border-t border-[#E0CEB7]/80">
            <h2 className="font-serif text-xl font-semibold text-[#6B1E2D]">
              7. Governing Law
            </h2>
            <p>
              These Terms of Service are governed by and construed in accordance with the laws of the Islamic Republic of Pakistan, and any disputes shall be subject to the exclusive jurisdiction of the courts in Lahore, Pakistan.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
