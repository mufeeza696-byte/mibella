"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
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
  SlidersHorizontal,
  Feather,
  ChevronRight,
  Camera,
  Layers,
  Ribbon,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import {
  SAMPLE_BOX_ITEMS,
  BOX_STYLES,
  BOUQUET_FLOWERS,
  BOUQUET_WRAPPINGS,
  BOUQUET_RIBBONS,
  BOUQUET_ADDONS,
  SIGNATURE_COLLECTIONS,
  CustomBoxItem,
  FlowerStem,
} from "@/lib/catalog-data";

type MainTab = "box" | "bouquet" | "browse";

type FilterCategory =
  | "all"
  | "signature-boxes"
  | "signature-bouquets"
  | "jewelry"
  | "makeup"
  | "crochet"
  | "treats-candles";

interface QuickOrderItem {
  title: string;
  category: string;
  pricePkr: number;
  description?: string;
  inclusions?: string[];
}

function CatalogContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab");

  const [activeTab, setActiveTab] = useState<MainTab>("browse");

  useEffect(() => {
    if (initialTab === "box") setActiveTab("box");
    else if (initialTab === "bouquet") setActiveTab("bouquet");
    else if (initialTab === "browse") setActiveTab("browse");
  }, [initialTab]);

  // ============================================================
  // 1. BOX CUSTOMIZER STATE
  // ============================================================
  const [selectedBox, setSelectedBox] = useState(BOX_STYLES[0]);
  const [selectedBoxItems, setSelectedBoxItems] = useState<string[]>([
    "item-jhumka",
    "item-scented-candle",
    "item-chocolate",
  ]);
  const [boxCategoryFilter, setBoxCategoryFilter] = useState<string>("all");
  const [includePhoto, setIncludePhoto] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoCaption, setPhotoCaption] = useState("");
  const [boxCardMessage, setBoxCardMessage] = useState(
    "Wishing you endless joy and blooming memories on your special day."
  );
  const [boxCardRecipient, setBoxCardRecipient] = useState("Ayesha");

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
        setIncludePhoto(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleBoxItem = (id: string) => {
    if (selectedBoxItems.includes(id)) {
      setSelectedBoxItems(selectedBoxItems.filter((i) => i !== id));
    } else {
      if (selectedBoxItems.length < 6) {
        setSelectedBoxItems([...selectedBoxItems, id]);
      }
    }
  };

  const boxTotalPkr =
    selectedBox.pricePkr +
    selectedBoxItems.reduce((acc, currId) => {
      const item = SAMPLE_BOX_ITEMS.find((i) => i.id === currId);
      return acc + (item ? item.pricePkr : 0);
    }, 0) +
    (includePhoto ? 250 : 0);

  // ============================================================
  // 2. BOUQUET CUSTOMIZER STATE
  // ============================================================
  const [selectedFlower, setSelectedFlower] = useState(BOUQUET_FLOWERS[0]);
  const [selectedWrap, setSelectedWrap] = useState(BOUQUET_WRAPPINGS[0]);
  const [selectedRibbon, setSelectedRibbon] = useState(BOUQUET_RIBBONS[0]);
  const [selectedBouquetAddons, setSelectedBouquetAddons] = useState<string[]>(["add-1"]);
  const [bouquetCardMessage, setBouquetCardMessage] = useState(
    "With all my love, freshly picked for you."
  );
  const [bouquetCardRecipient, setBouquetCardRecipient] = useState("Zara");

  const toggleBouquetAddon = (id: string) => {
    if (selectedBouquetAddons.includes(id)) {
      setSelectedBouquetAddons(selectedBouquetAddons.filter((i) => i !== id));
    } else {
      setSelectedBouquetAddons([...selectedBouquetAddons, id]);
    }
  };

  const bouquetTotalPkr =
    selectedFlower.pricePkr +
    selectedWrap.pricePkr +
    selectedRibbon.pricePkr +
    selectedBouquetAddons.reduce((acc, currId) => {
      const addon = BOUQUET_ADDONS.find((a) => a.id === currId);
      return acc + (addon ? addon.pricePkr : 0);
    }, 0);

  // ============================================================
  // 3. CATALOG BROWSE STATE
  // ============================================================
  const [browseCategory, setBrowseCategory] = useState<FilterCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc">("featured");

  const filteredCollections = useMemo(() => {
    return SIGNATURE_COLLECTIONS.filter((col) => {
      const matchesSearch =
        col.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        col.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        col.tag.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;
      if (browseCategory === "all") return true;
      if (browseCategory === "signature-boxes") return col.category === "box";
      if (browseCategory === "signature-bouquets") return col.category === "bouquet";
      return false;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.pricePkr - b.pricePkr;
      if (sortBy === "price-desc") return b.pricePkr - a.pricePkr;
      return 0;
    });
  }, [browseCategory, searchQuery, sortBy]);

  const filteredBoxItems = useMemo(() => {
    return SAMPLE_BOX_ITEMS.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tag.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;
      if (browseCategory === "all") return true;
      if (browseCategory === "jewelry") return item.category === "Jewelry";
      if (browseCategory === "makeup") return item.category === "Makeup";
      if (browseCategory === "crochet") return item.category === "Crochet";
      if (browseCategory === "treats-candles") {
        return (
          item.category === "Coffee Cup & Snacks" || item.category === "Scented Candle"
        );
      }
      return false;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.pricePkr - b.pricePkr;
      if (sortBy === "price-desc") return b.pricePkr - a.pricePkr;
      return 0;
    });
  }, [browseCategory, searchQuery, sortBy]);

  const showCollections =
    browseCategory === "all" ||
    browseCategory === "signature-boxes" ||
    browseCategory === "signature-bouquets";

  const showItems =
    browseCategory === "all" ||
    browseCategory === "jewelry" ||
    browseCategory === "makeup" ||
    browseCategory === "crochet" ||
    browseCategory === "treats-candles";

  // ============================================================
  // 4. ORDER MODAL STATE
  // ============================================================
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"box" | "bouquet" | "item">("box");
  const [quickOrderItem, setQuickOrderItem] = useState<QuickOrderItem | null>(null);
  const [selectedCity, setSelectedCity] = useState("Lahore");
  const [scheduledDate, setScheduledDate] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");

  const openBoxOrder = () => {
    setModalMode("box");
    setIsOrderModalOpen(true);
  };

  const openBouquetOrder = () => {
    setModalMode("bouquet");
    setIsOrderModalOpen(true);
  };

  const openQuickItemOrder = (item: QuickOrderItem) => {
    setQuickOrderItem(item);
    setModalMode("item");
    setIsOrderModalOpen(true);
  };

  const activeTotalPkr =
    modalMode === "box"
      ? boxTotalPkr
      : modalMode === "bouquet"
      ? bouquetTotalPkr
      : quickOrderItem
      ? quickOrderItem.pricePkr
      : 0;

  return (
    <div className="min-h-screen bg-[#F3E7D3] text-[#6B1E2D] flex flex-col selection:bg-[#E8D8C3] selection:text-[#6B1E2D]">
      <Navbar />

      {/* Atelier Header & Mode Switcher */}
      <section className="pt-10 pb-6 border-b border-[#E0CEB7]/80 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto space-y-2.5">
          <Badge variant="gold" className="text-[10px] tracking-widest uppercase">
            THE MIBELLA ATELIER & CATALOG
          </Badge>
          <h1 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight text-[#6B1E2D]">
            Bespoke Gifting & Catalog
          </h1>
          <p className="text-xs sm:text-sm text-[#8C3A4B] leading-relaxed">
            Personalize your custom gift box, arrange handcrafted bouquets, or browse our
            pre-curated collections and individual luxuries for nationwide delivery across Pakistan.
          </p>
        </div>

        {/* PRIMARY MODE TABS */}
        <div className="mt-8 flex justify-center">
          <div className="inline-flex p-1.5 rounded-full bg-[#E8D8C3] border border-[#E0CEB7] shadow-inner max-w-full overflow-x-auto scrollbar-none">
            <button
              onClick={() => setActiveTab("box")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-300 whitespace-nowrap cursor-pointer ${
                activeTab === "box"
                  ? "bg-[#6B1E2D] text-[#F8F1E7] shadow-md"
                  : "text-[#6B1E2D] hover:text-[#822436]"
              }`}
            >
              <Gift className="h-4 w-4" />
              Customize Gift Box
            </button>
            <button
              onClick={() => setActiveTab("bouquet")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-300 whitespace-nowrap cursor-pointer ${
                activeTab === "bouquet"
                  ? "bg-[#6B1E2D] text-[#F8F1E7] shadow-md"
                  : "text-[#6B1E2D] hover:text-[#822436]"
              }`}
            >
              <Flower2 className="h-4 w-4" />
              Customize Bouquet
            </button>
            <button
              onClick={() => setActiveTab("browse")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-300 whitespace-nowrap cursor-pointer ${
                activeTab === "browse"
                  ? "bg-[#6B1E2D] text-[#F8F1E7] shadow-md"
                  : "text-[#6B1E2D] hover:text-[#822436]"
              }`}
            >
              <ShoppingBag className="h-4 w-4" />
              Browse Catalog
            </button>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT AREA */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
        {/* ============================================================ */}
        {/* VIEW 1: CUSTOM GIFT BOX BUILDER                              */}
        {/* ============================================================ */}
        {activeTab === "box" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fadeIn">
            {/* Left Column: Box Customizer Tabs */}
            <div className="lg:col-span-7 bg-[#F8F1E7] p-6 sm:p-8 rounded-3xl border border-[#E0CEB7] shadow-sm">
              <Tabs defaultValue="step-vessel" className="w-full">
                <TabsList className="grid grid-cols-3 mb-8 w-full">
                  <TabsTrigger value="step-vessel" className="text-xs sm:text-sm">
                    1. Vessel
                  </TabsTrigger>
                  <TabsTrigger value="step-items" className="text-xs sm:text-sm">
                    2. Curate Treats ({selectedBoxItems.length}/6)
                  </TabsTrigger>
                  <TabsTrigger value="step-card" className="text-xs sm:text-sm">
                    3. Card & Photo
                  </TabsTrigger>
                </TabsList>

                {/* Step 1: Vessel Selection */}
                <TabsContent value="step-vessel" className="space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-serif text-lg font-semibold text-[#6B1E2D]">
                      Select Your Keepsake Vessel
                    </h3>
                    <span className="text-xs text-[#8C3A4B]">Magnetic closure & debossed crest</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {BOX_STYLES.map((box) => (
                      <div
                        key={box.id}
                        onClick={() => setSelectedBox(box)}
                        className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                          selectedBox.id === box.id
                            ? "border-[#6B1E2D] bg-[#E8D8C3]/50 shadow-sm"
                            : "border-[#E0CEB7] bg-white/70 hover:border-[#6B1E2D]/40"
                        }`}
                      >
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <Badge variant="gold" className="text-[10px]">
                              {box.badge}
                            </Badge>
                            <span
                              className="h-4 w-4 rounded-full border border-[#E0CEB7]"
                              style={{ backgroundColor: box.colorHex }}
                            />
                          </div>
                          <h4 className="font-serif font-semibold text-sm text-[#6B1E2D]">
                            {box.name}
                          </h4>
                          <p className="text-xs text-[#8C3A4B] mt-1">{box.size}</p>
                          {box.description && (
                            <p className="text-[11px] text-[#8C3A4B]/80 mt-1 line-clamp-2">
                              {box.description}
                            </p>
                          )}
                        </div>
                        <div className="mt-4 pt-3 border-t border-[#E0CEB7]/60 flex items-center justify-between">
                          <span className="font-serif font-bold text-sm text-[#6B1E2D]">
                            Rs. {box.pricePkr.toLocaleString()}
                          </span>
                          <span className="text-xs text-[#8C3A4B]">Selected</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                {/* Step 2: Curate Items */}
                <TabsContent value="step-items" className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div>
                      <h3 className="font-serif text-lg font-semibold text-[#6B1E2D]">
                        Curate Up to 6 Luxury Treats
                      </h3>
                      <p className="text-xs text-[#8C3A4B]">
                        Choose from handcrafted jewelry, crochet keepsakes, makeup, candles & snacks.
                      </p>
                    </div>
                    <span className="text-xs font-semibold text-[#6B1E2D] bg-[#E8D8C3]/70 px-3 py-1 rounded-full shrink-0">
                      {selectedBoxItems.length} of 6 added
                    </span>
                  </div>

                  {/* Category Filter Pills */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none text-xs">
                    {[
                      { key: "all", label: "All Treats (22)" },
                      { key: "Jewelry", label: "Jewelry & Hair (8)" },
                      { key: "Makeup", label: "Makeup & Beauty (8)" },
                      { key: "Crochet", label: "Crochet (2)" },
                      { key: "Coffee Cup & Snacks", label: "Snacks & Mug (3)" },
                      { key: "Scented Candle", label: "Candle (1)" },
                    ].map((cat) => (
                      <button
                        key={cat.key}
                        onClick={() => setBoxCategoryFilter(cat.key)}
                        className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                          boxCategoryFilter === cat.key
                            ? "bg-[#6B1E2D] text-[#F8F1E7]"
                            : "bg-white/70 text-[#6B1E2D] hover:bg-[#E8D8C3] border border-[#E0CEB7]"
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>

                  {/* Items Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[440px] overflow-y-auto pr-1">
                    {SAMPLE_BOX_ITEMS.filter(
                      (item) =>
                        boxCategoryFilter === "all" || item.category === boxCategoryFilter
                    ).map((item) => {
                      const isSelected = selectedBoxItems.includes(item.id);
                      return (
                        <div
                          key={item.id}
                          onClick={() => toggleBoxItem(item.id)}
                          className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-2 ${
                            isSelected
                              ? "border-[#6B1E2D] bg-[#E8D8C3]/60 shadow-xs"
                              : "border-[#E0CEB7] bg-white/70 hover:border-[#6B1E2D]/40"
                          }`}
                        >
                          <div className="space-y-0.5 flex-1 min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[10px] uppercase font-semibold text-[#8C3A4B]">
                                {item.category}
                              </span>
                              <span className="text-[9px] text-[#8C3A4B] bg-[#E8D8C3]/50 px-1.5 py-0.2 rounded">
                                {item.tag}
                              </span>
                            </div>
                            <h5 className="font-serif font-medium text-xs text-[#6B1E2D] truncate">
                              {item.name}
                            </h5>
                            <span className="font-bold text-xs text-[#6B1E2D] block">
                              +Rs. {item.pricePkr.toLocaleString()} PKR
                            </span>
                          </div>
                          <div
                            className={`h-6 w-6 rounded-full flex items-center justify-center shrink-0 text-xs ${
                              isSelected
                                ? "bg-[#6B1E2D] text-[#F8F1E7]"
                                : "border border-[#E0CEB7] text-transparent hover:text-[#6B1E2D]"
                            }`}
                          >
                            ✓
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </TabsContent>

                {/* Step 3: Card & Archival Photo */}
                <TabsContent value="step-card" className="space-y-6">
                  {/* Handwritten Calligraphy Card */}
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-[#6B1E2D] mb-1">
                      Complimentary Wax-Sealed Calligraphy Note
                    </h3>
                    <p className="text-xs text-[#8C3A4B] mb-3">
                      Each note is inked by hand on heavy 350gsm cotton cardstock and sealed with our gold wax crest.
                    </p>

                    <div className="space-y-3">
                      <div>
                        <label className="text-xs font-semibold uppercase tracking-wider text-[#8C3A4B] block mb-1">
                          Recipient Name
                        </label>
                        <Input
                          value={boxCardRecipient}
                          onChange={(e) => setBoxCardRecipient(e.target.value)}
                          placeholder="e.g. Ayesha, Mom, My Love"
                          className="bg-white/70"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold uppercase tracking-wider text-[#8C3A4B] block mb-1">
                          Your Personal Message
                        </label>
                        <textarea
                          rows={3}
                          value={boxCardMessage}
                          onChange={(e) => setBoxCardMessage(e.target.value)}
                          className="w-full rounded-2xl border border-[#E0CEB7] bg-white/70 p-3.5 text-sm text-[#6B1E2D] focus:outline-none focus:ring-2 focus:ring-[#6B1E2D]"
                          placeholder="Write your heartfelt message here..."
                        />
                      </div>

                      <div className="p-3.5 rounded-2xl bg-[#E8D8C3]/40 border border-[#E0CEB7] flex items-center gap-3">
                        <Feather className="h-4 w-4 text-[#6B1E2D] shrink-0" />
                        <span className="text-xs text-[#6B1E2D]">
                          Gold wax seal finish & dried lavender sprig included complimentary.
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Keepsake Photo Print */}
                  <div className="pt-4 border-t border-[#E0CEB7]/80 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-serif text-base font-semibold text-[#6B1E2D] flex items-center gap-2">
                          <Camera className="h-4 w-4 text-[#C5A880]" />
                          Include a Printed Keepsake Photo
                        </h4>
                        <p className="text-xs text-[#8C3A4B]">
                          Upload a memory to be printed on archival gloss cardstock inside the box (+Rs. 250).
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIncludePhoto(!includePhoto)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                          includePhoto ? "bg-[#6B1E2D]" : "bg-[#E0CEB7]"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            includePhoto ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>

                    {includePhoto && (
                      <div className="p-4 rounded-2xl bg-[#E8D8C3]/40 border border-[#E0CEB7] space-y-3">
                        <label className="text-xs font-semibold uppercase tracking-wider text-[#8C3A4B] block">
                          Upload Photograph (JPG or PNG)
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="text-xs text-[#6B1E2D] file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#6B1E2D] file:text-[#F8F1E7] hover:file:bg-[#822436] file:cursor-pointer cursor-pointer"
                        />

                        {photoPreview && (
                          <div className="flex items-center gap-4 pt-2">
                            <div className="p-2 bg-white rounded-xl shadow-md border border-[#E0CEB7] max-w-[120px] text-center">
                              <img
                                src={photoPreview}
                                alt="Uploaded Keepsake"
                                className="w-24 h-24 object-cover rounded-lg mx-auto"
                              />
                              <span className="text-[9px] text-[#8C3A4B] mt-1 block font-serif italic">
                                {photoCaption || "Photo Attached"}
                              </span>
                            </div>
                            <div className="space-y-1.5 flex-1">
                              <label className="text-[11px] font-semibold text-[#8C3A4B] block">
                                Photo Caption or Date (Optional)
                              </label>
                              <Input
                                value={photoCaption}
                                onChange={(e) => setPhotoCaption(e.target.value)}
                                placeholder="e.g. Always & Forever • 2026"
                                className="bg-white/80 text-xs h-9"
                              />
                              <p className="text-[10px] text-emerald-800 font-medium">
                                ✓ Photo will be packaged in a delicate wax-stamped protective glassine pouch.
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Right Column: Custom Box Live Summary */}
            <div className="lg:col-span-5 bg-[#F8F1E7] p-6 sm:p-8 rounded-3xl border border-[#E0CEB7] shadow-sm sticky top-28">
              <div className="flex items-center justify-between pb-4 border-b border-[#E0CEB7]">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#8C3A4B]">
                    LIVE CURATION SUMMARY
                  </span>
                  <h3 className="font-serif text-xl font-medium text-[#6B1E2D]">
                    Your Custom Gift Box
                  </h3>
                </div>
                <Badge variant="gold" className="text-xs font-bold">
                  Rs. {boxTotalPkr.toLocaleString()} PKR
                </Badge>
              </div>

              {/* Vessel Selected */}
              <div className="py-4 border-b border-[#E0CEB7]/70">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#8C3A4B]">Selected Box:</span>
                  <span className="font-semibold text-[#6B1E2D]">{selectedBox.name}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#8C3A4B] mt-1">
                  <span>{selectedBox.size}</span>
                  <span>Rs. {selectedBox.pricePkr.toLocaleString()}</span>
                </div>
              </div>

              {/* Selected Items List */}
              <div className="py-4 border-b border-[#E0CEB7]/70 space-y-2">
                <span className="text-xs font-semibold text-[#8C3A4B] block">
                  Selected Luxuries ({selectedBoxItems.length}):
                </span>
                {selectedBoxItems.length === 0 ? (
                  <p className="text-xs italic text-[#8C3A4B]">No treats added yet. Select items from Step 2.</p>
                ) : (
                  selectedBoxItems.map((id) => {
                    const item = SAMPLE_BOX_ITEMS.find((i) => i.id === id);
                    if (!item) return null;
                    return (
                      <div key={id} className="flex items-center justify-between text-xs">
                        <span className="text-[#6B1E2D] truncate pr-2">• {item.name}</span>
                        <span className="text-[#8C3A4B] shrink-0 font-medium">
                          +Rs. {item.pricePkr.toLocaleString()}
                        </span>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Photo Keepsake Preview */}
              {includePhoto && (
                <div className="py-3 border-b border-[#E0CEB7]/70 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    {photoPreview ? (
                      <img
                        src={photoPreview}
                        alt="Photo keepsake"
                        className="w-9 h-9 rounded-lg object-cover border border-[#E0CEB7]"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-lg bg-[#E0CEB7]/60 flex items-center justify-center text-[#6B1E2D]">
                        <Camera className="h-4 w-4" />
                      </div>
                    )}
                    <div>
                      <span className="text-[#6B1E2D] font-medium block">
                        • Keepsake Photo Print
                      </span>
                      <span className="text-[10px] text-[#8C3A4B] italic">
                        {photoCaption ? `"${photoCaption}"` : "Protective pouch included"}
                      </span>
                    </div>
                  </div>
                  <span className="text-[#8C3A4B] shrink-0 font-medium">+Rs. 250</span>
                </div>
              )}

              {/* Card Preview */}
              <div className="py-4 border-b border-[#E0CEB7]/70 bg-[#E8D8C3]/30 p-3.5 rounded-2xl my-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#6B1E2D] block mb-1">
                  Wax-Sealed Card To: {boxCardRecipient || "Recipient"}
                </span>
                <p className="font-serif italic text-xs text-[#8C3A4B] line-clamp-2">
                  &ldquo;{boxCardMessage}&rdquo;
                </p>
              </div>

              {/* Action CTA */}
              <div className="pt-2 space-y-3">
                <Button
                  size="lg"
                  className="w-full text-xs font-semibold uppercase tracking-widest py-6"
                  onClick={openBoxOrder}
                >
                  Add Custom Box to Bag • Rs. {boxTotalPkr.toLocaleString()}
                </Button>
                <p className="text-center text-[11px] text-[#8C3A4B]">
                  Complimentary luxury magnetic box packaging & nationwide delivery options.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* VIEW 2: CUSTOM BOUQUET BUILDER                              */}
        {/* ============================================================ */}
        {activeTab === "bouquet" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fadeIn">
            {/* Left Column: Bouquet Steps */}
            <div className="lg:col-span-7 bg-[#F8F1E7] p-6 sm:p-8 rounded-3xl border border-[#E0CEB7] shadow-sm">
              <Tabs defaultValue="step-stems" className="w-full">
                <TabsList className="grid grid-cols-3 mb-8 w-full">
                  <TabsTrigger value="step-stems" className="text-xs sm:text-sm">
                    1. Floral Stems
                  </TabsTrigger>
                  <TabsTrigger value="step-wrapping" className="text-xs sm:text-sm">
                    2. Wrap & Ribbon
                  </TabsTrigger>
                  <TabsTrigger value="step-addons" className="text-xs sm:text-sm">
                    3. Add-ons ({selectedBouquetAddons.length})
                  </TabsTrigger>
                </TabsList>

                {/* Step 1: Stems */}
                <TabsContent value="step-stems" className="space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-serif text-lg font-semibold text-[#6B1E2D]">
                      Select Fresh Floral Variety
                    </h3>
                    <span className="text-xs text-[#8C3A4B]">Hand-conditioned fresh blooms</span>
                  </div>

                  <div className="space-y-3">
                    {BOUQUET_FLOWERS.map((flower) => {
                      const isSelected = selectedFlower.id === flower.id;
                      return (
                        <div
                          key={flower.id}
                          onClick={() => setSelectedFlower(flower)}
                          className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                            isSelected
                              ? "border-[#6B1E2D] bg-[#E8D8C3]/50 shadow-xs"
                              : "border-[#E0CEB7] bg-white/70 hover:border-[#6B1E2D]/40"
                          }`}
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-serif font-semibold text-sm text-[#6B1E2D]">
                                {flower.name}
                              </h4>
                              <Badge variant="outline" className="text-[10px]">
                                {flower.origin}
                              </Badge>
                            </div>
                            <p className="text-xs text-[#8C3A4B]">
                              {flower.stemsCount} • {flower.colorTone}
                            </p>
                          </div>
                          <div className="text-right">
                            <span className="font-serif font-bold text-base text-[#6B1E2D] block">
                              Rs. {flower.pricePkr.toLocaleString()}
                            </span>
                            <span className="text-[10px] text-[#8C3A4B]">
                              {isSelected ? "Selected" : "Select Stems"}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </TabsContent>

                {/* Step 2: Wrapping & Ribbon */}
                <TabsContent value="step-wrapping" className="space-y-6">
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-[#6B1E2D] mb-1">
                      Artisanal Wrapping Paper
                    </h3>
                    <p className="text-xs text-[#8C3A4B] mb-4">
                      Waterproof floristry paper imported for optimal stem hydration.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {BOUQUET_WRAPPINGS.map((wrap) => (
                        <div
                          key={wrap.id}
                          onClick={() => setSelectedWrap(wrap)}
                          className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                            selectedWrap.id === wrap.id
                              ? "border-[#6B1E2D] bg-[#E8D8C3]/50"
                              : "border-[#E0CEB7] bg-white/70 hover:border-[#6B1E2D]/40"
                          }`}
                        >
                          <div>
                            <h5 className="font-serif font-semibold text-xs text-[#6B1E2D]">
                              {wrap.name}
                            </h5>
                            <p className="text-[11px] text-[#8C3A4B] mt-1">{wrap.finish}</p>
                          </div>
                          <div className="mt-3 pt-2 border-t border-[#E0CEB7]/60">
                            <span className="font-serif font-bold text-xs text-[#6B1E2D]">
                              +Rs. {wrap.pricePkr.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-serif text-lg font-semibold text-[#6B1E2D] mb-1">
                      Signature Fabric Ribbon Tie
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
                      {BOUQUET_RIBBONS.map((rib) => (
                        <div
                          key={rib.id}
                          onClick={() => setSelectedRibbon(rib)}
                          className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                            selectedRibbon.id === rib.id
                              ? "border-[#6B1E2D] bg-[#E8D8C3]/50"
                              : "border-[#E0CEB7] bg-white/70"
                          }`}
                        >
                          <span className="text-xs font-serif font-medium text-[#6B1E2D]">
                            {rib.name}
                          </span>
                          <span className="text-xs font-bold text-[#6B1E2D]">
                            +Rs. {rib.pricePkr.toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                {/* Step 3: Add-ons & Card */}
                <TabsContent value="step-addons" className="space-y-6">
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-[#6B1E2D] mb-1">
                      Floral Accents & Confectionery
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                      {BOUQUET_ADDONS.map((addon) => {
                        const isSelected = selectedBouquetAddons.includes(addon.id);
                        return (
                          <div
                            key={addon.id}
                            onClick={() => toggleBouquetAddon(addon.id)}
                            className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                              isSelected
                                ? "border-[#6B1E2D] bg-[#E8D8C3]/60 shadow-xs"
                                : "border-[#E0CEB7] bg-white/70"
                            }`}
                          >
                            <div>
                              <span className="text-[10px] text-[#8C3A4B] uppercase font-semibold">
                                {addon.tag}
                              </span>
                              <h5 className="font-serif font-medium text-xs text-[#6B1E2D]">
                                {addon.name}
                              </h5>
                              <span className="font-bold text-xs text-[#6B1E2D]">
                                +Rs. {addon.pricePkr.toLocaleString()}
                              </span>
                            </div>
                            <div
                              className={`h-6 w-6 rounded-full flex items-center justify-center text-xs ${
                                isSelected
                                  ? "bg-[#6B1E2D] text-[#F8F1E7]"
                                  : "border border-[#E0CEB7]"
                              }`}
                            >
                              ✓
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-serif text-base font-semibold text-[#6B1E2D] mb-2">
                      Wax-Sealed Note for the Bouquet
                    </h4>
                    <div className="space-y-2">
                      <Input
                        value={bouquetCardRecipient}
                        onChange={(e) => setBouquetCardRecipient(e.target.value)}
                        placeholder="Recipient Name"
                        className="bg-white/70"
                      />
                      <textarea
                        rows={2}
                        value={bouquetCardMessage}
                        onChange={(e) => setBouquetCardMessage(e.target.value)}
                        className="w-full rounded-2xl border border-[#E0CEB7] bg-white/70 p-3 text-xs text-[#6B1E2D] focus:outline-none focus:ring-2 focus:ring-[#6B1E2D]"
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Right Column: Bouquet Summary */}
            <div className="lg:col-span-5 bg-[#F8F1E7] p-6 sm:p-8 rounded-3xl border border-[#E0CEB7] shadow-sm sticky top-28">
              <div className="flex items-center justify-between pb-4 border-b border-[#E0CEB7]">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#8C3A4B]">
                    LIVE FLORAL SUMMARY
                  </span>
                  <h3 className="font-serif text-xl font-medium text-[#6B1E2D]">
                    Your Handcrafted Bouquet
                  </h3>
                </div>
                <Badge variant="gold" className="text-xs font-bold">
                  Rs. {bouquetTotalPkr.toLocaleString()} PKR
                </Badge>
              </div>

              {/* Flowers */}
              <div className="py-4 border-b border-[#E0CEB7]/70 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#8C3A4B]">Selected Stems:</span>
                  <span className="font-semibold text-[#6B1E2D]">{selectedFlower.name}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#8C3A4B]">
                  <span>
                    {selectedFlower.stemsCount} • {selectedFlower.colorTone}
                  </span>
                  <span>Rs. {selectedFlower.pricePkr.toLocaleString()}</span>
                </div>
              </div>

              {/* Wrap & Ribbon */}
              <div className="py-3 border-b border-[#E0CEB7]/70 space-y-1.5 text-xs">
                <div className="flex justify-between text-[#8C3A4B]">
                  <span>Wrap: {selectedWrap.name}</span>
                  <span>+Rs. {selectedWrap.pricePkr.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[#8C3A4B]">
                  <span>Ribbon: {selectedRibbon.name}</span>
                  <span>+Rs. {selectedRibbon.pricePkr.toLocaleString()}</span>
                </div>
              </div>

              {/* Addons */}
              <div className="py-3 border-b border-[#E0CEB7]/70 space-y-1 text-xs">
                <span className="text-[#8C3A4B] font-semibold block">
                  Add-ons ({selectedBouquetAddons.length}):
                </span>
                {selectedBouquetAddons.length === 0 ? (
                  <p className="text-[11px] italic text-[#8C3A4B]">No add-ons selected.</p>
                ) : (
                  selectedBouquetAddons.map((id) => {
                    const addon = BOUQUET_ADDONS.find((a) => a.id === id);
                    if (!addon) return null;
                    return (
                      <div key={id} className="flex justify-between text-[11px] text-[#6B1E2D]">
                        <span>• {addon.name}</span>
                        <span>+Rs. {addon.pricePkr.toLocaleString()}</span>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Note */}
              <div className="py-3 border-b border-[#E0CEB7]/70 bg-[#E8D8C3]/30 p-3 rounded-2xl my-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#6B1E2D] block mb-0.5">
                  Card To: {bouquetCardRecipient || "Recipient"}
                </span>
                <p className="font-serif italic text-xs text-[#8C3A4B] line-clamp-2">
                  &ldquo;{bouquetCardMessage}&rdquo;
                </p>
              </div>

              {/* CTA */}
              <div className="pt-2 space-y-3">
                <Button
                  size="lg"
                  className="w-full text-xs font-semibold uppercase tracking-widest py-6"
                  onClick={openBouquetOrder}
                >
                  Add Custom Bouquet to Bag • Rs. {bouquetTotalPkr.toLocaleString()}
                </Button>
                <p className="text-center text-[11px] text-[#8C3A4B]">
                  Hand-tied with fresh flower food sachet & care instructions.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* VIEW 3: BROWSE CURATED CATALOG                               */}
        {/* ============================================================ */}
        {activeTab === "browse" && (
          <div className="space-y-12 animate-fadeIn">
            {/* Filter Bar */}
            <div className="p-4 rounded-3xl bg-[#F8F1E7] border border-[#E0CEB7] space-y-3 shadow-xs">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="relative w-full sm:max-w-md">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8C3A4B]" />
                  <Input
                    type="text"
                    placeholder="Search catalog items, jewelry, makeup, or scents..."
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
                  <div className="flex items-center gap-1.5 bg-white/70 px-3 py-1.5 rounded-full border border-[#E0CEB7]">
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

              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
                <button
                  onClick={() => setBrowseCategory("all")}
                  className={`px-3.5 py-1.5 rounded-full font-medium transition-all whitespace-nowrap cursor-pointer ${
                    browseCategory === "all"
                      ? "bg-[#6B1E2D] text-[#F8F1E7]"
                      : "bg-white/70 text-[#6B1E2D] hover:bg-[#E8D8C3] border border-[#E0CEB7]"
                  }`}
                >
                  All Items ({SIGNATURE_COLLECTIONS.length + SAMPLE_BOX_ITEMS.length})
                </button>
                <button
                  onClick={() => setBrowseCategory("signature-boxes")}
                  className={`px-3.5 py-1.5 rounded-full font-medium transition-all whitespace-nowrap cursor-pointer ${
                    browseCategory === "signature-boxes"
                      ? "bg-[#6B1E2D] text-[#F8F1E7]"
                      : "bg-white/70 text-[#6B1E2D] hover:bg-[#E8D8C3] border border-[#E0CEB7]"
                  }`}
                >
                  Signature Boxes (3)
                </button>
                <button
                  onClick={() => setBrowseCategory("signature-bouquets")}
                  className={`px-3.5 py-1.5 rounded-full font-medium transition-all whitespace-nowrap cursor-pointer ${
                    browseCategory === "signature-bouquets"
                      ? "bg-[#6B1E2D] text-[#F8F1E7]"
                      : "bg-white/70 text-[#6B1E2D] hover:bg-[#E8D8C3] border border-[#E0CEB7]"
                  }`}
                >
                  Fresh Bouquets (3)
                </button>
                <button
                  onClick={() => setBrowseCategory("jewelry")}
                  className={`px-3.5 py-1.5 rounded-full font-medium transition-all whitespace-nowrap cursor-pointer ${
                    browseCategory === "jewelry"
                      ? "bg-[#6B1E2D] text-[#F8F1E7]"
                      : "bg-white/70 text-[#6B1E2D] hover:bg-[#E8D8C3] border border-[#E0CEB7]"
                  }`}
                >
                  Jewelry & Hair (8)
                </button>
                <button
                  onClick={() => setBrowseCategory("makeup")}
                  className={`px-3.5 py-1.5 rounded-full font-medium transition-all whitespace-nowrap cursor-pointer ${
                    browseCategory === "makeup"
                      ? "bg-[#6B1E2D] text-[#F8F1E7]"
                      : "bg-white/70 text-[#6B1E2D] hover:bg-[#E8D8C3] border border-[#E0CEB7]"
                  }`}
                >
                  Makeup & Beauty (8)
                </button>
                <button
                  onClick={() => setBrowseCategory("crochet")}
                  className={`px-3.5 py-1.5 rounded-full font-medium transition-all whitespace-nowrap cursor-pointer ${
                    browseCategory === "crochet"
                      ? "bg-[#6B1E2D] text-[#F8F1E7]"
                      : "bg-white/70 text-[#6B1E2D] hover:bg-[#E8D8C3] border border-[#E0CEB7]"
                  }`}
                >
                  Handmade Crochet (2)
                </button>
                <button
                  onClick={() => setBrowseCategory("treats-candles")}
                  className={`px-3.5 py-1.5 rounded-full font-medium transition-all whitespace-nowrap cursor-pointer ${
                    browseCategory === "treats-candles"
                      ? "bg-[#6B1E2D] text-[#F8F1E7]"
                      : "bg-white/70 text-[#6B1E2D] hover:bg-[#E8D8C3] border border-[#E0CEB7]"
                  }`}
                >
                  Mugs, Candles & Treats (4)
                </button>
              </div>
            </div>

            {/* SECTION: SIGNATURE CURATED PACKAGES */}
            {showCollections && filteredCollections.length > 0 && (
              <section className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#E0CEB7] pb-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#8C3A4B]">
                      COMPLETE GIFT PACKAGES
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#6B1E2D]">
                      Signature Curated Collections
                    </h2>
                  </div>
                  <p className="text-xs text-[#8C3A4B]">
                    Complete gift sets ready for express door-to-door hand delivery in Pakistan.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredCollections.map((col) => (
                    <Card
                      key={col.id}
                      className="overflow-hidden hover:shadow-xl transition-all duration-300 border-[#E0CEB7] flex flex-col justify-between bg-[#F8F1E7]/90"
                    >
                      <div>
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
                              openQuickItemOrder({
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
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full text-xs font-semibold uppercase tracking-wider"
                            onClick={() => setActiveTab(col.category === "box" ? "box" : "bouquet")}
                          >
                            Customize
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {/* SECTION: INDIVIDUAL LUXURIES & TREATS */}
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
                  <p className="text-xs text-[#8C3A4B]">
                    Order individually or customize inside a keepsake magnetic box.
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
                            openQuickItemOrder({
                              title: item.name,
                              category: item.category,
                              pricePkr: item.pricePkr,
                              description: item.description,
                            })
                          }
                        >
                          Quick Order
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full text-[11px] font-medium text-[#8C3A4B] hover:text-[#6B1E2D] hover:bg-[#E8D8C3]/40"
                          onClick={() => {
                            if (!selectedBoxItems.includes(item.id) && selectedBoxItems.length < 6) {
                              setSelectedBoxItems([...selectedBoxItems, item.id]);
                            }
                            setActiveTab("box");
                          }}
                        >
                          Add into Custom Box →
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </main>

      {/* UNIFIED ORDER / CHECKOUT DIALOG */}
      <Dialog open={isOrderModalOpen} onOpenChange={setIsOrderModalOpen}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Your MIBELLA Bag</DialogTitle>
            <DialogDescription>
              Review your customized creation and set delivery details for Pakistan.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            {/* Itemized summary */}
            <div className="p-4 rounded-2xl bg-[#E8D8C3]/50 border border-[#E0CEB7] space-y-2">
              <div className="flex justify-between items-center text-sm font-serif font-semibold">
                <span>
                  {modalMode === "box"
                    ? selectedBox.name
                    : modalMode === "bouquet"
                    ? `${selectedFlower.name} Bouquet`
                    : quickOrderItem?.title}
                </span>
                <span className="font-bold text-[#6B1E2D]">
                  Rs. {activeTotalPkr.toLocaleString()} PKR
                </span>
              </div>

              {modalMode === "box" && (
                <>
                  <p className="text-xs text-[#8C3A4B]">
                    {selectedBoxItems.length} curated treats & wax calligraphy card
                    {includePhoto ? " + photo print" : ""}
                  </p>
                  {includePhoto && (
                    <div className="flex items-center gap-2 pt-2 border-t border-[#E0CEB7]/70">
                      {photoPreview ? (
                        <img
                          src={photoPreview}
                          alt="Keepsake Photo"
                          className="w-7 h-7 rounded object-cover border border-[#E0CEB7]"
                        />
                      ) : (
                        <div className="w-7 h-7 rounded bg-[#E0CEB7] flex items-center justify-center text-[#6B1E2D]">
                          <Camera className="h-3.5 w-3.5" />
                        </div>
                      )}
                      <span className="text-xs text-[#6B1E2D]">
                        Photo attached: {photoCaption ? `"${photoCaption}"` : "Keepsake print in pouch"} (+Rs. 250)
                      </span>
                    </div>
                  )}
                  <p className="text-xs italic text-[#8C3A4B] border-t border-[#E0CEB7] pt-2">
                    Card note to {boxCardRecipient}: &ldquo;{boxCardMessage}&rdquo;
                  </p>
                </>
              )}

              {modalMode === "bouquet" && (
                <>
                  <p className="text-xs text-[#8C3A4B]">
                    {selectedWrap.name} + {selectedRibbon.name} & {selectedBouquetAddons.length} add-ons
                  </p>
                  <p className="text-xs italic text-[#8C3A4B] border-t border-[#E0CEB7] pt-2">
                    Card note to {bouquetCardRecipient}: &ldquo;{bouquetCardMessage}&rdquo;
                  </p>
                </>
              )}

              {modalMode === "item" && quickOrderItem && (
                <p className="text-xs text-[#8C3A4B]">{quickOrderItem.description}</p>
              )}
            </div>

            {/* City Selection in Pakistan */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#8C3A4B] flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" /> Destination City
              </label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full h-11 rounded-full border border-[#E0CEB7] bg-white/70 px-4 text-sm text-[#6B1E2D] focus:outline-none focus:ring-2 focus:ring-[#6B1E2D]"
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
                <option value="Other">Other Pakistan City</option>
              </select>
            </div>

            {/* Scheduled Date */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#8C3A4B] flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" /> Scheduled Delivery Date
              </label>
              <Input
                type="date"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                className="bg-white/70"
              />
            </div>

            {/* Recipient Address */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#8C3A4B]">
                Gift Recipient Full Address & Contact
              </label>
              <Input
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                placeholder="House #, Street, Area, Contact #"
                className="bg-white/70"
              />
            </div>

            {/* Price Breakdown */}
            <div className="pt-2 border-t border-[#E0CEB7] space-y-1 text-xs text-[#8C3A4B]">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>Rs. {activeTotalPkr.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery:</span>
                <span className={activeTotalPkr >= 5000 ? "text-emerald-700 font-semibold" : ""}>
                  {activeTotalPkr >= 5000 ? "FREE (Orders over Rs. 5,000)" : "Rs. 350"}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#6B1E2D] pt-1 border-t border-[#E0CEB7]/60">
                <span>Total Amount:</span>
                <span>
                  Rs. {(activeTotalPkr + (activeTotalPkr >= 5000 ? 0 : 350)).toLocaleString()} PKR
                </span>
              </div>
            </div>

            <Button
              className="w-full text-xs font-semibold uppercase tracking-widest mt-4 py-6"
              size="lg"
              onClick={() => {
                alert(
                  `Order recorded! Total: Rs. ${(
                    activeTotalPkr + (activeTotalPkr >= 5000 ? 0 : 350)
                  ).toLocaleString()} PKR for ${selectedCity}. Connected to Supabase.`
                );
                setIsOrderModalOpen(false);
              }}
            >
              Proceed to Gifting Checkout
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F3E7D3] flex items-center justify-center text-[#6B1E2D]">
          <div className="text-center space-y-3">
            <span className="font-serif text-2xl tracking-widest block">MIBELLA</span>
            <p className="text-xs text-[#8C3A4B]">Loading Atelier & Catalog...</p>
          </div>
        </div>
      }
    >
      <CatalogContent />
    </Suspense>
  );
}
