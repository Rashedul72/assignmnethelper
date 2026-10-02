"use client";

import { useEffect, useState, useCallback } from "react";
import {
  SecurityCheckIcon,
  PencilEdit02Icon,
  FloppyDiskIcon,
  UserIcon,
  DashboardSquare01Icon,
  File01Icon,
  UserGroupIcon,
  QuillWrite01Icon,
} from "hugeicons-react";
import { DataTable, Column } from "../../components/ui/Table";
import { Modal } from "../../components/ui/Modal";
import { Badge } from "../../components/ui/Badge";
import { useToast } from "../../components/ui/ToastContext";
import { useTheme } from "../../components/ui/ThemeContext";

const MENU_ICON_MAP: Record<string, any> = {
  LayoutDashboard: DashboardSquare01Icon,
  DashboardSquare01Icon: DashboardSquare01Icon,
  Users: UserGroupIcon,
  UserGroupIcon: UserGroupIcon,
  PenTool: QuillWrite01Icon,
  QuillWrite01Icon: QuillWrite01Icon,
  FileText: File01Icon,
  File01Icon: File01Icon,
  Shield: SecurityCheckIcon,
  SecurityCheckIcon: SecurityCheckIcon,
};

export default function AccessControlPage() {
  const { showToast } = useToast();
  const { theme } = useTheme();
  const isDark = theme === "dark";

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
      const token = localStorage.getItem("admin_token");
      const [usersRes, menusRes] = await Promise.all([
        fetch("http://localhost:5000/api/admin/users", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("http://localhost:5000/api/admin/menus", {
          headers: { Authorization: `Bearer ${token}` },
        }),
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
    const token = localStorage.getItem("admin_token");
    try {
      const res = await fetch(
        `http://localhost:5000/api/admin/users/${selectedUser.id}/menus`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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
        <div className="flex items-center space-x-3">
          <div
            className={`w-9 h-9 rounded-2xl border flex items-center justify-center font-bold shrink-0 ${
              isDark
                ? "bg-purple-500/10 border-purple-500/20 text-purple-400"
                : "bg-purple-100 border-purple-200 text-purple-700"
            }`}
          >
            <UserIcon size={16} />
          </div>
          <div>
            <div className={`font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>
              {row.writerProfile?.name || row.email || "Admin User"}
            </div>
            <div className={`text-xs font-mono ${isDark ? "text-gray-400" : "text-slate-500"}`}>
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
                  className={`border text-xs px-2.5 py-1 rounded-xl font-semibold inline-flex items-center space-x-1 ${
                    isDark
                      ? "bg-white/5 border-white/10 text-gray-200"
                      : "bg-slate-100 border-slate-200 text-slate-700"
                  }`}
                >
                  <span>{m.title}</span>
                </span>
              ))
            ) : (
              <span className="text-gray-400 text-xs italic">No menu access granted</span>
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
          className={`p-2 border rounded-xl transition-colors inline-flex items-center space-x-1.5 text-xs font-semibold ${
            isDark
              ? "bg-white/5 hover:bg-white/10 border-white/10 text-blue-400"
              : "bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700"
          }`}
        >
          <PencilEdit02Icon size={14} />
          <span>Edit Permissions</span>
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1
          className={`text-3xl font-extrabold tracking-tight ${
            isDark ? "text-white" : "text-slate-900"
          }`}
        >
          Access Control
        </h1>
        <p className={`text-sm mt-1 ${isDark ? "text-gray-400" : "text-slate-600"}`}>
          Grant or restrict navigation menu access for each platform role
        </p>
      </div>

      {/* Main DataTable */}
      <DataTable
        columns={columns}
        data={users}
        loading={loading}
        searchPlaceholder="Search by user email or name..."
        searchKeys={["email"]}
        emptyTitle="No admin users found"
        emptySubtitle="No users found in database for access control."
      />

      {/* Edit Access Modal */}
      <Modal
        isOpen={isModalOpen && Boolean(selectedUser)}
        onClose={() => setIsModalOpen(false)}
        title="Edit Access Permissions"
        subtitle={selectedUser?.writerProfile?.name || selectedUser?.email}
        icon={SecurityCheckIcon}
        size="md"
      >
        {selectedUser && (
          <div className="space-y-4">
            <p
              className={`text-xs font-semibold uppercase tracking-wider ${
                isDark ? "text-gray-400" : "text-slate-600"
              }`}
            >
              Select allowed sidebar menus:
            </p>

            <div className="space-y-2.5">
              {menus.map((menu: any) => {
                const isChecked = userMenuState[selectedUser.id]?.has(menu.id) || false;
                const IconComp = MENU_ICON_MAP[menu.icon] || DashboardSquare01Icon;

                return (
                  <label
                    key={menu.id}
                    className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      isChecked
                        ? isDark
                          ? "bg-purple-600/15 border-purple-500/40 text-white shadow-[0_0_15px_rgba(147,51,234,0.1)]"
                          : "bg-purple-50 border-purple-300 text-purple-900 font-semibold"
                        : isDark
                        ? "bg-black/30 border-white/5 text-gray-400 hover:bg-white/5"
                        : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`p-2 rounded-xl ${
                          isChecked
                            ? isDark
                              ? "bg-purple-500/20 text-purple-300"
                              : "bg-purple-100 text-purple-700"
                            : isDark
                            ? "bg-white/5 text-gray-500"
                            : "bg-slate-200 text-slate-500"
                        }`}
                      >
                        <IconComp size={18} />
                      </div>
                      <span className="text-sm font-semibold">{menu.title}</span>
                    </div>

                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleMenu(selectedUser.id, menu.id)}
                      className="w-4 h-4 rounded border-slate-400 text-purple-600 focus:ring-purple-500/50"
                    />
                  </label>
                );
              })}
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
                type="button"
                disabled={saving}
                onClick={handleSave}
                className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold text-sm shadow-[0_0_20px_rgba(59,130,246,0.25)] disabled:opacity-50 flex items-center space-x-2 transition-all"
              >
                <FloppyDiskIcon size={16} />
                <span>{saving ? "Saving..." : "Save Changes"}</span>
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
