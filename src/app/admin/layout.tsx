"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Refine } from "@refinedev/core";
import {
  LayoutDashboard,
  ShoppingBag,
  Mail,
  Users,
  ExternalLink,
  Menu,
  X,
  Package,
  Boxes,
  Tag,
  TicketPercent,
  Settings,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { refineDataProvider } from "@/lib/refine/supabase-client";
import { createClient } from "@/lib/supabase/client";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // If on login page, don't wrap with admin chrome
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) return;
    const supabase = createClient();
    async function checkSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user?.email) {
        setUserEmail(session.user.email);
      }
    }
    checkSession();
  }, [isLoginPage]);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUserEmail(null);
    router.push("/admin/login");
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  const navItems = [
    {
      label: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      label: "Products & Inventory",
      href: "/admin/products",
      icon: Boxes,
    },
    {
      label: "Categories",
      href: "/admin/categories",
      icon: Tag,
    },
    {
      label: "Promo Codes",
      href: "/admin/promos",
      icon: TicketPercent,
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
    {
      label: "Store Settings",
      href: "/admin/settings",
      icon: Settings,
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
          name: "products",
          list: "/admin/products",
        },
        {
          name: "categories",
          list: "/admin/categories",
        },
        {
          name: "promo_codes",
          list: "/admin/promos",
        },
        {
          name: "inquiries",
          list: "/admin/inquiries",
        },
        {
          name: "newsletter_subscribers",
          list: "/admin/newsletter",
        },
        {
          name: "store_settings",
          list: "/admin/settings",
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
          className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#F8F1E7] border-r border-[#E0CEB7] p-5 flex flex-col justify-between transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:min-h-screen ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="space-y-6">
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
              <div className="mt-2.5 flex items-center gap-1.5 text-[10px] font-semibold bg-[#E8D8C3]/60 text-emerald-800 px-2.5 py-1 rounded-full w-fit border border-[#E0CEB7]">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
                <span>Refine + Supabase Active</span>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="space-y-1 overflow-y-auto max-h-[calc(100vh-280px)] pr-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                      isActive
                        ? "bg-[#6B1E2D] text-[#F8F1E7] shadow-sm"
                        : "text-[#6B1E2D] hover:bg-[#E8D8C3]/60"
                    }`}
                  >
                    <Icon className={`h-4 w-4 shrink-0 ${isActive ? "text-[#C5A880]" : "text-[#8C3A4B]"}`} />
                    <span className="truncate">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Bottom Shortcuts & User Info */}
          <div className="pt-4 border-t border-[#E0CEB7] space-y-2">
            {userEmail ? (
              <div className="p-2.5 rounded-xl bg-[#E8D8C3]/50 border border-[#E0CEB7] flex items-center justify-between">
                <div className="min-w-0 pr-2">
                  <span className="text-[10px] uppercase font-bold text-[#8C3A4B] block tracking-wider">Signed In As</span>
                  <p className="text-xs font-medium text-[#6B1E2D] truncate">{userEmail}</p>
                </div>
                <button
                  onClick={handleLogout}
                  title="Sign Out"
                  className="text-[#8C3A4B] hover:text-[#6B1E2D] p-1 rounded-lg hover:bg-[#E8D8C3] transition-colors cursor-pointer"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <Link
                href="/admin/login"
                className="flex items-center justify-between text-xs text-[#6B1E2D] font-semibold p-2 rounded-xl bg-[#E8D8C3]/40 hover:bg-[#E8D8C3]/70 transition-colors"
              >
                <span>Admin Login</span>
                <ShieldCheck className="h-3.5 w-3.5 text-[#C5A880]" />
              </Link>
            )}

            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-between text-xs text-[#8C3A4B] hover:text-[#6B1E2D] font-medium p-2 rounded-xl hover:bg-[#E8D8C3]/50 transition-colors"
            >
              <span>View Customer Storefront</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
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
              <span className="text-xs font-medium text-[#6B1E2D]">Pakistan Atelier Admin</span>
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
