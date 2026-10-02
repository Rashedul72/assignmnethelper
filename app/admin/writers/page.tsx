"use client";

import { useEffect, useState, useCallback } from "react";
import {
  QuillWrite01Icon,
  UserAdd01Icon,
  PencilEdit02Icon,
  Delete02Icon,
  RefreshIcon,
  Call02Icon,
  Mail01Icon,
} from "hugeicons-react";
import { DataTable, Column } from "../../components/ui/Table";
import { Modal } from "../../components/ui/Modal";
import { Badge } from "../../components/ui/Badge";
import { useToast } from "../../components/ui/ToastContext";
import { useTheme } from "../../components/ui/ThemeContext";

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
      const token = localStorage.getItem("admin_token");
      const res = await fetch("http://localhost:5000/api/admin/writers", {
        headers: { Authorization: `Bearer ${token}` },
      });
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
    const token = localStorage.getItem("admin_token");
    const url = selectedWriter
      ? `http://localhost:5000/api/admin/writers/${selectedWriter.id}`
      : `http://localhost:5000/api/admin/writers`;
    const method = selectedWriter ? "PUT" : "POST";

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
    try {
      const token = localStorage.getItem("admin_token");
      const res = await fetch(`http://localhost:5000/api/admin/writers/${selectedWriter.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        showToast("Writer account deactivated", "warning");
        setIsDeleteModalOpen(false);
        fetchWriters();
      }
    } catch (err) {
      showToast("Failed to deactivate writer", "error");
    }
  };

  const handleRestore = async (writer: any) => {
    try {
      const token = localStorage.getItem("admin_token");
      const res = await fetch(`http://localhost:5000/api/admin/writers/${writer.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: writer.name,
          phone_number: writer.phone_number,
          is_active: true,
        }),
      });
      if (res.ok) {
        showToast("Writer account restored!", "success");
        fetchWriters();
      }
    } catch (err) {
      showToast("Failed to restore writer", "error");
    }
  };

  const filteredWriters =
    statusFilter === "ALL"
      ? writers
      : statusFilter === "ACTIVE"
      ? writers.filter((w) => w.is_active)
      : writers.filter((w) => !w.is_active);

  const columns: Column<any>[] = [
    {
      key: "name",
      header: "Writer Name",
      sortable: true,
      render: (row) => (
        <div className="flex items-center space-x-3">
          <div
            className={`w-9 h-9 rounded-2xl border flex items-center justify-center font-bold shrink-0 ${
              isDark
                ? "bg-pink-500/10 border-pink-500/20 text-pink-400"
                : "bg-pink-100 border-pink-200 text-pink-700"
            }`}
          >
            {row.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className={`font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>
              {row.name}
            </div>
            <div className={`text-xs ${isDark ? "text-gray-500" : "text-slate-400"}`}>
              Writer ID: {row.id.substring(0, 8)}...
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "phone_number",
      header: "Phone Number",
      sortable: true,
      render: (row) => (
        <div
          className={`flex items-center space-x-1.5 font-mono text-xs ${
            isDark ? "text-gray-300" : "text-slate-700"
          }`}
        >
          <Call02Icon size={14} className="text-purple-500" />
          <span>{row.phone_number}</span>
        </div>
      ),
    },
    {
      key: "email",
      header: "Login Email",
      sortable: true,
      render: (row) => (
        <div
          className={`flex items-center space-x-1.5 text-xs ${
            isDark ? "text-gray-300" : "text-slate-700"
          }`}
        >
          <Mail01Icon size={14} className="text-blue-500" />
          <span>{row.user?.email || "No Email"}</span>
        </div>
      ),
    },
    {
      key: "password_hash",
      header: "Password Hash",
      render: (row) => (
        <span
          className={`text-xs font-mono truncate max-w-[120px] block ${
            isDark ? "text-gray-500" : "text-slate-400"
          }`}
          title={row.user?.password_hash}
        >
          {row.user?.password_hash || "N/A"}
        </span>
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
                ? "bg-white/5 hover:bg-white/10 border-white/10 text-purple-400"
                : "bg-slate-100 hover:bg-slate-200 border-slate-200 text-purple-600"
            }`}
            title="Edit Writer"
          >
            <PencilEdit02Icon size={16} />
          </button>
          {row.is_active ? (
            <button
              onClick={() => confirmDelete(row)}
              className="p-2 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 rounded-xl text-rose-500 transition-colors"
              title="Deactivate Writer"
            >
              <Delete02Icon size={16} />
            </button>
          ) : (
            <button
              onClick={() => handleRestore(row)}
              className="p-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-xl text-emerald-500 transition-colors"
              title="Restore Writer"
            >
              <RefreshIcon size={16} />
            </button>
          )}
        </div>
      ),
    },
  ];

  const inputClass = isDark
    ? "w-full bg-black/40 border border-white/10 rounded-2xl py-2.5 px-4 text-white focus:outline-none focus:border-pink-500 transition-all text-sm"
    : "w-full bg-slate-50 border border-slate-200 rounded-2xl py-2.5 px-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-pink-600 transition-all text-sm";

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
            Writer Team
          </h1>
          <p className={`text-sm mt-1 ${isDark ? "text-gray-400" : "text-slate-600"}`}>
            Manage writer accounts, contact details & credentials
          </p>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-semibold py-2.5 px-5 rounded-2xl flex items-center space-x-2 shadow-[0_0_20px_rgba(236,72,153,0.25)] transition-all text-sm"
        >
          <UserAdd01Icon size={18} />
          <span>New Writer</span>
        </button>
      </div>

      {/* Main DataTable */}
      <DataTable
        columns={columns}
        data={filteredWriters}
        loading={loading}
        searchPlaceholder="Search writer name, phone, or email..."
        searchKeys={["name", "phone_number"]}
        filters={[
          {
            key: "status",
            label: "Filter Status",
            value: statusFilter,
            onChange: (val) => setStatusFilter(val),
            options: [
              { label: "All Writers", value: "ALL" },
              { label: "Active Only", value: "ACTIVE" },
              { label: "Inactive Only", value: "INACTIVE" },
            ],
          },
        ]}
        emptyTitle="No writers found"
        emptySubtitle="No writer profiles match your current search parameter."
      />

      {/* Add / Edit Writer Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedWriter ? "Edit Writer Profile" : "Add New Writer"}
        subtitle={selectedWriter ? selectedWriter.name : "Register a new writer in the system"}
        icon={QuillWrite01Icon}
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
              placeholder="e.g. Sarah Jenkins"
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
              Phone Number *
            </label>
            <input
              required
              type="text"
              placeholder="e.g. +8801700000000"
              value={formData.phone_number}
              onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
              className={`${inputClass} font-mono`}
            />
          </div>

          {!selectedWriter && (
            <div>
              <label
                className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                  isDark ? "text-gray-400" : "text-slate-600"
                }`}
              >
                Login Email *
              </label>
              <input
                required
                type="email"
                placeholder="writer@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={inputClass}
              />
            </div>
          )}

          <div>
            <label
              className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                isDark ? "text-gray-400" : "text-slate-600"
              }`}
            >
              {selectedWriter ? "Reset Password (Optional)" : "Login Password *"}
            </label>
            <input
              required={!selectedWriter}
              type="password"
              placeholder={selectedWriter ? "Leave blank to keep current password" : "••••••••"}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
              className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-semibold text-sm shadow-[0_0_20px_rgba(236,72,153,0.25)] disabled:opacity-50 transition-all"
            >
              {saving ? "Saving..." : selectedWriter ? "Update Writer" : "Register Writer"}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Deactivate Writer Account"
        subtitle="Confirmation required"
        icon={Delete02Icon}
        size="sm"
      >
        <div className="space-y-4">
          <p className={`text-sm leading-relaxed ${isDark ? "text-gray-300" : "text-slate-600"}`}>
            Are you sure you want to deactivate{" "}
            <span className={`font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>
              {selectedWriter?.name}
            </span>
            ? This will prevent them from logging in and accessing writer assignments.
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
              Deactivate Writer
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
