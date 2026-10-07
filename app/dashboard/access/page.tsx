"use client";

import { useEffect, useState, useCallback } from "react";
import {
  ShieldCheck,
  Pencil,
  Save,
  User,
  LayoutDashboard,
  FileText,
  Users as UsersIcon,
  PenTool,
  CreditCard,
} from "lucide-react";
import { DataTable, Column } from "../../components/ui/Table";
import { Modal } from "../../components/ui/Modal";
import { Badge } from "../../components/ui/Badge";
import { PageHeader } from "../../components/ui/PageHeader";
import { useToast } from "../../components/ui/ToastContext";
import { fetchWithAuth } from "../../lib/api";

const MENU_ICON_MAP: Record<string, any> = {
  LayoutDashboard: LayoutDashboard,
  DashboardSquare01Icon: LayoutDashboard,
  Users: UsersIcon,
  UserGroupIcon: UsersIcon,
  PenTool: PenTool,
  QuillWrite01Icon: PenTool,
  FileText: FileText,
  File01Icon: FileText,
  Shield: ShieldCheck,
  SecurityCheckIcon: ShieldCheck,
  CreditCard: CreditCard,
  Money01Icon: CreditCard,
  Costs: CreditCard,
};

export default function AccessControlPage() {
  const { showToast } = useToast();

  const [users, setUsers] = useState<any[]>([]);
  const [menus, setMenus] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [userMenuState, setUserMenuState] = useState<Record<string, Set<string>>>({});
  const [saving, setSaving] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [usersRes, menusRes] = await Promise.all([
        fetchWithAuth("/admin/users"),
        fetchWithAuth("/admin/menus"),
      ]);

      if (usersRes.ok && menusRes.ok) {
        const usersData = await usersRes.json();
        const menusData = await menusRes.json();
        setUsers(usersData);
        setMenus(menusData);

        const initialMenuState: Record<string, Set<string>> = {};
        usersData.forEach((u: any) => {
          initialMenuState[u.id] = new Set(
            u.menuAccess ? u.menuAccess.map((acc: any) => acc.menuId) : []
          );
        });
        setUserMenuState(initialMenuState);
      }
    } catch (err) {
      console.error(err);
      showToast("Failed to fetch access control settings", "error");
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleOpenModal = (user: any) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const toggleMenu = (userId: string, menuId: string) => {
    setUserMenuState((prev) => {
      const current = new Set(prev[userId] || []);
      if (current.has(menuId)) {
        current.delete(menuId);
      } else {
        current.add(menuId);
      }
      return { ...prev, [userId]: current };
    });
  };

  const handleSave = async () => {
    if (!selectedUser) return;

    setSaving(true);
    try {
      const res = await fetchWithAuth(
        `/dashboard/users/${selectedUser.id}/menus`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            menuIds: Array.from(userMenuState[selectedUser.id] || []),
          }),
        }
      );

      if (res.ok) {
        setIsModalOpen(false);
        showToast("Sidebar menu permissions updated successfully!", "success", "Access Updated");
        fetchData();
      } else {
        showToast("Failed to update access permissions", "error");
      }
    } catch (error) {
      showToast("Network error updating access control", "error");
    } finally {
      setSaving(false);
    }
  };

  const columns: Column<any>[] = [
    {
      key: "user",
      header: "User Account",
      sortable: true,
      render: (row) => (
        <div className="flex items-center space-x-2.5">
          <div
            className={`w-8 h-8 rounded-full border flex items-center justify-center font-bold text-xs shrink-0 ${
              "bg-purple-100 border-purple-200 text-purple-700"
            }`}
          >
            <User size={14} />
          </div>
          <div>
            <div className={`font-semibold text-xs ${"text-slate-900"}`}>
              {row.writerProfile?.name || row.email || "Admin User"}
            </div>
            <div className={`text-[11px] font-mono ${"text-slate-500"}`}>
              {row.email}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "role",
      header: "Role Tag",
      sortable: true,
      render: (row) => (
        <Badge variant={row.role === "ADMIN" ? "purple" : "info"}>
          {row.role}
        </Badge>
      ),
    },
    {
      key: "currentAccess",
      header: "Permitted Sidebar Menus",
      render: (row) => {
        const userMenus = menus.filter((m) => userMenuState[row.id]?.has(m.id));
        return (
          <div className="flex flex-wrap gap-1.5">
            {userMenus.length > 0 ? (
              userMenus.map((m) => (
                <span
                  key={m.id}
                  className={`border text-[11px] px-2 py-0.5 rounded-lg font-medium inline-flex items-center space-x-1 ${
                    "bg-slate-100 border-slate-200 text-slate-700"
                  }`}
                >
                  <span>{m.title}</span>
                </span>
              ))
            ) : (
              <span className="text-slate-400 text-xs italic">No menu access granted</span>
            )}
          </div>
        );
      },
    },
    {
      key: "actions",
      header: "Actions",
      align: "right",
      render: (row) => (
        <button
          onClick={() => handleOpenModal(row)}
          className="p-1.5 rounded-lg border border-slate-200 text-purple-600 hover:bg-purple-50 transition-colors inline-flex items-center space-x-1 text-xs font-semibold"
        >
          <Pencil size={14} />
          <span>Edit Permissions</span>
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHeader
        title="Access Control & Role Permissions"
        description="Manage navigation visibility and granular menu access permissions for each admin user"
        badge="Security"
      />

      {/* Main DataTable */}
      <DataTable
        columns={columns}
        data={users}
        loading={loading}
        pageSize={10}
        searchPlaceholder="Search by user email or name..."
        searchKeys={["email"]}
        emptyTitle="No admin users found"
        emptySubtitle="No user records available for access control configuration."
      />

      {/* Edit Access Modal */}
      <Modal
        isOpen={isModalOpen && Boolean(selectedUser)}
        onClose={() => setIsModalOpen(false)}
        title="Edit Sidebar Permissions"
        subtitle={selectedUser?.writerProfile?.name || selectedUser?.email}
        icon={ShieldCheck}
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
              <Save size={14} />
              <span>Save Permissions</span>
            </button>
          </>
        }
      >
        {selectedUser && (
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 ">
              Select allowed sidebar menus:
            </p>

            <div className="space-y-2">
              {menus.map((menu: any) => {
                const isChecked = userMenuState[selectedUser.id]?.has(menu.id) || false;
                const IconComp = MENU_ICON_MAP[menu.icon] || LayoutDashboard;

                return (
                  <label
                    key={menu.id}
                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                      isChecked
                        ? "bg-purple-50 border-purple-200 text-purple-950 font-medium"
                        : "bg-slate-50/50 border-slate-200/60 text-slate-700 hover:bg-slate-100/70"
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <div
                        className={`p-1.5 rounded-lg border ${
                          isChecked
                            ? "bg-purple-100 border-purple-300 text-purple-700"
                            : "bg-slate-100 border-slate-200 text-slate-500"
                        }`}
                      >
                        <IconComp size={16} />
                      </div>
                      <span className="text-xs font-semibold">{menu.title}</span>
                    </div>

                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleMenu(selectedUser.id, menu.id)}
                      className="w-4 h-4 rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                    />
                  </label>
                );
              })}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
