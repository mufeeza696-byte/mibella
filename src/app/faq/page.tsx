"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, HelpCircle, Gift, Flower2, Truck, CreditCard } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
  category: "customizer" | "bouquets" | "delivery" | "payment";
}

const FAQS: FaqItem[] = [
  {
    category: "customizer",
    question: "How does the custom gift box builder work?",
    answer:
      "You begin by choosing your luxury keepsake vessel (such as our Atelier Blush Chest or Burgundy Velvet Box). Next, hand-pick up to 5 artisan items (scented soy candles, Belgian chocolates, silk sleepwear, organic teas). Finally, write your personal message which is inked by hand on cotton stock and sealed with a gold wax stamp.",
  },
  {
    category: "customizer",
    question: "Can I choose the color of the ribbon and wax seal?",
    answer:
      "Yes! Every custom box comes with complimentary luxury ribbon tying (Silk Satin or Velvet) and a real hand-stamped gold wax seal with our floral or monogram crest.",
  },
  {
    category: "bouquets",
    question: "Are the flowers fresh or artificial?",
    answer:
      "We work exclusively with fresh, premium-grade botanicals—including imported Ecuadorian Red Naomi roses, Dutch peonies, and fresh lilies. We also offer select preserved rose domes that remain pristine for up to 3 years without water.",
  },
  {
    category: "bouquets",
    question: "How long do the floral bouquets last?",
    answer:
      "Our fresh hand-tied bouquets typically last 5 to 10 days with proper care. Every bouquet includes a sachet of premium flower food and a floral care guide explaining how to trim the stems and refresh the vase water.",
  },
  {
    category: "delivery",
    question: "Which cities do you deliver to in Pakistan?",
    answer:
      "We offer Same-Day Hand Delivery in Lahore, Karachi, Islamabad, and Rawalpindi. We provide Next-Day Express Delivery across Faisalabad, Multan, Sialkot, Gujranwala, Peshawar, Quetta, and all other major cities in Pakistan.",
  },
  {
    category: "delivery",
    question: "Can I choose a specific date and time for delivery?",
    answer:
      "Absolutely. During checkout, you can select any future date up to 60 days in advance. You can also pick morning, evening, or midnight delivery windows (special midnight deliveries available in Lahore and Karachi).",
  },
  {
    category: "delivery",
    question: "Will the recipient see the price or receipt?",
    answer:
      "Never. We maintain complete gifting confidentiality. The package arrives as a pure luxury presentation with only your wax-sealed message card. All receipts and invoices are sent exclusively to the buyer's email.",
  },
  {
    category: "payment",
    question: "What payment methods do you accept?",
    answer:
      "We accept Cash on Delivery (COD) for eligible items, online payments via Pakistani Debit/Credit cards, Bank Account Transfer, and mobile wallets (JazzCash & EasyPaisa).",
  },
];

export default function FaqPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filteredFaqs =
    activeCategory === "all"
      ? FAQS
      : FAQS.filter((f) => f.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#F3E7D3] text-[#6B1E2D] flex flex-col justify-between">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="gold" className="mb-3 text-[10px] tracking-widest">
            CLIENT CONCIERGE
          </Badge>
          <h1 className="font-serif text-4xl sm:text-5xl font-medium text-[#6B1E2D]">
            Frequently Asked Questions
          </h1>
          <p className="mt-3 text-sm text-[#8C3A4B]">
            Everything you need to know about customizing gift boxes, fresh bouquets, and delivery in Pakistan.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                activeCategory === "all"
                  ? "bg-[#6B1E2D] text-[#F8F1E7]"
                  : "bg-[#E8D8C3]/70 text-[#6B1E2D] hover:bg-[#E8D8C3]"
              }`}
            >
              All Topics
            </button>
            <button
              onClick={() => setActiveCategory("customizer")}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                activeCategory === "customizer"
                  ? "bg-[#6B1E2D] text-[#F8F1E7]"
                  : "bg-[#E8D8C3]/70 text-[#6B1E2D] hover:bg-[#E8D8C3]"
              }`}
            >
              <Gift className="h-3.5 w-3.5" /> Gift Boxes
            </button>
            <button
              onClick={() => setActiveCategory("bouquets")}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                activeCategory === "bouquets"
                  ? "bg-[#6B1E2D] text-[#F8F1E7]"
                  : "bg-[#E8D8C3]/70 text-[#6B1E2D] hover:bg-[#E8D8C3]"
              }`}
            >
              <Flower2 className="h-3.5 w-3.5" /> Bouquets
            </button>
            <button
              onClick={() => setActiveCategory("delivery")}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                activeCategory === "delivery"
                  ? "bg-[#6B1E2D] text-[#F8F1E7]"
                  : "bg-[#E8D8C3]/70 text-[#6B1E2D] hover:bg-[#E8D8C3]"
              }`}
            >
              <Truck className="h-3.5 w-3.5" /> Delivery
            </button>
            <button
              onClick={() => setActiveCategory("payment")}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                activeCategory === "payment"
                  ? "bg-[#6B1E2D] text-[#F8F1E7]"
                  : "bg-[#E8D8C3]/70 text-[#6B1E2D] hover:bg-[#E8D8C3]"
              }`}
            >
              <CreditCard className="h-3.5 w-3.5" /> Payment
            </button>
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-[#E0CEB7] bg-[#F8F1E7] overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#E8D8C3]/20 transition-colors"
                >
                  <span className="font-serif text-base sm:text-lg font-medium text-[#6B1E2D]">
                    {faq.question}
                  </span>
                  <div
                    className={`p-1.5 rounded-full bg-[#E8D8C3]/70 text-[#6B1E2D] transition-transform duration-300 shrink-0 ${
                      isOpen ? "rotate-180 bg-[#6B1E2D] text-[#F8F1E7]" : ""
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-sm text-[#8C3A4B] leading-relaxed border-t border-[#E0CEB7]/50 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="mt-12 p-8 rounded-3xl bg-[#E8D8C3]/50 border border-[#E0CEB7] text-center space-y-3">
          <HelpCircle className="h-8 w-8 text-[#6B1E2D] mx-auto" />
          <h3 className="font-serif text-xl font-semibold text-[#6B1E2D]">
            Have a Bespoke Request or Corporate Inquiry?
          </h3>
          <p className="text-xs text-[#8C3A4B] max-w-md mx-auto">
            Our gifting concierges are available 7 days a week to curate custom orders, bulk wedding favors, and VIP corporate hampers.
          </p>
          <a
            href="/contact"
            className="inline-block mt-2 px-6 py-2.5 rounded-full bg-[#6B1E2D] text-[#F8F1E7] text-xs font-semibold uppercase tracking-wider hover:bg-[#822436] transition-colors"
          >
            Contact Customer Concierge
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
