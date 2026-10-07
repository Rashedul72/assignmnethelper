"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Users,
  PenTool,
  FileText,
  CreditCard,
  Plus,
  ArrowUpRight,
  UserPlus,
  Clock,
  CheckCircle2,
  FilePlus,
  DollarSign,
  TrendingUp,
  Receipt,
  Calendar,
  RotateCcw,
} from "lucide-react";
import { PageHeader } from "../components/ui/PageHeader";
import { StatCard } from "../components/ui/StatCard";
import { DataTable, Column } from "../components/ui/Table";
import { Badge } from "../components/ui/Badge";
import { useToast } from "../components/ui/ToastContext";
import { fetchWithAuth } from "../lib/api";

const getFirstDayOfCurrentMonth = () => {
  const now = new Date();
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
  return firstDay.toISOString().slice(0, 10);
};

const getLastDayOfCurrentMonth = () => {
  const now = new Date();
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  return lastDay.toISOString().slice(0, 10);
};

const getCurrentMonthValue = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
};

export default function AdminDashboard() {
  const router = useRouter();
  const { showToast } = useToast();

  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonthValue());
  const [startDate, setStartDate] = useState(getFirstDayOfCurrentMonth());
  const [endDate, setEndDate] = useState(getLastDayOfCurrentMonth());

  const handleMonthChange = (monthStr: string) => {
    if (!monthStr) {
      setStartDate("");
      setEndDate("");
      return;
    }
    const [yearStr, monthStrPart] = monthStr.split("-");
    const year = parseInt(yearStr, 10);
    const month = parseInt(monthStrPart, 10);

    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);

    setStartDate(firstDay.toISOString().slice(0, 10));
    setEndDate(lastDay.toISOString().slice(0, 10));
  };

  const [stats, setStats] = useState({
    studentsCount: 0,
    writersCount: 0,
    assignmentsCount: 0,
    revenue: 0,
    profit: 0,
    writer_commission: 0,
    cost: 0,
  });
  const [assignments, setAssignments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const queryParams =
        startDate && endDate ? `?start_date=${startDate}&end_date=${endDate}` : "";

      const [statsRes, assignRes] = await Promise.all([
        fetchWithAuth(`/admin/stats${queryParams}`),
        fetchWithAuth("/admin/assignments"),
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
  }, [startDate, endDate, showToast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const assignmentColumns: Column<any>[] = [
    {
      key: "reference",
      header: "Reference",
      sortable: true,
      render: (row) => (
        <span
          className={`font-mono text-xs font-semibold ${
            "text-purple-700"
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
          <div className={`font-semibold text-xs ${"text-slate-900"}`}>
            {row.client?.name || "Unknown Student"}
          </div>
          <div className={`text-[11px] font-mono ${"text-slate-500"}`}>
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
          <span className={`text-xs font-medium ${"text-pink-700"}`}>
            {writerName}
          </span>
        ) : (
          <span className="text-slate-400 text-xs italic">Unassigned</span>
        );
      },
    },
    {
      key: "course_code",
      header: "Course & No.",
      render: (row) => (
        <div>
          <div className={`font-medium text-xs ${"text-slate-800"}`}>
            {row.course_code}
          </div>
          <div className={`text-[11px] ${"text-slate-500"}`}>
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
        <span className={`text-xs ${"text-slate-500"}`}>
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
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Dashboard Overview"
        description="Real-time financial analytics and operational metrics"
        badge="Live Financials"
        actions={
          <button
            onClick={() => router.push("/dashboard/assignments")}
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-medium text-xs sm:text-sm flex items-center space-x-1.5 shadow-2xs transition-colors"
          >
            <Plus size={16} />
            <span>New Assignment</span>
          </button>
        }
      />

      {/* Single Date Filter Control Bar */}
      <div className="p-4 rounded-2xl border border-slate-200/80 bg-white/70 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2 text-xs font-semibold text-slate-700 ">
          <Calendar size={16} className="text-purple-600 " />
          <span>Analytics Date Filter:</span>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          {/* Single Month Selection Control */}
          <div className="flex items-center space-x-2 text-xs">
            <span className="text-slate-500 font-medium">Select Month:</span>
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => {
                setSelectedMonth(e.target.value);
                handleMonthChange(e.target.value);
              }}
              className={`px-3 py-1.5 rounded-xl border text-xs outline-none font-semibold transition-colors ${
                "bg-slate-50 border-slate-200 text-slate-900 focus:border-purple-500"
              }`}
            />
          </div>

          <button
            onClick={() => {
              const curMonth = getCurrentMonthValue();
              setSelectedMonth(curMonth);
              handleMonthChange(curMonth);
            }}
            className="px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold text-xs border border-purple-200/60 transition-colors"
          >
            Present Month
          </button>

          <button
            onClick={() => {
              setSelectedMonth("");
              setStartDate("");
              setEndDate("");
            }}
            className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 font-semibold text-xs transition-colors"
          >
            All Time
          </button>
        </div>
      </div>

      {/* Metric Cards Grid - Ordered: Revenue, Profit, Writer Commission, Cost */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
        <StatCard
          title="Revenue"
          value={`BDT ${stats.revenue.toLocaleString()}`}
          icon={DollarSign}
          trend="Student Payments"
          colorScheme="blue"
        />
        <StatCard
          title="Profit"
          value={`BDT ${stats.profit.toLocaleString()}`}
          icon={TrendingUp}
          trend="Net Remaining Profit"
          colorScheme="emerald"
        />
        <StatCard
          title="Writer Commission"
          value={`BDT ${stats.writer_commission.toLocaleString()}`}
          icon={CreditCard}
          trend="Writer Payouts"
          colorScheme="purple"
        />
        <StatCard
          title="Cost"
          value={`BDT ${stats.cost.toLocaleString()}`}
          icon={Receipt}
          trend="Assignment Expenses"
          colorScheme="pink"
        />
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Assignments Table */}
        <div className="xl:col-span-2 space-y-3">
          <div className="flex justify-between items-center px-1">
            <div>
              <h2
                className={`text-base font-bold tracking-tight ${
                  "text-slate-900"
                }`}
              >
                Recent Assignments
              </h2>
              <p className={`text-xs ${"text-slate-500"}`}>
                Latest student assignment submissions
              </p>
            </div>
            <button
              onClick={() => router.push("/dashboard/assignments")}
              className="text-xs font-semibold text-purple-600 hover:underline flex items-center space-x-1"
            >
              <span>View All</span>
              <ArrowUpRight size={14} />
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
            onRowClick={() => router.push("/dashboard/assignments")}
          />
        </div>

        {/* Quick Shortcuts & System Info Panel */}
        <div className="space-y-4">
          <div
            className={`border rounded-2xl p-5 space-y-3.5 transition-all ${
              "bg-white border-slate-200/80 shadow-2xs"
            }`}
          >
            <h2
              className={`text-sm font-bold tracking-tight ${
                "text-slate-900"
              }`}
            >
              Quick Shortcuts
            </h2>
            <div className="space-y-2">
              <button
                onClick={() => router.push("/dashboard/assignments")}
                className={`w-full flex items-center justify-between p-3 rounded-xl border transition-colors text-left group ${
                  "bg-slate-50 hover:bg-slate-100/80 border-slate-200/70"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`p-2 rounded-lg border ${
                      "bg-purple-50 text-purple-700 border-purple-200"
                    }`}
                  >
                    <FilePlus size={16} />
                  </div>
                  <div>
                    <span
                      className={`font-semibold text-xs block transition-colors ${
                        "text-slate-900 group-hover:text-purple-700"
                      }`}
                    >
                      New Assignment
                    </span>
                    <span className={`text-[11px] ${"text-slate-500"}`}>
                      Create new task record
                    </span>
                  </div>
                </div>
                <ArrowUpRight
                  size={16}
                  className={`transition-colors ${
                    "text-slate-400 group-hover:text-slate-700"
                  }`}
                />
              </button>

              <button
                onClick={() => router.push("/dashboard/students")}
                className={`w-full flex items-center justify-between p-3 rounded-xl border transition-colors text-left group ${
                  "bg-slate-50 hover:bg-slate-100/80 border-slate-200/70"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`p-2 rounded-lg border ${
                      "bg-blue-50 text-blue-700 border-blue-200"
                    }`}
                  >
                    <UserPlus size={16} />
                  </div>
                  <div>
                    <span
                      className={`font-semibold text-xs block transition-colors ${
                        "text-slate-900 group-hover:text-blue-700"
                      }`}
                    >
                      Add Student Profile
                    </span>
                    <span className={`text-[11px] ${"text-slate-500"}`}>
                      Register new client
                    </span>
                  </div>
                </div>
                <ArrowUpRight
                  size={16}
                  className={`transition-colors ${
                    "text-slate-400 group-hover:text-slate-700"
                  }`}
                />
              </button>

              <button
                onClick={() => router.push("/dashboard/writers")}
                className={`w-full flex items-center justify-between p-3 rounded-xl border transition-colors text-left group ${
                  "bg-slate-50 hover:bg-slate-100/80 border-slate-200/70"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`p-2 rounded-lg border ${
                      "bg-pink-50 text-pink-700 border-pink-200"
                    }`}
                  >
                    <PenTool size={16} />
                  </div>
                  <div>
                    <span
                      className={`font-semibold text-xs block transition-colors ${
                        "text-slate-900 group-hover:text-pink-700"
                      }`}
                    >
                      Register Writer
                    </span>
                    <span className={`text-[11px] ${"text-slate-500"}`}>
                      Add new writer profile
                    </span>
                  </div>
                </div>
                <ArrowUpRight
                  size={16}
                  className={`transition-colors ${
                    "text-slate-400 group-hover:text-slate-700"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Platform System Status */}
          <div
            className={`border rounded-2xl p-5 space-y-3 transition-all ${
              "bg-white border-slate-200/80 shadow-2xs"
            }`}
          >
            <div className="flex items-center justify-between">
              <h3
                className={`text-xs font-bold ${
                  "text-slate-900"
                }`}
              >
                System Status
              </h3>
              <Badge variant="success">Operational</Badge>
            </div>
            <div className="space-y-2 text-xs">
              <div
                className={`flex items-center justify-between py-1 border-b ${
                  "border-slate-100 text-slate-600"
                }`}
              >
                <span className="flex items-center space-x-2">
                  <CheckCircle2 size={14} className="text-emerald-500" />
                  <span>Database Connection</span>
                </span>
                <span className={`font-medium text-xs ${"text-slate-900"}`}>
                  Online
                </span>
              </div>
              <div
                className={`flex items-center justify-between py-1 ${
                  "text-slate-600"
                }`}
              >
                <span className="flex items-center space-x-2">
                  <Clock size={14} className="text-purple-500" />
                  <span>API Response Time</span>
                </span>
                <span className={`font-medium text-xs ${"text-slate-900"}`}>
                  ~24 ms
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
