"use client";

import { useEffect, useState, useCallback } from "react";
import {
  PenTool,
  UserPlus,
  Pencil,
  Trash2,
  RotateCcw,
  Phone,
  Mail,
} from "lucide-react";
import { DataTable, Column } from "../../components/ui/Table";
import { Modal } from "../../components/ui/Modal";
import { ConfirmDialog } from "../../components/ui/ConfirmDialog";
import { Badge } from "../../components/ui/Badge";
import { PageHeader } from "../../components/ui/PageHeader";
import { useToast } from "../../components/ui/ToastContext";
import { useTheme } from "../../components/ui/ThemeContext";
import { fetchWithAuth } from "../../lib/api";

export default function WritersPage() {
  const { showToast } = useToast();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [writers, setWriters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedWriter, setSelectedWriter] = useState<any>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    phone_number: "",
    email: "",
    password: "",
  });
  const [saving, setSaving] = useState(false);
  const [statusFilter, setStatusFilter] = useState("ALL");

  const fetchWriters = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetchWithAuth("/admin/writers");
      if (res.ok) {
        const data = await res.json();
        setWriters(data);
      }
    } catch (err) {
      console.error("Failed to fetch writers", err);
      showToast("Failed to fetch writer profiles", "error");
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchWriters();
  }, [fetchWriters]);

  const handleOpenModal = (writer: any = null) => {
    if (writer) {
      setSelectedWriter(writer);
      setFormData({
        name: writer.name,
        phone_number: writer.phone_number,
        email: writer.user?.email || "",
        password: "",
      });
    } else {
      setSelectedWriter(null);
      setFormData({ name: "", phone_number: "", email: "", password: "" });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const url = selectedWriter
      ? `/admin/writers/${selectedWriter.id}`
      : `/admin/writers`;
    const method = selectedWriter ? "PUT" : "POST";

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
          selectedWriter ? "Writer profile updated!" : "New writer registered successfully!",
          "success"
        );
        setIsModalOpen(false);
        fetchWriters();
      } else {
        const data = await res.json();
        showToast(data.error || "Failed to save writer", "error");
      }
    } catch (err) {
      showToast("Network error saving writer", "error");
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = (writer: any) => {
    setSelectedWriter(writer);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedWriter) return;
    setSaving(true);
    try {
      const res = await fetchWithAuth(`/admin/writers/${selectedWriter.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        showToast("Writer account deactivated", "warning");
        setIsDeleteModalOpen(false);
        fetchWriters();
      }
    } catch (err) {
      showToast("Failed to deactivate writer", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleRestore = async (writer: any) => {
    try {
      const res = await fetchWithAuth(`/admin/writers/${writer.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...writer, is_active: true }),
      });
      if (res.ok) {
        showToast("Writer restored successfully!", "success");
        fetchWriters();
      }
    } catch (err) {
      showToast("Failed to restore writer", "error");
    }
  };

  const filteredWriters = writers.filter((w) => {
    if (statusFilter === "ACTIVE") return w.is_active !== false;
    if (statusFilter === "INACTIVE") return w.is_active === false;
    return true;
  });

  const columns: Column<any>[] = [
    {
      key: "name",
      header: "Writer Name",
      sortable: true,
      render: (row) => (
        <div className="flex items-center space-x-2.5">
          <div
            className={`w-8 h-8 rounded-full border flex items-center justify-center font-bold text-xs shrink-0 ${
              isDark
                ? "bg-pink-950/60 border-pink-800/60 text-pink-300"
                : "bg-pink-100 border-pink-200 text-pink-700"
            }`}
          >
            {row.name ? row.name[0].toUpperCase() : "W"}
          </div>
          <div>
            <div className={`font-semibold text-xs ${isDark ? "text-slate-100" : "text-slate-900"}`}>
              {row.name}
            </div>
            <div className={`text-[11px] font-mono ${isDark ? "text-slate-400" : "text-slate-500"}`}>
              {row.user?.email || "No Login Email"}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "phone_number",
      header: "Phone Contact",
      sortable: true,
      render: (row) => (
        <div className="flex items-center space-x-1.5 font-mono text-xs">
          <Phone size={13} className="text-slate-400 shrink-0" />
          <span>{row.phone_number}</span>
        </div>
      ),
    },
    {
      key: "assignmentsCount",
      header: "Allocated Tasks",
      sortable: true,
      render: (row) => (
        <span className="font-semibold text-xs">
          {row._count?.assignments || row.assignments?.length || 0} active
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
            <>
              <button
                onClick={() => handleOpenModal(row)}
                className="p-1.5 rounded-lg border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                title="Edit Writer"
              >
                <Pencil size={14} />
              </button>
              <button
                onClick={() => confirmDelete(row)}
                className="p-1.5 rounded-lg border border-slate-200 dark:border-white/10 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                title="Deactivate Writer"
              >
                <Trash2 size={14} />
              </button>
            </>
          ) : (
            <button
              onClick={() => handleRestore(row)}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-white/10 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors flex items-center space-x-1 text-xs"
              title="Restore Writer"
            >
              <RotateCcw size={14} />
              <span>Restore</span>
            </button>
          )}
        </div>
      ),
    },
  ];

  const inputClass = isDark
    ? "w-full bg-white/[0.04] border border-white/10 rounded-xl py-2 px-3.5 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-purple-500 transition-all text-xs sm:text-sm"
    : "w-full bg-white border border-slate-200/80 rounded-xl py-2 px-3.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-purple-500 transition-all text-xs sm:text-sm shadow-2xs";

  const labelClass = `block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
    isDark ? "text-slate-400" : "text-slate-600"
  }`;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Writer Team Management"
        description="Register writers, allocate assignment workloads, and manage team profiles"
        badge="Team"
        actions={
          <button
            onClick={() => handleOpenModal()}
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-medium text-xs sm:text-sm flex items-center space-x-1.5 shadow-2xs transition-colors"
          >
            <UserPlus size={16} />
            <span>Register Writer</span>
          </button>
        }
      />

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={filteredWriters}
        loading={loading}
        pageSize={10}
        searchPlaceholder="Search writer name, phone, or email..."
        filters={[
          {
            key: "statusFilter",
            label: "Filter Status",
            value: statusFilter,
            onChange: (val) => setStatusFilter(val),
            options: [
              { label: "All Writers", value: "ALL" },
              { label: "Active", value: "ACTIVE" },
              { label: "Inactive", value: "INACTIVE" },
            ],
          },
        ]}
        emptyTitle="No writers registered"
        emptySubtitle="Click Register Writer to add a writer team member."
      />

      {/* Add / Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedWriter ? "Edit Writer Profile" : "Register Writer Account"}
        subtitle="Set writer details and account login credentials."
        icon={PenTool}
        size="md"
        footer={
          <>
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 text-xs font-semibold transition-colors"
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
              <span>{selectedWriter ? "Save Changes" : "Register Writer"}</span>
            </button>
          </>
        }
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className={labelClass}>Writer Full Name *</label>
            <input
              type="text"
              placeholder="e.g. Tanvir Hossain"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className={labelClass}>Phone Number *</label>
            <input
              type="text"
              placeholder="e.g. 01712345678"
              value={formData.phone_number}
              onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
              className={inputClass}
              required
            />
          </div>

          {!selectedWriter && (
            <>
              <div>
                <label className={labelClass}>Writer Login Email *</label>
                <input
                  type="email"
                  placeholder="e.g. writer@assignmenthelper.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className={labelClass}>Password *</label>
                <input
                  type="password"
                  placeholder="Set initial password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className={inputClass}
                  required
                />
              </div>
            </>
          )}
        </form>
      </Modal>

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        isLoading={saving}
        title="Deactivate Writer Profile?"
        message={`Are you sure you want to deactivate ${selectedWriter?.name}? This writer will no longer receive new task assignments.`}
        confirmText="Deactivate Writer"
        variant="warning"
      />
    </div>
  );
}
