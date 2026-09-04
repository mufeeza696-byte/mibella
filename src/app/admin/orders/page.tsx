"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Search,
  Download,
  Filter,
  Eye,
  Phone,
  MessageCircle,
  MapPin,
  Calendar,
  CheckCircle2,
  Clock,
  Truck,
  Feather,
  RefreshCw,
  Sparkles,
  SlidersHorizontal,
  X,
  Printer,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { createClient } from "@/lib/supabase/client";

interface OrderRecord {
  id: string;
  user_id?: string | null;
  customer_name: string;
  customer_email?: string | null;
  customer_phone: string;
  recipient_name: string;
  recipient_phone?: string | null;
  delivery_city: string;
  delivery_address: string;
  scheduled_date?: string | null;
  delivery_slot?: string | null;
  calligraphy_message?: string | null;
  payment_method: string;
  subtotal_pkr: number;
  shipping_fee_pkr: number;
  grand_total_pkr: number;
  status: string;
  items: any[];
  created_at: string;
}

const INITIAL_SAMPLE_ORDERS: OrderRecord[] = [
  {
    id: "MIB-84210",
    customer_name: "Mahnoor Tariq",
    customer_email: "mahnoor@example.com",
    customer_phone: "03008459201",
    recipient_name: "Ayesha Malik",
    recipient_phone: "03214589210",
    delivery_city: "Lahore",
    delivery_address: "House 42, Block L, Phase 5, DHA, Lahore",
    scheduled_date: "Today",
    delivery_slot: "Evening (06:00 PM - 09:00 PM)",
    calligraphy_message: "Wishing you a birthday that blooms as beautifully as your heart.",
    payment_method: "cod",
    subtotal_pkr: 9500,
    shipping_fee_pkr: 0,
    grand_total_pkr: 9500,
    status: "preparing",
    items: [
      {
        title: "Atelier Blush Keepsake Chest",
        details: "Traditional Handcrafted Jhumkay, Rose & Vanilla Scented Soy Candle, Belgian Truffles",
        pricePkr: 9500,
        includesPhoto: true,
      },
    ],
    created_at: new Date().toISOString(),
  },
  {
    id: "MIB-84209",
    customer_name: "Hamza Farooq",
    customer_email: "hamza.farooq@example.com",
    customer_phone: "03335198200",
    recipient_name: "Fatima Farooq",
    recipient_phone: "03335198201",
    delivery_city: "Islamabad",
    delivery_address: "Street 14, Sector F-7/2, Islamabad",
    scheduled_date: "Tomorrow",
    delivery_slot: "Morning (10:00 AM - 02:00 PM)",
    calligraphy_message: "Congratulations on your new beginning! With all our prayers.",
    payment_method: "bank_transfer",
    subtotal_pkr: 14500,
    shipping_fee_pkr: 0,
    grand_total_pkr: 14500,
    status: "pending",
    items: [
      {
        title: "The Velvet Rose & Santal Suite",
        details: "Preserved Crimson Rose, French Santal Candle, Belgian Truffles, Calligraphy Card",
        pricePkr: 14500,
      },
    ],
    created_at: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "MIB-84208",
    customer_name: "Dr. Bilal Saeed",
    customer_email: "bilal.s@example.com",
    customer_phone: "03019283741",
    recipient_name: "Maryam Bilal",
    recipient_phone: "03019283742",
    delivery_city: "Karachi",
    delivery_address: "Plot 19-C, 24th Commercial Street, Phase II Ext, DHA, Karachi",
    scheduled_date: "Next-Day",
    delivery_slot: "Afternoon (02:00 PM - 06:00 PM)",
    calligraphy_message: "Happy Anniversary, my beloved.",
    payment_method: "card",
    subtotal_pkr: 8200,
    shipping_fee_pkr: 0,
    grand_total_pkr: 8200,
    status: "dispatched",
    items: [
      {
        title: "The Parisian Morning Blossom",
        details: "18 Stems Garden Peonies & Blush Ranunculus with Korean Frosted Wrap",
        pricePkr: 8200,
      },
    ],
    created_at: new Date(Date.now() - 7200000).toISOString(),
  },
];

function OrdersContent() {
  const searchParams = useSearchParams();
  const highlightedOrderId = searchParams.get("orderId");

  const supabase = createClient();

  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedCity, setSelectedCity] = useState<string>("all");

  // Detailed view dialog
  const [activeOrder, setActiveOrder] = useState<OrderRecord | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  // Fetch orders
  const loadOrders = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (data && data.length > 0) {
        setOrders(data);
      } else {
        setOrders(INITIAL_SAMPLE_ORDERS);
      }
    } catch (e) {
      setOrders(INITIAL_SAMPLE_ORDERS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  // If orderId is provided in URL, auto-open details dialog
  useEffect(() => {
    if (highlightedOrderId && orders.length > 0) {
      const found = orders.find((o) => o.id === highlightedOrderId);
      if (found) setActiveOrder(found);
    }
  }, [highlightedOrderId, orders]);

  // Update Status in Supabase
  const handleUpdateStatus = async (newStatus: string) => {
    if (!activeOrder) return;
    setUpdatingStatus(true);

    try {
      await supabase
        .from("orders")
        .update({ status: newStatus })
        .eq("id", activeOrder.id);

      // Update local state
      const updated = { ...activeOrder, status: newStatus };
      setActiveOrder(updated);
      setOrders((prev) => prev.map((o) => (o.id === activeOrder.id ? updated : o)));
    } catch (err) {
      console.warn("Notice updating status:", err);
    } finally {
      setUpdatingStatus(false);
    }
  };

  // Filtered Orders
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchesSearch =
        o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.recipient_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.customer_phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.delivery_city.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;
      if (selectedStatus !== "all" && o.status !== selectedStatus) return false;
      if (selectedCity !== "all" && o.delivery_city !== selectedCity) return false;

      return true;
    });
  }, [orders, searchQuery, selectedStatus, selectedCity]);

  // Export to CSV for Delivery Manifest
  const exportToCSV = () => {
    const headers = [
      "Order ID",
      "Customer Name",
      "Customer Phone",
      "Customer Email",
      "Recipient Name",
      "Recipient Phone",
      "City",
      "Delivery Address",
      "Scheduled Date",
      "Delivery Slot",
      "Calligraphy Message",
      "Payment Method",
      "Subtotal (PKR)",
      "Shipping Fee (PKR)",
      "Total (PKR)",
      "Status",
    ];

    const rows = filteredOrders.map((o) => [
      o.id,
      `"${o.customer_name}"`,
      `"${o.customer_phone}"`,
      `"${o.customer_email || ""}"`,
      `"${o.recipient_name}"`,
      `"${o.recipient_phone || ""}"`,
      `"${o.delivery_city}"`,
      `"${o.delivery_address.replace(/"/g, '""')}"`,
      `"${o.scheduled_date || ""}"`,
      `"${o.delivery_slot || ""}"`,
      `"${(o.calligraphy_message || "").replace(/"/g, '""')}"`,
      o.payment_method,
      o.subtotal_pkr,
      o.shipping_fee_pkr,
      o.grand_total_pkr,
      o.status,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `MIBELLA_Orders_Manifest_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const statusBadgeColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-amber-100 text-amber-800 border-amber-300";
      case "preparing":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "dispatched":
        return "bg-purple-100 text-purple-800 border-purple-300";
      case "delivered":
        return "bg-emerald-100 text-emerald-800 border-emerald-300";
      default:
        return "bg-neutral-100 text-neutral-800 border-neutral-300";
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Title & Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#8C3A4B]">
            ATELIER LOGISTICS
          </span>
          <h1 className="font-serif text-3xl font-medium text-[#6B1E2D]">
            Orders & Delivery Dispatch
          </h1>
          <p className="text-xs text-[#8C3A4B] mt-1">
            Manage, inspect, and update live orders from customer customizers across Pakistan.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={loadOrders}
            className="text-xs font-semibold gap-1.5"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Refresh</span>
          </Button>

          <Button
            variant="default"
            size="sm"
            onClick={exportToCSV}
            className="text-xs font-semibold gap-1.5"
          >
            <Download className="h-3.5 w-3.5 text-[#C5A880]" />
            <span>Export Manifest (CSV)</span>
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <Card className="bg-[#F8F1E7] border-[#E0CEB7] shadow-xs">
        <CardContent className="p-4 space-y-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8C3A4B]" />
              <Input
                type="text"
                placeholder="Search by Order ID, Sender, Recipient, City, or Phone..."
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

            {/* City Filter */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs text-[#8C3A4B] font-semibold uppercase">City:</span>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="h-10 rounded-full border border-[#E0CEB7] bg-white/80 px-3 text-xs text-[#6B1E2D] font-medium focus:outline-none"
              >
                <option value="all">All Cities (Pakistan)</option>
                <option value="Lahore">Lahore</option>
                <option value="Karachi">Karachi</option>
                <option value="Islamabad">Islamabad</option>
                <option value="Rawalpindi">Rawalpindi</option>
                <option value="Faisalabad">Faisalabad</option>
                <option value="Multan">Multan</option>
                <option value="Peshawar">Peshawar</option>
              </select>
            </div>
          </div>

          {/* Status Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            <span className="text-xs text-[#8C3A4B] font-semibold uppercase mr-1">Status:</span>
            {[
              { key: "all", label: "All Orders" },
              { key: "pending", label: "Pending Review" },
              { key: "preparing", label: "In Studio (Packing)" },
              { key: "dispatched", label: "Out with Courier" },
              { key: "delivered", label: "Delivered" },
            ].map((st) => (
              <button
                key={st.key}
                onClick={() => setSelectedStatus(st.key)}
                className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  selectedStatus === st.key
                    ? "bg-[#6B1E2D] text-[#F8F1E7]"
                    : "bg-white/70 text-[#6B1E2D] hover:bg-[#E8D8C3] border border-[#E0CEB7]"
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Orders Data Grid */}
      <Card className="bg-[#F8F1E7] border-[#E0CEB7] shadow-xs">
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-[#E8D8C3]/50 text-[#8C3A4B] uppercase tracking-wider font-semibold border-b border-[#E0CEB7]">
              <tr>
                <th className="p-4">Order Ref</th>
                <th className="p-4">Customer Contact</th>
                <th className="p-4">Recipient</th>
                <th className="p-4">Delivery City & Slot</th>
                <th className="p-4">Payment</th>
                <th className="p-4">Total (PKR)</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E0CEB7]/60">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-[#8C3A4B]">
                    No orders matched your current search and filters.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-white/50 transition-colors">
                    <td className="p-4">
                      <span className="font-mono font-bold text-[#6B1E2D] block">
                        {order.id}
                      </span>
                      <span className="text-[10px] text-[#8C3A4B]">
                        {new Date(order.created_at).toLocaleDateString()}
                      </span>
                    </td>

                    <td className="p-4">
                      <span className="font-semibold text-[#6B1E2D] block">
                        {order.customer_name}
                      </span>
                      <a
                        href={`https://wa.me/92${order.customer_phone.replace(/^0/, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] text-emerald-800 hover:underline flex items-center gap-1 mt-0.5"
                      >
                        <MessageCircle className="h-3 w-3" />
                        {order.customer_phone}
                      </a>
                    </td>

                    <td className="p-4">
                      <span className="font-semibold text-[#6B1E2D] block">
                        {order.recipient_name}
                      </span>
                      {order.recipient_phone && (
                        <span className="text-[11px] text-[#8C3A4B]">
                          {order.recipient_phone}
                        </span>
                      )}
                    </td>

                    <td className="p-4">
                      <span className="inline-flex items-center gap-1 font-medium text-[#6B1E2D] block">
                        <MapPin className="h-3 w-3 text-[#C5A880]" />
                        {order.delivery_city}
                      </span>
                      <span className="text-[11px] text-[#8C3A4B]">
                        {order.scheduled_date || "Express"} ({order.delivery_slot || "Slot"})
                      </span>
                    </td>

                    <td className="p-4 uppercase font-semibold text-[10px] text-[#8C3A4B]">
                      {order.payment_method.replace("_", " ")}
                    </td>

                    <td className="p-4 font-serif font-bold text-[#6B1E2D]">
                      Rs. {Number(order.grand_total_pkr).toLocaleString()}
                    </td>

                    <td className="p-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase border ${statusBadgeColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </td>

                    <td className="p-4 text-right">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setActiveOrder(order)}
                        className="text-xs font-semibold gap-1"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        <span>Inspect</span>
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* ORDER INSPECTOR & STATUS UPDATER DIALOG */}
      <Dialog open={!!activeOrder} onOpenChange={(open) => !open && setActiveOrder(null)}>
        {activeOrder && (
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-[#F8F1E7]">
            <DialogHeader className="border-b border-[#E0CEB7] pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <Badge variant="gold" className="text-[10px]">
                    ORDER MANIFEST
                  </Badge>
                  <DialogTitle className="font-serif text-2xl text-[#6B1E2D] mt-1">
                    Order Ref: {activeOrder.id}
                  </DialogTitle>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold uppercase border ${statusBadgeColor(
                    activeOrder.status
                  )}`}
                >
                  Status: {activeOrder.status}
                </span>
              </div>
            </DialogHeader>

            <div className="space-y-6 py-4 text-xs">
              {/* STATUS UPDATER CONTROL */}
              <div className="p-4 rounded-2xl bg-[#E8D8C3]/50 border border-[#E0CEB7] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="font-semibold text-[#6B1E2D] block">
                    Update Order Operational Status:
                  </span>
                  <span className="text-[11px] text-[#8C3A4B]">
                    Updates real-time customer tracking and courier dispatch status.
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={activeOrder.status}
                    onChange={(e) => handleUpdateStatus(e.target.value)}
                    disabled={updatingStatus}
                    className="h-10 rounded-full border border-[#E0CEB7] bg-white px-3 text-xs font-semibold text-[#6B1E2D] cursor-pointer"
                  >
                    <option value="pending">Pending Review</option>
                    <option value="preparing">In Studio (Preparing & Packing)</option>
                    <option value="dispatched">Out with Courier / Rider</option>
                    <option value="delivered">Delivered to Recipient</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              {/* 2-Column: Customer vs Recipient */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Sender Details */}
                <div className="p-4 rounded-2xl bg-white/70 border border-[#E0CEB7] space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C3A4B] block">
                    Sender Information
                  </span>
                  <h4 className="font-serif font-bold text-sm text-[#6B1E2D]">
                    {activeOrder.customer_name}
                  </h4>
                  <p className="text-[#8C3A4B]">{activeOrder.customer_email || "No email provided"}</p>
                  <p className="text-[#6B1E2D] font-medium">{activeOrder.customer_phone}</p>

                  <div className="pt-2">
                    <a
                      href={`https://wa.me/92${activeOrder.customer_phone.replace(/^0/, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-full border border-emerald-200 transition-colors"
                    >
                      <MessageCircle className="h-3.5 w-3.5" />
                      Chat on WhatsApp
                    </a>
                  </div>
                </div>

                {/* Recipient Details */}
                <div className="p-4 rounded-2xl bg-white/70 border border-[#E0CEB7] space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C3A4B] block">
                    Recipient Delivery Details
                  </span>
                  <h4 className="font-serif font-bold text-sm text-[#6B1E2D]">
                    {activeOrder.recipient_name}
                  </h4>
                  <p className="text-[#6B1E2D] font-medium">
                    {activeOrder.recipient_phone || "Contact not specified"}
                  </p>
                  <p className="text-[#8C3A4B] leading-relaxed">
                    <span className="font-semibold text-[#6B1E2D]">{activeOrder.delivery_city}: </span>
                    {activeOrder.delivery_address}
                  </p>
                  <p className="text-[11px] text-[#8C3A4B]">
                    Slot: {activeOrder.scheduled_date || "Immediate"} ({activeOrder.delivery_slot})
                  </p>
                </div>
              </div>

              {/* CALLIGRAPHY MESSAGE TO PRINT */}
              <div className="p-5 rounded-2xl bg-[#E8D8C3]/30 border border-[#E0CEB7] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#6B1E2D] flex items-center gap-1.5">
                    <Feather className="h-3.5 w-3.5 text-[#C5A880]" /> Calligraphy Message Card (To Inscribe)
                  </span>
                  <button
                    onClick={() => window.print()}
                    className="text-[11px] text-[#8C3A4B] hover:text-[#6B1E2D] flex items-center gap-1"
                  >
                    <Printer className="h-3 w-3" /> Print Card
                  </button>
                </div>
                <p className="font-serif italic text-sm text-[#6B1E2D] p-3 rounded-xl bg-white/80 border border-[#E0CEB7]/70">
                  &ldquo;{activeOrder.calligraphy_message || "With all our love and warmest wishes."}&rdquo;
                </p>
              </div>

              {/* ITEM CONTENTS BREAKDOWN */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C3A4B] block">
                  Package Inclusions & Items
                </span>
                <div className="space-y-2">
                  {activeOrder.items?.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-white/70 border border-[#E0CEB7] flex justify-between items-start"
                    >
                      <div>
                        <span className="font-serif font-semibold text-xs text-[#6B1E2D]">
                          {item.title}
                        </span>
                        {item.details && (
                          <p className="text-[11px] text-[#8C3A4B] mt-0.5">{item.details}</p>
                        )}
                        {item.includesPhoto && (
                          <span className="text-[10px] text-emerald-800 font-medium block mt-1">
                            ✓ Printed keepsake photo included in box
                          </span>
                        )}
                      </div>
                      <span className="font-serif font-bold text-xs text-[#6B1E2D]">
                        Rs. {Number(item.pricePkr).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* PAYMENT & TOTALS */}
              <div className="p-4 rounded-2xl bg-white/80 border border-[#E0CEB7] space-y-1.5">
                <div className="flex justify-between text-[#8C3A4B]">
                  <span>Subtotal:</span>
                  <span>Rs. {Number(activeOrder.subtotal_pkr).toLocaleString()} PKR</span>
                </div>
                <div className="flex justify-between text-[#8C3A4B]">
                  <span>Delivery Fee:</span>
                  <span>Rs. {Number(activeOrder.shipping_fee_pkr).toLocaleString()} PKR</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#6B1E2D] pt-2 border-t border-[#E0CEB7]">
                  <span>Grand Total ({activeOrder.payment_method.toUpperCase()}):</span>
                  <span>Rs. {Number(activeOrder.grand_total_pkr).toLocaleString()} PKR</span>
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}

export default function OrdersPage() {
  return (
    <Suspense
      fallback={
        <div className="p-12 text-center text-[#8C3A4B]">
          <span className="font-serif text-lg block">MIBELLA Logistics</span>
          <p className="text-xs mt-1">Loading order data tables...</p>
        </div>
      }
    >
      <OrdersContent />
    </Suspense>
  );
}
