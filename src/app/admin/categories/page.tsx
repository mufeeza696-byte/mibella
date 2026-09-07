"use client";

import React, { useState, useEffect } from "react";
import { Tag, Plus, Trash2, Check, RefreshCw, FolderTree, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Category,
  Product,
  fetchCategories,
  addCategory,
  deleteCategory,
  fetchProducts,
} from "@/lib/products-storage";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // New Category Form State
  const [newCatName, setNewCatName] = useState("");
  const [newCatSlug, setNewCatSlug] = useState("");
  const [newCatDesc, setNewCatDesc] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const [cats, prods] = await Promise.all([fetchCategories(), fetchProducts()]);
      setCategories(cats);
      setProducts(prods);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setNewCatName(name);
    // Auto-generate slug if slug wasn't manually typed
    setNewCatSlug(
      name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "")
    );
  };

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    setIsSubmitting(true);
    try {
      const created = await addCategory({
        name: newCatName.trim(),
        slug: newCatSlug.trim() || newCatName.toLowerCase().replace(/\s+/g, "-"),
        description: newCatDesc.trim() || "Artisanal gifting collection.",
      });

      setCategories((prev) => [...prev, created]);
      setNewCatName("");
      setNewCatSlug("");
      setNewCatDesc("");
      showToast(`Category "${created.name}" created successfully!`);
    } catch (err: any) {
      alert("Failed to add category: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCategory = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to remove category "${name}"?`)) return;
    try {
      await deleteCategory(id);
      setCategories((prev) => prev.filter((c) => c.id !== id));
      showToast(`Category "${name}" removed.`);
    } catch (err: any) {
      alert("Failed to delete category: " + err.message);
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
              Taxonomy & Organization
            </span>
            <span className="text-xs text-[#8C3A4B]">•</span>
            <Badge variant="gold" className="text-[9px]">
              Categories Hub
            </Badge>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#6B1E2D]">
            Catalog Categories
          </h1>
          <p className="text-xs text-[#8C3A4B] mt-1 max-w-xl">
            Structure your gift boxes, floral arrangements, jewelry, and confectionery categories to help clients navigate the atelier.
          </p>
        </div>

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
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Create Category Form */}
        <Card className="bg-[#F8F1E7] border-[#E0CEB7] h-fit">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-[#E0CEB7]">
              <Plus className="h-4 w-4 text-[#C5A880]" />
              <h2 className="font-serif text-base font-bold text-[#6B1E2D]">
                Add New Category
              </h2>
            </div>

            <form onSubmit={handleCreateCategory} className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#6B1E2D]">
                  Category Title *
                </label>
                <Input
                  required
                  value={newCatName}
                  onChange={handleNameChange}
                  placeholder="e.g. Silk Scarves & Adornments"
                  className="bg-white/80 border-[#E0CEB7] text-xs h-9 rounded-xl"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#6B1E2D]">
                  URL Slug
                </label>
                <Input
                  required
                  value={newCatSlug}
                  onChange={(e) => setNewCatSlug(e.target.value)}
                  placeholder="e.g. silk-scarves"
                  className="bg-white/80 border-[#E0CEB7] text-xs h-9 rounded-xl font-mono text-[11px]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#6B1E2D]">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={newCatDesc}
                  onChange={(e) => setNewCatDesc(e.target.value)}
                  placeholder="Brief summary for client catalog..."
                  className="w-full p-2.5 bg-white/80 border border-[#E0CEB7] rounded-xl text-xs text-[#6B1E2D] focus:outline-none"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#6B1E2D] hover:bg-[#822436] text-[#F8F1E7] text-xs font-semibold uppercase tracking-wider rounded-xl py-2 mt-2 shadow-sm"
              >
                {isSubmitting ? "Creating..." : "Create Category"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Categories List */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8C3A4B]">
              Active Categories ({categories.length})
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {loading ? (
              <div className="col-span-2 text-center py-10 text-xs text-[#8C3A4B]">
                <RefreshCw className="h-4 w-4 animate-spin mx-auto text-[#6B1E2D] mb-2" />
                <span>Loading categories...</span>
              </div>
            ) : categories.length === 0 ? (
              <div className="col-span-2 text-center py-10 text-xs text-[#8C3A4B] bg-[#F8F1E7] rounded-2xl border border-[#E0CEB7]">
                <span>No categories found. Create your first category above.</span>
              </div>
            ) : (
              categories.map((cat) => {
                const count = products.filter((p) => p.category === cat.name).length;
                return (
                  <Card
                    key={cat.id}
                    className="bg-[#F8F1E7] border-[#E0CEB7] hover:border-[#C5A880] transition-all rounded-2xl"
                  >
                    <CardContent className="p-4 flex flex-col justify-between h-full space-y-3">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <div className="p-2 rounded-xl bg-[#E8D8C3] text-[#6B1E2D]">
                              <FolderTree className="h-4 w-4" />
                            </div>
                            <div>
                              <h3 className="font-serif font-bold text-sm text-[#6B1E2D]">
                                {cat.name}
                              </h3>
                              <span className="text-[10px] font-mono text-[#8C3A4B]">
                                /{cat.slug}
                              </span>
                            </div>
                          </div>

                          <button
                            onClick={() => handleDeleteCategory(cat.id, cat.name)}
                            title="Delete category"
                            className="text-[#8C3A4B] hover:text-red-700 p-1 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        {cat.description && (
                          <p className="text-[11px] text-[#8C3A4B] mt-2 line-clamp-2">
                            {cat.description}
                          </p>
                        )}
                      </div>

                      <div className="pt-2 border-t border-[#E0CEB7]/60 flex items-center justify-between text-[11px]">
                        <span className="text-[#8C3A4B]">Assigned Products</span>
                        <Badge variant="outline" className="text-[10px] font-bold border-[#C5A880]">
                          {count} Items
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
