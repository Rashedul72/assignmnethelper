"use client";

import { useEffect, useState, useCallback } from "react";
import {
  UserGroupIcon,
  UserAdd01Icon,
  PencilEdit02Icon,
  Delete02Icon,
  RefreshIcon,
  UniversityIcon,
} from "hugeicons-react";
import { DataTable, Column } from "../../components/ui/Table";
import { Modal } from "../../components/ui/Modal";
import { Badge } from "../../components/ui/Badge";
import { useToast } from "../../components/ui/ToastContext";
import { useTheme } from "../../components/ui/ThemeContext";

export default function StudentsPage() {
  const { showToast } = useToast();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  // Form State
  const [formData, setFormData] = useState({ name: "", student_id: "", university: "" });
  const [saving, setSaving] = useState(false);
  const [statusFilter, setStatusFilter] = useState("ALL");

  const fetchStudents = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("admin_token");
      const res = await fetch("http://localhost:5000/api/admin/students", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setStudents(data);
      }
    } catch (err) {
      console.error("Failed to fetch students", err);
      showToast("Failed to fetch students list", "error");
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const handleOpenModal = (student: any = null) => {
    if (student) {
      setSelectedStudent(student);
      setFormData({
        name: student.name,
        student_id: student.student_id,
        university: student.university || "",
      });
    } else {
      setSelectedStudent(null);
      setFormData({ name: "", student_id: "", university: "" });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const token = localStorage.getItem("admin_token");
    const url = selectedStudent
      ? `http://localhost:5000/api/admin/students/${selectedStudent.id}`
      : `http://localhost:5000/api/admin/students`;
    const method = selectedStudent ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        showToast(
          selectedStudent ? "Student updated successfully!" : "New student added successfully!",
          "success"
        );
        setIsModalOpen(false);
        fetchStudents();
      } else {
        const data = await res.json();
        showToast(data.error || "Failed to save student", "error");
      }
    } catch (err) {
      showToast("Network error saving student", "error");
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = (student: any) => {
    setSelectedStudent(student);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedStudent) return;
    try {
      const token = localStorage.getItem("admin_token");
      const res = await fetch(`http://localhost:5000/api/admin/students/${selectedStudent.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        showToast("Student profile deactivated", "warning");
        setIsDeleteModalOpen(false);
        fetchStudents();
      }
    } catch (err) {
      showToast("Failed to deactivate student", "error");
    }
  };

  const handleRestore = async (student: any) => {
    try {
      const token = localStorage.getItem("admin_token");
      const res = await fetch(`http://localhost:5000/api/admin/students/${student.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...student, is_active: true }),
      });
      if (res.ok) {
        showToast("Student restored successfully!", "success");
        fetchStudents();
      }
    } catch (err) {
      showToast("Failed to restore student", "error");
    }
  };

  const filteredStudents =
    statusFilter === "ALL"
      ? students
      : statusFilter === "ACTIVE"
      ? students.filter((s) => s.is_active)
      : students.filter((s) => !s.is_active);

  const columns: Column<any>[] = [
    {
      key: "name",
      header: "Student Name",
      sortable: true,
      render: (row) => (
        <div className="flex items-center space-x-3">
          <div
            className={`w-9 h-9 rounded-2xl border flex items-center justify-center font-bold shrink-0 ${
              isDark
                ? "bg-blue-500/10 border-blue-500/20 text-blue-400"
                : "bg-blue-100 border-blue-200 text-blue-700"
            }`}
          >
            {row.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className={`font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>
              {row.name}
            </div>
            <div className={`text-xs ${isDark ? "text-gray-500" : "text-slate-400"}`}>
              ID: {row.id.substring(0, 8)}...
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "student_id",
      header: "Student ID",
      sortable: true,
      render: (row) => (
        <span
          className={`font-mono font-semibold px-2.5 py-1 rounded-xl text-xs border ${
            isDark
              ? "bg-cyan-500/10 border-cyan-500/20 text-cyan-300"
              : "bg-cyan-50 border-cyan-200 text-cyan-700"
          }`}
        >
          {row.student_id}
        </span>
      ),
    },
    {
      key: "university",
      header: "University",
      sortable: true,
      render: (row) =>
        row.university ? (
          <div
            className={`flex items-center space-x-1.5 text-xs ${
              isDark ? "text-gray-300" : "text-slate-700"
            }`}
          >
            <UniversityIcon size={14} className={isDark ? "text-gray-400" : "text-slate-400"} />
            <span>{row.university}</span>
          </div>
        ) : (
          <span className="text-gray-400 text-xs italic">N/A</span>
        ),
    },
    {
      key: "is_active",
      header: "Status",
      sortable: true,
      render: (row) => (
        <Badge variant={row.is_active ? "success" : "danger"}>
          {row.is_active ? "Active" : "Inactive"}
        </Badge>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      align: "right",
      render: (row) => (
        <div className="flex items-center justify-end space-x-2">
          <button
            onClick={() => handleOpenModal(row)}
            className={`p-2 rounded-xl border transition-colors ${
              isDark
                ? "bg-white/5 hover:bg-white/10 border-white/10 text-blue-400"
                : "bg-slate-100 hover:bg-slate-200 border-slate-200 text-blue-600"
            }`}
            title="Edit Student"
          >
            <PencilEdit02Icon size={16} />
          </button>
          {row.is_active ? (
            <button
              onClick={() => confirmDelete(row)}
              className="p-2 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 rounded-xl text-rose-500 transition-colors"
              title="Deactivate Student"
            >
              <Delete02Icon size={16} />
            </button>
          ) : (
            <button
              onClick={() => handleRestore(row)}
              className="p-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-xl text-emerald-500 transition-colors"
              title="Restore Student"
            >
              <RefreshIcon size={16} />
            </button>
          )}
        </div>
      ),
    },
  ];

  const inputClass = isDark
    ? "w-full bg-black/40 border border-white/10 rounded-2xl py-2.5 px-4 text-white focus:outline-none focus:border-blue-500 transition-all text-sm"
    : "w-full bg-slate-50 border border-slate-200 rounded-2xl py-2.5 px-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 transition-all text-sm";

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
            Student Clients
          </h1>
          <p className={`text-sm mt-1 ${isDark ? "text-gray-400" : "text-slate-600"}`}>
            Manage client accounts and university profiles
          </p>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold py-2.5 px-5 rounded-2xl flex items-center space-x-2 shadow-[0_0_20px_rgba(59,130,246,0.25)] transition-all text-sm"
        >
          <UserAdd01Icon size={18} />
          <span>New Student</span>
        </button>
      </div>

      {/* Main DataTable */}
      <DataTable
        columns={columns}
        data={filteredStudents}
        loading={loading}
        searchPlaceholder="Search student name, ID, or university..."
        searchKeys={["name", "student_id", "university"]}
        filters={[
          {
            key: "status",
            label: "Filter Status",
            value: statusFilter,
            onChange: (val) => setStatusFilter(val),
            options: [
              { label: "All Students", value: "ALL" },
              { label: "Active Only", value: "ACTIVE" },
              { label: "Inactive Only", value: "INACTIVE" },
            ],
          },
        ]}
        emptyTitle="No students found"
        emptySubtitle="No student profiles match your search criteria."
      />

      {/* Add / Edit Student Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedStudent ? "Edit Student Profile" : "Add New Student"}
        subtitle={selectedStudent ? selectedStudent.name : "Register a new client profile"}
        icon={UserGroupIcon}
        size="md"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label
              className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                isDark ? "text-gray-400" : "text-slate-600"
              }`}
            >
              Full Name *
            </label>
            <input
              required
              type="text"
              placeholder="e.g. John Doe"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={inputClass}
            />
          </div>

          <div>
            <label
              className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                isDark ? "text-gray-400" : "text-slate-600"
              }`}
            >
              Student ID * (Preserves leading zeros)
            </label>
            <input
              required
              type="text"
              placeholder="e.g. 01823901"
              value={formData.student_id}
              onChange={(e) => setFormData({ ...formData, student_id: e.target.value })}
              className={`${inputClass} font-mono`}
            />
          </div>

          <div>
            <label
              className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                isDark ? "text-gray-400" : "text-slate-600"
              }`}
            >
              University / Institution (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. University of Dhaka"
              value={formData.university}
              onChange={(e) => setFormData({ ...formData, university: e.target.value })}
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
              onClick={() => setIsModalOpen(false)}
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
              className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold text-sm shadow-[0_0_20px_rgba(59,130,246,0.25)] disabled:opacity-50 transition-all"
            >
              {saving ? "Saving..." : selectedStudent ? "Update Profile" : "Create Student"}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Deactivate Student Account"
        subtitle="Confirmation required"
        icon={Delete02Icon}
        size="sm"
      >
        <div className="space-y-4">
          <p className={`text-sm leading-relaxed ${isDark ? "text-gray-300" : "text-slate-600"}`}>
            Are you sure you want to deactivate{" "}
            <span className={`font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>
              {selectedStudent?.name}
            </span>
            ? This will perform a soft-delete on the student profile.
          </p>
          <div className="flex justify-end space-x-3 pt-2">
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className={`px-4 py-2 rounded-xl text-sm font-medium ${
                isDark ? "bg-white/5 hover:bg-white/10 text-white" : "bg-slate-100 hover:bg-slate-200 text-slate-700"
              }`}
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-sm font-semibold shadow-md shadow-rose-600/20"
            >
              Deactivate Account
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
