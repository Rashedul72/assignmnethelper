"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  LogIn,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  KeyRound,
  Fingerprint,
} from "lucide-react";

// Yup Validation Schema for Admin Login
const adminLoginValidationSchema = Yup.object({
  email: Yup.string()
    .trim()
    .email("Please enter a valid administrator email address")
    .required("Admin email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Admin password is required"),
  rememberMe: Yup.boolean().default(false),
});

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [submittedValues, setSubmittedValues] = useState<{
    email: string;
    password: string;
    rememberMe: boolean;
  } | null>(null);

  // useFormik hook setup
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: adminLoginValidationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      // 1. Output admin values directly to console
      console.log("==========================================");
      console.log("🛡️ [ADMIN PANEL AUTHENTICATION]");
      console.log("Admin Values Object:", values);
      console.log("📧 Admin Email:", values.email);
      console.log("🔑 Admin Password:", values.password);
      console.log("💾 Remember Admin Session:", values.rememberMe);
      console.log("⏱️ Submitted At:", new Date().toLocaleString());
      console.log("==========================================");

      // Simulate a brief submit state for smooth UX
      await new Promise((resolve) => setTimeout(resolve, 600));

      setSubmittedValues(values);
      setSubmitting(false);
    },
  });

  return (
    <div className="min-h-screen bg-[#06021f] text-white relative overflow-hidden flex flex-col justify-between selection:bg-purple-600 selection:text-white">
      {/* Background Ambient Glows & Grid Pattern */}
      <div
        aria-hidden="true"
        className="absolute inset-0 overflow-hidden pointer-events-none -z-10"
      >
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[45rem] h-[35rem] rounded-full bg-purple-700/20 blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[35rem] h-[35rem] rounded-full bg-indigo-600/15 blur-[140px]" />
        <div className="absolute top-[30%] left-[-10%] w-[30rem] h-[30rem] rounded-full bg-fuchsia-600/15 blur-[130px]" />

        {/* Tech subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
      </div>

      {/* Header bar */}
      <header className="px-4 sm:px-8 py-5 flex items-center justify-between max-w-7xl mx-auto w-full relative z-10">
        <Link
          href="/"
          className="flex items-center gap-2 group text-sm font-semibold text-slate-300 hover:text-white transition-colors bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 px-3.5 py-2 rounded-xl backdrop-blur-md"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Main Site</span>
        </Link>

        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/logo_text.png"
            alt="BDJHelper Logo"
            width={160}
            height={40}
            priority
            className="h-8 sm:h-9 w-auto object-contain"
          />
          <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-purple-500/20 border border-purple-400/30 text-purple-200 uppercase tracking-wider">
            Admin
          </span>
        </Link>
      </header>

      {/* Main Login Card Container */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12 relative z-10">
        <motion.div
          className="w-full max-w-[460px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Card Outer Glow Border */}
          <div className="relative bg-[#0d0630]/95 border border-purple-500/30 rounded-3xl p-6 sm:p-9 shadow-[0_25px_60px_rgba(0,0,0,0.6)] backdrop-blur-2xl">
            {/* Top decorative gradient line */}
            <div className="absolute top-0 inset-x-8 h-1 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-indigo-500 rounded-full" />

            {/* Admin Login Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/40 text-purple-200 text-xs font-bold uppercase tracking-wider mb-3">
                <ShieldCheck className="w-4 h-4 text-purple-300" />
                <span>Admin Panel</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Administrator Login
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1.5">
                Restricted access for BDJHelper managers and staff
              </p>
            </div>

            {/* Success Toast Banner if submitted */}
            <AnimatePresence>
              {submittedValues && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                  animate={{ opacity: 1, height: "auto", marginBottom: 20 }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  className="bg-emerald-500/15 border border-emerald-400/40 rounded-2xl p-4 text-emerald-200 text-xs sm:text-sm"
                >
                  <div className="flex items-center gap-2 font-bold text-emerald-300 mb-1">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                    <span>Admin Credentials Logged to Console!</span>
                  </div>
                  <p className="text-emerald-100/90 text-xs leading-relaxed">
                    Open your browser developer console (
                    <kbd className="bg-emerald-950/60 px-1 py-0.5 rounded text-[10px] font-mono border border-emerald-500/30">
                      F12
                    </kbd>{" "}
                    or{" "}
                    <kbd className="bg-emerald-950/60 px-1 py-0.5 rounded text-[10px] font-mono border border-emerald-500/30">
                      Ctrl+Shift+I
                    </kbd>
                    ) to inspect the admin payload.
                  </p>
                  <div className="mt-2.5 pt-2 border-t border-emerald-500/20 text-[11px] font-mono text-emerald-200">
                    <div>
                      <strong>Admin Email:</strong> {submittedValues.email}
                    </div>
                    <div>
                      <strong>Session Persisted:</strong>{" "}
                      {submittedValues.rememberMe ? "Yes" : "No"}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Formik Admin Form */}
            <form
              onSubmit={formik.handleSubmit}
              noValidate
              className="space-y-4 sm:space-y-4.5"
            >
              {/* Admin Email Input Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs sm:text-sm font-semibold text-slate-200 mb-1.5"
                >
                  Admin Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="username"
                    placeholder="admin@bdjhelper.com"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full pl-10 pr-4 py-2.5 sm:py-3 bg-white/[0.06] border rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 transition-all ${
                      formik.touched.email && formik.errors.email
                        ? "border-rose-400/80 focus:ring-rose-400/40 bg-rose-950/10"
                        : formik.touched.email && !formik.errors.email
                          ? "border-emerald-400/70 focus:ring-emerald-400/40"
                          : "border-white/15 focus:border-purple-400 focus:ring-purple-500/30 hover:border-white/25"
                    }`}
                  />
                </div>

                {/* Email Error Message */}
                {formik.touched.email && formik.errors.email && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-1.5 text-rose-300 text-xs mt-1.5 font-medium"
                  >
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{formik.errors.email}</span>
                  </motion.div>
                )}
              </div>

              {/* Password Input Field */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="password"
                    className="block text-xs sm:text-sm font-semibold text-slate-200"
                  >
                    Admin Password
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      alert(
                        "For administrator password reset or security key recovery, please contact your SuperAdmin or IT Support at admin-support@bdjhelper.com.",
                      )
                    }
                    className="text-xs text-purple-300 hover:text-purple-200 font-medium transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter administrator password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full pl-10 pr-11 py-2.5 sm:py-3 bg-white/[0.06] border rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 transition-all ${
                      formik.touched.password && formik.errors.password
                        ? "border-rose-400/80 focus:ring-rose-400/40 bg-rose-950/10"
                        : formik.touched.password && !formik.errors.password
                          ? "border-emerald-400/70 focus:ring-emerald-400/40"
                          : "border-white/15 focus:border-purple-400 focus:ring-purple-500/30 hover:border-white/25"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-white transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Password Error Message */}
                {formik.touched.password && formik.errors.password && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-1.5 text-rose-300 text-xs mt-1.5 font-medium"
                  >
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{formik.errors.password}</span>
                  </motion.div>
                )}
              </div>

              {/* Remember Me Checkbox */}
              <div className="flex items-center justify-between pt-1">
                <label
                  htmlFor="rememberMe"
                  className="flex items-center gap-2.5 cursor-pointer select-none text-xs sm:text-sm text-slate-300 hover:text-white"
                >
                  <input
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    checked={formik.values.rememberMe}
                    onChange={formik.handleChange}
                    className="w-4 h-4 rounded-md bg-white/10 border-white/20 text-purple-600 focus:ring-purple-500/40 focus:ring-offset-0 cursor-pointer accent-purple-600"
                  />
                  <span>Keep admin session active</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="btn-whatsapp-intl w-full py-3 px-4 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 mt-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_8px_25px_rgba(98,2,115,0.45)]"
              >
                {formik.isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Authenticating admin...</span>
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    <span>Sign In to Admin Panel</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Security & System Compliance Footer */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-400">
            <div className="flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-purple-400" />
              <span>256-Bit SSL Encrypted Admin Gateway</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Fingerprint className="w-3.5 h-3.5 text-indigo-400" />
              <span>Audit Logging Active</span>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Mini Footer */}
      <footer className="px-4 py-4 text-center text-xs text-slate-500 border-t border-white/5 relative z-10">
        <p>
          © {new Date().getFullYear()} BDJHelper. Internal Admin Management
          System.
        </p>
      </footer>
    </div>
  );
}
