"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Refine } from "@refinedev/core";
import {
  LayoutDashboard,
  ShoppingBag,
  Mail,
  Users,
  ExternalLink,
  Sparkles,
  Menu,
  X,
  Package,
  ShieldCheck,
  Flower2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { refineDataProvider } from "@/lib/refine/supabase-client";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    {
      label: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      label: "Orders Management",
      href: "/admin/orders",
      icon: ShoppingBag,
    },
    {
      label: "Concierge Inquiries",
      href: "/admin/inquiries",
      icon: Mail,
    },
    {
      label: "Newsletter Subscribers",
      href: "/admin/newsletter",
      icon: Users,
    },
  ];

  return (
    <Refine
      dataProvider={refineDataProvider}
      resources={[
        {
          name: "orders",
          list: "/admin/orders",
        },
        {
          name: "inquiries",
          list: "/admin/inquiries",
        },
        {
          name: "newsletter_subscribers",
          list: "/admin/newsletter",
        },
      ]}
    >
      <div className="min-h-screen bg-[#F3E7D3] text-[#6B1E2D] flex flex-col md:flex-row selection:bg-[#E8D8C3] selection:text-[#6B1E2D]">
        {/* Mobile Header */}
        <div className="md:hidden bg-[#F8F1E7] border-b border-[#E0CEB7] px-4 py-3 flex items-center justify-between sticky top-0 z-50">
          <Link href="/admin" className="flex items-center gap-2">
            <span className="font-serif font-bold tracking-widest text-lg text-[#6B1E2D]">
              MIBELLA
            </span>
            <Badge variant="gold" className="text-[9px]">
              ADMIN
            </Badge>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-[#6B1E2D] hover:bg-[#E8D8C3] transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#F8F1E7] border-r border-[#E0CEB7] p-6 flex flex-col justify-between transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:min-h-screen ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="space-y-8">
            {/* Admin Brand Badge */}
            <div>
              <Link href="/" className="inline-block group">
                <span className="font-serif text-2xl tracking-[0.2em] font-semibold text-[#6B1E2D] group-hover:text-[#822436] transition-colors block">
                  MIBELLA
                </span>
                <span className="text-[9px] uppercase tracking-[0.3em] text-[#8C3A4B] font-semibold block -mt-1">
                  Atelier Control Center
                </span>
              </Link>
              <div className="mt-3 flex items-center gap-1.5 text-[10px] font-semibold bg-[#E8D8C3]/60 text-emerald-800 px-2.5 py-1 rounded-full w-fit border border-[#E0CEB7]">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
                <span>Refine + Supabase Active</span>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="space-y-1.5">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold uppercase tracking-wider transition-all ${
                      isActive
                        ? "bg-[#6B1E2D] text-[#F8F1E7] shadow-sm"
                        : "text-[#6B1E2D] hover:bg-[#E8D8C3]/60"
                    }`}
                  >
                    <Icon className={`h-4 w-4 ${isActive ? "text-[#C5A880]" : "text-[#8C3A4B]"}`} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Bottom Storefront & Courier Shortcuts */}
          <div className="pt-6 border-t border-[#E0CEB7] space-y-3">
            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-between text-xs text-[#8C3A4B] hover:text-[#6B1E2D] font-medium p-2 rounded-xl hover:bg-[#E8D8C3]/50 transition-colors"
            >
              <span>View Customer Storefront</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>

            <div className="p-3 rounded-2xl bg-[#E8D8C3]/40 border border-[#E0CEB7] text-[11px] text-[#8C3A4B] space-y-1">
              <span className="font-semibold text-[#6B1E2D] block">Admin Assistance:</span>
              <p>For urgent courier issues or custom orders, check WhatsApp Concierge.</p>
            </div>
          </div>
        </aside>

        {/* Main Content Pane */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Desktop Bar */}
          <header className="hidden md:flex h-16 bg-[#F8F1E7]/80 backdrop-blur-md border-b border-[#E0CEB7] px-8 items-center justify-between sticky top-0 z-30">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#8C3A4B]">
                Mibella Operations
              </span>
              <span className="text-xs text-[#8C3A4B]">•</span>
              <span className="text-xs font-medium text-[#6B1E2D]">Pakistan Orders Hub</span>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/catalog" target="_blank">
                <Button variant="outline" size="sm" className="text-xs font-semibold gap-1.5">
                  <Package className="h-3.5 w-3.5 text-[#C5A880]" />
                  <span>Atelier Catalog</span>
                </Button>
              </Link>
              <Link href="/" target="_blank">
                <Button variant="default" size="sm" className="text-xs font-semibold gap-1.5">
                  <span>Storefront</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">{children}</main>
        </div>
      </div>
    </Refine>
  );
}
