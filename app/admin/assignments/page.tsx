"use client";

import { useEffect, useState, useCallback } from "react";
import {
  File01Icon,
  Add01Icon,
  UserIcon,
  Calendar01Icon,
  EyeIcon,
  Book01Icon,
  QuillWrite01Icon,
  Money01Icon,
  PencilEdit02Icon,
} from "hugeicons-react";
import { DataTable, Column } from "../../components/ui/Table";
import { Modal } from "../../components/ui/Modal";
import { Badge } from "../../components/ui/Badge";
import { useToast } from "../../components/ui/ToastContext";
import { useTheme } from "../../components/ui/ThemeContext";

export default function AssignmentsPage() {
  const { showToast } = useToast();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [userRole, setUserRole] = useState<string>("ADMIN");
  const [assignments, setAssignments] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [writers, setWriters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal States
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  // Create Form State
  const [formData, setFormData] = useState({
    client_id: "",
    course_code: "",
    assignment_no: "",
    title: "",
    description: "",
    due_at: "",
    word_count: "",
    writer_id: "",
    rate_per_word: "",
    grand_total: "",
  });

  // Edit Form State
  const [editFormData, setEditFormData] = useState({
    id: "",
    client_id: "",
    course_code: "",
    assignment_no: "",
    title: "",
    description: "",
    due_at: "",
    word_count: "",
    writer_id: "",
    rate_per_word: "",
    grand_total: "",
    status: "NEW",
  });

  const [saving, setSaving] = useState(false);
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

  const fetchAssignments = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("admin_token");
      const res = await fetch("http://localhost:5000/api/admin/assignments", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setAssignments(data);
      }
    } catch (err) {
      console.error(err);
      showToast("Failed to load assignments", "error");
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  const fetchStudentsAndWriters = useCallback(async () => {
    try {
      const token = localStorage.getItem("admin_token");
      const [studentsRes, writersRes] = await Promise.all([
        fetch("http://localhost:5000/api/admin/students", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("http://localhost:5000/api/admin/writers", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (studentsRes.ok) {
        const studentsData = await studentsRes.json();
        setStudents(studentsData);
      }
      if (writersRes.ok) {
        const writersData = await writersRes.json();
        setWriters(writersData);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchAssignments();
    fetchStudentsAndWriters();
  }, [fetchAssignments, fetchStudentsAndWriters]);

  const handleOpenCreateModal = () => {
    setFormData({
      client_id: students.length > 0 ? students[0].id : "",
      course_code: "",
      assignment_no: "1",
      title: "",
      description: "",
      due_at: "",
      word_count: "",
      writer_id: "",
      rate_per_word: "",
      grand_total: "",
    });
    setIsCreateModalOpen(true);
  };

  const handleOpenEditModal = (row: any) => {
    setEditFormData({
      id: row.id,
      client_id: row.client_id || "",
      course_code: row.course_code || "",
      assignment_no: row.assignment_no || "",
      title: row.title || "",
      description: row.description || "",
      due_at: row.due_at ? new Date(row.due_at).toISOString().slice(0, 16) : "",
      word_count: row.word_count ? String(row.word_count) : "",
      writer_id: row.writers?.[0]?.writer_id || "",
      rate_per_word: row.rate_per_word ? String(row.rate_per_word) : "",
      grand_total: row.grand_total ? String(row.grand_total) : "",
      status: row.status || "NEW",
    });
    setIsEditModalOpen(true);
  };

  // Live Calculation Handlers for Create Form
  const handleWordCountChange = (val: string) => {
    setFormData((prev) => {
      const updated = { ...prev, word_count: val };
      if (updated.rate_per_word && val) {
        const wc = parseFloat(val);
        const rate = parseFloat(updated.rate_per_word);
        if (!isNaN(wc) && !isNaN(rate)) {
          updated.grand_total = (wc * rate).toString();
        }
      }
      return updated;
    });
  };

  const handleRateChange = (val: string) => {
    setFormData((prev) => {
      const updated = { ...prev, rate_per_word: val };
      if (updated.word_count && val) {
        const wc = parseFloat(updated.word_count);
        const rate = parseFloat(val);
        if (!isNaN(wc) && !isNaN(rate)) {
          updated.grand_total = (wc * rate).toString();
        }
      }
      return updated;
    });
  };

  // Live Calculation Handlers for Edit Form
  const handleEditWordCountChange = (val: string) => {
    setEditFormData((prev) => {
      const updated = { ...prev, word_count: val };
      if (updated.rate_per_word && val) {
        const wc = parseFloat(val);
        const rate = parseFloat(updated.rate_per_word);
        if (!isNaN(wc) && !isNaN(rate)) {
          updated.grand_total = (wc * rate).toString();
        }
      }
      return updated;
    });
  };

  const handleEditRateChange = (val: string) => {
    setEditFormData((prev) => {
      const updated = { ...prev, rate_per_word: val };
      if (updated.word_count && val) {
        const wc = parseFloat(updated.word_count);
        const rate = parseFloat(val);
        if (!isNaN(wc) && !isNaN(rate)) {
          updated.grand_total = (wc * rate).toString();
        }
      }
      return updated;
    });
  };

  const handleCreateAssignment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.client_id) {
      showToast("Please select a student client", "warning");
      return;
    }

    setSaving(true);
    try {
      const token = localStorage.getItem("admin_token");
      const res = await fetch("http://localhost:5000/api/admin/assignments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          word_count: formData.word_count ? parseInt(formData.word_count, 10) : undefined,
          writer_id: formData.writer_id || undefined,
          rate_per_word: formData.rate_per_word || undefined,
          grand_total: formData.grand_total || undefined,
        }),
      });

      if (res.ok) {
        showToast("Assignment created and mapped successfully!", "success", "Created");
        setIsCreateModalOpen(false);
        fetchAssignments();
      } else {
        const errorData = await res.json();
        showToast(errorData.error || "Failed to create assignment", "error");
      }
    } catch (err) {
      showToast("Network error creating assignment", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateAssignment = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const token = localStorage.getItem("admin_token");
      const res = await fetch(
        `http://localhost:5000/api/admin/assignments/${editFormData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...editFormData,
            word_count: editFormData.word_count
              ? parseInt(editFormData.word_count, 10)
              : undefined,
            writer_id: editFormData.writer_id || undefined,
            rate_per_word: editFormData.rate_per_word || undefined,
            grand_total: editFormData.grand_total || undefined,
          }),
        }
      );

      if (res.ok) {
        showToast("Assignment updated successfully!", "success", "Updated");
        setIsEditModalOpen(false);
        fetchAssignments();
      } else {
        const errorData = await res.json();
        showToast(errorData.error || "Failed to update assignment", "error");
      }
    } catch (err) {
      showToast("Network error updating assignment", "error");
    } finally {
      setSaving(false);
    }
  };

  const filteredAssignments =
    statusFilter === "ALL"
      ? assignments
      : assignments.filter((a) => a.status === statusFilter);

  const getAssignedWriterName = (row: any) => {
    if (row.writers && row.writers.length > 0 && row.writers[0].writer) {
      return row.writers[0].writer.name;
    }
    if (row.creator && row.creator.writerProfile) {
      return row.creator.writerProfile.name;
    }
    return null;
  };

  const columns: Column<any>[] = [
    {
      key: "reference",
      header: "Reference",
      sortable: true,
      render: (row) => (
        <span
          className={`font-mono font-bold text-sm tracking-wide ${
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
      sortable: true,
      render: (row) => (
        <div className="flex items-center space-x-3">
          <div
            className={`w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 ${
              isDark
                ? "bg-purple-500/10 border-purple-500/20 text-purple-400"
                : "bg-purple-100 border-purple-200 text-purple-700"
            }`}
          >
            <UserIcon size={16} />
          </div>
          <div>
            <div className={`font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>
              {row.client?.name || "Unknown"}
            </div>
            <div
              className={`text-xs font-mono ${isDark ? "text-gray-400" : "text-slate-500"}`}
            >
              ID: {row.client?.student_id || "N/A"}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "writer",
      header: "Assigned Writer",
      render: (row) => {
        const writerName = getAssignedWriterName(row);
        return writerName ? (
          <div className="flex items-center space-x-2">
            <div
              className={`p-1.5 rounded-lg border shrink-0 ${
                isDark
                  ? "bg-pink-500/10 border-pink-500/20 text-pink-400"
                  : "bg-pink-100 border-pink-200 text-pink-700"
              }`}
            >
              <QuillWrite01Icon size={14} />
            </div>
            <span className={`font-semibold text-xs ${isDark ? "text-white" : "text-slate-900"}`}>
              {writerName}
            </span>
          </div>
        ) : (
          <span className="text-gray-400 text-xs italic">Unassigned</span>
        );
      },
    },
    {
      key: "course_code",
      header: "Course & Title",
      render: (row) => (
        <div>
          <div className={`font-medium ${isDark ? "text-gray-200" : "text-slate-800"}`}>
            {row.title || row.course_code}
          </div>
          <div className={`text-xs font-mono ${isDark ? "text-gray-500" : "text-slate-400"}`}>
            {row.course_code} • Assign #{row.assignment_no}
          </div>
        </div>
      ),
    },
    ...(userRole === "ADMIN"
      ? [
          {
            key: "grand_total",
            header: "Grand Total",
            sortable: true,
            render: (row: any) =>
              row.grand_total ? (
                <div className="font-semibold text-xs text-emerald-600 dark:text-emerald-400">
                  BDT {Number(row.grand_total).toLocaleString()}
                </div>
              ) : (
                <span className="text-gray-400 text-xs italic">—</span>
              ),
          },
        ]
      : []),
    {
      key: "due_at",
      header: "Due Date",
      sortable: true,
      render: (row) =>
        row.due_at ? (
          <div
            className={`flex items-center space-x-1.5 text-xs font-medium ${
              isDark ? "text-gray-300" : "text-slate-700"
            }`}
          >
            <Calendar01Icon size={14} className="text-amber-500" />
            <span>{new Date(row.due_at).toLocaleDateString()}</span>
          </div>
        ) : (
          <span className="text-gray-400 text-xs italic">No due date</span>
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
      key: "actions",
      header: "Actions",
      align: "right",
      render: (row) => (
        <div className="flex items-center justify-end space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleOpenEditModal(row);
            }}
            className={`p-2 rounded-xl border transition-colors inline-flex items-center space-x-1 text-xs font-semibold ${
              isDark
                ? "bg-white/5 hover:bg-white/10 text-blue-400 border-white/10"
                : "bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200"
            }`}
            title="Edit Assignment"
          >
            <PencilEdit02Icon size={14} />
            <span>Edit</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedAssignment(row);
              setIsViewModalOpen(true);
            }}
            className={`p-2 rounded-xl border transition-colors inline-flex items-center space-x-1 text-xs font-semibold ${
              isDark
                ? "bg-white/5 hover:bg-white/10 text-purple-300 border-white/10"
                : "bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-200"
            }`}
            title="View Details"
          >
            <EyeIcon size={14} />
            <span>Details</span>
          </button>
        </div>
      ),
    },
  ];

  const inputClass = isDark
    ? "w-full bg-black/40 border border-white/10 rounded-2xl py-2.5 px-4 text-white focus:outline-none focus:border-purple-500 transition-all text-sm"
    : "w-full bg-slate-50 border border-slate-200 rounded-2xl py-2.5 px-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-600 transition-all text-sm";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1
            className={`text-3xl font-extrabold tracking-tight ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            Assignments
          </h1>
          <p className={`text-sm mt-1 ${isDark ? "text-gray-400" : "text-slate-600"}`}>
            Manage and track student assignment requests & writer allocations
          </p>
        </div>

        <button
          onClick={handleOpenCreateModal}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold py-2.5 px-5 rounded-2xl flex items-center space-x-2 shadow-[0_0_20px_rgba(147,51,234,0.25)] transition-all text-sm"
        >
          <Add01Icon size={18} />
          <span>New Assignment</span>
        </button>
      </div>

      {/* Main DataTable */}
      <DataTable
        columns={columns}
        data={filteredAssignments}
        loading={loading}
        searchPlaceholder="Search reference, student, course, or title..."
        searchKeys={["reference", "course_code", "title"]}
        filters={[
          {
            key: "status",
            label: "Status Filter",
            value: statusFilter,
            onChange: (val) => setStatusFilter(val),
            options: [
              { label: "All Statuses", value: "ALL" },
              { label: "New", value: "NEW" },
              { label: "Assigned", value: "ASSIGNED" },
              { label: "In Progress", value: "IN_PROGRESS" },
              { label: "Submitted", value: "SUBMITTED" },
              { label: "Completed", value: "COMPLETED" },
              { label: "Cancelled", value: "CANCELLED" },
            ],
          },
        ]}
        emptyTitle="No assignments found"
        emptySubtitle="Click 'New Assignment' above to create a new record."
      />

      {/* Create Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create Assignment"
        subtitle="Fill in assignment details to register and map writer"
        icon={File01Icon}
        size="lg"
      >
        <form id="create-assignment-form" onSubmit={handleCreateAssignment} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                  isDark ? "text-gray-400" : "text-slate-600"
                }`}
              >
                Select Student Client *
              </label>
              <select
                required
                value={formData.client_id}
                onChange={(e) => setFormData({ ...formData, client_id: e.target.value })}
                className={inputClass}
              >
                <option value="" disabled className={isDark ? "bg-[#0b0628]" : "bg-white"}>
                  Select a student...
                </option>
                {students.map((student) => (
                  <option
                    key={student.id}
                    value={student.id}
                    className={isDark ? "bg-[#0b0628]" : "bg-white"}
                  >
                    {student.name} ({student.student_id})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                  isDark ? "text-gray-400" : "text-slate-600"
                }`}
              >
                Assign Writer (Optional)
              </label>
              <select
                value={formData.writer_id}
                onChange={(e) => setFormData({ ...formData, writer_id: e.target.value })}
                className={inputClass}
              >
                <option value="" className={isDark ? "bg-[#0b0628]" : "bg-white"}>
                  Auto-map from Creator / Unassigned
                </option>
                {writers.map((writer) => (
                  <option
                    key={writer.id}
                    value={writer.id}
                    className={isDark ? "bg-[#0b0628]" : "bg-white"}
                  >
                    {writer.name} ({writer.phone_number})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                  isDark ? "text-gray-400" : "text-slate-600"
                }`}
              >
                Course Code *
              </label>
              <input
                required
                type="text"
                placeholder="e.g. CSE-101"
                value={formData.course_code}
                onChange={(e) => setFormData({ ...formData, course_code: e.target.value })}
                className={inputClass}
              />
            </div>

            <div>
              <label
                className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                  isDark ? "text-gray-400" : "text-slate-600"
                }`}
              >
                Assignment No. / Identifier (Text) *
              </label>
              <input
                required
                type="text"
                placeholder="e.g. Assignment 1, Lab Report, or Final Thesis"
                value={formData.assignment_no}
                onChange={(e) => setFormData({ ...formData, assignment_no: e.target.value })}
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                  isDark ? "text-gray-400" : "text-slate-600"
                }`}
              >
                Assignment Title
              </label>
              <input
                type="text"
                placeholder="e.g. Data Structures Essay"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className={inputClass}
              />
            </div>

            <div>
              <label
                className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                  isDark ? "text-gray-400" : "text-slate-600"
                }`}
              >
                Due Date
              </label>
              <input
                type="datetime-local"
                value={formData.due_at}
                onChange={(e) => setFormData({ ...formData, due_at: e.target.value })}
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label
              className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                isDark ? "text-gray-400" : "text-slate-600"
              }`}
            >
              Word Count
            </label>
            <input
              type="number"
              placeholder="e.g. 2000"
              value={formData.word_count}
              onChange={(e) => handleWordCountChange(e.target.value)}
              className={inputClass}
            />
          </div>

          {/* Extra Optional Pricing Fields - Admin Only */}
          {userRole === "ADMIN" && (
            <div
              className={`p-4 border rounded-2xl space-y-3 transition-colors ${
                isDark
                  ? "bg-purple-900/15 border-purple-500/30"
                  : "bg-purple-50/80 border-purple-200"
              }`}
            >
              <div className="text-xs font-bold text-purple-600 dark:text-purple-300 uppercase tracking-wider flex items-center space-x-1.5">
                <Money01Icon size={16} />
                <span>Pricing & Calculations (Admin Only)</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                      isDark ? "text-gray-400" : "text-slate-600"
                    }`}
                  >
                    Rate Multiplier (Per Word)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="e.g. 1.5"
                    value={formData.rate_per_word}
                    onChange={(e) => handleRateChange(e.target.value)}
                    className={inputClass}
                  />
                  {formData.word_count && formData.rate_per_word && (
                    <p className="text-[11px] text-purple-600 dark:text-purple-400 font-medium mt-1">
                      Auto-Calc: {formData.word_count} words × {formData.rate_per_word} = BDT{" "}
                      {formData.grand_total}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                      isDark ? "text-gray-400" : "text-slate-600"
                    }`}
                  >
                    Grand Total (BDT)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="e.g. 3000"
                    value={formData.grand_total}
                    onChange={(e) =>
                      setFormData({ ...formData, grand_total: e.target.value })
                    }
                    className={inputClass}
                  />
                </div>
              </div>
            </div>
          )}

          <div>
            <label
              className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                isDark ? "text-gray-400" : "text-slate-600"
              }`}
            >
              Description / Notes
            </label>
            <textarea
              rows={3}
              placeholder="Instructions, guidelines, formatting requirements..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className={inputClass}
            />
          </div>

          <div
            className={`pt-4 flex justify-end space-x-3 border-t ${
              isDark ? "border-white/10" : "border-slate-200"
            }`}
          >
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(false)}
              className={`px-5 py-2.5 rounded-2xl font-medium text-sm transition-colors ${
                isDark
                  ? "bg-white/5 hover:bg-white/10 text-white"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-700"
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-[0_0_20px_rgba(147,51,234,0.3)] disabled:opacity-50 transition-all"
            >
              {saving ? "Saving..." : "Create Assignment"}
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Assignment"
        subtitle="Update assignment configuration, status, or pricing"
        icon={PencilEdit02Icon}
        size="lg"
      >
        <form onSubmit={handleUpdateAssignment} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                  isDark ? "text-gray-400" : "text-slate-600"
                }`}
              >
                Select Student Client *
              </label>
              <select
                required
                value={editFormData.client_id}
                onChange={(e) => setEditFormData({ ...editFormData, client_id: e.target.value })}
                className={inputClass}
              >
                <option value="" disabled className={isDark ? "bg-[#0b0628]" : "bg-white"}>
                  Select a student...
                </option>
                {students.map((student) => (
                  <option
                    key={student.id}
                    value={student.id}
                    className={isDark ? "bg-[#0b0628]" : "bg-white"}
                  >
                    {student.name} ({student.student_id})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                  isDark ? "text-gray-400" : "text-slate-600"
                }`}
              >
                Assign / Change Writer
              </label>
              <select
                value={editFormData.writer_id}
                onChange={(e) => setEditFormData({ ...editFormData, writer_id: e.target.value })}
                className={inputClass}
              >
                <option value="" className={isDark ? "bg-[#0b0628]" : "bg-white"}>
                  Unassigned / Keep Current
                </option>
                {writers.map((writer) => (
                  <option
                    key={writer.id}
                    value={writer.id}
                    className={isDark ? "bg-[#0b0628]" : "bg-white"}
                  >
                    {writer.name} ({writer.phone_number})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                  isDark ? "text-gray-400" : "text-slate-600"
                }`}
              >
                Course Code *
              </label>
              <input
                required
                type="text"
                value={editFormData.course_code}
                onChange={(e) => setEditFormData({ ...editFormData, course_code: e.target.value })}
                className={inputClass}
              />
            </div>

            <div>
              <label
                className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                  isDark ? "text-gray-400" : "text-slate-600"
                }`}
              >
                Assignment No. / Identifier *
              </label>
              <input
                required
                type="text"
                value={editFormData.assignment_no}
                onChange={(e) => setEditFormData({ ...editFormData, assignment_no: e.target.value })}
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                  isDark ? "text-gray-400" : "text-slate-600"
                }`}
              >
                Assignment Title
              </label>
              <input
                type="text"
                value={editFormData.title}
                onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                className={inputClass}
              />
            </div>

            <div>
              <label
                className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                  isDark ? "text-gray-400" : "text-slate-600"
                }`}
              >
                Status
              </label>
              <select
                value={editFormData.status}
                onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value })}
                className={inputClass}
              >
                <option value="NEW" className={isDark ? "bg-[#0b0628]" : "bg-white"}>NEW</option>
                <option value="ASSIGNED" className={isDark ? "bg-[#0b0628]" : "bg-white"}>ASSIGNED</option>
                <option value="IN_PROGRESS" className={isDark ? "bg-[#0b0628]" : "bg-white"}>IN_PROGRESS</option>
                <option value="SUBMITTED" className={isDark ? "bg-[#0b0628]" : "bg-white"}>SUBMITTED</option>
                <option value="REVISION_REQUESTED" className={isDark ? "bg-[#0b0628]" : "bg-white"}>REVISION_REQUESTED</option>
                <option value="COMPLETED" className={isDark ? "bg-[#0b0628]" : "bg-white"}>COMPLETED</option>
                <option value="CANCELLED" className={isDark ? "bg-[#0b0628]" : "bg-white"}>CANCELLED</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                  isDark ? "text-gray-400" : "text-slate-600"
                }`}
              >
                Due Date
              </label>
              <input
                type="datetime-local"
                value={editFormData.due_at}
                onChange={(e) => setEditFormData({ ...editFormData, due_at: e.target.value })}
                className={inputClass}
              />
            </div>

            <div>
              <label
                className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                  isDark ? "text-gray-400" : "text-slate-600"
                }`}
              >
                Word Count
              </label>
              <input
                type="number"
                value={editFormData.word_count}
                onChange={(e) => handleEditWordCountChange(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          {/* Pricing Fields in Edit Modal - Admin Only */}
          {userRole === "ADMIN" && (
            <div
              className={`p-4 border rounded-2xl space-y-3 transition-colors ${
                isDark
                  ? "bg-purple-900/15 border-purple-500/30"
                  : "bg-purple-50/80 border-purple-200"
              }`}
            >
              <div className="text-xs font-bold text-purple-600 dark:text-purple-300 uppercase tracking-wider flex items-center space-x-1.5">
                <Money01Icon size={16} />
                <span>Pricing & Calculations (Admin Only)</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                      isDark ? "text-gray-400" : "text-slate-600"
                    }`}
                  >
                    Rate Multiplier (Per Word)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="e.g. 1.5"
                    value={editFormData.rate_per_word}
                    onChange={(e) => handleEditRateChange(e.target.value)}
                    className={inputClass}
                  />
                  {editFormData.word_count && editFormData.rate_per_word && (
                    <p className="text-[11px] text-purple-600 dark:text-purple-400 font-medium mt-1">
                      Auto-Calc: {editFormData.word_count} words × {editFormData.rate_per_word} = BDT{" "}
                      {editFormData.grand_total}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                      isDark ? "text-gray-400" : "text-slate-600"
                    }`}
                  >
                    Grand Total (BDT)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="e.g. 3000"
                    value={editFormData.grand_total}
                    onChange={(e) =>
                      setEditFormData({ ...editFormData, grand_total: e.target.value })
                    }
                    className={inputClass}
                  />
                </div>
              </div>
            </div>
          )}

          <div>
            <label
              className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                isDark ? "text-gray-400" : "text-slate-600"
              }`}
            >
              Description / Notes
            </label>
            <textarea
              rows={3}
              value={editFormData.description}
              onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
              className={inputClass}
            />
          </div>

          <div
            className={`pt-4 flex justify-end space-x-3 border-t ${
              isDark ? "border-white/10" : "border-slate-200"
            }`}
          >
            <button
              type="button"
              onClick={() => setIsEditModalOpen(false)}
              className={`px-5 py-2.5 rounded-2xl font-medium text-sm transition-colors ${
                isDark
                  ? "bg-white/5 hover:bg-white/10 text-white"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-700"
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-[0_0_20px_rgba(59,130,246,0.3)] disabled:opacity-50 transition-all"
            >
              {saving ? "Updating..." : "Save Changes"}
            </button>
          </div>
        </form>
      </Modal>

      {/* View Details Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Assignment Details"
        subtitle={selectedAssignment?.reference}
        icon={Book01Icon}
        size="md"
      >
        {selectedAssignment && (
          <div className="space-y-4 text-sm">
            <div
              className={`p-4 border rounded-2xl space-y-2.5 ${
                isDark
                  ? "bg-white/5 border-white/10"
                  : "bg-slate-50 border-slate-200 text-slate-900"
              }`}
            >
              <div className="flex justify-between items-center">
                <span className={isDark ? "text-gray-400" : "text-slate-500"}>Reference:</span>
                <span className="font-mono text-purple-600 dark:text-purple-300 font-bold">
                  {selectedAssignment.reference}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className={isDark ? "text-gray-400" : "text-slate-500"}>Student:</span>
                <span className="font-semibold">{selectedAssignment.client?.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className={isDark ? "text-gray-400" : "text-slate-500"}>Mapped Writer:</span>
                <span className="font-semibold text-pink-600 dark:text-pink-400">
                  {getAssignedWriterName(selectedAssignment) || "Unassigned"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className={isDark ? "text-gray-400" : "text-slate-500"}>Course Code:</span>
                <span className="font-mono">{selectedAssignment.course_code}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className={isDark ? "text-gray-400" : "text-slate-500"}>Assignment No:</span>
                <span>{selectedAssignment.assignment_no}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className={isDark ? "text-gray-400" : "text-slate-500"}>Word Count:</span>
                <span>{selectedAssignment.word_count || "N/A"} words</span>
              </div>
              {userRole === "ADMIN" && (
                <>
                  {selectedAssignment.rate_per_word && (
                    <div className="flex justify-between items-center">
                      <span className={isDark ? "text-gray-400" : "text-slate-500"}>
                        Rate Multiplier:
                      </span>
                      <span className="font-mono text-purple-600 dark:text-purple-300 font-semibold">
                        {selectedAssignment.rate_per_word} / word
                      </span>
                    </div>
                  )}
                  {selectedAssignment.grand_total && (
                    <div className="flex justify-between items-center border-t pt-2 border-slate-200 dark:border-white/10">
                      <span className="font-bold text-slate-700 dark:text-gray-300">Grand Total:</span>
                      <span className="font-extrabold text-base text-emerald-600 dark:text-emerald-400">
                        BDT {Number(selectedAssignment.grand_total).toLocaleString()}
                      </span>
                    </div>
                  )}
                </>
              )}
              <div className="flex justify-between items-center">
                <span className={isDark ? "text-gray-400" : "text-slate-500"}>Status:</span>
                <Badge variant="purple">{selectedAssignment.status}</Badge>
              </div>
            </div>

            {selectedAssignment.description && (
              <div
                className={`p-4 border rounded-2xl ${
                  isDark ? "bg-black/30 border-white/5" : "bg-white border-slate-200"
                }`}
              >
                <h4
                  className={`text-xs font-semibold uppercase tracking-wider mb-1 ${
                    isDark ? "text-gray-400" : "text-slate-500"
                  }`}
                >
                  Description
                </h4>
                <p
                  className={`text-xs leading-relaxed whitespace-pre-wrap ${
                    isDark ? "text-gray-300" : "text-slate-700"
                  }`}
                >
                  {selectedAssignment.description}
                </p>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
