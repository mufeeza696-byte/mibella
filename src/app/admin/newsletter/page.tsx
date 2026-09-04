"use client";

import React, { useState, useEffect } from "react";
import { Download, Users, Mail, RefreshCw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/client";

interface SubscriberRecord {
  id: string;
  email: string;
  created_at: string;
}

const SAMPLE_SUBSCRIBERS: SubscriberRecord[] = [
  { id: "sub-1", email: "zara.n@gmail.com", created_at: new Date().toISOString() },
  { id: "sub-2", email: "bilal.k@outlook.com", created_at: new Date(Date.now() - 86400000).toISOString() },
  { id: "sub-3", email: "fatima.atelier@yahoo.com", created_at: new Date(Date.now() - 172800000).toISOString() },
  { id: "sub-4", email: "ayesha.gifting@gmail.com", created_at: new Date(Date.now() - 259200000).toISOString() },
];

export default function NewsletterAdminPage() {
  const supabase = createClient();
  const [subscribers, setSubscribers] = useState<SubscriberRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const loadSubscribers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("newsletter_subscribers")
        .select("*")
        .order("created_at", { ascending: false });

      if (data && data.length > 0) {
        setSubscribers(data);
      } else {
        setSubscribers(SAMPLE_SUBSCRIBERS);
      }
    } catch (e) {
      setSubscribers(SAMPLE_SUBSCRIBERS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSubscribers();
  }, []);

  const exportEmailsCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Email,Subscribed At", ...subscribers.map((s) => `"${s.email}","${s.created_at}"`)].join(
        "\n"
      );

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `MIBELLA_Newsletter_Subscribers_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#8C3A4B]">
            AUDIENCE & MARKETING
          </span>
          <h1 className="font-serif text-3xl font-medium text-[#6B1E2D]">
            Newsletter Subscribers
          </h1>
          <p className="text-xs text-[#8C3A4B] mt-1">
            Clients who opted in for seasonal floral drops, luxury gift launches, and holiday promotions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={loadSubscribers}
            className="text-xs font-semibold gap-1.5"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Refresh</span>
          </Button>

          <Button
            variant="default"
            size="sm"
            onClick={exportEmailsCSV}
            className="text-xs font-semibold gap-1.5"
          >
            <Download className="h-3.5 w-3.5 text-[#C5A880]" />
            <span>Export Subscribers (CSV)</span>
          </Button>
        </div>
      </div>

      <Card className="bg-[#F8F1E7] border-[#E0CEB7]">
        <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-[#E0CEB7]/70">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-[#C5A880]" />
            <CardTitle className="font-serif text-base text-[#6B1E2D]">
              Total Active Audience ({subscribers.length})
            </CardTitle>
          </div>
          <Badge variant="gold" className="text-[10px]">
            Opted-in via Footer
          </Badge>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-[#E8D8C3]/50 text-[#8C3A4B] uppercase tracking-wider font-semibold border-b border-[#E0CEB7]">
              <tr>
                <th className="p-4">#</th>
                <th className="p-4">Subscriber Email</th>
                <th className="p-4">Subscribed Date</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E0CEB7]/60">
              {subscribers.map((sub, idx) => (
                <tr key={sub.id || idx} className="hover:bg-white/50 transition-colors">
                  <td className="p-4 text-[#8C3A4B] font-mono">{idx + 1}</td>
                  <td className="p-4 font-semibold text-[#6B1E2D]">
                    <div className="flex items-center gap-2">
                      <Mail className="h-3.5 w-3.5 text-[#8C3A4B]" />
                      <span>{sub.email}</span>
                    </div>
                  </td>
                  <td className="p-4 text-[#8C3A4B]">
                    {new Date(sub.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-right">
                    <a href={`mailto:${sub.email}`}>
                      <Button variant="ghost" size="sm" className="text-xs text-[#6B1E2D]">
                        Send Email →
                      </Button>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
