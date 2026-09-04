"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";
import { User, Lock, Mail, ArrowRight, CheckCircle2, AlertCircle, LogOut } from "lucide-react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [currentUser, setCurrentUser] = useState<any>(null);

  const supabase = createClient();

  useEffect(() => {
    async function checkSession() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setCurrentUser(user);
    }
    checkSession();
  }, [supabase]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        setCurrentUser(data.user);
        setSuccessMsg("Successfully signed into your MIBELLA account!");
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            },
          },
        });
        if (error) throw error;
        if (data.user?.identities?.length === 0) {
          setErrorMsg("An account with this email already exists. Please sign in.");
        } else {
          setSuccessMsg(
            "Account created successfully! Please check your email to confirm your account."
          );
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message || "An error occurred during authentication.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    setCurrentUser(null);
    setSuccessMsg("You have signed out.");
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#F3E7D3] text-[#6B1E2D] flex flex-col justify-between">
      <Navbar />

      <main className="max-w-md mx-auto px-4 py-16 sm:py-24 w-full">
        {currentUser ? (
          /* User Profile View */
          <Card className="border-[#E0CEB7] bg-[#F8F1E7] p-4 text-center space-y-6">
            <CardHeader>
              <div className="w-16 h-16 rounded-full bg-[#E8D8C3] text-[#6B1E2D] flex items-center justify-center mx-auto mb-2">
                <User className="h-8 w-8" />
              </div>
              <CardTitle className="text-2xl font-serif">Welcome, Client</CardTitle>
              <CardDescription>{currentUser.email}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#E8D8C3]/50 text-xs text-[#8C3A4B] space-y-1 text-left">
                <p>
                  <strong>User ID:</strong> <span className="font-mono text-[10px]">{currentUser.id}</span>
                </p>
                <p>
                  <strong>Auth Status:</strong> <span className="text-emerald-800 font-semibold">Active Session</span>
                </p>
                <p>
                  <strong>Custom Saved Gifts:</strong> Ready to track
                </p>
              </div>

              <div className="flex flex-col gap-2.5">
                <Link href="/#customizer-section">
                  <Button className="w-full text-xs font-semibold uppercase tracking-wider">
                    Build a Custom Box or Bouquet
                  </Button>
                </Link>

                <Button
                  variant="outline"
                  onClick={handleSignOut}
                  disabled={loading}
                  className="w-full text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          /* Sign In / Sign Up Card */
          <div className="bg-[#F8F1E7] border border-[#E0CEB7] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="text-center space-y-2">
              <Badge variant="gold" className="text-[10px] tracking-widest">
                SUPABASE AUTHENTICATION
              </Badge>
              <h1 className="font-serif text-3xl font-medium text-[#6B1E2D]">
                {isLogin ? "Welcome Back" : "Create an Account"}
              </h1>
              <p className="text-xs text-[#8C3A4B]">
                {isLogin
                  ? "Sign in to view past customized orders and saved recipient addresses."
                  : "Join MIBELLA to save your favorite custom boxes and unboxing designs."}
              </p>
            </div>

            {errorMsg && (
              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            <form onSubmit={handleAuth} className="space-y-4">
              {!isLogin && (
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#8C3A4B] block mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <Input
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Areeba Khan"
                      className="bg-white/80 pl-10"
                    />
                    <User className="h-4 w-4 text-[#8C3A4B] absolute left-3.5 top-3.5" />
                  </div>
                </div>
              )}

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-[#8C3A4B] block mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="bg-white/80 pl-10"
                  />
                  <Mail className="h-4 w-4 text-[#8C3A4B] absolute left-3.5 top-3.5" />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-[#8C3A4B] block mb-1">
                  Password
                </label>
                <div className="relative">
                  <Input
                    type="password"
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="bg-white/80 pl-10"
                  />
                  <Lock className="h-4 w-4 text-[#8C3A4B] absolute left-3.5 top-3.5" />
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={loading}
                className="w-full text-xs font-semibold uppercase tracking-widest py-6 mt-2"
              >
                {loading
                  ? "Verifying with Supabase..."
                  : isLogin
                  ? "Sign In to MIBELLA"
                  : "Create Account"}
              </Button>
            </form>

            <div className="text-center pt-2 border-t border-[#E0CEB7]/70 text-xs text-[#8C3A4B]">
              {isLogin ? (
                <p>
                  Don&apos;t have an account yet?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setIsLogin(false);
                      setErrorMsg("");
                      setSuccessMsg("");
                    }}
                    className="font-bold text-[#6B1E2D] underline underline-offset-2 cursor-pointer"
                  >
                    Register here
                  </button>
                </p>
              ) : (
                <p>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setIsLogin(true);
                      setErrorMsg("");
                      setSuccessMsg("");
                    }}
                    className="font-bold text-[#6B1E2D] underline underline-offset-2 cursor-pointer"
                  >
                    Sign In here
                  </button>
                </p>
              )}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
