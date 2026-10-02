"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Money01Icon,
  Add01Icon,
  PencilEdit02Icon,
  Delete02Icon,
  File01Icon,
  Tag01Icon,
  AlertCircleIcon,
  CheckmarkCircle01Icon,
} from "hugeicons-react";
import { DataTable, Column } from "../../components/ui/Table";
import { Modal } from "../../components/ui/Modal";
import { Badge } from "../../components/ui/Badge";
import { StatCard } from "../../components/ui/StatCard";
import { useToast } from "../../components/ui/ToastContext";
import { useTheme } from "../../components/ui/ThemeContext";

export default function CostsPage() {
  const { showToast } = useToast();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [costs, setCosts] = useState<any[]>([]);
  const [assignments, setAssignments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal States
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCost, setSelectedCost] = useState<any>(null);

  // Form States
  const [formData, setFormData] = useState({
    assignment_id: "",
    name: "",
    description: "",
    price: "",
  });

  const [editFormData, setEditFormData] = useState({
    id: "",
    assignment_id: "",
    name: "",
    description: "",
    price: "",
    status: "ACTIVE",
  });

  const [saving, setSaving] = useState(false);
  const [statusFilter, setStatusFilter] = useState("ALL");

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("admin_token");
      const [costsRes, assignmentsRes] = await Promise.all([
        fetch("http://localhost:5000/api/admin/costs", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("http://localhost:5000/api/admin/assignments", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (costsRes.ok) {
        const data = await costsRes.json();
        setCosts(data);
      }
      if (assignmentsRes.ok) {
        const assignmentsData = await assignmentsRes.json();
        setAssignments(assignmentsData);
      }
    } catch (err) {
      console.error(err);
      showToast("Failed to fetch cost records", "error");
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleOpenCreateModal = () => {
    setFormData({
      assignment_id: assignments.length > 0 ? assignments[0].id : "",
      name: "",
      description: "",
      price: "",
    });
    setIsCreateModalOpen(true);
  };

  const handleOpenEditModal = (cost: any) => {
    setSelectedCost(cost);
    setEditFormData({
      id: cost.id,
      assignment_id: cost.assignment_id || "",
      name: cost.name || "",
      description: cost.description || "",
      price: cost.price ? String(cost.price) : "",
      status: cost.status || "ACTIVE",
    });
    setIsEditModalOpen(true);
  };

  const handleOpenDeleteModal = (cost: any) => {
    setSelectedCost(cost);
    setIsDeleteModalOpen(true);
  };

  const handleCreateCost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.assignment_id) {
      showToast("Please select an assignment", "warning");
      return;
    }
    if (!formData.name.trim()) {
      showToast("Please enter a cost name", "warning");
      return;
    }
    if (!formData.price || isNaN(Number(formData.price))) {
      showToast("Please enter a valid amount", "warning");
      return;
    }

    setSaving(true);
    try {
      const token = localStorage.getItem("admin_token");
      const res = await fetch("http://localhost:5000/api/admin/costs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        showToast("Cost record added successfully!", "success", "Created");
        setIsCreateModalOpen(false);
        fetchData();
      } else {
        const errData = await res.json();
        showToast(errData.error || "Failed to create cost record", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Server connection error", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateCost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editFormData.name.trim()) {
      showToast("Please enter a cost name", "warning");
      return;
    }
    if (!editFormData.price || isNaN(Number(editFormData.price))) {
      showToast("Please enter a valid amount", "warning");
      return;
    }

    setSaving(true);
    try {
      const token = localStorage.getItem("admin_token");
      const res = await fetch(`http://localhost:5000/api/admin/costs/${editFormData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editFormData),
      });

      if (res.ok) {
        showToast("Cost record updated successfully!", "success", "Updated");
        setIsEditModalOpen(false);
        fetchData();
      } else {
        const errData = await res.json();
        showToast(errData.error || "Failed to update cost record", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Server connection error", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCost = async () => {
    if (!selectedCost) return;
    setSaving(true);
    try {
      const token = localStorage.getItem("admin_token");
      const res = await fetch(`http://localhost:5000/api/admin/costs/${selectedCost.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        showToast("Cost record deleted successfully", "info");
        setIsDeleteModalOpen(false);
        fetchData();
      } else {
        showToast("Failed to delete cost record", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Server connection error", "error");
    } finally {
      setSaving(false);
    }
  };

  // Metrics
  const activeCosts = costs.filter((c) => c.status === "ACTIVE");
  const totalCostAmount = activeCosts.reduce((acc, c) => acc + Number(c.price || 0), 0);
  const avgCost = activeCosts.length > 0 ? totalCostAmount / activeCosts.length : 0;

  const filteredCosts = costs.filter((c) => {
    if (statusFilter === "ALL") return true;
    return c.status === statusFilter;
  });

  const columns: Column<any>[] = [
    {
      key: "assignment",
      header: "Assigned Assignment",
      render: (row: any) => (
        <div className="flex items-center space-x-3">
          <div
            className={`p-2 rounded-xl border ${
              isDark
                ? "bg-purple-500/10 border-white/10 text-purple-400"
                : "bg-purple-50 border-purple-200 text-purple-600"
            }`}
          >
            <File01Icon size={18} />
          </div>
          <div>
            <div className={`font-semibold text-sm ${isDark ? "text-white" : "text-slate-900"}`}>
              {row.assignment?.reference || "N/A"}
            </div>
            <div className={`text-xs ${isDark ? "text-gray-400" : "text-slate-500"}`}>
              {row.assignment?.course_code} • {row.assignment?.assignment_no || "Assignment"}
            </div>
          </div>
        </div>
      ),
      sortable: true,
    },
    {
      key: "name",
      header: "Cost Name",
      render: (row: any) => (
        <div className="flex items-center space-x-2">
          <Tag01Icon size={14} className={isDark ? "text-purple-400" : "text-purple-600"} />
          <span className={`font-medium text-sm ${isDark ? "text-gray-200" : "text-slate-800"}`}>
            {row.name}
          </span>
        </div>
      ),
      sortable: true,
    },
    {
      key: "description",
      header: "Description (Optional)",
      render: (row: any) => (
        <span className={`text-xs ${isDark ? "text-gray-400" : "text-slate-500"}`}>
          {row.description || "—"}
        </span>
      ),
    },
    {
      key: "price",
      header: "Amount",
      render: (row: any) => (
        <span className="font-bold text-sm text-emerald-500">
          ৳ {Number(row.price || 0).toLocaleString()} BDT
        </span>
      ),
      sortable: true,
    },
    {
      key: "incurred_at",
      header: "Incurred Date",
      render: (row: any) => (
        <span className={`text-xs ${isDark ? "text-gray-400" : "text-slate-500"}`}>
          {new Date(row.incurred_at || row.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      ),
      sortable: true,
    },
    {
      key: "status",
      header: "Status",
      render: (row: any) => (
        <Badge
          variant={row.status === "ACTIVE" ? "success" : "neutral"}
          dot
        >
          {row.status}
        </Badge>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (row: any) => (
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleOpenEditModal(row)}
            className={`p-2 rounded-xl border transition-all ${
              isDark
                ? "bg-white/5 hover:bg-white/10 border-white/10 text-purple-400"
                : "bg-slate-100 hover:bg-slate-200 border-slate-200 text-purple-600"
            }`}
            title="Edit Cost"
          >
            <PencilEdit02Icon size={16} />
          </button>
          <button
            onClick={() => handleOpenDeleteModal(row)}
            className={`p-2 rounded-xl border transition-all ${
              isDark
                ? "bg-red-500/10 hover:bg-red-500/20 border-red-500/20 text-red-400"
                : "bg-red-50 hover:bg-red-100 border-red-200 text-red-600"
            }`}
            title="Delete Cost"
          >
            <Delete02Icon size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className={`text-2xl font-bold tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>
            Cost Management Panel
          </h1>
          <p className={`text-xs mt-1 ${isDark ? "text-gray-400" : "text-slate-500"}`}>
            Track and record operational costs, writer expenses, and tools per assignment
          </p>
        </div>

        <button
          onClick={handleOpenCreateModal}
          className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium text-sm shadow-lg shadow-purple-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
        >
          <Add01Icon size={18} />
          <span>Record New Cost</span>
        </button>
      </div>

      {/* Overview StatCards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <StatCard
          title="Total Cost Incurred"
          value={`৳ ${totalCostAmount.toLocaleString()} BDT`}
          trend="+ Active Costs"
          trendUp={true}
          icon={Money01Icon}
          colorScheme="purple"
        />
        <StatCard
          title="Active Cost Entries"
          value={activeCosts.length}
          icon={Tag01Icon}
          colorScheme="blue"
        />
        <StatCard
          title="Average Cost per Record"
          value={`৳ ${Math.round(avgCost).toLocaleString()} BDT`}
          icon={CheckmarkCircle01Icon}
          colorScheme="emerald"
        />
      </div>

      {/* Main Costs Table Panel */}
      <div
        className={`p-6 rounded-3xl border transition-all ${
          isDark ? "bg-white/[0.02] border-white/10" : "bg-white border-slate-200 shadow-xl"
        }`}
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center space-x-3">
            <div
              className={`p-2.5 rounded-xl border ${
                isDark ? "bg-purple-500/10 border-white/10 text-purple-400" : "bg-purple-50 border-purple-200 text-purple-600"
              }`}
            >
              <Money01Icon size={20} />
            </div>
            <div>
              <h2 className={`font-semibold text-lg ${isDark ? "text-white" : "text-slate-900"}`}>
                Cost & Expense Records
              </h2>
              <p className={`text-xs ${isDark ? "text-gray-400" : "text-slate-500"}`}>
                Manage and view cost breakdowns across assigned assignments
              </p>
            </div>
          </div>

          {/* Status Filter */}
          <div className="flex items-center space-x-2">
            {["ALL", "ACTIVE", "VOID"].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  statusFilter === status
                    ? "bg-purple-600 text-white shadow-md shadow-purple-500/20"
                    : isDark
                    ? "bg-white/5 text-gray-400 hover:text-white border border-white/5"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <DataTable
          data={filteredCosts}
          columns={columns}
          loading={loading}
          searchPlaceholder="Search by assignment ref, cost name, description..."
        />
      </div>

      {/* Record New Cost Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Record New Assignment Cost"
        subtitle="Specify assigned assignment, cost name, optional description, and amount"
        icon={Money01Icon}
        size="md"
        footer={
          <>
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(false)}
              className={`px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${
                isDark
                  ? "border-white/10 text-gray-400 hover:bg-white/5"
                  : "border-slate-200 text-slate-600 hover:bg-slate-100"
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              form="create-cost-form"
              disabled={saving}
              className="px-5 py-2 rounded-xl text-sm font-medium bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-500/20 transition-all flex items-center space-x-2 disabled:opacity-50"
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Add01Icon size={16} />
                  <span>Save Cost Record</span>
                </>
              )}
            </button>
          </>
        }
      >
        <form id="create-cost-form" onSubmit={handleCreateCost} className="space-y-4">
          {/* Assigned Assignment Dropdown */}
          <div>
            <label className={`block text-xs font-semibold mb-1.5 ${isDark ? "text-gray-300" : "text-slate-700"}`}>
              Assigned Assignment *
            </label>
            <select
              value={formData.assignment_id}
              onChange={(e) => setFormData({ ...formData, assignment_id: e.target.value })}
              required
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none transition-all ${
                isDark
                  ? "bg-white/5 border-white/10 text-white focus:border-purple-500"
                  : "bg-slate-50 border-slate-200 text-slate-900 focus:border-purple-600"
              }`}
            >
              {assignments.length === 0 ? (
                <option value="" disabled className={isDark ? "bg-[#0b0628]" : ""}>
                  No assignments available
                </option>
              ) : (
                assignments.map((assignment) => (
                  <option
                    key={assignment.id}
                    value={assignment.id}
                    className={isDark ? "bg-[#0b0628] text-white" : "bg-white text-slate-900"}
                  >
                    {assignment.reference} — {assignment.course_code} ({assignment.assignment_no || "Assignment"})
                  </option>
                ))
              )}
            </select>
          </div>

          {/* Name */}
          <div>
            <label className={`block text-xs font-semibold mb-1.5 ${isDark ? "text-gray-300" : "text-slate-700"}`}>
              Cost Name *
            </label>
            <input
              type="text"
              placeholder="e.g. Writer Base Fee, Plagiarism Checker Fee, Research Tool"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none transition-all ${
                isDark
                  ? "bg-white/5 border-white/10 text-white placeholder-gray-500 focus:border-purple-500"
                  : "bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-purple-600"
              }`}
            />
          </div>

          {/* Description (Optional) */}
          <div>
            <label className={`block text-xs font-semibold mb-1.5 ${isDark ? "text-gray-300" : "text-slate-700"}`}>
              Description (Optional)
            </label>
            <textarea
              rows={3}
              placeholder="Additional details regarding this cost..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none transition-all ${
                isDark
                  ? "bg-white/5 border-white/10 text-white placeholder-gray-500 focus:border-purple-500"
                  : "bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-purple-600"
              }`}
            />
          </div>

          {/* Amount */}
          <div>
            <label className={`block text-xs font-semibold mb-1.5 ${isDark ? "text-gray-300" : "text-slate-700"}`}>
              Amount (BDT ৳) *
            </label>
            <input
              type="number"
              step="0.01"
              placeholder="e.g. 1500"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              required
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none transition-all ${
                isDark
                  ? "bg-white/5 border-white/10 text-white placeholder-gray-500 focus:border-purple-500"
                  : "bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-purple-600"
              }`}
            />
          </div>
        </form>
      </Modal>

      {/* Edit Cost Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Cost Record"
        subtitle="Modify assignment cost details and status"
        icon={PencilEdit02Icon}
        size="md"
        footer={
          <>
            <button
              type="button"
              onClick={() => setIsEditModalOpen(false)}
              className={`px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${
                isDark
                  ? "border-white/10 text-gray-400 hover:bg-white/5"
                  : "border-slate-200 text-slate-600 hover:bg-slate-100"
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              form="edit-cost-form"
              disabled={saving}
              className="px-5 py-2 rounded-xl text-sm font-medium bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-500/20 transition-all flex items-center space-x-2 disabled:opacity-50"
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Updating...</span>
                </>
              ) : (
                <>
                  <PencilEdit02Icon size={16} />
                  <span>Update Cost</span>
                </>
              )}
            </button>
          </>
        }
      >
        <form id="edit-cost-form" onSubmit={handleUpdateCost} className="space-y-4">
          {/* Assigned Assignment Dropdown */}
          <div>
            <label className={`block text-xs font-semibold mb-1.5 ${isDark ? "text-gray-300" : "text-slate-700"}`}>
              Assigned Assignment *
            </label>
            <select
              value={editFormData.assignment_id}
              onChange={(e) => setEditFormData({ ...editFormData, assignment_id: e.target.value })}
              required
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none transition-all ${
                isDark
                  ? "bg-white/5 border-white/10 text-white focus:border-purple-500"
                  : "bg-slate-50 border-slate-200 text-slate-900 focus:border-purple-600"
              }`}
            >
              {assignments.map((assignment) => (
                <option
                  key={assignment.id}
                  value={assignment.id}
                  className={isDark ? "bg-[#0b0628] text-white" : "bg-white text-slate-900"}
                >
                  {assignment.reference} — {assignment.course_code} ({assignment.assignment_no || "Assignment"})
                </option>
              ))}
            </select>
          </div>

          {/* Name */}
          <div>
            <label className={`block text-xs font-semibold mb-1.5 ${isDark ? "text-gray-300" : "text-slate-700"}`}>
              Cost Name *
            </label>
            <input
              type="text"
              value={editFormData.name}
              onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
              required
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none transition-all ${
                isDark
                  ? "bg-white/5 border-white/10 text-white focus:border-purple-500"
                  : "bg-slate-50 border-slate-200 text-slate-900 focus:border-purple-600"
              }`}
            />
          </div>

          {/* Description (Optional) */}
          <div>
            <label className={`block text-xs font-semibold mb-1.5 ${isDark ? "text-gray-300" : "text-slate-700"}`}>
              Description (Optional)
            </label>
            <textarea
              rows={3}
              value={editFormData.description}
              onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none transition-all ${
                isDark
                  ? "bg-white/5 border-white/10 text-white focus:border-purple-500"
                  : "bg-slate-50 border-slate-200 text-slate-900 focus:border-purple-600"
              }`}
            />
          </div>

          {/* Amount */}
          <div>
            <label className={`block text-xs font-semibold mb-1.5 ${isDark ? "text-gray-300" : "text-slate-700"}`}>
              Amount (BDT ৳) *
            </label>
            <input
              type="number"
              step="0.01"
              value={editFormData.price}
              onChange={(e) => setEditFormData({ ...editFormData, price: e.target.value })}
              required
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none transition-all ${
                isDark
                  ? "bg-white/5 border-white/10 text-white focus:border-purple-500"
                  : "bg-slate-50 border-slate-200 text-slate-900 focus:border-purple-600"
              }`}
            />
          </div>

          {/* Status */}
          <div>
            <label className={`block text-xs font-semibold mb-1.5 ${isDark ? "text-gray-300" : "text-slate-700"}`}>
              Status
            </label>
            <select
              value={editFormData.status}
              onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value })}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none transition-all ${
                isDark
                  ? "bg-white/5 border-white/10 text-white focus:border-purple-500"
                  : "bg-slate-50 border-slate-200 text-slate-900 focus:border-purple-600"
              }`}
            >
              <option value="ACTIVE" className={isDark ? "bg-[#0b0628]" : ""}>
                ACTIVE
              </option>
              <option value="VOID" className={isDark ? "bg-[#0b0628]" : ""}>
                VOID
              </option>
            </select>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirm Delete Cost Record"
        subtitle="Are you sure you want to delete this cost entry? This action cannot be undone."
        icon={AlertCircleIcon}
        size="sm"
        footer={
          <>
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className={`px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${
                isDark
                  ? "border-white/10 text-gray-400 hover:bg-white/5"
                  : "border-slate-200 text-slate-600 hover:bg-slate-100"
              }`}
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteCost}
              disabled={saving}
              className="px-5 py-2 rounded-xl text-sm font-medium bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-500/20 transition-all flex items-center space-x-2 disabled:opacity-50"
            >
              {saving ? (
                <span>Deleting...</span>
              ) : (
                <>
                  <Delete02Icon size={16} />
                  <span>Delete Record</span>
                </>
              )}
            </button>
          </>
        }
      >
        <div className={`text-sm p-4 rounded-2xl border ${isDark ? "bg-white/5 border-white/10" : "bg-slate-50 border-slate-200"}`}>
          <div className="font-semibold">{selectedCost?.name}</div>
          <div className="text-xs mt-1 text-emerald-500 font-bold">
            ৳ {Number(selectedCost?.price || 0).toLocaleString()} BDT
          </div>
          <div className={`text-xs mt-1 ${isDark ? "text-gray-400" : "text-slate-500"}`}>
            Assignment: {selectedCost?.assignment?.reference || "N/A"}
          </div>
        </div>
      </Modal>
    </div>
  );
}
