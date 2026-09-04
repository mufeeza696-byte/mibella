"use client";

import React, { useState, useEffect } from "react";
import {
  Mail,
  Phone,
  MessageCircle,
  Calendar,
  CheckCircle2,
  Clock,
  Search,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";

interface InquiryRecord {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  inquiry_type: string;
  target_date?: string | null;
  message: string;
  status: string;
  created_at: string;
}

const SAMPLE_INQUIRIES: InquiryRecord[] = [
  {
    id: "inq-1",
    name: "Alizeh Qureshi",
    email: "alizeh.q@luxuryevents.pk",
    phone: "03224901234",
    inquiry_type: "Wedding Favors & Hampers",
    target_date: "2026-10-15",
    message: "We need 65 bespoke velvet keepsake boxes with personalized calligraphy cards for our Lahore reception.",
    status: "new",
    created_at: new Date().toISOString(),
  },
  {
    id: "inq-2",
    name: "Kamran Siddiqui",
    email: "k.siddiqui@techcorp.com",
    phone: "03001293847",
    inquiry_type: "Corporate Gifting",
    target_date: "2026-09-28",
    message: "Looking for executive year-end gift suites with artisanal candles, ceramic mugs, and custom logo cards for our Karachi leadership team.",
    status: "contacted",
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
];

export default function InquiriesPage() {
  const supabase = createClient();
  const [inquiries, setInquiries] = useState<InquiryRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const loadInquiries = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("inquiries")
        .select("*")
        .order("created_at", { ascending: false });

      if (data && data.length > 0) {
        setInquiries(data);
      } else {
        setInquiries(SAMPLE_INQUIRIES);
      }
    } catch (e) {
      setInquiries(SAMPLE_INQUIRIES);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInquiries();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      await supabase.from("inquiries").update({ status: newStatus }).eq("id", id);
      setInquiries((prev) =>
        prev.map((inq) => (inq.id === id ? { ...inq, status: newStatus } : inq))
      );
    } catch (err) {
      console.warn("Notice updating inquiry:", err);
    }
  };

  const filteredInquiries = inquiries.filter((inq) => {
    return (
      inq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.inquiry_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.message.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#8C3A4B]">
            CONCIERGE DESK
          </span>
          <h1 className="font-serif text-3xl font-medium text-[#6B1E2D]">
            Client Inquiries & Bespoke Requests
          </h1>
          <p className="text-xs text-[#8C3A4B] mt-1">
            Manage inquiries submitted for bespoke wedding hampers, corporate gifting, and special events.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={loadInquiries}
          className="text-xs font-semibold gap-1.5"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>Refresh</span>
        </Button>
      </div>

      {/* Search Input */}
      <Card className="bg-[#F8F1E7] border-[#E0CEB7]">
        <CardContent className="p-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8C3A4B]" />
            <Input
              type="text"
              placeholder="Search by client name, email, occasion, or notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 h-10 text-xs bg-white/80 border-[#E0CEB7] focus:bg-white rounded-full"
            />
          </div>
        </CardContent>
      </Card>

      {/* Inquiries Cards Grid */}
      <div className="grid grid-cols-1 gap-4">
        {filteredInquiries.map((inq) => (
          <Card key={inq.id} className="bg-[#F8F1E7] border-[#E0CEB7] shadow-xs">
            <CardContent className="p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E0CEB7]">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif font-bold text-base text-[#6B1E2D]">{inq.name}</h3>
                    <Badge variant="gold" className="text-[10px]">
                      {inq.inquiry_type}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[#8C3A4B]">
                    <span>{inq.email}</span>
                    {inq.phone && <span>• {inq.phone}</span>}
                    {inq.target_date && <span>• Event Date: {inq.target_date}</span>}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#8C3A4B] font-semibold uppercase">Status:</span>
                  <select
                    value={inq.status}
                    onChange={(e) => handleUpdateStatus(inq.id, e.target.value)}
                    className="h-8 rounded-full border border-[#E0CEB7] bg-white px-2.5 text-xs text-[#6B1E2D] font-medium"
                  >
                    <option value="new">New Inquiry</option>
                    <option value="contacted">Contacted</option>
                    <option value="quoted">Quoted</option>
                    <option value="booked">Booked</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/70 border border-[#E0CEB7]">
                <p className="text-xs text-[#6B1E2D] leading-relaxed italic">
                  &ldquo;{inq.message}&rdquo;
                </p>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-[#8C3A4B]">
                  Received: {new Date(inq.created_at).toLocaleString()}
                </span>
                <div className="flex items-center gap-2">
                  {inq.phone && (
                    <a
                      href={`https://wa.me/92${inq.phone.replace(/^0/, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="default"
                        size="sm"
                        className="text-xs font-semibold gap-1.5"
                      >
                        <MessageCircle className="h-3.5 w-3.5" />
                        <span>WhatsApp Client</span>
                      </Button>
                    </a>
                  )}
                  <a href={`mailto:${inq.email}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs font-semibold gap-1.5"
                    >
                      <Mail className="h-3.5 w-3.5" />
                      <span>Reply Email</span>
                    </Button>
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
