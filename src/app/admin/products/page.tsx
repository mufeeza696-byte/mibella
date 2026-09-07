"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import {
  Boxes,
  Plus,
  Search,
  SlidersHorizontal,
  Edit2,
  Trash2,
  Check,
  X,
  Upload,
  Sparkles,
  ExternalLink,
  Package,
  AlertTriangle,
  Eye,
  Star,
  Tag,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Product,
  Category,
  fetchProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  uploadProductImage,
  fetchCategories,
} from "@/lib/products-storage";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [stockFilter, setStockFilter] = useState<"all" | "in" | "low" | "out">("all");

  // Add Product Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "Signature Gift Boxes",
    type: "box" as "box" | "bouquet" | "item",
    price_pkr: "",
    sale_price_pkr: "",
    stock: "25",
    badge: "New Arrival",
    description: "",
    inclusions: "",
    image_url: "",
    is_featured: false,
  });

  // Edit Product Modal State
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [editImageFile, setEditImageFile] = useState<File | null>(null);
  const [editImagePreview, setEditImagePreview] = useState<string>("");

  // Delete Confirmation State
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);

  // Success Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Load Data
  const loadData = async () => {
    setLoading(true);
    try {
      const [prods, cats] = await Promise.all([fetchProducts(), fetchCategories()]);
      setProducts(prods);
      setCategories(cats);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.badge && p.badge.toLowerCase().includes(searchQuery.toLowerCase())) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (selectedCategory !== "all" && p.category !== selectedCategory) {
        return false;
      }

      if (stockFilter === "in" && p.stock <= 0) return false;
      if (stockFilter === "low" && (p.stock <= 0 || p.stock > 10)) return false;
      if (stockFilter === "out" && p.stock > 0) return false;

      return true;
    });
  }, [products, searchQuery, selectedCategory, stockFilter]);

  // Statistics
  const stats = useMemo(() => {
    const total = products.length;
    const inStock = products.filter((p) => p.stock > 10).length;
    const lowStock = products.filter((p) => p.stock > 0 && p.stock <= 10).length;
    const outOfStock = products.filter((p) => p.stock === 0).length;
    return { total, inStock, lowStock, outOfStock };
  }, [products]);

  // Handle Image File Selection for Add
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Image File Selection for Edit
  const handleEditImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setEditImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Add Product Submit
  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price_pkr) {
      alert("Please provide at least product name and price.");
      return;
    }

    setIsPublishing(true);
    try {
      let finalImageUrl = newProduct.image_url.trim();

      if (imageFile) {
        finalImageUrl = await uploadProductImage(imageFile);
      } else if (!finalImageUrl) {
        finalImageUrl =
          newProduct.type === "bouquet"
            ? "https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=800&auto=format&fit=crop"
            : "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop";
      }

      const inclusionsArray = newProduct.inclusions
        ? newProduct.inclusions.split(",").map((s) => s.trim()).filter(Boolean)
        : [];

      const created = await addProduct({
        id: `prod-${Date.now()}`,
        name: newProduct.name.trim(),
        category: newProduct.category,
        type: newProduct.type,
        price_pkr: parseInt(newProduct.price_pkr) || 0,
        sale_price_pkr: newProduct.sale_price_pkr ? parseInt(newProduct.sale_price_pkr) : undefined,
        stock: parseInt(newProduct.stock) || 0,
        badge: newProduct.badge.trim() || undefined,
        description: newProduct.description.trim() || "Artisanal luxury hand-curated by MIBELLA atelier.",
        inclusions: inclusionsArray.length > 0 ? inclusionsArray : [newProduct.name],
        image: finalImageUrl,
        images: [finalImageUrl],
        is_featured: newProduct.is_featured,
      });

      setProducts((prev) => [created, ...prev]);
      setIsAddModalOpen(false);
      setImageFile(null);
      setImagePreview("");
      setNewProduct({
        name: "",
        category: categories[0]?.name || "Signature Gift Boxes",
        type: "box",
        price_pkr: "",
        sale_price_pkr: "",
        stock: "25",
        badge: "New Arrival",
        description: "",
        inclusions: "",
        image_url: "",
        is_featured: false,
      });
      showToast(`✨ Product "${created.name}" published to catalog successfully!`);
    } catch (err: any) {
      alert("Error adding product: " + (err?.message || "Unknown error"));
    } finally {
      setIsPublishing(false);
    }
  };

  // Inline Stock Update
  const handleInlineStockChange = async (productId: string, newStockStr: string) => {
    const val = parseInt(newStockStr);
    if (isNaN(val) || val < 0) return;
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, stock: val } : p))
    );
    await updateProduct(productId, { stock: val });
  };

  // Inline Price Update
  const handleInlinePriceChange = async (productId: string, newPriceStr: string) => {
    const val = parseInt(newPriceStr);
    if (isNaN(val) || val <= 0) return;
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, price_pkr: val } : p))
    );
    await updateProduct(productId, { price_pkr: val });
  };

  // Toggle Featured
  const handleToggleFeatured = async (productId: string, current: boolean) => {
    const nextVal = !current;
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, is_featured: nextVal } : p))
    );
    await updateProduct(productId, { is_featured: nextVal });
    showToast(nextVal ? "Starred on Homepage featured collection!" : "Removed from Homepage featured.");
  };

  // Open Edit Modal
  const handleOpenEdit = (product: Product) => {
    setEditingProduct({ ...product });
    setEditImagePreview(product.image);
    setEditImageFile(null);
    setIsEditModalOpen(true);
  };

  // Save Edit Submit
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    setIsUpdating(true);
    try {
      let finalImageUrl = editingProduct.image;
      if (editImageFile) {
        finalImageUrl = await uploadProductImage(editImageFile);
      }

      const updatedFields: Partial<Product> = {
        name: editingProduct.name,
        category: editingProduct.category,
        type: editingProduct.type,
        price_pkr: Number(editingProduct.price_pkr),
        sale_price_pkr: editingProduct.sale_price_pkr ? Number(editingProduct.sale_price_pkr) : undefined,
        stock: Number(editingProduct.stock),
        badge: editingProduct.badge,
        description: editingProduct.description,
        inclusions: Array.isArray(editingProduct.inclusions) ? editingProduct.inclusions : [],
        image: finalImageUrl,
        is_featured: editingProduct.is_featured,
      };

      await updateProduct(editingProduct.id, updatedFields);
      setProducts((prev) =>
        prev.map((p) => (p.id === editingProduct.id ? { ...p, ...updatedFields } : p))
      );
      setIsEditModalOpen(false);
      setEditingProduct(null);
      showToast(`Updated "${editingProduct.name}" details successfully!`);
    } catch (err: any) {
      alert("Failed to update product: " + err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  // Delete Product
  const handleConfirmDelete = async () => {
    if (!deletingProduct) return;
    try {
      await deleteProduct(deletingProduct.id);
      setProducts((prev) => prev.filter((p) => p.id !== deletingProduct.id));
      showToast(`Removed "${deletingProduct.name}" from catalog.`);
      setDeletingProduct(null);
    } catch (err: any) {
      alert("Failed to delete product: " + err.message);
    }
  };

  return (
    <div className="space-y-8">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#6B1E2D] text-[#F8F1E7] px-5 py-3 rounded-2xl shadow-2xl text-xs font-semibold flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-5 border border-[#C5A880]">
          <Check className="h-4 w-4 text-[#C5A880]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#F8F1E7] p-6 sm:p-8 rounded-3xl border border-[#E0CEB7] shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] uppercase tracking-widest font-bold text-[#8C3A4B]">
              Catalog Operations
            </span>
            <span className="text-xs text-[#8C3A4B]">•</span>
            <Badge variant="gold" className="text-[9px]">
              Live Inventory
            </Badge>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#6B1E2D]">
            Products & Atelier Inventory
          </h1>
          <p className="text-xs text-[#8C3A4B] mt-1 max-w-xl">
            Create, edit, and organize bespoke gift boxes, fresh floral bouquets, and individual luxury keepsakes. Changes reflect instantly across the storefront.
          </p>
        </div>

        <div className="flex items-center gap-3">
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

          <Button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-[#6B1E2D] hover:bg-[#822436] text-[#F8F1E7] text-xs font-semibold uppercase tracking-wider gap-2 px-5 py-2.5 rounded-xl shadow-md"
          >
            <Plus className="h-4 w-4 text-[#C5A880]" />
            <span>Add New Product</span>
          </Button>
        </div>
      </div>

      {/* KPI Counters */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-[#F8F1E7] border-[#E0CEB7]">
          <CardContent className="p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C3A4B]">
                Total Catalog
              </span>
              <Boxes className="h-4 w-4 text-[#6B1E2D]" />
            </div>
            <p className="font-serif text-2xl sm:text-3xl font-bold text-[#6B1E2D] mt-2">
              {stats.total}
            </p>
            <span className="text-[10px] text-[#8C3A4B]">Across {categories.length} categories</span>
          </CardContent>
        </Card>

        <Card className="bg-[#F8F1E7] border-[#E0CEB7]">
          <CardContent className="p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                In Stock & Ready
              </span>
              <div className="h-2 w-2 rounded-full bg-emerald-500" />
            </div>
            <p className="font-serif text-2xl sm:text-3xl font-bold text-emerald-800 mt-2">
              {stats.inStock}
            </p>
            <span className="text-[10px] text-emerald-700">Healthy quantity available</span>
          </CardContent>
        </Card>

        <Card className="bg-[#F8F1E7] border-[#E0CEB7]">
          <CardContent className="p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
                Low Stock Warning
              </span>
              <AlertTriangle className="h-4 w-4 text-amber-600" />
            </div>
            <p className="font-serif text-2xl sm:text-3xl font-bold text-amber-800 mt-2">
              {stats.lowStock}
            </p>
            <span className="text-[10px] text-amber-700">Under 10 items remaining</span>
          </CardContent>
        </Card>

        <Card className="bg-[#F8F1E7] border-[#E0CEB7]">
          <CardContent className="p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-red-800">
                Sold Out
              </span>
              <X className="h-4 w-4 text-red-600" />
            </div>
            <p className="font-serif text-2xl sm:text-3xl font-bold text-red-800 mt-2">
              {stats.outOfStock}
            </p>
            <span className="text-[10px] text-red-700">Needs restock in atelier</span>
          </CardContent>
        </Card>
      </div>

      {/* Search & Filter Bar */}
      <Card className="bg-[#F8F1E7] border-[#E0CEB7]">
        <CardContent className="p-5 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#8C3A4B]" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products by title, tag, stem..."
                className="pl-9 bg-white/80 border-[#E0CEB7] text-xs h-9 rounded-xl"
              />
            </div>

            {/* Stock Filter Pills */}
            <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
              <span className="text-[11px] font-bold uppercase text-[#8C3A4B] mr-1 hidden lg:inline">
                Stock:
              </span>
              {[
                { key: "all", label: "All Items" },
                { key: "in", label: "In Stock" },
                { key: "low", label: "Low (<10)" },
                { key: "out", label: "Sold Out" },
              ].map((f) => (
                <button
                  key={f.key}
                  onClick={() => setStockFilter(f.key as any)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold cursor-pointer transition-all ${
                    stockFilter === f.key
                      ? "bg-[#6B1E2D] text-[#F8F1E7]"
                      : "bg-[#E8D8C3]/50 text-[#6B1E2D] hover:bg-[#E8D8C3]"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 border-t border-[#E0CEB7]/60 pt-3">
            <span className="text-[11px] font-bold uppercase text-[#8C3A4B] mr-1 shrink-0">
              Categories:
            </span>
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-3 py-1 rounded-full text-xs font-semibold shrink-0 cursor-pointer transition-all ${
                selectedCategory === "all"
                  ? "bg-[#C5A880] text-[#2C1810]"
                  : "bg-white/60 text-[#6B1E2D] hover:bg-white border border-[#E0CEB7]"
              }`}
            >
              All Categories ({products.length})
            </button>
            {categories.map((cat) => {
              const count = products.filter((p) => p.category === cat.name).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold shrink-0 cursor-pointer transition-all ${
                    selectedCategory === cat.name
                      ? "bg-[#C5A880] text-[#2C1810]"
                      : "bg-white/60 text-[#6B1E2D] hover:bg-white border border-[#E0CEB7]"
                  }`}
                >
                  {cat.name} ({count})
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card className="bg-[#F8F1E7] border-[#E0CEB7] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#E0CEB7] bg-[#E8D8C3]/40 text-[#6B1E2D] uppercase font-bold text-[10px] tracking-wider">
                <th className="py-3 px-4">Item & Details</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Price (PKR)</th>
                <th className="py-3 px-4">Stock</th>
                <th className="py-3 px-4 text-center">Featured</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E0CEB7]/70">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-[#8C3A4B]">
                    <div className="flex items-center justify-center gap-2">
                      <RefreshCw className="h-4 w-4 animate-spin text-[#6B1E2D]" />
                      <span>Loading atelier items...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-[#8C3A4B]">
                    <Package className="h-8 w-8 mx-auto text-[#C5A880] mb-2 opacity-80" />
                    <p className="font-serif text-base font-semibold text-[#6B1E2D]">
                      No products match your filter
                    </p>
                    <p className="text-xs text-[#8C3A4B] mt-0.5">
                      Try clearing your search query or add a new luxury product.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => {
                  const isLow = product.stock > 0 && product.stock <= 10;
                  const isOut = product.stock === 0;

                  return (
                    <tr key={product.id} className="hover:bg-[#E8D8C3]/30 transition-colors">
                      {/* Product Info & Thumbnail */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="relative h-12 w-12 rounded-xl overflow-hidden bg-[#E8D8C3] border border-[#E0CEB7] shrink-0">
                            {product.image ? (
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                sizes="48px"
                                className="object-cover"
                              />
                            ) : (
                              <div className="h-full w-full flex items-center justify-center text-[#8C3A4B] text-[10px]">
                                No img
                              </div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-serif font-bold text-[#6B1E2D] text-sm truncate max-w-[200px] sm:max-w-xs block">
                                {product.name}
                              </span>
                              {product.badge && (
                                <Badge variant="gold" className="text-[9px] py-0 px-1.5 shrink-0">
                                  {product.badge}
                                </Badge>
                              )}
                            </div>
                            <p className="text-[11px] text-[#8C3A4B] line-clamp-1 mt-0.5 max-w-sm">
                              {product.description}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3 px-4">
                        <span className="text-[11px] font-semibold text-[#6B1E2D] bg-white/70 px-2.5 py-1 rounded-lg border border-[#E0CEB7]/70 whitespace-nowrap">
                          {product.category}
                        </span>
                      </td>

                      {/* Type Badge */}
                      <td className="py-3 px-4">
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                            product.type === "box"
                              ? "bg-[#6B1E2D]/10 text-[#6B1E2D]"
                              : product.type === "bouquet"
                              ? "bg-rose-100 text-rose-800"
                              : "bg-amber-100 text-amber-900"
                          }`}
                        >
                          {product.type === "box"
                            ? "Gift Box"
                            : product.type === "bouquet"
                            ? "Bouquet"
                            : "Keepsake"}
                        </span>
                      </td>

                      {/* Price (Inline Editable) */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <span className="text-xs font-semibold text-[#8C3A4B]">Rs.</span>
                          <input
                            type="number"
                            defaultValue={product.price_pkr}
                            onBlur={(e) => handleInlinePriceChange(product.id, e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                handleInlinePriceChange(product.id, (e.target as any).value);
                                (e.target as any).blur();
                              }
                            }}
                            title="Click and edit price directly"
                            className="w-20 px-2 py-1 bg-white/80 border border-[#E0CEB7] rounded-lg text-xs font-bold text-[#6B1E2D] focus:border-[#6B1E2D] focus:outline-none"
                          />
                        </div>
                        {product.sale_price_pkr && (
                          <span className="text-[10px] text-[#8C3A4B] line-through block mt-0.5">
                            Rs. {product.sale_price_pkr.toLocaleString()}
                          </span>
                        )}
                      </td>

                      {/* Stock (Inline Editable) */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            defaultValue={product.stock}
                            onBlur={(e) => handleInlineStockChange(product.id, e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                handleInlineStockChange(product.id, (e.target as any).value);
                                (e.target as any).blur();
                              }
                            }}
                            title="Click and edit stock count"
                            className={`w-16 px-2 py-1 bg-white/80 border rounded-lg text-xs font-bold focus:outline-none ${
                              isOut
                                ? "border-red-400 text-red-700 bg-red-50"
                                : isLow
                                ? "border-amber-400 text-amber-800 bg-amber-50"
                                : "border-[#E0CEB7] text-[#6B1E2D]"
                            }`}
                          />
                          {isOut ? (
                            <span className="text-[9px] font-bold text-red-600 uppercase">Out</span>
                          ) : isLow ? (
                            <span className="text-[9px] font-bold text-amber-600 uppercase">Low</span>
                          ) : null}
                        </div>
                      </td>

                      {/* Featured Star Toggle */}
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => handleToggleFeatured(product.id, product.is_featured)}
                          title={product.is_featured ? "Featured on Storefront" : "Click to feature"}
                          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                            product.is_featured
                              ? "text-amber-500 hover:bg-amber-100"
                              : "text-[#E0CEB7] hover:text-[#C5A880] hover:bg-[#E8D8C3]"
                          }`}
                        >
                          <Star className={`h-4 w-4 ${product.is_featured ? "fill-amber-500" : ""}`} />
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenEdit(product)}
                            title="Edit product details"
                            className="p-1.5 text-[#6B1E2D] hover:bg-[#E8D8C3] rounded-lg transition-colors cursor-pointer"
                          >
                            <Edit2 className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => setDeletingProduct(product)}
                            title="Delete product"
                            className="p-1.5 text-red-600 hover:bg-red-100 rounded-lg transition-colors cursor-pointer"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* ============================================================ */}
      {/* ADD PRODUCT MODAL */}
      {/* ============================================================ */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="max-w-2xl bg-[#F8F1E7] border-[#E0CEB7] text-[#6B1E2D] rounded-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl font-bold text-[#6B1E2D] flex items-center gap-2">
              <Plus className="h-5 w-5 text-[#C5A880]" />
              <span>Add New Luxury Product</span>
            </DialogTitle>
            <DialogDescription className="text-xs text-[#8C3A4B]">
              Add a new signature keepsake chest, fresh floral arrangement, or component item to the MIBELLA catalog.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleAddSubmit} className="space-y-4 py-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Product Name */}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#6B1E2D]">
                  Product Name *
                </label>
                <Input
                  required
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  placeholder="e.g. Royal Burgundy Velvet Keepsake Box"
                  className="bg-white/90 border-[#E0CEB7] text-xs h-10 rounded-xl"
                />
              </div>

              {/* Category */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#6B1E2D]">
                  Category *
                </label>
                <select
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  className="w-full h-10 px-3 bg-white/90 border border-[#E0CEB7] rounded-xl text-xs text-[#6B1E2D] focus:outline-none focus:border-[#6B1E2D]"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Type */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#6B1E2D]">
                  Type *
                </label>
                <select
                  value={newProduct.type}
                  onChange={(e) => setNewProduct({ ...newProduct, type: e.target.value as any })}
                  className="w-full h-10 px-3 bg-white/90 border border-[#E0CEB7] rounded-xl text-xs text-[#6B1E2D] focus:outline-none focus:border-[#6B1E2D]"
                >
                  <option value="box">Bespoke Gift Box</option>
                  <option value="bouquet">Handcrafted Bouquet</option>
                  <option value="item">Curated Luxury / Item</option>
                </select>
              </div>

              {/* Price in PKR */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#6B1E2D]">
                  Regular Price (PKR) *
                </label>
                <Input
                  type="number"
                  required
                  value={newProduct.price_pkr}
                  onChange={(e) => setNewProduct({ ...newProduct, price_pkr: e.target.value })}
                  placeholder="e.g. 5800"
                  className="bg-white/90 border-[#E0CEB7] text-xs h-10 rounded-xl"
                />
              </div>

              {/* Sale Price in PKR */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#6B1E2D]">
                  Sale Price (PKR) (Optional)
                </label>
                <Input
                  type="number"
                  value={newProduct.sale_price_pkr}
                  onChange={(e) => setNewProduct({ ...newProduct, sale_price_pkr: e.target.value })}
                  placeholder="e.g. 4900"
                  className="bg-white/90 border-[#E0CEB7] text-xs h-10 rounded-xl"
                />
              </div>

              {/* Initial Stock */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#6B1E2D]">
                  Initial Stock Quantity *
                </label>
                <Input
                  type="number"
                  required
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                  placeholder="e.g. 25"
                  className="bg-white/90 border-[#E0CEB7] text-xs h-10 rounded-xl"
                />
              </div>

              {/* Badge / Tag */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#6B1E2D]">
                  Badge / Tag
                </label>
                <Input
                  value={newProduct.badge}
                  onChange={(e) => setNewProduct({ ...newProduct, badge: e.target.value })}
                  placeholder="e.g. Bestseller, Signature Harvest"
                  className="bg-white/90 border-[#E0CEB7] text-xs h-10 rounded-xl"
                />
              </div>

              {/* Inclusions */}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#6B1E2D]">
                  Included Items / Highlights (Comma separated)
                </label>
                <Input
                  value={newProduct.inclusions}
                  onChange={(e) => setNewProduct({ ...newProduct, inclusions: e.target.value })}
                  placeholder="e.g. Preserved Roses, French Soy Candle, Belgian Truffles, Calligraphy Card"
                  className="bg-white/90 border-[#E0CEB7] text-xs h-10 rounded-xl"
                />
              </div>

              {/* Description */}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#6B1E2D]">
                  Description & Floral Story
                </label>
                <textarea
                  rows={3}
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  placeholder="Describe the artisan crafts, stem longevity, fragrances, and packaging finish..."
                  className="w-full p-3 bg-white/90 border border-[#E0CEB7] rounded-xl text-xs text-[#6B1E2D] focus:outline-none focus:border-[#6B1E2D]"
                />
              </div>

              {/* Image Upload & URL */}
              <div className="space-y-2 sm:col-span-2 border-t border-[#E0CEB7] pt-4">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#6B1E2D] block">
                  Product Photography
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                  <div>
                    <label className="border-2 border-dashed border-[#C5A880]/60 hover:border-[#6B1E2D] bg-[#E8D8C3]/30 p-4 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-colors text-center">
                      <Upload className="h-6 w-6 text-[#C5A880] mb-1.5" />
                      <span className="text-xs font-semibold text-[#6B1E2D]">
                        Upload High-Res Photo
                      </span>
                      <span className="text-[10px] text-[#8C3A4B] mt-0.5">
                        PNG, JPG, WebP up to 5MB
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] uppercase font-bold text-[#8C3A4B]">or Image URL:</span>
                    <Input
                      value={newProduct.image_url}
                      onChange={(e) => {
                        setNewProduct({ ...newProduct, image_url: e.target.value });
                        setImagePreview(e.target.value);
                      }}
                      placeholder="https://images.unsplash.com/..."
                      className="bg-white/90 border-[#E0CEB7] text-xs h-9 rounded-xl"
                    />

                    {imagePreview && (
                      <div className="flex items-center gap-3 pt-1">
                        <div className="relative h-14 w-14 rounded-xl overflow-hidden border border-[#E0CEB7] bg-[#E8D8C3]">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <span className="text-[11px] text-emerald-800 font-semibold">
                          Image preview active
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Feature Toggle */}
              <div className="sm:col-span-2 flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="add-featured"
                  checked={newProduct.is_featured}
                  onChange={(e) => setNewProduct({ ...newProduct, is_featured: e.target.checked })}
                  className="h-4 w-4 rounded accent-[#6B1E2D] cursor-pointer"
                />
                <label htmlFor="add-featured" className="text-xs font-semibold text-[#6B1E2D] cursor-pointer">
                  Feature this item on the Storefront Homepage Signature Collection
                </label>
              </div>
            </div>

            <DialogFooter className="pt-4 border-t border-[#E0CEB7]">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAddModalOpen(false)}
                className="text-xs"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isPublishing}
                className="bg-[#6B1E2D] hover:bg-[#822436] text-[#F8F1E7] text-xs font-semibold uppercase tracking-wider"
              >
                {isPublishing ? "Publishing Item..." : "Publish Product"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* ============================================================ */}
      {/* EDIT PRODUCT MODAL */}
      {/* ============================================================ */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-2xl bg-[#F8F1E7] border-[#E0CEB7] text-[#6B1E2D] rounded-3xl max-h-[90vh] overflow-y-auto">
          {editingProduct && (
            <form onSubmit={handleEditSubmit} className="space-y-4 py-2">
              <DialogHeader>
                <DialogTitle className="font-serif text-2xl font-bold text-[#6B1E2D] flex items-center gap-2">
                  <Edit2 className="h-5 w-5 text-[#C5A880]" />
                  <span>Edit Product: {editingProduct.name}</span>
                </DialogTitle>
                <DialogDescription className="text-xs text-[#8C3A4B]">
                  Update pricing, stock availability, category, or photography.
                </DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#6B1E2D]">
                    Product Name
                  </label>
                  <Input
                    required
                    value={editingProduct.name}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, name: e.target.value })
                    }
                    className="bg-white/90 border-[#E0CEB7] text-xs h-10 rounded-xl"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#6B1E2D]">
                    Category
                  </label>
                  <select
                    value={editingProduct.category}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, category: e.target.value })
                    }
                    className="w-full h-10 px-3 bg-white/90 border border-[#E0CEB7] rounded-xl text-xs text-[#6B1E2D] focus:outline-none"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#6B1E2D]">
                    Type
                  </label>
                  <select
                    value={editingProduct.type}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, type: e.target.value as any })
                    }
                    className="w-full h-10 px-3 bg-white/90 border border-[#E0CEB7] rounded-xl text-xs text-[#6B1E2D] focus:outline-none"
                  >
                    <option value="box">Bespoke Gift Box</option>
                    <option value="bouquet">Handcrafted Bouquet</option>
                    <option value="item">Curated Luxury / Item</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#6B1E2D]">
                    Price (PKR)
                  </label>
                  <Input
                    type="number"
                    required
                    value={editingProduct.price_pkr}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        price_pkr: parseInt(e.target.value) || 0,
                      })
                    }
                    className="bg-white/90 border-[#E0CEB7] text-xs h-10 rounded-xl"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#6B1E2D]">
                    Stock Quantity
                  </label>
                  <Input
                    type="number"
                    required
                    value={editingProduct.stock}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        stock: parseInt(e.target.value) || 0,
                      })
                    }
                    className="bg-white/90 border-[#E0CEB7] text-xs h-10 rounded-xl"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#6B1E2D]">
                    Badge / Tag
                  </label>
                  <Input
                    value={editingProduct.badge || ""}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, badge: e.target.value })
                    }
                    placeholder="e.g. Bestseller, Limited Edition"
                    className="bg-white/90 border-[#E0CEB7] text-xs h-10 rounded-xl"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#6B1E2D]">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={editingProduct.description}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, description: e.target.value })
                    }
                    className="w-full p-3 bg-white/90 border border-[#E0CEB7] rounded-xl text-xs text-[#6B1E2D] focus:outline-none"
                  />
                </div>

                {/* Edit Photo */}
                <div className="space-y-2 sm:col-span-2 border-t border-[#E0CEB7] pt-4">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#6B1E2D] block">
                    Product Image
                  </label>
                  <div className="flex items-center gap-4">
                    {editImagePreview && (
                      <div className="relative h-16 w-16 rounded-xl overflow-hidden border border-[#E0CEB7] shrink-0 bg-[#E8D8C3]">
                        <img
                          src={editImagePreview}
                          alt="Product"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}
                    <div className="space-y-1.5 flex-1">
                      <Input
                        value={editingProduct.image}
                        onChange={(e) => {
                          setEditingProduct({ ...editingProduct, image: e.target.value });
                          setEditImagePreview(e.target.value);
                        }}
                        placeholder="Image URL"
                        className="bg-white/90 border-[#E0CEB7] text-xs h-9 rounded-xl"
                      />
                      <label className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6B1E2D] cursor-pointer hover:underline">
                        <Upload className="h-3.5 w-3.5 text-[#C5A880]" />
                        <span>Or upload new photo file</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleEditImageChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-2 flex items-center gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="edit-featured"
                    checked={editingProduct.is_featured}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, is_featured: e.target.checked })
                    }
                    className="h-4 w-4 rounded accent-[#6B1E2D] cursor-pointer"
                  />
                  <label htmlFor="edit-featured" className="text-xs font-semibold text-[#6B1E2D] cursor-pointer">
                    Feature on Storefront Homepage
                  </label>
                </div>
              </div>

              <DialogFooter className="pt-4 border-t border-[#E0CEB7]">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditModalOpen(false)}
                  className="text-xs"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isUpdating}
                  className="bg-[#6B1E2D] hover:bg-[#822436] text-[#F8F1E7] text-xs font-semibold uppercase tracking-wider"
                >
                  {isUpdating ? "Saving Changes..." : "Save Product Changes"}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* ============================================================ */}
      {/* DELETE CONFIRMATION MODAL */}
      {/* ============================================================ */}
      <Dialog open={!!deletingProduct} onOpenChange={(open) => !open && setDeletingProduct(null)}>
        <DialogContent className="max-w-md bg-[#F8F1E7] border-[#E0CEB7] text-[#6B1E2D] rounded-3xl">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl font-bold text-red-700 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <span>Delete Product</span>
            </DialogTitle>
            <DialogDescription className="text-xs text-[#8C3A4B]">
              Are you sure you want to remove{" "}
              <strong className="text-[#6B1E2D] font-serif">{deletingProduct?.name}</strong> from the
              atelier catalog? This action will archive the item from customer view.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="pt-4 border-t border-[#E0CEB7] gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setDeletingProduct(null)}
              className="text-xs"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleConfirmDelete}
              className="bg-red-700 hover:bg-red-800 text-white text-xs font-semibold uppercase tracking-wider"
            >
              Confirm Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
