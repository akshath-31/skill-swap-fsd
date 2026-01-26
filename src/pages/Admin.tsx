import { Users, BookOpen, TrendingUp, Shield } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  status: "active" | "inactive";
}

const users: AdminUser[] = [
  { id: "1", name: "Alex Johnson", email: "alex@example.com", role: "user", status: "active" },
  { id: "2", name: "Sarah Chen", email: "sarah@example.com", role: "user", status: "active" },
  { id: "3", name: "Mike Wilson", email: "mike@example.com", role: "user", status: "inactive" },
  { id: "4", name: "Emily Davis", email: "emily@example.com", role: "admin", status: "active" },
  { id: "5", name: "David Lee", email: "david@example.com", role: "user", status: "active" },
];

const stats = [
  { label: "Total Users", value: "1,234", icon: Users, trend: "+12%" },
  { label: "Active Users", value: "892", icon: TrendingUp, trend: "+8%" },
  { label: "Skills Posted", value: "456", icon: BookOpen, trend: "+15%" },
];

const Admin = () => {
  const { user } = useAuth();

  if (user?.role !== "admin") {
    return <Navigate to="/learn" replace />;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Shield className="w-6 h-6 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
        </div>
        <p className="text-muted-foreground">Manage users and monitor platform activity</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-card border border-border rounded-xl p-5 hover:shadow-soft transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-accent-foreground" />
              </div>
              <span className="text-sm font-medium text-success">{stat.trend}</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Users Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="p-5 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">User Management</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left px-5 py-3 text-sm font-medium text-muted-foreground">Name</th>
                <th className="text-left px-5 py-3 text-sm font-medium text-muted-foreground">Email</th>
                <th className="text-left px-5 py-3 text-sm font-medium text-muted-foreground">Role</th>
                <th className="text-left px-5 py-3 text-sm font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-t border-border hover:bg-muted/30 transition-colors">
                  <td className="px-5 py-4">
                    <span className="font-medium text-foreground">{u.name}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-muted-foreground">{u.email}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        u.role === "admin"
                          ? "bg-primary/10 text-primary"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        u.status === "active"
                          ? "bg-success/10 text-success"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {u.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;
