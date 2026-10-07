"use client";

import { useEffect, useState, useCallback } from "react";
import {
  FileText,
  Plus,
  User,
  Calendar,
  Eye,
  PenTool,
  CreditCard,
  Pencil,
  BookOpen,
  DollarSign,
  CheckCircle2,
  Search,
  ChevronDown,
  X,
} from "lucide-react";
import { DataTable, Column } from "../../components/ui/Table";
import { Modal } from "../../components/ui/Modal";
import { Badge } from "../../components/ui/Badge";
import { PageHeader } from "../../components/ui/PageHeader";
import { useToast } from "../../components/ui/ToastContext";
import { fetchWithAuth } from "../../lib/api";

export default function AssignmentsPage() {
  const { showToast } = useToast();

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
    assigned_status: "PENDING",
    payment_status: "PENDING",
    writer_commission_status: "PENDING",
    commission_type: "PERCENTAGE",
    commission_value: "30",
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
      const res = await fetchWithAuth("/admin/assignments");
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
      const [studentsRes, writersRes] = await Promise.all([
        fetchWithAuth("/admin/students"),
        fetchWithAuth("/admin/writers"),
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

  // Searchable student combobox states
  const [createStudentSearch, setCreateStudentSearch] = useState("");
  const [createStudentDropdownOpen, setCreateStudentDropdownOpen] = useState(false);
  const [editStudentSearch, setEditStudentSearch] = useState("");
  const [editStudentDropdownOpen, setEditStudentDropdownOpen] = useState(false);

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
    setCreateStudentSearch("");
    setCreateStudentDropdownOpen(false);
    setIsCreateModalOpen(true);
  };

  const handleOpenEditModal = (row: any) => {
    if (userRole !== "ADMIN" && row.writer_commission_status === "PAID") {
      showToast(
        "This assignment is locked because Writer Commission is paid. Only admins can edit it.",
        "warning"
      );
      return;
    }
    const latestComm = row.commissionRecords?.[0] || row.writers?.[0];
    const initialCommType = latestComm?.calculation_type || latestComm?.commission_type || "PERCENTAGE";
    const initialCommVal = latestComm?.commission_value
      ? String(latestComm.commission_value)
      : latestComm?.commission_percentage
      ? String(latestComm.commission_percentage)
      : "30";

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
      assigned_status: row.assigned_status || "PENDING",
      payment_status: row.payment_status || "PENDING",
      writer_commission_status: row.writer_commission_status || "PENDING",
      commission_type: initialCommType,
      commission_value: initialCommVal,
    });
    setEditStudentSearch("");
    setEditStudentDropdownOpen(false);
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
      const res = await fetchWithAuth("/admin/assignments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
      const res = await fetchWithAuth(
        `/dashboard/assignments/${editFormData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
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
      header: "Student Client",
      sortable: true,
      render: (row) => (
        <div className="flex items-center space-x-2.5">
          <div
            className={`w-7 h-7 rounded-lg border flex items-center justify-center shrink-0 ${
              "bg-purple-50 border-purple-200 text-purple-700"
            }`}
          >
            <User size={14} />
          </div>
          <div>
            <div className={`font-semibold text-xs ${"text-slate-900"}`}>
              {row.client?.name || "Unknown"}
            </div>
            <div className={`text-[11px] font-mono ${"text-slate-500"}`}>
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
              className={`p-1 rounded-md border shrink-0 ${
                "bg-pink-50 border-pink-200 text-pink-700"
              }`}
            >
              <PenTool size={12} />
            </div>
            <span className={`font-medium text-xs ${"text-slate-900"}`}>
              {writerName}
            </span>
          </div>
        ) : (
          <span className="text-slate-400 text-xs italic">Unassigned</span>
        );
      },
    },
    {
      key: "course_code",
      header: "Course & Title",
      render: (row) => (
        <div>
          <div className={`font-medium text-xs ${"text-slate-800"}`}>
            {row.title || row.course_code}
          </div>
          <div className={`text-[11px] font-mono ${"text-slate-500"}`}>
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
                <div className="font-semibold text-xs text-emerald-600 ">
                  BDT {Number(row.grand_total).toLocaleString()}
                </div>
              ) : (
                <span className="text-slate-400 text-xs italic">—</span>
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
              "text-slate-700"
            }`}
          >
            <Calendar size={13} className="text-amber-500" />
            <span>{new Date(row.due_at).toLocaleDateString()}</span>
          </div>
        ) : (
          <span className="text-slate-400 text-xs italic">No due date</span>
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
        <div className="flex items-center justify-end space-x-1.5">
          {(() => {
            const isLocked = userRole !== "ADMIN" && row.writer_commission_status === "PAID";
            return (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenEditModal(row);
                }}
                disabled={isLocked}
                className={`p-1.5 rounded-lg border transition-colors ${
                  isLocked
                    ? "opacity-40 cursor-not-allowed border-slate-200 text-slate-400"
                    : "border-slate-200 text-slate-600 hover:bg-slate-100 "
                }`}
                title={isLocked ? "Locked (Writer Commission Paid)" : "Edit Assignment"}
              >
                <Pencil size={14} />
              </button>
            );
          })()}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedAssignment(row);
              setIsViewModalOpen(true);
            }}
            className="p-1.5 rounded-lg border border-slate-200 text-purple-600 hover:bg-purple-50 transition-colors"
            title="View Details"
          >
            <Eye size={14} />
          </button>
        </div>
      ),
    },
  ];

  const inputClass = "w-full bg-white border border-slate-200/80 rounded-xl py-2 px-3.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-purple-500 transition-all text-xs sm:text-sm shadow-2xs";

  const labelClass = `block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
    "text-slate-600"
  }`;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Assignments Management"
        description="Monitor, allocate, and manage client assignment records and writer assignments"
        badge="Operations"
        actions={
          <button
            onClick={handleOpenCreateModal}
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-medium text-xs sm:text-sm flex items-center space-x-1.5 shadow-2xs transition-colors"
          >
            <Plus size={16} />
            <span>Create Assignment</span>
          </button>
        }
      />

      {/* Main Table Component */}
      <DataTable
        columns={columns}
        data={filteredAssignments}
        loading={loading}
        pageSize={10}
        searchPlaceholder="Search assignment ID, course, title, student..."
        filters={[
          {
            key: "statusFilter",
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
        emptySubtitle="Try adjusting your filters or click Create Assignment to add one."
      />

      {/* Create Assignment Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Assignment"
        subtitle="Fill in student assignment details and assign an optional writer."
        icon={FileText}
        size="lg"
        footer={
          <>
            <button
              onClick={() => setIsCreateModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateAssignment}
              disabled={saving}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold flex items-center space-x-1.5 transition-colors shadow-2xs"
            >
              {saving && (
                <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-1" />
              )}
              <span>Create Assignment</span>
            </button>
          </>
        }
      >
        <form onSubmit={handleCreateAssignment} className="space-y-4 max-w-2xl mx-auto">
          {/* Section 1: Client Selection */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-600 ">
              Student Client Information
            </h4>

            <div>
              <label className={labelClass}>Select Student Client *</label>
              <div className="relative">
                {/* Trigger Button */}
                <div
                  onClick={() => setCreateStudentDropdownOpen(!createStudentDropdownOpen)}
                  className={`w-full p-2.5 rounded-xl border text-xs cursor-pointer flex items-center justify-between transition-all ${
                    "bg-slate-50 border-slate-200 text-slate-900 hover:border-purple-400"
                  }`}
                >
                  {(() => {
                    const selectedStudent = students.find((s) => s.id === formData.client_id);
                    if (selectedStudent) {
                      return (
                        <div className="flex items-center space-x-2 truncate min-w-0">
                          <span className="font-bold text-slate-900 truncate">
                            {selectedStudent.name}
                          </span>
                          <span className="font-mono text-[11px] px-2 py-0.5 rounded-md bg-purple-100 text-purple-700 font-semibold shrink-0">
                            ID: {selectedStudent.student_id}
                          </span>
                          {selectedStudent.university && (
                            <span className="text-[11px] text-slate-500 truncate shrink">
                              • {selectedStudent.university}
                            </span>
                          )}
                        </div>
                      );
                    }
                    return (
                      <span className="text-slate-400 font-normal">
                        Click or search student by name or ID...
                      </span>
                    );
                  })()}
                  <ChevronDown
                    size={16}
                    className={`text-slate-400 shrink-0 ml-2 transition-transform duration-200 ${
                      createStudentDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>

                {/* Dropdown Overlay */}
                {createStudentDropdownOpen && (
                  <div
                    className={`absolute z-50 left-0 right-0 mt-1 rounded-xl border shadow-2xl p-2.5 space-y-2 ${
                      "bg-white border-slate-200 text-slate-900"
                    }`}
                  >
                    {/* Live Search Input Box */}
                    <div className="relative">
                      <Search size={14} className="absolute left-3 top-2.5 text-slate-400" />
                      <input
                        type="text"
                        autoFocus
                        placeholder="Search student by name, student ID or university..."
                        value={createStudentSearch}
                        onChange={(e) => setCreateStudentSearch(e.target.value)}
                        className={`w-full pl-8 pr-8 py-2 rounded-lg border text-xs outline-none transition-colors ${
                          "bg-slate-50 border-slate-200 text-slate-900 focus:border-purple-500"
                        }`}
                      />
                      {createStudentSearch && (
                        <button
                          type="button"
                          onClick={() => setCreateStudentSearch("")}
                          className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 "
                        >
                          <X size={14} />
                        </button>
                      )}
                    </div>

                    {/* Scrollable Filtered Students List */}
                    <div className="max-h-52 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                      {(() => {
                        const filtered = students.filter((st) => {
                          if (!createStudentSearch.trim()) return true;
                          const q = createStudentSearch.toLowerCase();
                          return (
                            st.name?.toLowerCase().includes(q) ||
                            st.student_id?.toLowerCase().includes(q) ||
                            st.university?.toLowerCase().includes(q)
                          );
                        });

                        if (filtered.length === 0) {
                          return (
                            <div className="p-4 text-center text-xs text-slate-500 ">
                              No students found matching "{createStudentSearch}"
                            </div>
                          );
                        }

                        return filtered.map((st) => {
                          const isSelected = formData.client_id === st.id;
                          return (
                            <div
                              key={st.id}
                              onClick={() => {
                                setFormData({ ...formData, client_id: st.id });
                                setCreateStudentDropdownOpen(false);
                              }}
                              className={`p-2.5 rounded-lg cursor-pointer flex items-center justify-between transition-colors text-xs ${
                                isSelected
                                  ? "bg-purple-50 text-purple-900 font-semibold border border-purple-200"
                                  : "hover:bg-slate-100 text-slate-800"
                              }`}
                            >
                              <div className="flex flex-col min-w-0 pr-2">
                                <div className="flex items-center space-x-2">
                                  <span className="font-bold truncate">{st.name}</span>
                                  <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 font-medium shrink-0">
                                    ID: {st.student_id}
                                  </span>
                                </div>
                                {st.university && (
                                  <span className="text-[10px] text-slate-500 truncate mt-0.5">
                                    {st.university}
                                  </span>
                                )}
                              </div>
                              {isSelected && (
                                <CheckCircle2
                                  size={16}
                                  className="text-purple-600 shrink-0 ml-2"
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
          </div>

          {/* Section 2: Course & Assignment Info */}
          <div className="space-y-3 pt-2 border-t border-slate-100 ">
            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-600 ">
              Course Details
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Course Code *</label>
                <input
                  type="text"
                  placeholder="e.g. CSE-101"
                  value={formData.course_code}
                  onChange={(e) => setFormData({ ...formData, course_code: e.target.value })}
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className={labelClass}>Assignment Number *</label>
                <input
                  type="text"
                  placeholder="e.g. 1, HW-01, Task A"
                  value={formData.assignment_no}
                  onChange={(e) => setFormData({ ...formData, assignment_no: e.target.value })}
                  className={inputClass}
                  required
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>Assignment Title</label>
              <input
                type="text"
                placeholder="e.g. Data Structures Research Paper"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Description & Special Instructions</label>
              <textarea
                rows={3}
                placeholder="Enter formatting, reference style, or special notes..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className={inputClass}
              />
            </div>
          </div>

          {/* Section 3: Writer & Schedule */}
          <div className="space-y-3 pt-2 border-t border-slate-100 ">
            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-600 ">
              Writer & Due Date
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Assign Writer</label>
                {userRole === "ADMIN" ? (
                  <select
                    value={formData.writer_id}
                    onChange={(e) => setFormData({ ...formData, writer_id: e.target.value })}
                    className={inputClass}
                  >
                    <option value="" className="bg-white text-slate-900 ">-- Leave Unassigned --</option>
                    {writers.map((w) => (
                      <option key={w.id} value={w.id} className="bg-white text-slate-900 ">
                        {w.name} ({w.phone_number})
                      </option>
                    ))}
                  </select>
                ) : (
                  <div
                    className={`p-2.5 rounded-xl border text-xs flex items-center justify-between font-medium ${
                      "bg-purple-50 border-purple-200 text-purple-900"
                    }`}
                  >
                    <span>Auto-assigned to you (Logged in Writer)</span>
                    <Badge variant="purple">Writer</Badge>
                  </div>
                )}
              </div>

              <div>
                <label className={labelClass}>Due Date & Time</label>
                <input
                  type="datetime-local"
                  value={formData.due_at}
                  onChange={(e) => setFormData({ ...formData, due_at: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* Section 4: Billing & Word Count */}
          <div className="space-y-3 pt-2 border-t border-slate-100 ">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 ">
              {userRole === "ADMIN" ? "Financials & Word Rate" : "Word Count Specification"}
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className={labelClass}>Word Count</label>
                <input
                  type="number"
                  placeholder="e.g. 1500"
                  value={formData.word_count}
                  onChange={(e) => handleWordCountChange(e.target.value)}
                  className={inputClass}
                />
              </div>

              {userRole === "ADMIN" && (
                <>
                  <div>
                    <label className={labelClass}>Rate / Word (BDT)</label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="1.50"
                      value={formData.rate_per_word}
                      onChange={(e) => handleRateChange(e.target.value)}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Grand Total (BDT)</label>
                    <input
                      type="number"
                      placeholder="Auto calculated"
                      value={formData.grand_total}
                      onChange={(e) => setFormData({ ...formData, grand_total: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </form>
      </Modal>

      {/* Edit Assignment Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Assignment Details"
        subtitle="Update assignment properties, status, or assigned writer."
        icon={Pencil}
        size="lg"
        footer={
          <>
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdateAssignment}
              disabled={saving}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold flex items-center space-x-1.5 transition-colors shadow-2xs"
            >
              {saving && (
                <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-1" />
              )}
              <span>Save Changes</span>
            </button>
          </>
        }
      >
        <form onSubmit={handleUpdateAssignment} className="space-y-4 max-w-2xl mx-auto">
          {/* Student Client Information (Searchable) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-600 ">
              Student Client Information
            </h4>

            <div>
              <label className={labelClass}>Select Student Client *</label>
              <div className="relative">
                {/* Trigger Button */}
                <div
                  onClick={() => setEditStudentDropdownOpen(!editStudentDropdownOpen)}
                  className={`w-full p-2.5 rounded-xl border text-xs cursor-pointer flex items-center justify-between transition-all ${
                    "bg-slate-50 border-slate-200 text-slate-900 hover:border-purple-400"
                  }`}
                >
                  {(() => {
                    const selectedStudent = students.find((s) => s.id === editFormData.client_id);
                    if (selectedStudent) {
                      return (
                        <div className="flex items-center space-x-2 truncate min-w-0">
                          <span className="font-bold text-slate-900 truncate">
                            {selectedStudent.name}
                          </span>
                          <span className="font-mono text-[11px] px-2 py-0.5 rounded-md bg-purple-100 text-purple-700 font-semibold shrink-0">
                            ID: {selectedStudent.student_id}
                          </span>
                          {selectedStudent.university && (
                            <span className="text-[11px] text-slate-500 truncate shrink">
                              • {selectedStudent.university}
                            </span>
                          )}
                        </div>
                      );
                    }
                    return (
                      <span className="text-slate-400 font-normal">
                        Click or search student by name or ID...
                      </span>
                    );
                  })()}
                  <ChevronDown
                    size={16}
                    className={`text-slate-400 shrink-0 ml-2 transition-transform duration-200 ${
                      editStudentDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>

                {/* Dropdown Overlay */}
                {editStudentDropdownOpen && (
                  <div
                    className={`absolute z-50 left-0 right-0 mt-1 rounded-xl border shadow-2xl p-2.5 space-y-2 ${
                      "bg-white border-slate-200 text-slate-900"
                    }`}
                  >
                    {/* Live Search Input Box */}
                    <div className="relative">
                      <Search size={14} className="absolute left-3 top-2.5 text-slate-400" />
                      <input
                        type="text"
                        autoFocus
                        placeholder="Search student by name, student ID or university..."
                        value={editStudentSearch}
                        onChange={(e) => setEditStudentSearch(e.target.value)}
                        className={`w-full pl-8 pr-8 py-2 rounded-lg border text-xs outline-none transition-colors ${
                          "bg-slate-50 border-slate-200 text-slate-900 focus:border-purple-500"
                        }`}
                      />
                      {editStudentSearch && (
                        <button
                          type="button"
                          onClick={() => setEditStudentSearch("")}
                          className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 "
                        >
                          <X size={14} />
                        </button>
                      )}
                    </div>

                    {/* Scrollable Filtered Students List */}
                    <div className="max-h-52 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                      {(() => {
                        const filtered = students.filter((st) => {
                          if (!editStudentSearch.trim()) return true;
                          const q = editStudentSearch.toLowerCase();
                          return (
                            st.name?.toLowerCase().includes(q) ||
                            st.student_id?.toLowerCase().includes(q) ||
                            st.university?.toLowerCase().includes(q)
                          );
                        });

                        if (filtered.length === 0) {
                          return (
                            <div className="p-4 text-center text-xs text-slate-500 ">
                              No students found matching "{editStudentSearch}"
                            </div>
                          );
                        }

                        return filtered.map((st) => {
                          const isSelected = editFormData.client_id === st.id;
                          return (
                            <div
                              key={st.id}
                              onClick={() => {
                                setEditFormData({ ...editFormData, client_id: st.id });
                                setEditStudentDropdownOpen(false);
                              }}
                              className={`p-2.5 rounded-lg cursor-pointer flex items-center justify-between transition-colors text-xs ${
                                isSelected
                                  ? "bg-purple-50 text-purple-900 font-semibold border border-purple-200"
                                  : "hover:bg-slate-100 text-slate-800"
                              }`}
                            >
                              <div className="flex flex-col min-w-0 pr-2">
                                <div className="flex items-center space-x-2">
                                  <span className="font-bold truncate">{st.name}</span>
                                  <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 font-medium shrink-0">
                                    ID: {st.student_id}
                                  </span>
                                </div>
                                {st.university && (
                                  <span className="text-[10px] text-slate-500 truncate mt-0.5">
                                    {st.university}
                                  </span>
                                )}
                              </div>
                              {isSelected && (
                                <CheckCircle2
                                  size={16}
                                  className="text-purple-600 shrink-0 ml-2"
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
          </div>

          {/* Status Selection */}
          <div>
            <label className={labelClass}>Assignment Status</label>
            <select
              value={editFormData.status}
              onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value })}
              className={inputClass}
            >
              <option value="NEW" className="bg-white text-slate-900 ">NEW</option>
              <option value="ASSIGNED" className="bg-white text-slate-900 ">ASSIGNED</option>
              <option value="IN_PROGRESS" className="bg-white text-slate-900 ">IN PROGRESS</option>
              <option value="SUBMITTED" className="bg-white text-slate-900 ">SUBMITTED</option>
              <option value="COMPLETED" className="bg-white text-slate-900 ">COMPLETED</option>
              <option value="CANCELLED" className="bg-white text-slate-900 ">CANCELLED</option>
            </select>
          </div>

          {/* Admin Specific Status Controls */}
          {userRole === "ADMIN" && (
            <div className="p-3.5 rounded-xl border border-purple-200/60 bg-purple-50/50 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-purple-700 ">
                Admin Workflow Statuses
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className={labelClass}>Assigned Status</label>
                  <select
                    value={editFormData.assigned_status}
                    onChange={(e) => setEditFormData({ ...editFormData, assigned_status: e.target.value })}
                    className={inputClass}
                  >
                    <option value="PENDING" className="bg-white text-slate-900 ">PENDING</option>
                    <option value="SUBMITTED" className="bg-white text-slate-900 ">SUBMITTED</option>
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Payment Status</label>
                  <select
                    value={editFormData.payment_status}
                    onChange={(e) => setEditFormData({ ...editFormData, payment_status: e.target.value })}
                    className={inputClass}
                  >
                    <option value="PENDING" className="bg-white text-slate-900 ">PENDING</option>
                    <option value="PAID" className="bg-white text-slate-900 ">PAID</option>
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Writer Commission</label>
                  <select
                    value={editFormData.writer_commission_status}
                    onChange={(e) => setEditFormData({ ...editFormData, writer_commission_status: e.target.value })}
                    className={inputClass}
                  >
                    <option value="PENDING" className="bg-white text-slate-900 ">PENDING</option>
                    <option value="PAID" className="bg-white text-slate-900 ">PAID</option>
                  </select>
                </div>
              </div>

              {/* Writer Commission Calculator & Financial Breakdown */}
              {(() => {
                const activeEditingAssign = assignments.find((a) => a.id === editFormData.id);
                const costsTotal = activeEditingAssign?.costs
                  ? activeEditingAssign.costs.reduce((sum: number, c: any) => sum + Number(c.price || 0), 0)
                  : 0;
                const grandTotalNum = parseFloat(editFormData.grand_total) || 0;
                const netBase = Math.max(0, grandTotalNum - costsTotal);
                const commValNum = parseFloat(editFormData.commission_value) || 0;
                const finalComm =
                  editFormData.commission_type === "FLAT"
                    ? commValNum
                    : (netBase * commValNum) / 100;

                return (
                  <div className="pt-3 border-t border-purple-200/60 space-y-3">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="text-xs font-semibold text-purple-900 flex items-center space-x-1">
                        <DollarSign size={14} className="text-emerald-500" />
                        <span>Commission Calculation Method:</span>
                      </span>
                      <div className="flex items-center space-x-1 bg-white p-1 rounded-lg border border-purple-200 ">
                        <button
                          type="button"
                          onClick={() => setEditFormData({ ...editFormData, commission_type: "PERCENTAGE" })}
                          className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                            editFormData.commission_type === "PERCENTAGE"
                              ? "bg-purple-600 text-white font-bold shadow-2xs"
                              : "text-slate-600 hover:text-purple-600"
                          }`}
                        >
                          Percentage (%)
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditFormData({ ...editFormData, commission_type: "FLAT" })}
                          className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                            editFormData.commission_type === "FLAT"
                              ? "bg-purple-600 text-white font-bold shadow-2xs"
                              : "text-slate-600 hover:text-purple-600"
                          }`}
                        >
                          Flat Amount (BDT)
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                      <div>
                        <label className={labelClass}>
                          {editFormData.commission_type === "PERCENTAGE"
                            ? "Commission Percentage (%) *"
                            : "Flat Commission Amount (BDT) *"}
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          placeholder={editFormData.commission_type === "PERCENTAGE" ? "e.g. 30" : "e.g. 800"}
                          value={editFormData.commission_value}
                          onChange={(e) =>
                            setEditFormData({ ...editFormData, commission_value: e.target.value })
                          }
                          className={inputClass}
                        />
                      </div>

                      {/* Live Financial Breakdown Card */}
                      <div className="p-3 rounded-xl border border-emerald-500/30 bg-emerald-50/70 text-xs space-y-1.5 shadow-2xs">
                        <div className="flex justify-between text-[11px] text-slate-600 ">
                          <span>Student Total:</span>
                          <span className="font-semibold text-slate-900 ">
                            BDT {grandTotalNum.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between text-[11px] text-slate-600 ">
                          <span>Assignment Costs:</span>
                          <span className="font-semibold text-rose-600 ">
                            - BDT {costsTotal.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between text-[11px] font-medium text-slate-700 pt-1 border-t border-emerald-200 ">
                          <span>Net Remaining Base:</span>
                          <span className="font-bold text-slate-900 ">
                            BDT {netBase.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between font-bold text-emerald-700 pt-1 border-t border-emerald-300 text-xs">
                          <span>
                            Writer Commission (
                            {editFormData.commission_type === "PERCENTAGE"
                              ? `${commValNum}% of BDT ${netBase.toLocaleString()}`
                              : "Flat"}
                            ):
                          </span>
                          <span className="text-sm font-black text-emerald-600 ">
                            BDT {finalComm.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Course Code *</label>
              <input
                type="text"
                value={editFormData.course_code}
                onChange={(e) => setEditFormData({ ...editFormData, course_code: e.target.value })}
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className={labelClass}>Assignment Number *</label>
              <input
                type="text"
                value={editFormData.assignment_no}
                onChange={(e) => setEditFormData({ ...editFormData, assignment_no: e.target.value })}
                className={inputClass}
                required
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Assignment Title</label>
            <input
              type="text"
              value={editFormData.title}
              onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Description</label>
            <textarea
              rows={3}
              value={editFormData.description}
              onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Assigned Writer</label>
              <select
                value={editFormData.writer_id}
                onChange={(e) => setEditFormData({ ...editFormData, writer_id: e.target.value })}
                className={inputClass}
              >
                <option value="" className="bg-white text-slate-900 ">-- Unassigned --</option>
                {writers.map((w) => (
                  <option key={w.id} value={w.id} className="bg-white text-slate-900 ">
                    {w.name} ({w.phone_number})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass}>Due Date & Time</label>
              <input
                type="datetime-local"
                value={editFormData.due_at}
                onChange={(e) => setEditFormData({ ...editFormData, due_at: e.target.value })}
                className={inputClass}
              />
            </div>
          </div>

          {/* Word Count & Billing (Word Count editable for Writers & Admins) */}
          <div className="pt-2 border-t border-slate-100 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 ">
              {userRole === "ADMIN" ? "Financials & Word Rate" : "Word Count Specification"}
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className={labelClass}>Word Count</label>
                <input
                  type="number"
                  placeholder="e.g. 1500"
                  value={editFormData.word_count}
                  onChange={(e) => handleEditWordCountChange(e.target.value)}
                  className={inputClass}
                />
              </div>

              {userRole === "ADMIN" && (
                <>
                  <div>
                    <label className={labelClass}>Rate / Word (BDT)</label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="1.50"
                      value={editFormData.rate_per_word}
                      onChange={(e) => handleEditRateChange(e.target.value)}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Grand Total (BDT)</label>
                    <input
                      type="number"
                      placeholder="Auto calculated"
                      value={editFormData.grand_total}
                      onChange={(e) => setEditFormData({ ...editFormData, grand_total: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </form>
      </Modal>

      {/* View Details Modal */}
      {selectedAssignment && (
        <Modal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          title={`Assignment Overview (${selectedAssignment.reference})`}
          subtitle="Full specification details and assigned entity data."
          icon={Eye}
          size="lg"
          footer={
            <button
              onClick={() => setIsViewModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold transition-colors"
            >
              Close
            </button>
          }
        >
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl border border-slate-200 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-slate-500 ">Reference:</span>
                <span className="font-mono font-bold text-purple-600 ">
                  {selectedAssignment.reference}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-slate-500 ">Student Name:</span>
                <span className="font-semibold">{selectedAssignment.client?.name || "N/A"}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-slate-500 ">Course Code:</span>
                <span>{selectedAssignment.course_code}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-slate-500 ">Status:</span>
                <Badge variant="purple">{selectedAssignment.status}</Badge>
              </div>
            </div>

            {userRole === "ADMIN" && (
              <div className="p-4 rounded-xl border border-purple-200/60 bg-purple-50/50 space-y-3">
                <h5 className="font-bold text-xs uppercase tracking-wider text-purple-700 ">
                  Admin Workflow Statuses
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="flex justify-between items-center p-2 rounded-lg bg-white/60 border border-slate-200 ">
                    <span className="font-semibold text-slate-500 ">Assigned Status:</span>
                    <Badge variant={selectedAssignment.assigned_status === "SUBMITTED" ? "success" : "warning"}>
                      {selectedAssignment.assigned_status || "PENDING"}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded-lg bg-white/60 border border-slate-200 ">
                    <span className="font-semibold text-slate-500 ">Payment Status:</span>
                    <Badge variant={selectedAssignment.payment_status === "PAID" ? "success" : "warning"}>
                      {selectedAssignment.payment_status || "PENDING"}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded-lg bg-white/60 border border-slate-200 ">
                    <span className="font-semibold text-slate-500 ">Writer Commission:</span>
                    <Badge variant={selectedAssignment.writer_commission_status === "PAID" ? "success" : "warning"}>
                      {selectedAssignment.writer_commission_status || "PENDING"}
                    </Badge>
                  </div>
                </div>

                {/* Net Profit & Financial Overview (Admin Only) */}
                {(() => {
                  const studentTotal = Number(selectedAssignment.grand_total || 0);
                  const costsTotal = selectedAssignment.costs
                    ? selectedAssignment.costs.reduce((sum: number, c: any) => sum + Number(c.price || 0), 0)
                    : 0;
                  const latestCommRecord = selectedAssignment.commissionRecords?.[0];
                  const writerComm = latestCommRecord
                    ? Number(latestCommRecord.final_commission_amount || 0)
                    : Number(selectedAssignment.writers?.[0]?.commission_amount || 0);
                  const netProfit = studentTotal - costsTotal - writerComm;

                  return (
                    <div className="pt-2 border-t border-purple-200/60 space-y-2">
                      <h5 className="font-bold text-xs uppercase tracking-wider text-emerald-700 flex items-center space-x-1">
                        <DollarSign size={14} className="text-emerald-500" />
                        <span>Financial Summary & Net Profit</span>
                      </h5>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                        <div className="p-2.5 rounded-lg border border-slate-200 bg-white/80 ">
                          <div className="text-[10px] text-slate-500 font-medium">
                            Student Total
                          </div>
                          <div className="font-bold text-slate-900 font-mono mt-0.5">
                            BDT {studentTotal.toLocaleString()}
                          </div>
                        </div>

                        <div className="p-2.5 rounded-lg border border-rose-200 bg-rose-50/50 ">
                          <div className="text-[10px] text-rose-700 font-medium">
                            Assignment Costs
                          </div>
                          <div className="font-bold text-rose-600 font-mono mt-0.5">
                            - BDT {costsTotal.toLocaleString()}
                          </div>
                        </div>

                        <div className="p-2.5 rounded-lg border border-purple-200 bg-purple-50/50 ">
                          <div className="text-[10px] text-purple-700 font-medium">
                            Writer Commission
                          </div>
                          <div className="font-bold text-purple-600 font-mono mt-0.5">
                            - BDT {writerComm.toLocaleString()}
                          </div>
                        </div>

                        <div className="p-2.5 rounded-lg border border-emerald-400/60 bg-emerald-100/70 shadow-2xs">
                          <div className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider">
                            Net Profit Left
                          </div>
                          <div className="font-black text-emerald-700 font-mono text-sm mt-0.5">
                            BDT {netProfit.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* Stored Commission Calculation Records Table (Admin Only) */}
            {userRole === "ADMIN" && selectedAssignment.commissionRecords && selectedAssignment.commissionRecords.length > 0 && (
              <div className="space-y-2 mt-3">
                <h5 className="font-bold text-xs uppercase tracking-wider text-purple-700 ">
                  Writer Commission Audit Table
                </h5>
                <div className="overflow-x-auto rounded-xl border border-slate-200 ">
                  <table className="w-full text-left text-[11px]">
                    <thead className="bg-slate-100 font-semibold text-slate-600 ">
                      <tr>
                        <th className="p-2">Date</th>
                        <th className="p-2">Type</th>
                        <th className="p-2">Student Total</th>
                        <th className="p-2">Costs</th>
                        <th className="p-2">Net Base</th>
                        <th className="p-2 text-right">Commission Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 ">
                      {selectedAssignment.commissionRecords.map((rec: any) => (
                        <tr key={rec.id} className="hover:bg-slate-50 ">
                          <td className="p-2">{new Date(rec.createdAt).toLocaleDateString()}</td>
                          <td className="p-2 font-semibold text-purple-600 ">
                            {rec.calculation_type === "FLAT"
                              ? `Flat (BDT ${rec.commission_value})`
                              : `${rec.commission_value}%`}
                          </td>
                          <td className="p-2 font-mono">BDT {Number(rec.grand_total).toLocaleString()}</td>
                          <td className="p-2 font-mono text-rose-500">- BDT {Number(rec.total_cost).toLocaleString()}</td>
                          <td className="p-2 font-mono font-medium">BDT {Number(rec.net_base_amount).toLocaleString()}</td>
                          <td className="p-2 text-right font-bold text-emerald-600 ">
                            BDT {Number(rec.final_commission_amount).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {selectedAssignment.description && (
              <div>
                <span className="font-semibold block mb-1">Description:</span>
                <p className="p-3 rounded-xl border border-slate-200 text-slate-600 ">
                  {selectedAssignment.description}
                </p>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}
