import React from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Truck, Clock, MapPin, PackageCheck, AlertTriangle } from "lucide-react";

export const metadata = {
  title: "Delivery & Shipping Policy | MIBELLA Atelier",
  description: "Learn about MIBELLA delivery timeframes, cities covered in Pakistan, and white-glove courier handling.",
};

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-[#F3E7D3] text-[#6B1E2D] flex flex-col justify-between">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="gold" className="mb-3 text-[10px] tracking-widest">
            LOGISTICS & CARE
          </Badge>
          <h1 className="font-serif text-4xl sm:text-5xl font-medium text-[#6B1E2D]">
            Delivery & Shipping Policy
          </h1>
          <p className="mt-3 text-sm text-[#8C3A4B]">
            Hand-delivering emotions across Pakistan with white-glove care and pristine presentation.
          </p>
        </div>

        {/* Content Body */}
        <div className="bg-[#F8F1E7] border border-[#E0CEB7] rounded-3xl p-6 sm:p-10 shadow-sm space-y-8 text-sm leading-relaxed text-[#6B1E2D]/90">
          <section className="space-y-3">
            <h2 className="font-serif text-xl font-semibold text-[#6B1E2D] flex items-center gap-2">
              <MapPin className="h-5 w-5 text-[#C5A880]" />
              1. Delivery Coverage Across Pakistan
            </h2>
            <p>
              MIBELLA operates dedicated direct fulfillment hubs alongside premier courier partners to guarantee timely unboxing:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="p-4 rounded-2xl bg-[#E8D8C3]/40 border border-[#E0CEB7] space-y-1.5">
                <span className="font-serif font-semibold text-base text-[#6B1E2D] block">
                  Same-Day Direct Hand Delivery
                </span>
                <p className="text-xs text-[#8C3A4B]">
                  <strong>Lahore • Karachi • Islamabad • Rawalpindi</strong>
                </p>
                <p className="text-xs text-[#6B1E2D]/80">
                  Delivered by our uniformed white-glove drivers in climate-controlled transit, ensuring fresh stems and intact ribbons.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#E8D8C3]/40 border border-[#E0CEB7] space-y-1.5">
                <span className="font-serif font-semibold text-base text-[#6B1E2D] block">
                  Express Next-Day Delivery
                </span>
                <p className="text-xs text-[#8C3A4B]">
                  <strong>Faisalabad • Multan • Peshawar • Sialkot • Gujranwala • Quetta</strong>
                </p>
                <p className="text-xs text-[#6B1E2D]/80">
                  Shipped via express courier with shockproof bubble insulation and flower stem water reservoirs.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-semibold text-[#6B1E2D] flex items-center gap-2">
              <Truck className="h-5 w-5 text-[#C5A880]" />
              2. Delivery Charges (PKR)
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#E0CEB7] bg-[#E8D8C3]/50">
                    <th className="p-3 font-serif font-semibold text-[#6B1E2D]">Order Value</th>
                    <th className="p-3 font-serif font-semibold text-[#6B1E2D]">Delivery Type</th>
                    <th className="p-3 font-serif font-semibold text-[#6B1E2D]">Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E0CEB7]/60">
                  <tr>
                    <td className="p-3">Orders over <strong>Rs. 5,000</strong></td>
                    <td className="p-3">Standard Scheduled Delivery</td>
                    <td className="p-3 font-bold text-emerald-800">FREE</td>
                  </tr>
                  <tr>
                    <td className="p-3">Orders under <strong>Rs. 5,000</strong></td>
                    <td className="p-3">Standard Delivery (Pakistan)</td>
                    <td className="p-3">Rs. 350</td>
                  </tr>
                  <tr>
                    <td className="p-3">Midnight Surprise Delivery (11:45 PM - 12:15 AM)</td>
                    <td className="p-3">Lahore & Karachi Only</td>
                    <td className="p-3 font-semibold">+Rs. 850</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-semibold text-[#6B1E2D] flex items-center gap-2">
              <Clock className="h-5 w-5 text-[#C5A880]" />
              3. Scheduled Date & Time Windows
            </h2>
            <p>
              During checkout, you can select the exact date of delivery up to <strong>60 days in advance</strong>. We offer three primary delivery windows:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-[#8C3A4B]">
              <li><strong>Morning Delivery:</strong> 10:00 AM – 2:00 PM</li>
              <li><strong>Afternoon / Evening Delivery:</strong> 2:00 PM – 7:00 PM</li>
              <li><strong>Midnight Delivery:</strong> 11:45 PM – 12:15 AM (Special milestone moments)</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-semibold text-[#6B1E2D] flex items-center gap-2">
              <PackageCheck className="h-5 w-5 text-[#C5A880]" />
              4. Flower & Gift Protection in Transit
            </h2>
            <p>
              Every bouquet features wet-pack hydration wrap on the stem ends, nourishing the flowers throughout transport. Gift boxes are securely enclosed within an outer protective transport container to guarantee that the primary keepsake vessel arrives pristine, clean, and scratch-free.
            </p>
          </section>

          <section className="space-y-3 pt-4 border-t border-[#E0CEB7]/80">
            <h2 className="font-serif text-xl font-semibold text-[#6B1E2D] flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-[#C5A880]" />
              5. Delivery Inquiries & Emergency Routing
            </h2>
            <p>
              Need to modify a delivery address or time slot on the day of delivery? Please reach our dispatch concierge via WhatsApp at <strong>+92 (300) 000-MIBELLA</strong> quoting your order reference.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
