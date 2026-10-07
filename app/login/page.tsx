"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  LogIn,
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
      console.log("📧 Admin Email:", values.email);
      console.log("🔑 Admin Password:", values.password);
      console.log("==========================================");

      // Simulate a brief submit state for smooth UX
      await new Promise((resolve) => setTimeout(resolve, 600));

      setSubmittedValues(values);
      setSubmitting(false);
    },
  });

  return (
    <div className="min-h-screen bg-[#f6f5f3] text-[#1c1524] flex flex-col justify-between">

      {/* Header bar */}
      <header className="px-4 sm:px-8 py-5 flex items-center justify-between max-w-7xl mx-auto w-full relative z-10">
        <Link
          href="/"
          className="flex items-center gap-2 group text-sm font-semibold text-[#5e5668] hover:text-[#1c1524] transition-colors bg-white border border-[#e6e2ea] px-3.5 py-2 rounded-lg min-h-11"
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
          <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-[#f6eef8] border border-[#ead7ef] text-[#620273] uppercase tracking-wider">
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
          <div className="relative bg-white border border-[#e6e2ea] rounded-2xl p-6 sm:p-9 shadow-sm">
            <div className="absolute top-0 inset-x-8 h-0.5 bg-[#620273] rounded-full" />

            {/* Admin Login Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f6eef8] border border-[#ead7ef] text-[#620273] text-xs font-bold uppercase tracking-wider mb-3">
                <ShieldCheck className="w-4 h-4" />
                <span>Admin Panel</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#1c1524] tracking-tight">
                Administrator Login
              </h1>
              <p className="text-xs sm:text-sm text-[#5e5668] mt-1.5">
                Restricted access for BDJHelper managers and staff
              </p>
            </div>

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
                  className="block text-sm font-semibold text-[#1c1524] mb-1.5"
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
                    className={`w-full min-h-11 pl-10 pr-4 py-2.5 sm:py-3 bg-white border rounded-lg text-sm text-[#1c1524] placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-colors ${
                      formik.touched.email && formik.errors.email
                        ? "border-rose-400 focus:ring-rose-200 bg-rose-50"
                        : formik.touched.email && !formik.errors.email
                          ? "border-emerald-500 focus:ring-emerald-200"
                          : "border-[#e6e2ea] focus:border-[#620273] focus:ring-[#ead7ef] hover:border-[#d5d0db]"
                    }`}
                  />
                </div>

                {/* Email Error Message */}
                {formik.touched.email && formik.errors.email && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-1.5 text-rose-700 text-xs mt-1.5 font-medium"
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
                    className="block text-sm font-semibold text-[#1c1524]"
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
                    className="text-xs text-[#620273] hover:text-[#4f025e] font-medium transition-colors"
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
                    className={`w-full min-h-11 pl-10 pr-11 py-2.5 sm:py-3 bg-white border rounded-lg text-sm text-[#1c1524] placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-colors ${
                      formik.touched.password && formik.errors.password
                        ? "border-rose-400 focus:ring-rose-200 bg-rose-50"
                        : formik.touched.password && !formik.errors.password
                          ? "border-emerald-500 focus:ring-emerald-200"
                          : "border-[#e6e2ea] focus:border-[#620273] focus:ring-[#ead7ef] hover:border-[#d5d0db]"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-[#1c1524] transition-colors"
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
                    className="flex items-center gap-1.5 text-rose-700 text-xs mt-1.5 font-medium"
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
                  className="flex items-center gap-2.5 cursor-pointer select-none text-sm text-[#5e5668] hover:text-[#1c1524]"
                >
                  <input
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    checked={formik.values.rememberMe}
                    onChange={formik.handleChange}
                    className="w-4 h-4 rounded border-[#d5d0db] text-[#620273] focus:ring-[#620273] focus:ring-offset-0 cursor-pointer accent-[#620273]"
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
          <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-[11px] text-[#5e5668]">
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
      <footer className="px-4 py-4 text-center text-xs text-[#5e5668] border-t border-[#e6e2ea]">
        <p>
          © {new Date().getFullYear()} BDJHelper. Internal Admin Management
          System.
        </p>
      </footer>
    </div>
  );
}
