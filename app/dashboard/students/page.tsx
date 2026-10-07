"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Users,
  UserPlus,
  Pencil,
  RotateCcw,
  GraduationCap,
} from "lucide-react";
import { DataTable, Column } from "../../components/ui/Table";
import { Modal } from "../../components/ui/Modal";
import { Badge } from "../../components/ui/Badge";
import { PageHeader } from "../../components/ui/PageHeader";
import { useToast } from "../../components/ui/ToastContext";
import { fetchWithAuth } from "../../lib/api";

export default function StudentsPage() {
  const { showToast } = useToast();

  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  // Form State
  const [formData, setFormData] = useState({ name: "", student_id: "", university: "" });
  const [saving, setSaving] = useState(false);
  const [statusFilter, setStatusFilter] = useState("ALL");

  const fetchStudents = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetchWithAuth("/admin/students");
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
    const url = selectedStudent
      ? `/dashboard/students/${selectedStudent.id}`
      : `/dashboard/students`;
    const method = selectedStudent ? "PUT" : "POST";

    try {
      const res = await fetchWithAuth(url, {
        method,
        headers: {
          "Content-Type": "application/json",
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

  const handleRestore = async (student: any) => {
    try {
      const res = await fetchWithAuth(`/admin/students/${student.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
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

  const filteredStudents = students.filter((s) => {
    if (statusFilter === "ACTIVE") return s.is_active !== false;
    if (statusFilter === "INACTIVE") return s.is_active === false;
    return true;
  });

  const columns: Column<any>[] = [
    {
      key: "name",
      header: "Student Name",
      sortable: true,
      render: (row) => (
        <div className="flex items-center space-x-2.5">
          <div
            className={`w-8 h-8 rounded-full border flex items-center justify-center font-bold text-xs shrink-0 ${
              "bg-purple-100 border-purple-200 text-purple-700"
            }`}
          >
            {row.name ? row.name[0].toUpperCase() : "S"}
          </div>
          <div>
            <div className={`font-semibold text-xs ${"text-slate-900"}`}>
              {row.name}
            </div>
            <div className={`text-[11px] font-mono ${"text-slate-500"}`}>
              ID: {row.student_id}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "university",
      header: "University / Institution",
      sortable: true,
      render: (row) => (
        <div className="flex items-center space-x-1.5">
          <GraduationCap size={14} className="text-slate-400 shrink-0" />
          <span className="text-xs font-medium text-slate-700 ">
            {row.university || "Not specified"}
          </span>
        </div>
      ),
    },
    {
      key: "assignmentsCount",
      header: "Total Assignments",
      sortable: true,
      render: (row) => (
        <span className="font-semibold text-xs">
          {row._count?.assignments || row.assignments?.length || 0} tasks
        </span>
      ),
    },
    {
      key: "is_active",
      header: "Status",
      sortable: true,
      render: (row) => (
        <Badge variant={row.is_active !== false ? "success" : "neutral"}>
          {row.is_active !== false ? "Active" : "Inactive"}
        </Badge>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      align: "right",
      render: (row) => (
        <div className="flex items-center justify-end space-x-1.5">
          {row.is_active !== false ? (
            <button
              onClick={() => handleOpenModal(row)}
              className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors"
              title="Edit Student"
            >
              <Pencil size={14} />
            </button>
          ) : (
            <button
              onClick={() => handleRestore(row)}
              className="p-1.5 rounded-lg border border-slate-200 text-emerald-600 hover:bg-emerald-50 transition-colors flex items-center space-x-1 text-xs"
              title="Restore Student Profile"
            >
              <RotateCcw size={14} />
              <span>Restore</span>
            </button>
          )}
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
        title="Student Clients Management"
        description="Register and manage student client profiles, universities, and assignment history"
        badge="Clients"
        actions={
          <button
            onClick={() => handleOpenModal()}
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-medium text-xs sm:text-sm flex items-center space-x-1.5 shadow-2xs transition-colors"
          >
            <UserPlus size={16} />
            <span>Add Student</span>
          </button>
        }
      />

      {/* Main Table */}
      <DataTable
        columns={columns}
        data={filteredStudents}
        loading={loading}
        pageSize={10}
        searchPlaceholder="Search student name, ID, or university..."
        filters={[
          {
            key: "statusFilter",
            label: "Filter Status",
            value: statusFilter,
            onChange: (val) => setStatusFilter(val),
            options: [
              { label: "All Students", value: "ALL" },
              { label: "Active", value: "ACTIVE" },
              { label: "Inactive", value: "INACTIVE" },
            ],
          },
        ]}
        emptyTitle="No student clients found"
        emptySubtitle="Click Add Student to register a new client profile."
      />

      {/* Add / Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedStudent ? "Edit Student Profile" : "Register New Student"}
        subtitle="Specify student name, official ID, and university information."
        icon={Users}
        size="md"
        footer={
          <>
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold flex items-center space-x-1.5 transition-colors shadow-2xs"
            >
              {saving && (
                <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-1" />
              )}
              <span>{selectedStudent ? "Save Changes" : "Register Student"}</span>
            </button>
          </>
        }
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className={labelClass}>Student Full Name *</label>
            <input
              type="text"
              placeholder="e.g. Rahat Chowdhury"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className={labelClass}>Student ID *</label>
            <input
              type="text"
              placeholder="e.g. 2021-1-60-045"
              value={formData.student_id}
              onChange={(e) => setFormData({ ...formData, student_id: e.target.value })}
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className={labelClass}>University / Institution</label>
            <input
              type="text"
              placeholder="e.g. North South University"
              value={formData.university}
              onChange={(e) => setFormData({ ...formData, university: e.target.value })}
              className={inputClass}
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}
