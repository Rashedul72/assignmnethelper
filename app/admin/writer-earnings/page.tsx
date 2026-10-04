"use client";

import { useEffect, useState, useCallback } from "react";
import {
  DollarSign,
  CheckCircle2,
  Clock,
  CreditCard,
  User,
  Calendar,
  Search,
  Filter,
  TrendingUp,
  Award,
  ChevronDown,
  X,
} from "lucide-react";
import { DataTable, Column } from "../../components/ui/Table";
import { Badge } from "../../components/ui/Badge";
import { PageHeader } from "../../components/ui/PageHeader";
import { useToast } from "../../components/ui/ToastContext";
import { useTheme } from "../../components/ui/ThemeContext";
import { fetchWithAuth } from "../../lib/api";

export default function WriterEarningsPage() {
  const { showToast } = useToast();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [userRole, setUserRole] = useState<string>("ADMIN");
  const [loading, setLoading] = useState(true);
  const [selectedWriterId, setSelectedWriterId] = useState<string>("");
  const [writerSearch, setWriterSearch] = useState("");
  const [writerDropdownOpen, setWriterDropdownOpen] = useState(false);

  const [summary, setSummary] = useState({
    total_done: 0,
    pending_count: 0,
    total_earned: 0,
    pending_commission: 0,
  });

  const [writers, setWriters] = useState<any[]>([]);
  const [assignments, setAssignments] = useState<any[]>([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUserRole(payload.role || "ADMIN");
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const fetchEarningsData = useCallback(
    async (writerId?: string) => {
      try {
        setLoading(true);
        const queryParam = writerId ? `?writer_id=${writerId}` : "";
        const res = await fetchWithAuth(`/admin/writer-earnings${queryParam}`);

        if (res.ok) {
          const data = await res.json();
          setSummary(data.summary || { total_done: 0, pending_count: 0, total_earned: 0, pending_commission: 0 });
          setWriters(data.writers || []);
          setAssignments(data.assignments || []);
          if (data.selected_writer_id !== undefined && !writerId) {
            setSelectedWriterId(data.selected_writer_id || "");
          }
        } else {
          showToast("Failed to load writer earnings data", "error");
        }
      } catch (err) {
        console.error(err);
        showToast("Network error loading report", "error");
      } finally {
        setLoading(false);
      }
    },
    [showToast]
  );

  useEffect(() => {
    fetchEarningsData(selectedWriterId);
  }, [fetchEarningsData, selectedWriterId]);

  const handleWriterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSelectedWriterId(val);
    fetchEarningsData(val);
  };

  const filteredAssignments = assignments.filter((a) => {
    const matchesSearch =
      !searchQuery.trim() ||
      a.reference?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.client?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.course_code?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.title?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" ||
      (statusFilter === "PAID" && a.writer_commission_status === "PAID") ||
      (statusFilter === "PENDING" && a.writer_commission_status !== "PAID");

    return matchesSearch && matchesStatus;
  });

  const columns: Column<any>[] = [
    {
      key: "reference",
      header: "Reference",
      sortable: true,
      render: (row) => (
        <span
          className={`font-mono text-xs font-semibold ${
            isDark ? "text-purple-300" : "text-purple-700"
          }`}
        >
          {row.reference}
        </span>
      ),
    },
    {
      key: "client",
      header: "Student Client",
      render: (row) => (
        <div className="flex items-center space-x-2">
          <div
            className={`w-6 h-6 rounded-md border flex items-center justify-center shrink-0 ${
              isDark
                ? "bg-purple-950/60 border-purple-800/60 text-purple-400"
                : "bg-purple-50 border-purple-200 text-purple-700"
            }`}
          >
            <User size={13} />
          </div>
          <div>
            <div className={`font-semibold text-xs ${isDark ? "text-slate-100" : "text-slate-900"}`}>
              {row.client?.name || "N/A"}
            </div>
            <div className={`text-[10px] font-mono ${isDark ? "text-slate-400" : "text-slate-500"}`}>
              ID: {row.client?.student_id || "N/A"}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "course_code",
      header: "Course & Title",
      render: (row) => (
        <div>
          <div className={`font-medium text-xs ${isDark ? "text-slate-200" : "text-slate-800"}`}>
            {row.title || row.course_code}
          </div>
          <div className={`text-[11px] font-mono ${isDark ? "text-slate-400" : "text-slate-500"}`}>
            {row.course_code} • Assign #{row.assignment_no}
          </div>
        </div>
      ),
    },
    {
      key: "due_at",
      header: "Due Date",
      render: (row) =>
        row.due_at ? (
          <div className="flex items-center space-x-1.5 text-xs text-slate-600 dark:text-slate-300">
            <Calendar size={13} className="text-amber-500" />
            <span>{new Date(row.due_at).toLocaleDateString()}</span>
          </div>
        ) : (
          <span className="text-slate-400 text-xs italic">—</span>
        ),
    },
    {
      key: "status",
      header: "Assignment Status",
      render: (row) => {
        const st = row.status || "NEW";
        const variant =
          st === "COMPLETED"
            ? "success"
            : st === "SUBMITTED"
            ? "cyan"
            : st === "IN_PROGRESS"
            ? "purple"
            : st === "ASSIGNED"
            ? "info"
            : "warning";
        return <Badge variant={variant}>{st.replace("_", " ")}</Badge>;
      },
    },
    {
      key: "writer_commission_status",
      header: "Commission Status",
      render: (row) => {
        const isPaid = row.writer_commission_status === "PAID";
        return <Badge variant={isPaid ? "success" : "warning"}>{isPaid ? "PAID" : "PENDING"}</Badge>;
      },
    },
    {
      key: "writer_commission_amount",
      header: "Earned Commission",
      align: "right",
      render: (row) => (
        <div className="font-bold text-xs text-emerald-600 dark:text-emerald-400 font-mono">
          BDT {Number(row.writer_commission_amount || 0).toLocaleString()}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <PageHeader
        title="Writer Earnings & Performance"
        description="Track completed assignments, earnings, and payout statuses."
        actions={
          userRole === "ADMIN" ? (
            <div className="flex items-center space-x-2">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 shrink-0">
                Filter Writer:
              </label>

              <div className="relative min-w-[220px]">
                {/* Trigger Button */}
                <div
                  onClick={() => setWriterDropdownOpen(!writerDropdownOpen)}
                  className={`w-full px-3 py-2 rounded-xl border text-xs cursor-pointer flex items-center justify-between transition-all ${
                    isDark
                      ? "bg-[#0c082b] border-white/10 text-slate-100 hover:border-purple-500/50"
                      : "bg-white border-slate-200 text-slate-900 hover:border-purple-400"
                  }`}
                >
                  {(() => {
                    if (!selectedWriterId) {
                      return <span className="font-semibold text-purple-600 dark:text-purple-400">-- All Writers --</span>;
                    }
                    const selectedWriter = writers.find((w) => w.id === selectedWriterId);
                    if (selectedWriter) {
                      return (
                        <div className="flex items-center space-x-1.5 truncate">
                          <span className="font-bold text-slate-900 dark:text-white truncate">
                            {selectedWriter.name}
                          </span>
                          <span className="text-[11px] text-slate-400 truncate">
                            ({selectedWriter.phone_number})
                          </span>
                        </div>
                      );
                    }
                    return <span className="text-slate-400 font-normal">Select Writer...</span>;
                  })()}
                  <ChevronDown
                    size={14}
                    className={`text-slate-400 shrink-0 ml-2 transition-transform duration-200 ${
                      writerDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>

                {/* Searchable Dropdown Overlay */}
                {writerDropdownOpen && (
                  <div
                    className={`absolute z-50 right-0 mt-1 w-72 rounded-xl border shadow-2xl p-2.5 space-y-2 ${
                      isDark
                        ? "bg-[#0b0826] border-white/15 text-slate-100"
                        : "bg-white border-slate-200 text-slate-900"
                    }`}
                  >
                    {/* Live Search Input Box */}
                    <div className="relative">
                      <Search size={14} className="absolute left-3 top-2.5 text-slate-400" />
                      <input
                        type="text"
                        autoFocus
                        placeholder="Search writer name or phone..."
                        value={writerSearch}
                        onChange={(e) => setWriterSearch(e.target.value)}
                        className={`w-full pl-8 pr-8 py-2 rounded-lg border text-xs outline-none transition-colors ${
                          isDark
                            ? "bg-white/5 border-white/10 text-white focus:border-purple-500"
                            : "bg-slate-50 border-slate-200 text-slate-900 focus:border-purple-500"
                        }`}
                      />
                      {writerSearch && (
                        <button
                          type="button"
                          onClick={() => setWriterSearch("")}
                          className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-white"
                        >
                          <X size={14} />
                        </button>
                      )}
                    </div>

                    {/* Scrollable Filtered Writers List */}
                    <div className="max-h-52 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                      {/* Option: All Writers */}
                      <div
                        onClick={() => {
                          setSelectedWriterId("");
                          setWriterDropdownOpen(false);
                        }}
                        className={`p-2 rounded-lg cursor-pointer flex items-center justify-between transition-colors text-xs ${
                          selectedWriterId === ""
                            ? isDark
                              ? "bg-purple-900/50 text-purple-200 font-semibold border border-purple-700/50"
                              : "bg-purple-50 text-purple-900 font-semibold border border-purple-200"
                            : isDark
                            ? "hover:bg-white/5 text-slate-200"
                            : "hover:bg-slate-100 text-slate-800"
                        }`}
                      >
                        <span className="font-bold text-purple-600 dark:text-purple-400">-- All Writers --</span>
                        {selectedWriterId === "" && (
                          <CheckCircle2 size={15} className="text-purple-600 dark:text-purple-400 shrink-0 ml-1" />
                        )}
                      </div>

                      {/* Filtered Writer Items */}
                      {(() => {
                        const filtered = writers.filter((w) => {
                          if (!writerSearch.trim()) return true;
                          const q = writerSearch.toLowerCase();
                          return (
                            w.name?.toLowerCase().includes(q) ||
                            w.phone_number?.toLowerCase().includes(q)
                          );
                        });

                        if (filtered.length === 0) {
                          return (
                            <div className="p-3 text-center text-xs text-slate-500 dark:text-slate-400">
                              No writers matching "{writerSearch}"
                            </div>
                          );
                        }

                        return filtered.map((w) => {
                          const isSelected = selectedWriterId === w.id;
                          return (
                            <div
                              key={w.id}
                              onClick={() => {
                                setSelectedWriterId(w.id);
                                setWriterDropdownOpen(false);
                              }}
                              className={`p-2 rounded-lg cursor-pointer flex items-center justify-between transition-colors text-xs ${
                                isSelected
                                  ? isDark
                                    ? "bg-purple-900/50 text-purple-200 font-semibold border border-purple-700/50"
                                    : "bg-purple-50 text-purple-900 font-semibold border border-purple-200"
                                  : isDark
                                  ? "hover:bg-white/5 text-slate-200"
                                  : "hover:bg-slate-100 text-slate-800"
                              }`}
                            >
                              <div className="flex flex-col min-w-0 pr-2">
                                <span className="font-bold truncate">{w.name}</span>
                                <span className="text-[10px] text-slate-500 dark:text-slate-400">
                                  {w.phone_number}
                                </span>
                              </div>
                              {isSelected && (
                                <CheckCircle2
                                  size={15}
                                  className="text-purple-600 dark:text-purple-400 shrink-0 ml-1"
                                />
                              )}
                            </div>
                          );
                        });
                      })()}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <Badge variant="purple">Your Performance Profile</Badge>
          )
        }
      />

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Done */}
        <div className="p-4 rounded-2xl border border-emerald-500/20 bg-emerald-50/40 dark:bg-emerald-950/20 space-y-2">
          <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              Assignments Done
            </span>
            <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 size={18} />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
            {summary.total_done}
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">Completed & submitted tasks</p>
        </div>

        {/* Pending Tasks */}
        <div className="p-4 rounded-2xl border border-amber-500/20 bg-amber-50/40 dark:bg-amber-950/20 space-y-2">
          <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              Pending Tasks
            </span>
            <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400">
              <Clock size={18} />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
            {summary.pending_count}
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">Currently in-progress</p>
        </div>

        {/* Total Earned */}
        <div className="p-4 rounded-2xl border border-purple-500/20 bg-purple-50/40 dark:bg-purple-950/20 space-y-2">
          <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
            <span className="text-xs font-semibold uppercase tracking-wider text-purple-700 dark:text-purple-400">
              Total Earned (Paid)
            </span>
            <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400">
              <DollarSign size={18} />
            </div>
          </div>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
            BDT {summary.total_earned.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">Paid out commission earnings</p>
        </div>

        {/* Pending Payout */}
        <div className="p-4 rounded-2xl border border-indigo-500/20 bg-indigo-50/40 dark:bg-indigo-950/20 space-y-2">
          <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-700 dark:text-indigo-400">
              Pending Payout
            </span>
            <div className="p-2 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400">
              <CreditCard size={18} />
            </div>
          </div>
          <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400 font-mono">
            BDT {summary.pending_commission.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">Commission pending payment</p>
        </div>
      </div>

      {/* Assignments & Earnings Table Section */}
      <div className="p-5 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-[#0c082b]/50 backdrop-blur-md space-y-4">
        {/* Table Search & Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-72">
            <Search size={14} className="absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search reference, course, or student..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-9 pr-3 py-2 rounded-xl border text-xs outline-none transition-colors ${
                isDark
                  ? "bg-white/5 border-white/10 text-white focus:border-purple-500"
                  : "bg-slate-50 border-slate-200 text-slate-900 focus:border-purple-500"
              }`}
            />
          </div>

          <div className="flex items-center space-x-2 self-end sm:self-auto">
            <Filter size={14} className="text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={`px-3 py-2 rounded-xl border text-xs font-medium outline-none transition-colors cursor-pointer ${
                isDark
                  ? "bg-white/5 border-white/10 text-slate-200 focus:border-purple-500"
                  : "bg-slate-50 border-slate-200 text-slate-800 focus:border-purple-500"
              }`}
            >
              <option value="ALL">All Commission Statuses</option>
              <option value="PAID">PAID Only</option>
              <option value="PENDING">PENDING Only</option>
            </select>
          </div>
        </div>

        {/* Data Table */}
        <DataTable
          columns={columns}
          data={filteredAssignments}
          loading={loading}
        />
      </div>
    </div>
  );
}
