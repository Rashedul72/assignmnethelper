"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  DashboardSquare01Icon,
  UserGroupIcon,
  QuillWrite01Icon,
  File01Icon,
  SecurityCheckIcon,
  Logout01Icon,
  Menu01Icon,
  Cancel01Icon,
  Notification01Icon,
  SparklesIcon,
  UserIcon,
  Search01Icon,
  Sun01Icon,
  Moon01Icon,
  Money01Icon,
} from "hugeicons-react";
import { ToastProvider } from "../components/ui/ToastContext";
import { ThemeProvider, useTheme } from "../components/ui/ThemeContext";

const DEFAULT_MENUS = [
  { id: "1", title: "Dashboard", href: "/admin", icon: "LayoutDashboard" },
  { id: "2", title: "Assignments", href: "/admin/assignments", icon: "FileText" },
  { id: "3", title: "Costs", href: "/admin/costs", icon: "Money01Icon" },
  { id: "4", title: "Students", href: "/admin/students", icon: "Users" },
  { id: "5", title: "Writers", href: "/admin/writers", icon: "PenTool" },
  { id: "6", title: "Access Control", href: "/admin/access", icon: "Shield" },
];

const ICON_MAP: Record<string, any> = {
  LayoutDashboard: DashboardSquare01Icon,
  DashboardSquare01Icon: DashboardSquare01Icon,
  Users: UserGroupIcon,
  UserGroupIcon: UserGroupIcon,
  PenTool: QuillWrite01Icon,
  QuillWrite01Icon: QuillWrite01Icon,
  FileText: File01Icon,
  File01Icon: File01Icon,
  Shield: SecurityCheckIcon,
  SecurityCheckIcon: SecurityCheckIcon,
  Money01Icon: Money01Icon,
  Costs: Money01Icon,
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AdminLayoutContent>{children}</AdminLayoutContent>
      </ToastProvider>
    </ThemeProvider>
  );
}

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string>("ADMIN");
  const [userEmail, setUserEmail] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [dynamicMenus, setDynamicMenus] = useState<any[]>(DEFAULT_MENUS);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token && pathname !== "/admin/login") {
      router.push("/admin/login");
    } else if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUserRole(payload.role || "ADMIN");
        setUserEmail(payload.email || "");
        setIsAuthenticated(true);

        fetch("http://localhost:5000/api/admin/me/menus", {
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((r) => r.json())
          .then((data) => {
            if (Array.isArray(data) && data.length > 0) {
              setDynamicMenus(data);

              // Check if current route is authorized for this user
              const isAllowed = data.some(
                (item: any) =>
                  pathname === item.href ||
                  (pathname.startsWith(item.href) && item.href !== "/admin")
              );

              if (!isAllowed) {
                router.push(data[0].href);
              }
            }
          })
          .catch(console.error);
      } catch (e) {
        if (pathname !== "/admin/login") router.push("/admin/login");
      }
    }
    setLoading(false);
  }, [pathname, router]);

  // Close mobile sidebar when route changes
  useEffect(() => {
    setMobileSidebarOpen(false);
  }, [pathname]);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div
        className={`h-screen w-full flex flex-col items-center justify-center space-y-4 ${
          isDark ? "bg-[#05021a] text-white" : "bg-slate-50 text-slate-900"
        }`}
      >
        <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-600 rounded-full animate-spin" />
        <p className={`font-medium text-sm ${isDark ? "text-gray-400" : "text-slate-500"}`}>
          Authenticating admin portal...
        </p>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  const getPageTitle = () => {
    if (pathname === "/admin") return "Dashboard Overview";
    if (pathname.includes("/assignments")) return "Assignments Management";
    if (pathname.includes("/costs")) return "Cost Management";
    if (pathname.includes("/students")) return "Student Clients";
    if (pathname.includes("/writers")) return "Writer Team";
    if (pathname.includes("/access")) return "Access Control & Roles";
    return "Admin Portal";
  };

  return (
    <div
      className={`min-h-screen flex overflow-hidden font-sans selection:bg-purple-600 selection:text-white transition-colors duration-300 ${
        isDark ? "bg-[#05021a] text-white" : "bg-slate-50 text-slate-900"
      }`}
    >
      {/* Background Ambient Glows */}
      {isDark ? (
        <>
          <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none z-0" />
          <div className="fixed bottom-0 right-10 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none z-0" />
        </>
      ) : (
        <>
          <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-purple-200/40 blur-[140px] rounded-full pointer-events-none z-0" />
          <div className="fixed bottom-0 right-10 w-[500px] h-[500px] bg-blue-200/40 blur-[140px] rounded-full pointer-events-none z-0" />
        </>
      )}

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Component */}
      <aside
        className={`fixed lg:static top-0 bottom-0 left-0 z-50 w-72 backdrop-blur-2xl border-r flex flex-col transition-all duration-300 ${
          isDark
            ? "bg-[#090526]/90 border-white/10"
            : "bg-white/95 border-slate-200 shadow-sm"
        } ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Top Brand Logo */}
        <div
          className={`p-6 border-b flex items-center justify-between relative ${
            isDark ? "border-white/10" : "border-slate-100"
          }`}
        >
          <Link href="/admin" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center shadow-[0_0_20px_rgba(147,51,234,0.3)] group-hover:scale-105 transition-transform">
              <SparklesIcon size={22} className="text-white" />
            </div>
            <div>
              <h1
                className={`text-lg font-bold ${
                  isDark
                    ? "bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent"
                    : "bg-gradient-to-r from-slate-900 via-purple-900 to-purple-600 bg-clip-text text-transparent"
                }`}
              >
                AssignmentHelper
              </h1>
              <span className="text-[11px] font-semibold tracking-wider text-purple-600 dark:text-purple-400 uppercase">
                {userRole === "ADMIN" ? "Super Admin" : "Writer Portal"}
              </span>
            </div>
          </Link>

          <button
            onClick={() => setMobileSidebarOpen(false)}
            className={`lg:hidden p-2 rounded-xl border ${
              isDark ? "text-gray-400 hover:text-white bg-white/5 border-white/5" : "text-slate-400 hover:text-slate-700 bg-slate-100 border-slate-200"
            }`}
          >
            <Cancel01Icon size={20} />
          </button>
        </div>

        {/* Sidebar Navigation Items */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          <div
            className={`px-3 mb-2 text-[11px] font-semibold tracking-wider uppercase ${
              isDark ? "text-gray-500" : "text-slate-400"
            }`}
          >
            Main Menu
          </div>
          {dynamicMenus.map((item) => {
            const IconComponent = ICON_MAP[item.icon] || DashboardSquare01Icon;
            const isActive =
              pathname === item.href ||
              (pathname.startsWith(item.href) && item.href !== "/admin");

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex items-center space-x-3.5 px-4 py-3 rounded-2xl font-medium text-sm transition-all duration-300 group ${
                  isActive
                    ? isDark
                      ? "text-white bg-gradient-to-r from-purple-600/30 to-blue-600/20 border border-purple-500/30 shadow-[0_0_20px_rgba(147,51,234,0.15)] backdrop-blur-md"
                      : "text-purple-700 bg-purple-50 border border-purple-200 shadow-sm font-semibold"
                    : isDark
                    ? "text-gray-400 hover:text-white hover:bg-white/5"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <IconComponent
                  size={20}
                  className={`transition-colors ${
                    isActive
                      ? "text-purple-600 dark:text-purple-400"
                      : isDark
                      ? "group-hover:text-purple-300 text-gray-400"
                      : "group-hover:text-purple-600 text-slate-500"
                  }`}
                />
                <span>{item.title}</span>
                {isActive && (
                  <motion.div
                    layoutId="activePill"
                    className="absolute right-3 w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_10px_#a855f7]"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Footer Profile & Logout */}
        <div
          className={`p-4 border-t ${
            isDark ? "border-white/10 bg-white/[0.02]" : "border-slate-100 bg-slate-50/50"
          }`}
        >
          <div
            className={`flex items-center space-x-3 p-2.5 rounded-2xl border mb-3 ${
              isDark ? "bg-white/5 border-white/5" : "bg-white border-slate-200 shadow-sm"
            }`}
          >
            <div
              className={`w-9 h-9 rounded-xl border flex items-center justify-center font-bold shrink-0 ${
                isDark
                  ? "bg-purple-500/20 border-purple-500/30 text-purple-300"
                  : "bg-purple-100 border-purple-200 text-purple-700"
              }`}
            >
              <UserIcon size={18} />
            </div>
            <div className="overflow-hidden flex-1">
              <p
                className={`text-xs font-semibold truncate ${
                  isDark ? "text-white" : "text-slate-900"
                }`}
              >
                {userEmail || "Admin User"}
              </p>
              <p
                className={`text-[10px] capitalize ${
                  isDark ? "text-gray-400" : "text-slate-500"
                }`}
              >
                {userRole.toLowerCase()}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              localStorage.removeItem("admin_token");
              router.push("/admin/login");
            }}
            className="w-full flex items-center justify-center space-x-2.5 px-4 py-2.5 rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 border border-rose-500/20 font-medium text-sm transition-all"
          >
            <Logout01Icon size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10">
        {/* Top Navbar */}
        <header
          className={`h-20 border-b px-6 flex items-center justify-between shrink-0 backdrop-blur-xl transition-colors duration-300 ${
            isDark
              ? "bg-[#090526]/50 border-white/10"
              : "bg-white/80 border-slate-200 shadow-sm"
          }`}
        >
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className={`lg:hidden p-2 rounded-xl border ${
                isDark
                  ? "text-gray-400 hover:text-white bg-white/5 border-white/10"
                  : "text-slate-500 hover:text-slate-800 bg-slate-100 border-slate-200"
              }`}
            >
              <Menu01Icon size={22} />
            </button>
            <div>
              <h2
                className={`text-xl font-bold tracking-tight ${
                  isDark ? "text-white" : "text-slate-900"
                }`}
              >
                {getPageTitle()}
              </h2>
              <p
                className={`text-xs hidden sm:block ${
                  isDark ? "text-gray-400" : "text-slate-500"
                }`}
              >
                Control center for assignment operations
              </p>
            </div>
          </div>

          {/* Top Bar Right Tools */}
          <div className="flex items-center space-x-3">
            <div
              className={`hidden md:flex items-center space-x-2 border rounded-2xl px-3.5 py-1.5 text-xs ${
                isDark
                  ? "bg-white/5 border-white/10 text-gray-400"
                  : "bg-slate-100 border-slate-200 text-slate-500"
              }`}
            >
              <Search01Icon size={14} className={isDark ? "text-gray-400" : "text-slate-400"} />
              <span>Quick search...</span>
              <kbd
                className={`px-1.5 py-0.5 rounded text-[10px] ${
                  isDark ? "bg-white/10 text-gray-300" : "bg-white text-slate-600 shadow-xs"
                }`}
              >
                ⌘K
              </kbd>
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-2xl border transition-all flex items-center space-x-2 text-xs font-semibold ${
                isDark
                  ? "bg-white/5 border-white/10 text-amber-300 hover:bg-white/10"
                  : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200"
              }`}
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? (
                <>
                  <Sun01Icon size={18} className="text-amber-400" />
                  <span className="hidden sm:inline">Light Mode</span>
                </>
              ) : (
                <>
                  <Moon01Icon size={18} className="text-purple-600" />
                  <span className="hidden sm:inline">Dark Mode</span>
                </>
              )}
            </button>

            <button
              className={`relative p-2.5 rounded-2xl border transition-all ${
                isDark
                  ? "bg-white/5 border-white/10 text-gray-300 hover:text-white hover:bg-white/10"
                  : "bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-200"
              }`}
            >
              <Notification01Icon size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_#a855f7]" />
            </button>
          </div>
        </header>

        {/* Scrollable Page Body */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
