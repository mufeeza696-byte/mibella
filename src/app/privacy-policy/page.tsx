import React from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, Eye, FileText, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | MIBELLA Atelier",
  description: "Learn how MIBELLA protects and respects your personal and gifting information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#F3E7D3] text-[#6B1E2D] flex flex-col justify-between">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="gold" className="mb-3 text-[10px] tracking-widest">
            LEGAL & SECURITY
          </Badge>
          <h1 className="font-serif text-4xl sm:text-5xl font-medium text-[#6B1E2D]">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-[#8C3A4B]">
            Last updated: September 2026 • Effective for all MIBELLA customers and gift recipients.
          </p>
        </div>

        {/* Content Body */}
        <div className="bg-[#F8F1E7] border border-[#E0CEB7] rounded-3xl p-6 sm:p-10 shadow-sm space-y-8 text-sm leading-relaxed text-[#6B1E2D]/90">
          <section className="space-y-3">
            <h2 className="font-serif text-xl font-semibold text-[#6B1E2D] flex items-center gap-2">
              <Shield className="h-5 w-5 text-[#C5A880]" />
              1. Our Commitment to Your Privacy
            </h2>
            <p>
              At <strong>MIBELLA Atelier</strong> (&ldquo;MIBELLA&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;), we recognize that gifting is an intimate and personal gesture. When you craft a custom gift box or arrange a floral bouquet, you entrust us with personal sentiments, personal card messages, and the contact details of people you care about.
            </p>
            <p>
              We are committed to maintaining the confidentiality, integrity, and security of all personal information entrusted to us in strict accordance with industry best practices and applicable data protection regulations in Pakistan.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-semibold text-[#6B1E2D] flex items-center gap-2">
              <Eye className="h-5 w-5 text-[#C5A880]" />
              2. Information We Collect
            </h2>
            <p>When you interact with MIBELLA, we collect the following categories of information:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#8C3A4B]">
              <li>
                <strong>Purchaser Information:</strong> Your name, email address, telephone number, billing address, and account credentials.
              </li>
              <li>
                <strong>Gift Recipient Information:</strong> The recipient&apos;s name, delivery address, phone number, and special delivery instructions.
              </li>
              <li>
                <strong>Customization Data:</strong> Personal handwritten card messages, calligraphy text, custom items selected, and scheduled delivery dates.
              </li>
              <li>
                <strong>Transaction & Payment Information:</strong> Payment method details, transaction identifiers, and order history. Note that card information is securely processed by PCI-DSS certified payment gateways and is never stored in plain text on our servers.
              </li>
              <li>
                <strong>Device & Usage Data:</strong> IP address, browser type, device information, and browsing activity collected via cookies to optimize your customizer experience.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-semibold text-[#6B1E2D] flex items-center gap-2">
              <Lock className="h-5 w-5 text-[#C5A880]" />
              3. How We Use Your Information
            </h2>
            <p>Your information is used strictly for legitimate gifting operations, including:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 rounded-2xl bg-[#E8D8C3]/40 border border-[#E0CEB7] flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-[#6B1E2D] shrink-0 mt-0.5" />
                <span className="text-xs">Fulfilling, handcrafting, and delivering your custom boxes & bouquets.</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#E8D8C3]/40 border border-[#E0CEB7] flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-[#6B1E2D] shrink-0 mt-0.5" />
                <span className="text-xs">Inking your personal calligraphy card message and sealing it with wax.</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#E8D8C3]/40 border border-[#E0CEB7] flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-[#6B1E2D] shrink-0 mt-0.5" />
                <span className="text-xs">Providing live order tracking and SMS / email delivery notifications.</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#E8D8C3]/40 border border-[#E0CEB7] flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-[#6B1E2D] shrink-0 mt-0.5" />
                <span className="text-xs">Preventing fraudulent transactions and ensuring cloud platform security via Supabase.</span>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-semibold text-[#6B1E2D] flex items-center gap-2">
              <FileText className="h-5 w-5 text-[#C5A880]" />
              4. Recipient Confidentiality & Invoicing
            </h2>
            <p>
              To preserve the surprise and dignity of gift giving, <strong>we never disclose pricing or include itemized invoices inside gift packages delivered to recipients</strong>. Invoices and receipts are transmitted exclusively to the buyer&apos;s registered email address.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-semibold text-[#6B1E2D]">
              5. Third-Party Disclosures & Courier Partners
            </h2>
            <p>
              We do not sell, rent, or trade your personal data. We disclose necessary shipping details exclusively to verified logistics and white-glove courier partners (such as TCS, Trax, or our dedicated city delivery drivers in Lahore, Karachi, and Islamabad) solely for the purpose of completing hand-delivery.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-semibold text-[#6B1E2D]">
              6. Data Retention & Your Rights
            </h2>
            <p>
              You hold full rights to access, amend, or request deletion of your account and personal data stored in our Supabase database. To request data removal, please contact our concierge team at <a href="mailto:privacy@mibella.pk" className="underline font-semibold text-[#6B1E2D]">privacy@mibella.pk</a>.
            </p>
          </section>

          <section className="space-y-3 pt-4 border-t border-[#E0CEB7]/80">
            <h2 className="font-serif text-xl font-semibold text-[#6B1E2D]">
              7. Contact Our Privacy Concierge
            </h2>
            <p>
              If you have any questions or concerns regarding our privacy practices, please write to us at:
            </p>
            <div className="p-4 rounded-2xl bg-[#E8D8C3]/50 border border-[#E0CEB7] text-xs space-y-1">
              <p className="font-semibold text-[#6B1E2D]">MIBELLA Atelier Privacy Office</p>
              <p className="text-[#8C3A4B]">Gulberg III, Lahore, Punjab, Pakistan</p>
              <p className="text-[#8C3A4B]">Email: privacy@mibella.pk • Phone: +92 (300) 000-MIBELLA</p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
