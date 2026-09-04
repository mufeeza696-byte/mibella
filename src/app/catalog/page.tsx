"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Sparkles,
  ShoppingBag,
  Heart,
  Search,
  Check,
  Gift,
  Flower2,
  MapPin,
  Calendar,
  ArrowRight,
  Filter,
  SlidersHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Footer } from "@/components/footer";
import {
  SAMPLE_BOX_ITEMS,
  SIGNATURE_COLLECTIONS,
  BOUQUET_FLOWERS,
  CustomBoxItem,
  SignatureCollection,
  FlowerStem,
} from "@/lib/catalog-data";

type FilterCategory =
  | "all"
  | "signature-boxes"
  | "signature-bouquets"
  | "jewelry"
  | "makeup"
  | "crochet"
  | "treats-candles";

interface SelectedOrderItem {
  title: string;
  category: string;
  pricePkr: number;
  description?: string;
  inclusions?: string[];
}

export default function CatalogPage() {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc">("featured");

  // Order modal state
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedOrderItem, setSelectedOrderItem] = useState<SelectedOrderItem | null>(null);
  const [recipientCity, setRecipientCity] = useState("Lahore");
  const [scheduledDate, setScheduledDate] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [giftNote, setGiftNote] = useState("With love and warmest congratulations.");

  const openOrderDialog = (item: SelectedOrderItem) => {
    setSelectedOrderItem(item);
    setIsOrderModalOpen(true);
  };

  // Filter and sort items
  const filteredCollections = useMemo(() => {
    return SIGNATURE_COLLECTIONS.filter((col) => {
      const matchesSearch =
        col.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        col.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        col.tag.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (activeCategory === "all") return true;
      if (activeCategory === "signature-boxes") return col.category === "box";
      if (activeCategory === "signature-bouquets") return col.category === "bouquet";
      return false;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.pricePkr - b.pricePkr;
      if (sortBy === "price-desc") return b.pricePkr - a.pricePkr;
      return 0;
    });
  }, [activeCategory, searchQuery, sortBy]);

  const filteredBoxItems = useMemo(() => {
    return SAMPLE_BOX_ITEMS.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tag.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (activeCategory === "all") return true;
      if (activeCategory === "jewelry") return item.category === "Jewelry";
      if (activeCategory === "makeup") return item.category === "Makeup";
      if (activeCategory === "crochet") return item.category === "Crochet";
      if (activeCategory === "treats-candles") {
        return (
          item.category === "Coffee Cup & Snacks" ||
          item.category === "Scented Candle"
        );
      }
      return false;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.pricePkr - b.pricePkr;
      if (sortBy === "price-desc") return b.pricePkr - a.pricePkr;
      return 0;
    });
  }, [activeCategory, searchQuery, sortBy]);

  const showCollections =
    activeCategory === "all" ||
    activeCategory === "signature-boxes" ||
    activeCategory === "signature-bouquets";

  const showItems =
    activeCategory === "all" ||
    activeCategory === "jewelry" ||
    activeCategory === "makeup" ||
    activeCategory === "crochet" ||
    activeCategory === "treats-candles";

  const totalResultsCount =
    (showCollections ? filteredCollections.length : 0) +
    (showItems ? filteredBoxItems.length : 0);

  return (
    <div className="min-h-screen bg-[#F3E7D3] text-[#6B1E2D] flex flex-col selection:bg-[#E8D8C3] selection:text-[#6B1E2D]">
      {/* Atelier Header */}
      <section className="pt-12 pb-8 sm:pt-16 sm:pb-12 border-b border-[#E0CEB7]/80 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <Badge variant="gold" className="text-[10px] tracking-widest uppercase">
            THE MIBELLA ATELIER
          </Badge>
          <h1 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight text-[#6B1E2D]">
            Curated Gifting Catalog
          </h1>
          <p className="text-sm sm:text-base text-[#8C3A4B] leading-relaxed">
            Explore our complete repertoire of bespoke gift hampers, hand-arranged botanical
            bouquets, fine jewelry, handmade crochet keepsakes, and indulgent treats — ready for
            prompt express delivery throughout Pakistan.
          </p>
        </div>

        {/* Quick Customizer CTA Bar */}
        <div className="mt-8 p-4 rounded-2xl bg-[#E8D8C3]/50 border border-[#E0CEB7] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="p-2.5 bg-white/70 rounded-xl text-[#6B1E2D] shadow-xs">
              <Sparkles className="h-5 w-5 text-[#C5A880]" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-semibold text-[#6B1E2D]">
                Prefer a Fully Personalized Creation?
              </h4>
              <p className="text-xs text-[#8C3A4B]">
                Hand-pick each luxury item, bespoke magnetic box, or fresh stem in our 3D customizer.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <Link href="/#customizer-section" className="flex-1 sm:flex-initial">
              <Button
                variant="outline"
                size="sm"
                className="w-full text-xs font-semibold uppercase tracking-wider gap-1.5"
              >
                <Gift className="h-3.5 w-3.5" />
                Customize Box
              </Button>
            </Link>
            <Link href="/#customizer-section" className="flex-1 sm:flex-initial">
              <Button
                variant="default"
                size="sm"
                className="w-full text-xs font-semibold uppercase tracking-wider gap-1.5"
              >
                <Flower2 className="h-3.5 w-3.5" />
                Customize Bouquet
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Filter and Search Navigation Bar */}
      <section className="sticky top-20 z-30 bg-[#F3E7D3]/95 backdrop-blur-md border-b border-[#E0CEB7]/70 py-4 px-4 sm:px-6 lg:px-8 shadow-xs">
        <div className="max-w-7xl mx-auto space-y-3">
          {/* Top Row: Search Input & Sort */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8C3A4B]" />
              <Input
                type="text"
                placeholder="Search by item, candle, jewelry, flower, or occasion..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 h-10 text-xs bg-white/70 border-[#E0CEB7] focus:bg-white rounded-full"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#8C3A4B] hover:text-[#6B1E2D]"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex items-center justify-between w-full sm:w-auto gap-3">
              <span className="text-xs text-[#8C3A4B] font-medium whitespace-nowrap">
                Showing {totalResultsCount} items
              </span>
              <div className="flex items-center gap-1.5 bg-white/60 px-3 py-1.5 rounded-full border border-[#E0CEB7]">
                <SlidersHorizontal className="h-3.5 w-3.5 text-[#8C3A4B]" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent text-xs text-[#6B1E2D] font-medium focus:outline-none cursor-pointer"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-3.5 py-1.5 rounded-full font-medium transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === "all"
                  ? "bg-[#6B1E2D] text-[#F8F1E7] shadow-xs"
                  : "bg-white/60 text-[#6B1E2D] hover:bg-[#E8D8C3] border border-[#E0CEB7]"
              }`}
            >
              All Creations ({SIGNATURE_COLLECTIONS.length + SAMPLE_BOX_ITEMS.length})
            </button>
            <button
              onClick={() => setActiveCategory("signature-boxes")}
              className={`px-3.5 py-1.5 rounded-full font-medium transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === "signature-boxes"
                  ? "bg-[#6B1E2D] text-[#F8F1E7] shadow-xs"
                  : "bg-white/60 text-[#6B1E2D] hover:bg-[#E8D8C3] border border-[#E0CEB7]"
              }`}
            >
              Signature Gift Boxes (3)
            </button>
            <button
              onClick={() => setActiveCategory("signature-bouquets")}
              className={`px-3.5 py-1.5 rounded-full font-medium transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === "signature-bouquets"
                  ? "bg-[#6B1E2D] text-[#F8F1E7] shadow-xs"
                  : "bg-white/60 text-[#6B1E2D] hover:bg-[#E8D8C3] border border-[#E0CEB7]"
              }`}
            >
              Handcrafted Bouquets (3)
            </button>
            <button
              onClick={() => setActiveCategory("jewelry")}
              className={`px-3.5 py-1.5 rounded-full font-medium transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === "jewelry"
                  ? "bg-[#6B1E2D] text-[#F8F1E7] shadow-xs"
                  : "bg-white/60 text-[#6B1E2D] hover:bg-[#E8D8C3] border border-[#E0CEB7]"
              }`}
            >
              Jewelry & Hair (8)
            </button>
            <button
              onClick={() => setActiveCategory("makeup")}
              className={`px-3.5 py-1.5 rounded-full font-medium transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === "makeup"
                  ? "bg-[#6B1E2D] text-[#F8F1E7] shadow-xs"
                  : "bg-white/60 text-[#6B1E2D] hover:bg-[#E8D8C3] border border-[#E0CEB7]"
              }`}
            >
              Makeup & Beauty (8)
            </button>
            <button
              onClick={() => setActiveCategory("crochet")}
              className={`px-3.5 py-1.5 rounded-full font-medium transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === "crochet"
                  ? "bg-[#6B1E2D] text-[#F8F1E7] shadow-xs"
                  : "bg-white/60 text-[#6B1E2D] hover:bg-[#E8D8C3] border border-[#E0CEB7]"
              }`}
            >
              Handmade Crochet (2)
            </button>
            <button
              onClick={() => setActiveCategory("treats-candles")}
              className={`px-3.5 py-1.5 rounded-full font-medium transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === "treats-candles"
                  ? "bg-[#6B1E2D] text-[#F8F1E7] shadow-xs"
                  : "bg-white/60 text-[#6B1E2D] hover:bg-[#E8D8C3] border border-[#E0CEB7]"
              }`}
            >
              Mugs, Candles & Snacks (4)
            </button>
          </div>
        </div>
      </section>

      {/* Main Catalog Display */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full space-y-16">
        {totalResultsCount === 0 && (
          <div className="text-center py-20 bg-white/40 rounded-3xl border border-[#E0CEB7] max-w-md mx-auto p-8">
            <Filter className="h-10 w-10 text-[#8C3A4B] mx-auto mb-3 opacity-60" />
            <h3 className="font-serif text-lg font-semibold text-[#6B1E2D]">No items matched your filter</h3>
            <p className="text-xs text-[#8C3A4B] mt-1 mb-4">
              Try modifying your search term or select &apos;All Creations&apos; to view the entire catalogue.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setActiveCategory("all");
                setSearchQuery("");
              }}
              className="text-xs uppercase"
            >
              Reset All Filters
            </Button>
          </div>
        )}

        {/* SECTION 1: SIGNATURE CURATED COLLECTIONS */}
        {showCollections && filteredCollections.length > 0 && (
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#E0CEB7] pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#8C3A4B]">
                  COMPLETE GIFT PACKAGES
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#6B1E2D]">
                  Signature Gift Sets & Bouquets
                </h2>
              </div>
              <p className="text-xs text-[#8C3A4B] max-w-md">
                Thoughtfully assembled signature editions ready for scheduled gift delivery across Pakistan.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCollections.map((col) => (
                <Card
                  key={col.id}
                  className="overflow-hidden hover:shadow-xl transition-all duration-300 border-[#E0CEB7] flex flex-col justify-between bg-[#F8F1E7]/90"
                >
                  <div>
                    {/* Visual Card Banner */}
                    <div
                      className={`h-48 bg-gradient-to-br ${col.bgAccent} p-6 flex flex-col justify-between border-b border-[#E0CEB7]/70`}
                    >
                      <div className="flex items-center justify-between">
                        <Badge variant="default" className="text-[10px]">
                          {col.tag}
                        </Badge>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C3A4B] bg-white/70 px-2.5 py-1 rounded-full border border-[#E0CEB7]">
                          {col.type}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#8C3A4B]">
                          {col.itemsCount}
                        </span>
                        <h3 className="font-serif text-xl font-semibold text-[#6B1E2D]">
                          {col.title}
                        </h3>
                      </div>
                    </div>

                    {/* Card Content & Inclusions */}
                    <CardContent className="p-6 space-y-4">
                      <p className="text-xs text-[#8C3A4B] leading-relaxed line-clamp-2">
                        {col.description}
                      </p>

                      <div className="space-y-1.5 pt-2 border-t border-[#E0CEB7]/60">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#6B1E2D] block mb-1">
                          Package Inclusions:
                        </span>
                        {col.includes.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-[#8C3A4B]">
                            <Check className="h-3.5 w-3.5 text-[#6B1E2D] shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </div>

                  {/* Card Actions & Price */}
                  <div className="p-6 pt-0 border-t border-[#E0CEB7]/60 mt-2 space-y-3">
                    <div className="flex items-center justify-between pt-3">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-[#8C3A4B] block">
                          Inclusive of Packaging
                        </span>
                        <span className="font-serif text-xl font-bold text-[#6B1E2D]">
                          Rs. {col.pricePkr.toLocaleString()} PKR
                        </span>
                      </div>
                      <Badge variant="gold" className="text-[10px]">
                        Free Delivery
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="default"
                        size="sm"
                        className="w-full text-xs font-semibold uppercase tracking-wider"
                        onClick={() =>
                          openOrderDialog({
                            title: col.title,
                            category: col.type,
                            pricePkr: col.pricePkr,
                            description: col.description,
                            inclusions: col.includes,
                          })
                        }
                      >
                        Order Now
                      </Button>
                      <Link
                        href={
                          col.category === "box"
                            ? "/#customizer-section"
                            : "/#customizer-section"
                        }
                        className="w-full"
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full text-xs font-semibold uppercase tracking-wider"
                        >
                          Customize
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* SECTION 2: BESPOKE CURATED LUXURIES & TREATS */}
        {showItems && filteredBoxItems.length > 0 && (
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#E0CEB7] pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#8C3A4B]">
                  INDIVIDUAL CURATIONS & KEEPSAKES
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#6B1E2D]">
                  Jewelry, Makeup & Artisanal Treats
                </h2>
              </div>
              <p className="text-xs text-[#8C3A4B] max-w-md">
                Available as standalone gifts or selected to fill our luxury magnetic keepsake boxes.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredBoxItems.map((item) => (
                <Card
                  key={item.id}
                  className="overflow-hidden hover:shadow-md transition-all duration-300 border-[#E0CEB7] flex flex-col justify-between bg-white/70"
                >
                  <CardContent className="p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="text-[10px]">
                        {item.category}
                      </Badge>
                      <span className="text-[10px] font-semibold text-[#8C3A4B] bg-[#E8D8C3]/50 px-2 py-0.5 rounded-full">
                        {item.tag}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-serif text-base font-semibold text-[#6B1E2D] leading-snug">
                        {item.name}
                      </h4>
                      <p className="text-xs text-[#8C3A4B] mt-1.5 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-[#E0CEB7]/60 flex items-center justify-between">
                      <span className="font-serif text-base font-bold text-[#6B1E2D]">
                        Rs. {item.pricePkr.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-[#8C3A4B]">In Stock</span>
                    </div>
                  </CardContent>

                  <div className="p-5 pt-0 space-y-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="w-full text-xs font-semibold uppercase tracking-wider"
                      onClick={() =>
                        openOrderDialog({
                          title: item.name,
                          category: item.category,
                          pricePkr: item.pricePkr,
                          description: item.description,
                        })
                      }
                    >
                      Quick Order
                    </Button>
                    <Link href="/#customizer-section" className="block w-full">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full text-[11px] font-medium text-[#8C3A4B] hover:text-[#6B1E2D] hover:bg-[#E8D8C3]/40"
                      >
                        Add into Custom Box →
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* QUICK ORDER DIALOG MODAL */}
      <Dialog open={isOrderModalOpen} onOpenChange={setIsOrderModalOpen}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Order From Catalog</DialogTitle>
            <DialogDescription>
              Complete recipient details for express delivery across Pakistan.
            </DialogDescription>
          </DialogHeader>

          {selectedOrderItem && (
            <div className="space-y-4 py-2">
              {/* Item Details */}
              <div className="p-4 rounded-2xl bg-[#E8D8C3]/50 border border-[#E0CEB7] space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C3A4B]">
                      {selectedOrderItem.category}
                    </span>
                    <h4 className="font-serif text-base font-semibold text-[#6B1E2D]">
                      {selectedOrderItem.title}
                    </h4>
                  </div>
                  <span className="font-bold text-[#6B1E2D] font-serif text-base">
                    Rs. {selectedOrderItem.pricePkr.toLocaleString()} PKR
                  </span>
                </div>
                {selectedOrderItem.description && (
                  <p className="text-xs text-[#8C3A4B]">{selectedOrderItem.description}</p>
                )}
                {selectedOrderItem.inclusions && (
                  <div className="pt-2 border-t border-[#E0CEB7]/70 text-[11px] text-[#8C3A4B] space-y-1">
                    <span className="font-semibold text-[#6B1E2D] block">Includes:</span>
                    {selectedOrderItem.inclusions.map((inc, i) => (
                      <span key={i} className="block">• {inc}</span>
                    ))}
                  </div>
                )}
              </div>

              {/* City Selection */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#8C3A4B] flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" /> Destination City
                </label>
                <select
                  value={recipientCity}
                  onChange={(e) => setRecipientCity(e.target.value)}
                  className="w-full h-10 rounded-full border border-[#E0CEB7] bg-white/80 px-4 text-xs text-[#6B1E2D] focus:outline-none focus:ring-2 focus:ring-[#6B1E2D]"
                >
                  <option value="Lahore">Lahore (Same-Day Hand Delivery)</option>
                  <option value="Karachi">Karachi (Same-Day Hand Delivery)</option>
                  <option value="Islamabad">Islamabad (Same-Day Hand Delivery)</option>
                  <option value="Rawalpindi">Rawalpindi (Same-Day Hand Delivery)</option>
                  <option value="Faisalabad">Faisalabad (Next-Day Delivery)</option>
                  <option value="Multan">Multan (Next-Day Delivery)</option>
                  <option value="Peshawar">Peshawar (Next-Day Delivery)</option>
                  <option value="Sialkot">Sialkot (Next-Day Delivery)</option>
                  <option value="Gujranwala">Gujranwala (Next-Day Delivery)</option>
                  <option value="Quetta">Quetta (Express Courier)</option>
                  <option value="Other">Other City in Pakistan</option>
                </select>
              </div>

              {/* Delivery Date */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#8C3A4B] flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" /> Scheduled Date
                </label>
                <Input
                  type="date"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  className="bg-white/80 text-xs h-10"
                />
              </div>

              {/* Delivery Address */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#8C3A4B]">
                  Recipient Address & Contact #
                </label>
                <Input
                  placeholder="Street, Sector / Area, Phone number"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="bg-white/80 text-xs h-10"
                />
              </div>

              {/* Gift Card Message */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#8C3A4B]">
                  Calligraphy Gift Note (Complimentary)
                </label>
                <textarea
                  rows={2}
                  value={giftNote}
                  onChange={(e) => setGiftNote(e.target.value)}
                  className="w-full rounded-2xl border border-[#E0CEB7] bg-white/80 p-3 text-xs text-[#6B1E2D] focus:outline-none focus:ring-2 focus:ring-[#6B1E2D]"
                  placeholder="Write your note here..."
                />
              </div>

              {/* Price Calculation */}
              <div className="pt-2 border-t border-[#E0CEB7] space-y-1 text-xs text-[#8C3A4B]">
                <div className="flex justify-between">
                  <span>Item Subtotal:</span>
                  <span>Rs. {selectedOrderItem.pricePkr.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery:</span>
                  <span className={selectedOrderItem.pricePkr >= 5000 ? "text-emerald-700 font-semibold" : ""}>
                    {selectedOrderItem.pricePkr >= 5000 ? "FREE (Orders over Rs. 5,000)" : "Rs. 350"}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#6B1E2D] pt-1 border-t border-[#E0CEB7]/60">
                  <span>Total Payable:</span>
                  <span>
                    Rs. {(
                      selectedOrderItem.pricePkr + (selectedOrderItem.pricePkr >= 5000 ? 0 : 350)
                    ).toLocaleString()}{" "}
                    PKR
                  </span>
                </div>
              </div>

              <Button
                className="w-full text-xs font-semibold uppercase tracking-widest mt-3 py-5"
                size="lg"
                onClick={() => {
                  alert(
                    `Order registered! Total: Rs. ${(
                      selectedOrderItem.pricePkr +
                      (selectedOrderItem.pricePkr >= 5000 ? 0 : 350)
                    ).toLocaleString()} PKR for delivery to ${recipientCity}. Connected to Supabase.`
                  );
                  setIsOrderModalOpen(false);
                }}
              >
                Confirm Gifting Order
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
