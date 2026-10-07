"use client";

import { useEffect, useState, useCallback } from "react";
import {
  CreditCard,
  Plus,
  Pencil,
  Trash2,
  FileText,
  Tag,
  DollarSign,
  TrendingUp,
  Search,
  ChevronDown,
  X,
  CheckCircle2,
} from "lucide-react";
import { DataTable, Column } from "../../components/ui/Table";
import { Modal } from "../../components/ui/Modal";
import { ConfirmDialog } from "../../components/ui/ConfirmDialog";
import { Badge } from "../../components/ui/Badge";
import { StatCard } from "../../components/ui/StatCard";
import { PageHeader } from "../../components/ui/PageHeader";
import { useToast } from "../../components/ui/ToastContext";
import { fetchWithAuth } from "../../lib/api";

export default function CostsPage() {
  const { showToast } = useToast();

  const [costs, setCosts] = useState<any[]>([]);
  const [assignments, setAssignments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal States
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCost, setSelectedCost] = useState<any>(null);

  // Searchable assignment combobox states
  const [createAssignmentSearch, setCreateAssignmentSearch] = useState("");
  const [createAssignmentDropdownOpen, setCreateAssignmentDropdownOpen] = useState(false);
  const [editAssignmentSearch, setEditAssignmentSearch] = useState("");
  const [editAssignmentDropdownOpen, setEditAssignmentDropdownOpen] = useState(false);

  // Form States
  const [formData, setFormData] = useState({
    assignment_id: "",
    name: "",
    description: "",
    price: "",
    status: "PENDING",
  });

  const [editFormData, setEditFormData] = useState({
    id: "",
    assignment_id: "",
    name: "",
    description: "",
    price: "",
    status: "PENDING",
  });

  const [saving, setSaving] = useState(false);
  const [statusFilter, setStatusFilter] = useState("ALL");

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [costsRes, assignmentsRes] = await Promise.all([
        fetchWithAuth("/admin/costs"),
        fetchWithAuth("/admin/assignments"),
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
      status: "PENDING",
    });
    setCreateAssignmentSearch("");
    setCreateAssignmentDropdownOpen(false);
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
      status: cost.status || "PENDING",
    });
    setEditAssignmentSearch("");
    setEditAssignmentDropdownOpen(false);
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
      const res = await fetchWithAuth("/admin/costs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
      const res = await fetchWithAuth(`/admin/costs/${editFormData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
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
      const res = await fetchWithAuth(`/admin/costs/${selectedCost.id}`, {
        method: "DELETE",
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
  const totalCostAmount = costs.reduce((acc, c) => acc + Number(c.price || 0), 0);
  const paidCount = costs.filter((c) => c.status === "PAID").length;
  const pendingCount = costs.filter((c) => c.status === "PENDING").length;
  const avgCost = costs.length > 0 ? totalCostAmount / costs.length : 0;

  const filteredCosts = costs.filter((c) => {
    if (statusFilter === "ALL") return true;
    return c.status === statusFilter;
  });

  const columns: Column<any>[] = [
    {
      key: "assignment",
      header: "Assigned Assignment",
      render: (row: any) => (
        <div className="flex items-center space-x-2.5">
          <div
            className={`p-1.5 rounded-lg border shrink-0 ${
              "bg-purple-50 border-purple-200 text-purple-600"
            }`}
          >
            <FileText size={14} />
          </div>
          <div>
            <div className={`font-semibold text-xs ${"text-slate-900"}`}>
              {row.assignment?.title || row.assignment?.course_code || "Assignment Record"}
            </div>
            <div className={`text-[11px] font-mono ${"text-slate-500"}`}>
              Ref: {row.assignment?.reference || "N/A"}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "name",
      header: "Cost Item Name",
      sortable: true,
      render: (row: any) => (
        <div className="flex items-center space-x-1.5">
          <Tag size={13} className="text-slate-400 shrink-0" />
          <span className="font-semibold text-xs">{row.name}</span>
        </div>
      ),
    },
    {
      key: "price",
      header: "Amount (BDT)",
      sortable: true,
      render: (row: any) => (
        <span className="font-semibold text-xs text-emerald-600 font-mono">
          BDT {Number(row.price || 0).toLocaleString()}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      render: (row: any) => {
        const isPaid = row.status === "PAID";
        const isPending = row.status === "PENDING";
        return (
          <Badge variant={isPaid ? "success" : isPending ? "warning" : "neutral"}>
            {row.status || "PENDING"}
          </Badge>
        );
      },
    },
    {
      key: "createdAt",
      header: "Recorded Date",
      sortable: true,
      render: (row: any) => (
        <span className="text-xs text-slate-400">
          {new Date(row.createdAt).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      align: "right",
      render: (row: any) => (
        <div className="flex items-center justify-end space-x-1.5">
          <button
            onClick={() => handleOpenEditModal(row)}
            className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors"
            title="Edit Cost"
          >
            <Pencil size={14} />
          </button>
          <button
            onClick={() => handleOpenDeleteModal(row)}
            className="p-1.5 rounded-lg border border-slate-200 text-rose-600 hover:bg-rose-50 transition-colors"
            title="Delete Record"
          >
            <Trash2 size={14} />
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
        title="Cost & Revenue Management"
        description="Track expenses, assignment costs, and calculate net profitability"
        badge="Financials"
        actions={
          <button
            onClick={handleOpenCreateModal}
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-medium text-xs sm:text-sm flex items-center space-x-1.5 shadow-2xs transition-colors"
          >
            <Plus size={16} />
            <span>Add Cost Item</span>
          </button>
        }
      />

      {/* Summary Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Total Costs"
          value={`BDT ${totalCostAmount.toLocaleString()}`}
          icon={CreditCard}
          colorScheme="emerald"
        />
        <StatCard
          title="Payment Breakdown"
          value={`${paidCount} Paid / ${pendingCount} Pending`}
          icon={Tag}
          colorScheme="purple"
        />
        <StatCard
          title="Average Cost / Task"
          value={`BDT ${Math.round(avgCost).toLocaleString()}`}
          icon={TrendingUp}
          colorScheme="blue"
        />
      </div>

      {/* Data Table Component */}
      <DataTable
        columns={columns}
        data={filteredCosts}
        loading={loading}
        pageSize={8}
        searchPlaceholder="Search cost name or assignment reference..."
        filters={[
          {
            key: "statusFilter",
            label: "Filter Status",
            value: statusFilter,
            onChange: (val) => setStatusFilter(val),
            options: [
              { label: "All Records", value: "ALL" },
              { label: "Pending", value: "PENDING" },
              { label: "Paid", value: "PAID" },
            ],
          },
        ]}
        emptyTitle="No cost items recorded"
        emptySubtitle="Click Add Cost Item to log assignment expenses or payouts."
      />

      {/* Create Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Add New Cost Record"
        subtitle="Associate an expense or payout item with an assignment."
        icon={CreditCard}
        size="md"
        footer={
          <>
            <button
              onClick={() => setIsCreateModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateCost}
              disabled={saving}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold flex items-center space-x-1.5 transition-colors shadow-2xs"
            >
              {saving && (
                <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-1" />
              )}
              <span>Save Record</span>
            </button>
          </>
        }
      >
        <form onSubmit={handleCreateCost} className="space-y-4">
          <div>
            <label className={labelClass}>Select Assignment *</label>
            <div className="relative">
              {/* Trigger Button */}
              <div
                onClick={() => setCreateAssignmentDropdownOpen(!createAssignmentDropdownOpen)}
                className={`w-full p-2.5 rounded-xl border text-xs cursor-pointer flex items-center justify-between transition-all ${
                  "bg-slate-50 border-slate-200 text-slate-900 hover:border-purple-400"
                }`}
              >
                {(() => {
                  const selected = assignments.find((a) => a.id === formData.assignment_id);
                  if (selected) {
                    return (
                      <div className="flex items-center space-x-2 truncate min-w-0">
                        <span className="font-mono text-[11px] px-2 py-0.5 rounded-md bg-purple-100 text-purple-700 font-semibold shrink-0">
                          {selected.reference}
                        </span>
                        <span className="font-bold text-slate-900 truncate">
                          {selected.course_code || selected.title || "Assignment"}
                        </span>
                        {selected.client?.name && (
                          <span className="text-[11px] text-slate-500 truncate shrink">
                            • {selected.client.name} ({selected.client.student_id})
                          </span>
                        )}
                      </div>
                    );
                  }
                  return (
                    <span className="text-slate-400 font-normal">
                      Click or search assignment by ref, course, or client...
                    </span>
                  );
                })()}
                <ChevronDown
                  size={16}
                  className={`text-slate-400 shrink-0 ml-2 transition-transform duration-200 ${
                    createAssignmentDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </div>

              {/* Dropdown Overlay */}
              {createAssignmentDropdownOpen && (
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
                      placeholder="Search by reference, course code, title, or client..."
                      value={createAssignmentSearch}
                      onChange={(e) => setCreateAssignmentSearch(e.target.value)}
                      className={`w-full pl-8 pr-8 py-2 rounded-lg border text-xs outline-none transition-colors ${
                        "bg-slate-50 border-slate-200 text-slate-900 focus:border-purple-500"
                      }`}
                    />
                    {createAssignmentSearch && (
                      <button
                        type="button"
                        onClick={() => setCreateAssignmentSearch("")}
                        className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 "
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>

                  {/* Scrollable Filtered Assignments List */}
                  <div className="max-h-52 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                    {(() => {
                      const filtered = assignments.filter((a) => {
                        if (!createAssignmentSearch.trim()) return true;
                        const q = createAssignmentSearch.toLowerCase();
                        return (
                          a.reference?.toLowerCase().includes(q) ||
                          a.course_code?.toLowerCase().includes(q) ||
                          a.title?.toLowerCase().includes(q) ||
                          a.client?.name?.toLowerCase().includes(q) ||
                          a.client?.student_id?.toLowerCase().includes(q)
                        );
                      });

                      if (filtered.length === 0) {
                        return (
                          <div className="p-4 text-center text-xs text-slate-500 ">
                            No assignments found matching "{createAssignmentSearch}"
                          </div>
                        );
                      }

                      return filtered.map((a) => {
                        const isSelected = formData.assignment_id === a.id;
                        return (
                          <div
                            key={a.id}
                            onClick={() => {
                              setFormData({ ...formData, assignment_id: a.id });
                              setCreateAssignmentDropdownOpen(false);
                            }}
                            className={`p-2.5 rounded-lg cursor-pointer flex items-center justify-between transition-colors text-xs ${
                              isSelected
                                ? "bg-purple-50 text-purple-900 font-semibold border border-purple-200"
                                : "hover:bg-slate-100 text-slate-800"
                            }`}
                          >
                            <div className="flex flex-col min-w-0 pr-2">
                              <div className="flex items-center space-x-2">
                                <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 font-semibold shrink-0">
                                  {a.reference}
                                </span>
                                <span className="font-bold truncate">{a.course_code || a.title}</span>
                              </div>
                              {a.client?.name && (
                                <span className="text-[10px] text-slate-500 truncate mt-0.5">
                                  Client: {a.client.name} ({a.client.student_id})
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

          <div>
            <label className={labelClass}>Cost Item Name *</label>
            <input
              type="text"
              placeholder="e.g. Proofreading Fee / Platform Charge"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className={labelClass}>Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className={inputClass}
            >
              <option value="PENDING" className="bg-white text-slate-900 ">PENDING</option>
              <option value="PAID" className="bg-white text-slate-900 ">PAID</option>
            </select>
          </div>

          <div>
            <label className={labelClass}>Amount in BDT *</label>
            <input
              type="number"
              step="0.01"
              placeholder="500"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className={labelClass}>Description / Notes</label>
            <textarea
              rows={3}
              placeholder="Optional notes regarding this cost item..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className={inputClass}
            />
          </div>
        </form>
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Cost Record"
        subtitle="Update cost details or update status."
        icon={Pencil}
        size="md"
        footer={
          <>
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdateCost}
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
        <form onSubmit={handleUpdateCost} className="space-y-4">
          <div>
            <label className={labelClass}>Select Assignment *</label>
            <div className="relative">
              {/* Trigger Button */}
              <div
                onClick={() => setEditAssignmentDropdownOpen(!editAssignmentDropdownOpen)}
                className={`w-full p-2.5 rounded-xl border text-xs cursor-pointer flex items-center justify-between transition-all ${
                  "bg-slate-50 border-slate-200 text-slate-900 hover:border-purple-400"
                }`}
              >
                {(() => {
                  const selected = assignments.find((a) => a.id === editFormData.assignment_id);
                  if (selected) {
                    return (
                      <div className="flex items-center space-x-2 truncate min-w-0">
                        <span className="font-mono text-[11px] px-2 py-0.5 rounded-md bg-purple-100 text-purple-700 font-semibold shrink-0">
                          {selected.reference}
                        </span>
                        <span className="font-bold text-slate-900 truncate">
                          {selected.course_code || selected.title || "Assignment"}
                        </span>
                        {selected.client?.name && (
                          <span className="text-[11px] text-slate-500 truncate shrink">
                            • {selected.client.name} ({selected.client.student_id})
                          </span>
                        )}
                      </div>
                    );
                  }
                  return (
                    <span className="text-slate-400 font-normal">
                      Click or search assignment by ref, course, or client...
                    </span>
                  );
                })()}
                <ChevronDown
                  size={16}
                  className={`text-slate-400 shrink-0 ml-2 transition-transform duration-200 ${
                    editAssignmentDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </div>

              {/* Dropdown Overlay */}
              {editAssignmentDropdownOpen && (
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
                      placeholder="Search by reference, course code, title, or client..."
                      value={editAssignmentSearch}
                      onChange={(e) => setEditAssignmentSearch(e.target.value)}
                      className={`w-full pl-8 pr-8 py-2 rounded-lg border text-xs outline-none transition-colors ${
                        "bg-slate-50 border-slate-200 text-slate-900 focus:border-purple-500"
                      }`}
                    />
                    {editAssignmentSearch && (
                      <button
                        type="button"
                        onClick={() => setEditAssignmentSearch("")}
                        className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 "
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>

                  {/* Scrollable Filtered Assignments List */}
                  <div className="max-h-52 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                    {(() => {
                      const filtered = assignments.filter((a) => {
                        if (!editAssignmentSearch.trim()) return true;
                        const q = editAssignmentSearch.toLowerCase();
                        return (
                          a.reference?.toLowerCase().includes(q) ||
                          a.course_code?.toLowerCase().includes(q) ||
                          a.title?.toLowerCase().includes(q) ||
                          a.client?.name?.toLowerCase().includes(q) ||
                          a.client?.student_id?.toLowerCase().includes(q)
                        );
                      });

                      if (filtered.length === 0) {
                        return (
                          <div className="p-4 text-center text-xs text-slate-500 ">
                            No assignments found matching "{editAssignmentSearch}"
                          </div>
                        );
                      }

                      return filtered.map((a) => {
                        const isSelected = editFormData.assignment_id === a.id;
                        return (
                          <div
                            key={a.id}
                            onClick={() => {
                              setEditFormData({ ...editFormData, assignment_id: a.id });
                              setEditAssignmentDropdownOpen(false);
                            }}
                            className={`p-2.5 rounded-lg cursor-pointer flex items-center justify-between transition-colors text-xs ${
                              isSelected
                                ? "bg-purple-50 text-purple-900 font-semibold border border-purple-200"
                                : "hover:bg-slate-100 text-slate-800"
                            }`}
                          >
                            <div className="flex flex-col min-w-0 pr-2">
                              <div className="flex items-center space-x-2">
                                <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 font-semibold shrink-0">
                                  {a.reference}
                                </span>
                                <span className="font-bold truncate">{a.course_code || a.title}</span>
                              </div>
                              {a.client?.name && (
                                <span className="text-[10px] text-slate-500 truncate mt-0.5">
                                  Client: {a.client.name} ({a.client.student_id})
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

          <div>
            <label className={labelClass}>Status</label>
            <select
              value={editFormData.status}
              onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value })}
              className={inputClass}
            >
              <option value="PENDING" className="bg-white text-slate-900 ">PENDING</option>
              <option value="PAID" className="bg-white text-slate-900 ">PAID</option>
            </select>
          </div>

          <div>
            <label className={labelClass}>Cost Item Name *</label>
            <input
              type="text"
              value={editFormData.name}
              onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className={labelClass}>Amount in BDT *</label>
            <input
              type="number"
              step="0.01"
              value={editFormData.price}
              onChange={(e) => setEditFormData({ ...editFormData, price: e.target.value })}
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className={labelClass}>Description / Notes</label>
            <textarea
              rows={3}
              value={editFormData.description}
              onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
              className={inputClass}
            />
          </div>
        </form>
      </Modal>

      {/* Confirmation Dialog for Destructive Delete */}
      <ConfirmDialog
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteCost}
        isLoading={saving}
        title="Delete Cost Record?"
        message={`Are you sure you want to delete "${selectedCost?.name}"? This action cannot be undone.`}
        confirmText="Delete Record"
        variant="danger"
      />
    </div>
  );
}
