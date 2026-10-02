"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  UserGroupIcon,
  QuillWrite01Icon,
  File01Icon,
  Money01Icon,
  Add01Icon,
  ArrowUpRight01Icon,
  UserAdd01Icon,
  TaskAdd02Icon,
  Clock01Icon,
  CheckmarkCircle02Icon,
} from "hugeicons-react";
import { StatCard } from "../components/ui/StatCard";
import { DataTable, Column } from "../components/ui/Table";
import { Badge } from "../components/ui/Badge";
import { useToast } from "../components/ui/ToastContext";
import { useTheme } from "../components/ui/ThemeContext";

export default function AdminDashboard() {
  const router = useRouter();
  const { showToast } = useToast();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [stats, setStats] = useState({
    studentsCount: 0,
    writersCount: 0,
    assignmentsCount: 0,
  });
  const [assignments, setAssignments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("admin_token");
        const [statsRes, assignRes] = await Promise.all([
          fetch("http://localhost:5000/api/admin/stats", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("http://localhost:5000/api/admin/assignments", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        if (statsRes.ok) {
          const statsData = await statsRes.json();
          setStats(statsData);
        }

        if (assignRes.ok) {
          const assignData = await assignRes.json();
          setAssignments(assignData);
        }
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
        showToast("Could not sync latest stats", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [showToast]);

  const assignmentColumns: Column<any>[] = [
    {
      key: "reference",
      header: "Reference",
      sortable: true,
      render: (row) => (
        <span
          className={`font-mono font-bold tracking-wide ${
            isDark ? "text-purple-300" : "text-purple-700"
          }`}
        >
          {row.reference}
        </span>
      ),
    },
    {
      key: "client",
      header: "Student / Client",
      render: (row) => (
        <div>
          <div className={`font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>
            {row.client?.name || "Unknown Student"}
          </div>
          <div className={`text-xs font-mono ${isDark ? "text-gray-400" : "text-slate-500"}`}>
            {row.client?.student_id || "N/A"}
          </div>
        </div>
      ),
    },
    {
      key: "writer",
      header: "Writer",
      render: (row) => {
        const writerName =
          row.writers?.[0]?.writer?.name || row.creator?.writerProfile?.name;
        return writerName ? (
          <span className={`text-xs font-semibold ${isDark ? "text-pink-300" : "text-pink-700"}`}>
            {writerName}
          </span>
        ) : (
          <span className="text-gray-400 text-xs italic">Unassigned</span>
        );
      },
    },
    {
      key: "course_code",
      header: "Course & No.",
      render: (row) => (
        <div>
          <div className={`font-medium ${isDark ? "text-gray-200" : "text-slate-800"}`}>
            {row.course_code}
          </div>
          <div className={`text-xs ${isDark ? "text-gray-500" : "text-slate-400"}`}>
            Assign #{row.assignment_no}
          </div>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      render: (row) => {
        const status = row.status || "NEW";
        const variant =
          status === "COMPLETED"
            ? "success"
            : status === "SUBMITTED"
            ? "cyan"
            : status === "IN_PROGRESS"
            ? "purple"
            : status === "ASSIGNED"
            ? "info"
            : status === "CANCELLED"
            ? "danger"
            : "warning";
        return <Badge variant={variant}>{status.replace("_", " ")}</Badge>;
      },
    },
    {
      key: "createdAt",
      header: "Created Date",
      sortable: true,
      render: (row) => (
        <span className={`text-xs font-medium ${isDark ? "text-gray-400" : "text-slate-500"}`}>
          {new Date(row.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div
        className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-6 rounded-3xl border transition-all ${
          isDark
            ? "bg-gradient-to-r from-purple-900/30 via-indigo-900/20 to-transparent border-white/10 backdrop-blur-xl"
            : "bg-gradient-to-r from-purple-50 via-indigo-50/50 to-white border-slate-200 shadow-sm"
        }`}
      >
        <div>
          <h1
            className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            Dashboard Overview
          </h1>
          <p className={`text-sm mt-1 ${isDark ? "text-gray-400" : "text-slate-600"}`}>
            Real-time insights and quick actions for your platform
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => router.push("/admin/assignments")}
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-sm flex items-center space-x-2 shadow-[0_0_20px_rgba(147,51,234,0.25)] transition-all"
          >
            <Add01Icon size={18} />
            <span>Manage Assignments</span>
          </button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          title="Total Students"
          value={stats.studentsCount}
          icon={UserGroupIcon}
          trend="+12%"
          colorScheme="blue"
          delay={0.1}
        />
        <StatCard
          title="Active Writers"
          value={stats.writersCount}
          icon={QuillWrite01Icon}
          trend="+5%"
          colorScheme="purple"
          delay={0.2}
        />
        <StatCard
          title="Total Assignments"
          value={stats.assignmentsCount}
          icon={File01Icon}
          trend="+24%"
          colorScheme="amber"
          delay={0.3}
        />
        <StatCard
          title="Total Revenue"
          value="BDT 0"
          icon={Money01Icon}
          trend="+0%"
          colorScheme="emerald"
          delay={0.4}
        />
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Recent Assignments Table */}
        <div className="xl:col-span-2 space-y-4">
          <div className="flex justify-between items-center px-1">
            <div>
              <h2
                className={`text-xl font-bold tracking-tight ${
                  isDark ? "text-white" : "text-slate-900"
                }`}
              >
                Recent Assignments
              </h2>
              <p className={`text-xs ${isDark ? "text-gray-400" : "text-slate-500"}`}>
                Latest student assignment submissions
              </p>
            </div>
            <button
              onClick={() => router.push("/admin/assignments")}
              className="text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline flex items-center space-x-1"
            >
              <span>View All</span>
              <ArrowUpRight01Icon size={14} />
            </button>
          </div>

          <DataTable
            columns={assignmentColumns}
            data={assignments}
            loading={loading}
            pageSize={5}
            searchable={false}
            emptyTitle="No recent assignments"
            emptySubtitle="No assignment records found in the database yet."
            onRowClick={() => router.push("/admin/assignments")}
          />
        </div>

        {/* Quick Actions & System Info Panel */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className={`border rounded-3xl p-6 space-y-4 transition-all ${
              isDark
                ? "bg-black/30 border-white/10 backdrop-blur-xl"
                : "bg-white border-slate-200 shadow-sm"
            }`}
          >
            <h2
              className={`text-lg font-bold tracking-tight ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              Quick Shortcuts
            </h2>
            <div className="space-y-3">
              <button
                onClick={() => router.push("/admin/assignments")}
                className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all text-left group ${
                  isDark
                    ? "bg-white/5 hover:bg-white/10 border-white/5 hover:border-purple-500/30"
                    : "bg-slate-50 hover:bg-slate-100 border-slate-200 hover:border-purple-300"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`p-2.5 rounded-xl border ${
                      isDark
                        ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
                        : "bg-purple-100 text-purple-700 border-purple-200"
                    }`}
                  >
                    <TaskAdd02Icon size={20} />
                  </div>
                  <div>
                    <span
                      className={`font-semibold text-sm transition-colors ${
                        isDark ? "text-white group-hover:text-purple-300" : "text-slate-900 group-hover:text-purple-700"
                      }`}
                    >
                      New Assignment
                    </span>
                    <p
                      className={`text-xs ${isDark ? "text-gray-400" : "text-slate-500"}`}
                    >
                      Create new task record
                    </p>
                  </div>
                </div>
                <ArrowUpRight01Icon
                  size={18}
                  className={`transition-colors ${
                    isDark ? "text-gray-500 group-hover:text-white" : "text-slate-400 group-hover:text-slate-700"
                  }`}
                />
              </button>

              <button
                onClick={() => router.push("/admin/students")}
                className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all text-left group ${
                  isDark
                    ? "bg-white/5 hover:bg-white/10 border-white/5 hover:border-blue-500/30"
                    : "bg-slate-50 hover:bg-slate-100 border-slate-200 hover:border-blue-300"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`p-2.5 rounded-xl border ${
                      isDark
                        ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                        : "bg-blue-100 text-blue-700 border-blue-200"
                    }`}
                  >
                    <UserAdd01Icon size={20} />
                  </div>
                  <div>
                    <span
                      className={`font-semibold text-sm transition-colors ${
                        isDark ? "text-white group-hover:text-blue-300" : "text-slate-900 group-hover:text-blue-700"
                      }`}
                    >
                      Add Student Profile
                    </span>
                    <p
                      className={`text-xs ${isDark ? "text-gray-400" : "text-slate-500"}`}
                    >
                      Register new client
                    </p>
                  </div>
                </div>
                <ArrowUpRight01Icon
                  size={18}
                  className={`transition-colors ${
                    isDark ? "text-gray-500 group-hover:text-white" : "text-slate-400 group-hover:text-slate-700"
                  }`}
                />
              </button>

              <button
                onClick={() => router.push("/admin/writers")}
                className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all text-left group ${
                  isDark
                    ? "bg-white/5 hover:bg-white/10 border-white/5 hover:border-pink-500/30"
                    : "bg-slate-50 hover:bg-slate-100 border-slate-200 hover:border-pink-300"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`p-2.5 rounded-xl border ${
                      isDark
                        ? "bg-pink-500/10 text-pink-400 border-pink-500/20"
                        : "bg-pink-100 text-pink-700 border-pink-200"
                    }`}
                  >
                    <QuillWrite01Icon size={20} />
                  </div>
                  <div>
                    <span
                      className={`font-semibold text-sm transition-colors ${
                        isDark ? "text-white group-hover:text-pink-300" : "text-slate-900 group-hover:text-pink-700"
                      }`}
                    >
                      Register Writer
                    </span>
                    <p
                      className={`text-xs ${isDark ? "text-gray-400" : "text-slate-500"}`}
                    >
                      Add new writer profile
                    </p>
                  </div>
                </div>
                <ArrowUpRight01Icon
                  size={18}
                  className={`transition-colors ${
                    isDark ? "text-gray-500 group-hover:text-white" : "text-slate-400 group-hover:text-slate-700"
                  }`}
                />
              </button>
            </div>
          </motion.div>

          {/* Platform Status */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className={`border rounded-3xl p-6 space-y-3 transition-all ${
              isDark
                ? "bg-gradient-to-br from-purple-900/20 to-black/30 border-white/10 backdrop-blur-xl"
                : "bg-gradient-to-br from-purple-50/50 to-white border-slate-200 shadow-sm"
            }`}
          >
            <div className="flex items-center justify-between">
              <h3
                className={`text-sm font-bold ${
                  isDark ? "text-white" : "text-slate-900"
                }`}
              >
                System Status
              </h3>
              <Badge variant="success">Operational</Badge>
            </div>
            <div className="space-y-2 text-xs">
              <div
                className={`flex items-center justify-between py-1.5 border-b ${
                  isDark ? "border-white/5 text-gray-400" : "border-slate-100 text-slate-600"
                }`}
              >
                <span className="flex items-center space-x-2">
                  <CheckmarkCircle02Icon size={14} className="text-emerald-500" />
                  <span>Database Connection</span>
                </span>
                <span className={`font-medium ${isDark ? "text-white" : "text-slate-900"}`}>
                  Online
                </span>
              </div>
              <div
                className={`flex items-center justify-between py-1.5 ${
                  isDark ? "text-gray-400" : "text-slate-600"
                }`}
              >
                <span className="flex items-center space-x-2">
                  <Clock01Icon size={14} className="text-purple-500" />
                  <span>API Response Time</span>
                </span>
                <span className={`font-medium ${isDark ? "text-white" : "text-slate-900"}`}>
                  ~24 ms
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
