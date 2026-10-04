"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  CreditCard,
  Users,
  PenTool,
  ShieldCheck,
  DollarSign,
  PanelLeftClose,
  PanelLeftOpen,
  LogOut,
  User,
  Search,
  Sun,
  Moon,
  Menu,
  X,
} from "lucide-react";
import { ToastProvider } from "../components/ui/ToastContext";
import { ThemeProvider, useTheme } from "../components/ui/ThemeContext";
import { refreshAdminToken, API_BASE_URL } from "../lib/api";

const DEFAULT_MENUS = [
  { id: "1", title: "Dashboard", href: "/admin", icon: "LayoutDashboard" },
  { id: "2", title: "Assignments", href: "/admin/assignments", icon: "FileText" },
  { id: "3", title: "Costs", href: "/admin/costs", icon: "CreditCard" },
  { id: "4", title: "Students", href: "/admin/students", icon: "Users" },
  { id: "5", title: "Writers", href: "/admin/writers", icon: "PenTool" },
  { id: "6", title: "Access Control", href: "/admin/access", icon: "ShieldCheck" },
  { id: "7", title: "Writer Earnings", href: "/admin/writer-earnings", icon: "DollarSign" },
];

const ICON_MAP: Record<string, any> = {
  LayoutDashboard: LayoutDashboard,
  DashboardSquare01Icon: LayoutDashboard,
  FileText: FileText,
  File01Icon: FileText,
  CreditCard: CreditCard,
  Money01Icon: CreditCard,
  Costs: CreditCard,
  Users: Users,
  UserGroupIcon: Users,
  PenTool: PenTool,
  QuillWrite01Icon: PenTool,
  ShieldCheck: ShieldCheck,
  Shield: ShieldCheck,
  SecurityCheckIcon: ShieldCheck,
  DollarSign: DollarSign,
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
  const [userName, setUserName] = useState<string>("");
  const [userRole, setUserRole] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [dynamicMenus, setDynamicMenus] = useState<any[]>(DEFAULT_MENUS);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Load saved collapsed state
  useEffect(() => {
    const saved = localStorage.getItem("admin_sidebar_collapsed");
    if (saved !== null) {
      setIsCollapsed(saved === "true");
    }
  }, []);

  const toggleCollapse = () => {
    setIsCollapsed((prev) => {
      const nextState = !prev;
      localStorage.setItem("admin_sidebar_collapsed", String(nextState));
      return nextState;
    });
  };

  const updateUserInfoFromPayload = (payload: any) => {
    const role = payload.role || "ADMIN";
    const email = payload.email || "";
    let name = payload.name;
    if (!name) {
      if (email === "ceo@bdjhelper.com") {
        name = "Rashedul islam Junayed";
      } else if (email) {
        name = email.split("@")[0];
      } else {
        name = "User";
      }
    }
    setUserRole(role);
    setUserEmail(email);
    setUserName(name);
  };

  const getUserInitials = (name: string, email: string) => {
    if (name) {
      const parts = name.trim().split(/\s+/);
      if (parts.length >= 2) {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
      }
      return name.slice(0, 2).toUpperCase();
    }
    if (email) {
      return email.slice(0, 2).toUpperCase();
    }
    return "U";
  };

  // Initial Auth & Menu fetch (runs once on mount)
  useEffect(() => {
    let isSubscribed = true;

    const checkAuthAndLoadMenus = async () => {
      let token = localStorage.getItem("admin_token");
      if (!token && pathname !== "/admin/login") {
        router.push("/admin/login");
        if (isSubscribed) setLoading(false);
        return;
      }

      if (token) {
        try {
          if (isSubscribed) setLoading(true);
          let payload = JSON.parse(atob(token.split(".")[1]));
          updateUserInfoFromPayload(payload);
          if (isSubscribed) setIsAuthenticated(true);

          let r = await fetch(`${API_BASE_URL}/admin/me/menus`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (r.status === 401) {
            const newToken = await refreshAdminToken();
            if (newToken) {
              token = newToken;
              payload = JSON.parse(atob(token.split(".")[1]));
              updateUserInfoFromPayload(payload);
              r = await fetch(`${API_BASE_URL}/admin/me/menus`, {
                headers: { Authorization: `Bearer ${newToken}` },
              });
            } else {
              localStorage.removeItem("admin_token");
              if (pathname !== "/admin/login") router.push("/admin/login");
              if (isSubscribed) setLoading(false);
              return;
            }
          }

          if (r.ok && isSubscribed) {
            const data = await r.json();
            if (Array.isArray(data) && data.length > 0) {
              setDynamicMenus(data);
            }
          }
        } catch (e) {
          localStorage.removeItem("admin_token");
          if (pathname !== "/admin/login") router.push("/admin/login");
        } finally {
          if (isSubscribed) setLoading(false);
        }
      } else {
        if (isSubscribed) setLoading(false);
      }
    };

    checkAuthAndLoadMenus();

    return () => {
      isSubscribed = false;
    };
  }, []);

  // Instant route permission check on route changes without resetting loading state
  useEffect(() => {
    if (!loading && isAuthenticated && dynamicMenus.length > 0 && pathname !== "/admin/login") {
      const isAllowed = dynamicMenus.some(
        (item: any) =>
          pathname === item.href ||
          (pathname.startsWith(item.href) && item.href !== "/admin")
      );
      if (!isAllowed) {
        router.push(dynamicMenus[0].href);
      }
    }
  }, [pathname, loading, isAuthenticated, dynamicMenus.length, router]);

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
          isDark ? "bg-[#08061a] text-white" : "bg-slate-50 text-slate-900"
        }`}
      >
        <div className="w-10 h-10 border-3 border-purple-500/30 border-t-purple-600 rounded-full animate-spin" />
        <p className={`font-medium text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>
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

  // Group dynamic menus into logical sections
  const getGroupedMenus = () => {
    const mainHrefs = ["/admin", "/admin/assignments"];
    const mgmtHrefs = ["/admin/costs", "/admin/students", "/admin/writers"];
    const systemHrefs = ["/admin/access"];

    const main = dynamicMenus.filter((m) => mainHrefs.includes(m.href));
    const mgmt = dynamicMenus.filter((m) => mgmtHrefs.includes(m.href));
    const system = dynamicMenus.filter((m) => systemHrefs.includes(m.href));
    const other = dynamicMenus.filter(
      (m) =>
        !mainHrefs.includes(m.href) &&
        !mgmtHrefs.includes(m.href) &&
        !systemHrefs.includes(m.href)
    );

    const groups = [];
    if (main.length > 0) groups.push({ title: "MAIN", items: main });
    if (mgmt.length > 0) groups.push({ title: "MANAGEMENT", items: mgmt });
    if (system.length > 0) groups.push({ title: "SYSTEM", items: system });
    if (other.length > 0) groups.push({ title: "OTHER", items: other });

    return groups;
  };

  const groupedMenus = getGroupedMenus();
  const totalMenuCount = dynamicMenus.length;

  return (
    <div
      className={`h-screen w-full flex overflow-hidden font-sans selection:bg-purple-600 selection:text-white transition-colors duration-200 ${
        isDark ? "bg-[#08061a] text-slate-100" : "bg-slate-50 text-slate-900"
      }`}
    >
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileSidebarOpen(false)}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Component - Minimal SaaS Design */}
      <aside
        className={`fixed lg:sticky top-0 h-screen z-30 shrink-0 border-r flex flex-col transition-all duration-200 ease-in-out ${
          isDark
            ? "bg-[#0b0826] border-white/[0.08] text-slate-200"
            : "bg-white border-slate-200/80 text-black shadow-[1px_0_3px_0_rgba(0,0,0,0.02)]"
        } ${isCollapsed ? "lg:w-[72px] w-64" : "w-64"} ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Top Brand Area */}
        <div
          className={`h-14 px-4 border-b flex items-center shrink-0 relative transition-all duration-200 ${
            isCollapsed ? "lg:justify-center justify-between" : "justify-between"
          } ${isDark ? "border-white/[0.08]" : "border-slate-200/80"}`}
        >
          <Link href="/admin" className="flex items-center space-x-2.5 group min-w-0 overflow-hidden">
            <div className="relative shrink-0 flex items-center justify-center">
              <Image
                src="/logo_notext.png"
                alt="AssignmentHelper Logo"
                width={32}
                height={32}
                priority
                className="w-7 h-7 object-contain transition-transform group-hover:scale-105"
              />
            </div>
            {!isCollapsed && (
              <div className="overflow-hidden whitespace-nowrap min-w-0 flex items-center space-x-2">
                <span className="text-[10px] font-semibold tracking-wider text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 px-1.5 py-0.5 rounded border border-purple-200/60 dark:border-purple-800/60 uppercase shrink-0">
                  {userRole === "ADMIN" ? "Admin" : "Writer"}
                </span>
              </div>
            )}
          </Link>

          <div className="flex items-center space-x-1 shrink-0">
            {/* Desktop Collapse Toggle */}
            <button
              onClick={toggleCollapse}
              title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
              className="hidden lg:flex p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors"
            >
              {isCollapsed ? <PanelLeftOpen size={17} /> : <PanelLeftClose size={17} />}
            </button>

            {/* Mobile Close Button */}
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors"
            >
              <X size={17} />
            </button>
          </div>
        </div>

        {/* Navigation - Grouped & Clean Hierarchy */}
        <nav className="flex-1 px-3 py-3 overflow-y-auto min-h-0 sidebar-scrollbar space-y-4">
          {groupedMenus.map((group, gIdx) => {
            const showHeader = !isCollapsed && totalMenuCount > 3 && group.title;

            return (
              <div key={group.title || gIdx} className="space-y-1">
                {showHeader ? (
                  <div className="px-2.5 mb-1.5 text-[11px] font-bold tracking-wider uppercase text-slate-500 dark:text-slate-400">
                    {group.title}
                  </div>
                ) : isCollapsed && gIdx > 0 ? (
                  <div className="my-2 border-t border-slate-100 dark:border-white/[0.06] mx-2" />
                ) : null}

                {group.items.map((item: any) => {
                  const IconComponent = ICON_MAP[item.icon] || LayoutDashboard;
                  const isActive =
                    pathname === item.href ||
                    (pathname.startsWith(item.href) && item.href !== "/admin");

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      title={isCollapsed ? item.title : undefined}
                      className={`relative flex items-center h-10 transition-all duration-150 rounded-lg group ${
                        isCollapsed
                          ? "justify-center px-0 w-10 mx-auto"
                          : "space-x-3 px-3"
                      } ${
                        isActive
                          ? "bg-purple-600 text-white font-bold shadow-sm"
                          : isDark
                          ? "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"
                          : "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
                      }`}
                    >
                      <IconComponent
                        size={18}
                        className={`shrink-0 transition-colors ${
                          isActive
                            ? "text-white"
                            : isDark
                            ? "text-slate-400 group-hover:text-slate-200"
                            : "text-slate-600 group-hover:text-slate-900"
                        }`}
                      />

                      {!isCollapsed && (
                        <span
                          className={`truncate text-[13.5px] font-semibold leading-none ${
                            isActive
                              ? "text-white"
                              : isDark
                              ? "text-slate-300 group-hover:text-slate-100"
                              : "text-slate-800 group-hover:text-slate-900"
                          }`}
                        >
                          {item.title}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            );
          })}
        </nav>

        {/* Sidebar Footer - User Profile */}
        <div
          className={`p-3 border-t shrink-0 ${
            isDark ? "border-white/[0.08] bg-[#08061f]/50" : "border-slate-200/80 bg-slate-50/50"
          }`}
        >

          {isCollapsed ? (
            <div className="flex flex-col items-center space-y-2 py-1">
              <div
                title={`${userName || userEmail || "User"} (${userRole.toLowerCase()})`}
                className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800/60 text-purple-700 dark:text-purple-300 flex items-center justify-center text-xs font-bold shrink-0 shadow-2xs"
              >
                {getUserInitials(userName, userEmail)}
              </div>

              <button
                onClick={() => {
                  localStorage.removeItem("admin_token");
                  router.push("/admin/login");
                }}
                title="Sign Out"
                className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:text-slate-400 dark:hover:bg-rose-950/30 dark:hover:text-rose-400 transition-colors"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between p-1.5 rounded-lg hover:bg-slate-100/80 dark:hover:bg-white/[0.04] transition-colors group">
              <div className="flex items-center space-x-2.5 min-w-0">
                <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800/60 text-purple-700 dark:text-purple-300 flex items-center justify-center text-xs font-bold shrink-0 shadow-2xs">
                  {getUserInitials(userName, userEmail)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-bold text-slate-900 dark:text-slate-100 truncate leading-tight">
                    {userName || userEmail || "User"}
                  </p>
                  <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 capitalize truncate leading-tight mt-0.5">
                    {userRole.toLowerCase()}
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  localStorage.removeItem("admin_token");
                  router.push("/admin/login");
                }}
                title="Sign Out"
                className="p-1.5 rounded-md text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:text-slate-400 dark:hover:bg-rose-950/30 dark:hover:text-rose-400 transition-colors shrink-0"
              >
                <LogOut size={16} />
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative">
        {/* Top Navbar Header */}
        <header
          className={`h-14 border-b px-6 flex items-center justify-between shrink-0 transition-colors duration-200 ${
            isDark
              ? "bg-[#0b0826]/80 border-white/[0.08]"
              : "bg-white/80 border-slate-200/80 shadow-2xs"
          }`}
        >
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-1.5 rounded-lg border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5"
            >
              <Menu size={18} />
            </button>
            <div>
              <h2
                className={`text-base font-bold tracking-tight ${
                  isDark ? "text-slate-100" : "text-slate-900"
                }`}
              >
                {getPageTitle()}
              </h2>
            </div>
          </div>

          {/* Top Bar Right Tools */}
          <div className="flex items-center space-x-2.5">
            <div
              className={`hidden md:flex items-center space-x-2 border rounded-lg px-3 py-1 text-xs ${
                isDark
                  ? "bg-white/[0.04] border-white/10 text-slate-400"
                  : "bg-slate-100/70 border-slate-200 text-slate-500"
              }`}
            >
              <Search size={14} className={isDark ? "text-slate-400" : "text-slate-400"} />
              <span>Search...</span>
              <kbd
                className={`px-1.5 py-0.5 rounded text-[10px] ${
                  isDark ? "bg-white/10 text-slate-300" : "bg-white text-slate-600 shadow-2xs"
                }`}
              >
                ⌘K
              </kbd>
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg border transition-colors flex items-center space-x-1.5 text-xs font-medium ${
                isDark
                  ? "bg-white/[0.04] border-white/10 text-amber-300 hover:bg-white/[0.08]"
                  : "bg-slate-100/70 border-slate-200 text-slate-700 hover:bg-slate-200/70"
              }`}
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? (
                <Sun size={16} className="text-amber-400" />
              ) : (
                <Moon size={16} className="text-purple-600" />
              )}
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

