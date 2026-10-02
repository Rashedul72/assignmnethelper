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
  Sun01Icon,
  Moon01Icon,
} from "hugeicons-react";
import { useToast } from "../../components/ui/ToastContext";

export default function AdminLogin() {
  const router = useRouter();
  const { showToast } = useToast();
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const [email, setEmail] = useState("admin@bdjhelper.com");
  const [password, setPassword] = useState("adminBDJ123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isDark = theme === "dark";

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/admin/login", {
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
          const menuRes = await fetch("http://localhost:5000/api/admin/me/menus", {
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

        router.push("/admin");
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
      className={`min-h-screen flex items-center justify-center p-4 relative overflow-hidden font-sans transition-colors duration-300 ${
        isDark ? "bg-[#05021a] text-white" : "bg-slate-50 text-slate-900"
      }`}
    >
      {/* Dynamic Background Glows */}
      {isDark ? (
        <>
          <div className="absolute top-1/4 -left-[10%] w-[600px] h-[600px] bg-purple-600/20 blur-[180px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-600/15 blur-[180px] rounded-full pointer-events-none" />
        </>
      ) : (
        <>
          <div className="absolute top-1/4 -left-[10%] w-[600px] h-[600px] bg-purple-200/50 blur-[150px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-200/50 blur-[150px] rounded-full pointer-events-none" />
        </>
      )}

      {/* Theme Toggle in Top Right */}
      <div className="absolute top-6 right-6 z-20">
        <button
          onClick={toggleTheme}
          className={`p-2.5 rounded-2xl border transition-all flex items-center space-x-2 text-xs font-semibold ${
            isDark
              ? "bg-white/5 border-white/10 text-amber-300 hover:bg-white/10"
              : "bg-white border-slate-200 text-slate-700 hover:bg-slate-100 shadow-sm"
          }`}
        >
          {isDark ? (
            <>
              <Sun01Icon size={18} className="text-amber-400" />
              <span>Light Mode</span>
            </>
          ) : (
            <>
              <Moon01Icon size={18} className="text-purple-600" />
              <span>Dark Mode</span>
            </>
          )}
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 25, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="w-full max-w-md relative z-10"
      >
        <div
          className={`p-8 sm:p-10 rounded-3xl border transition-all relative overflow-hidden ${
            isDark
              ? "backdrop-blur-2xl bg-white/[0.03] border-white/10 shadow-[0_0_60px_rgba(0,0,0,0.8)] text-white"
              : "bg-white border-slate-200 shadow-xl text-slate-900"
          }`}
        >
          {/* Inner Accent Glow */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/10 blur-[60px] rounded-full pointer-events-none" />

          {/* Header */}
          <div className="text-center mb-8 relative z-10">
            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 border ${
                isDark
                  ? "bg-gradient-to-br from-purple-500/20 to-blue-500/20 border-white/10"
                  : "bg-purple-100 border-purple-200"
              }`}
            >
              <SecurityCheckIcon
                className={isDark ? "text-purple-400" : "text-purple-600"}
                size={32}
              />
            </div>
            <div
              className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full border text-xs font-semibold mb-2 ${
                isDark
                  ? "bg-purple-500/10 border-purple-500/20 text-purple-300"
                  : "bg-purple-50 border-purple-200 text-purple-700"
              }`}
            >
              <SparklesIcon size={14} />
              <span>AssignmentHelper</span>
            </div>
            <h2
              className={`text-3xl font-extrabold ${
                isDark
                  ? "bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent"
                  : "text-slate-900"
              }`}
            >
              Admin Portal
            </h2>
            <p className={`mt-1 text-xs ${isDark ? "text-gray-400" : "text-slate-500"}`}>
              Secure dashboard authentication
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5 relative z-10">
            {error && (
              <div
                className={`p-3.5 border text-xs font-medium rounded-2xl text-center ${
                  isDark
                    ? "bg-rose-500/10 border-rose-500/30 text-rose-300"
                    : "bg-rose-50 border-rose-200 text-rose-700"
                }`}
              >
                {error}
              </div>
            )}

            <div className="space-y-1.5">
              <label
                className={`text-xs font-semibold uppercase tracking-wider ml-1 ${
                  isDark ? "text-gray-400" : "text-slate-600"
                }`}
              >
                Email Address
              </label>
              <div className="relative">
                <div
                  className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none ${
                    isDark ? "text-gray-500" : "text-slate-400"
                  }`}
                >
                  <Mail01Icon size={18} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full border rounded-2xl py-3 pl-11 pr-4 text-sm transition-all ${
                    isDark
                      ? "bg-black/40 border-white/10 text-white placeholder-gray-500 focus:border-purple-500"
                      : "bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-purple-600"
                  }`}
                  placeholder="admin@bdjhelper.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label
                className={`text-xs font-semibold uppercase tracking-wider ml-1 ${
                  isDark ? "text-gray-400" : "text-slate-600"
                }`}
              >
                Password
              </label>
              <div className="relative">
                <div
                  className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none ${
                    isDark ? "text-gray-500" : "text-slate-400"
                  }`}
                >
                  <LockPasswordIcon size={18} />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full border rounded-2xl py-3 pl-11 pr-4 text-sm transition-all ${
                    isDark
                      ? "bg-black/40 border-white/10 text-white placeholder-gray-500 focus:border-purple-500"
                      : "bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-purple-600"
                  }`}
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold py-3 rounded-2xl transition-all flex items-center justify-center space-x-2 text-sm shadow-[0_0_25px_rgba(147,51,234,0.3)] disabled:opacity-50"
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
