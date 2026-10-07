"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  SecurityCheckIcon,
  Mail01Icon,
  LockPasswordIcon,
  ArrowRight01Icon,
  SparklesIcon,
} from "hugeicons-react";
import { useToast } from "../../components/ui/ToastContext";
import { API_BASE_URL } from "../../lib/api";

export default function AdminLogin() {
  const router = useRouter();
  const { showToast } = useToast();

  const [email, setEmail] = useState("ceo@bdjhelper.com");
  const [password, setPassword] = useState("ceojoeBDJ123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_BASE_URL}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("admin_token", data.token);
        showToast("Login successful! Welcome to the Admin Portal.", "success", "Authenticated");

        // Fetch user's assigned menus to redirect to their primary allowed page
        try {
          const menuRes = await fetch(`${API_BASE_URL}/admin/me/menus`, {
            headers: { Authorization: `Bearer ${data.token}` },
          });
          if (menuRes.ok) {
            const userMenus = await menuRes.json();
            if (Array.isArray(userMenus) && userMenus.length > 0) {
              router.push(userMenus[0].href);
              return;
            }
          }
        } catch (mErr) {
          console.error("Failed to fetch post-login menus", mErr);
        }

        router.push("/dashboard");
      } else {
        setError(data.error || "Login failed");
        showToast(data.error || "Authentication failed", "error");
      }
    } catch (err) {
      setError("An error occurred. Please check the backend server connection.");
      showToast("Backend connection failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 bg-[#f6f5f3] text-[#1c1524] font-sans"
    >
      <motion.div
        initial={{ opacity: 0, y: 25, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="w-full max-w-md relative z-10"
      >
        <div
          className={`p-8 sm:p-10 rounded-3xl border transition-all relative overflow-hidden ${
            "bg-white border-slate-200 shadow-xl text-slate-900"
          }`}
        >
          {/* Inner Accent Glow */}
          {/* Header */}
          <div className="text-center mb-8 relative z-10">
            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 border ${
                "bg-purple-100 border-purple-200"
              }`}
            >
              <SecurityCheckIcon
                className={"text-purple-600"}
                size={32}
              />
            </div>
            <div
              className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full border text-xs font-semibold mb-2 ${
                "bg-purple-50 border-purple-200 text-purple-700"
              }`}
            >
              <SparklesIcon size={14} />
              <span>AssignmentHelper</span>
            </div>
            <h2
              className={`text-3xl font-extrabold ${
                "text-slate-900"
              }`}
            >
              Admin Portal
            </h2>
            <p className={`mt-1 text-xs ${"text-slate-500"}`}>
              Secure dashboard authentication
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5 relative z-10">
            {error && (
              <div
                className={`p-3.5 border text-xs font-medium rounded-2xl text-center ${
                  "bg-rose-50 border-rose-200 text-rose-700"
                }`}
              >
                {error}
              </div>
            )}

            <div className="space-y-1.5">
              <label
                className={`text-xs font-semibold uppercase tracking-wider ml-1 ${
                  "text-slate-600"
                }`}
              >
                Email Address
              </label>
              <div className="relative">
                <div
                  className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none ${
                    "text-slate-400"
                  }`}
                >
                  <Mail01Icon size={18} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full border rounded-2xl py-3 pl-11 pr-4 text-sm transition-all ${
                    "bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-purple-600"
                  }`}
                  placeholder="admin@bdjhelper.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label
                className={`text-xs font-semibold uppercase tracking-wider ml-1 ${
                  "text-slate-600"
                }`}
              >
                Password
              </label>
              <div className="relative">
                <div
                  className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none ${
                    "text-slate-400"
                  }`}
                >
                  <LockPasswordIcon size={18} />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full border rounded-2xl py-3 pl-11 pr-4 text-sm transition-all ${
                    "bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-purple-600"
                  }`}
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full mt-6 min-h-11 py-3 rounded-xl flex items-center justify-center space-x-2 text-sm disabled:opacity-50"
            >
              <span>{loading ? "Authenticating..." : "Sign In to Dashboard"}</span>
              {!loading && <ArrowRight01Icon size={18} />}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
