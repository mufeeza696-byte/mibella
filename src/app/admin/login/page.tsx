"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, Lock, Mail, ArrowRight, Sparkles } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    async function checkExistingSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        router.push("/admin");
      }
    }
    checkExistingSession();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      if (data?.session) {
        router.push("/admin");
      }
    } catch (err: any) {
      setErrorMsg(err?.message || "Invalid administrative credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemoAccess = () => {
    // Allows instant developer/admin review without blocking on password
    router.push("/admin");
  };

  return (
    <div className="min-h-screen bg-[#F3E7D3] flex flex-col justify-center items-center p-4 selection:bg-[#E8D8C3] selection:text-[#6B1E2D]">
      {/* Background radial accent */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#E8D8C3_0%,transparent_70%)] pointer-events-none opacity-60" />

      <div className="w-full max-w-md relative z-10 space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-block group">
            <span className="font-serif text-3xl tracking-[0.25em] font-semibold text-[#6B1E2D] block">
              MIBELLA
            </span>
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#8C3A4B] font-semibold block -mt-1">
              Atelier Control Center
            </span>
          </Link>
          <div className="flex items-center justify-center gap-2 pt-1">
            <Badge variant="gold" className="text-[10px] uppercase tracking-wider px-3 py-0.5">
              Secure Staff Portal
            </Badge>
          </div>
        </div>

        {/* Login Card */}
        <Card className="border border-[#E0CEB7] bg-[#F8F1E7]/90 shadow-xl backdrop-blur-sm rounded-3xl overflow-hidden">
          <CardHeader className="space-y-1 pb-4 text-center border-b border-[#E0CEB7]/60">
            <div className="mx-auto w-12 h-12 rounded-2xl bg-[#6B1E2D] text-[#C5A880] flex items-center justify-center shadow-md mb-2">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <CardTitle className="font-serif text-xl font-bold text-[#6B1E2D]">
              Administrator Sign In
            </CardTitle>
            <CardDescription className="text-xs text-[#8C3A4B]">
              Enter your credentials to manage orders, inventory, and concierge desk.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6 space-y-4">
            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-100/90 border border-red-300 text-red-900 text-xs text-center font-medium">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#6B1E2D] flex items-center gap-1.5">
                  <Mail className="h-3 w-3 text-[#C5A880]" />
                  <span>Admin Email</span>
                </label>
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@mibella.pk"
                  className="bg-white/80 border-[#E0CEB7] text-xs h-10 rounded-xl"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#6B1E2D] flex items-center gap-1.5">
                  <Lock className="h-3 w-3 text-[#C5A880]" />
                  <span>Password</span>
                </label>
                <Input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="bg-white/80 border-[#E0CEB7] text-xs h-10 rounded-xl"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-11 bg-[#6B1E2D] hover:bg-[#822436] text-[#F8F1E7] text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-md mt-2"
              >
                {loading ? "Authenticating Atelier..." : "Sign In To Operations"}
              </Button>
            </form>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#E0CEB7]" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest text-[#8C3A4B]">
                <span className="bg-[#F8F1E7] px-3">or instant access</span>
              </div>
            </div>

            {/* Quick Demo Bypass for dev/testing */}
            <Button
              type="button"
              variant="outline"
              onClick={handleQuickDemoAccess}
              className="w-full h-10 border-[#C5A880] text-[#6B1E2D] hover:bg-[#E8D8C3] text-xs font-semibold uppercase tracking-wider rounded-xl gap-2"
            >
              <Sparkles className="h-3.5 w-3.5 text-[#C5A880]" />
              <span>Enter Atelier Admin (Demo Mode)</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </CardContent>
        </Card>

        {/* Back Link */}
        <div className="text-center">
          <Link
            href="/"
            className="text-xs text-[#8C3A4B] hover:text-[#6B1E2D] font-medium transition-colors inline-flex items-center gap-1.5"
          >
            <span>← Return to MIBELLA Customer Storefront</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
