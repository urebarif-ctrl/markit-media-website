"use client";

import { useState, useEffect } from "react";
import { AdminLogin } from "./components/login";
import { AdminDashboard } from "./components/dashboard";

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<{ name: string; email: string; role: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("admin_token");
    const storedUser = localStorage.getItem("admin_user");
    if (stored && storedUser) {
      setToken(stored);
      try { setUser(JSON.parse(storedUser)); } catch { /* ignore */ }
    }
    setLoading(false);
  }, []);

  function handleLogin(t: string, u: { name: string; email: string; role: string }) {
    setToken(t);
    setUser(u);
    localStorage.setItem("admin_token", t);
    localStorage.setItem("admin_user", JSON.stringify(u));
  }

  function handleLogout() {
    setToken(null);
    setUser(null);
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!token || !user) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return <AdminDashboard token={token} user={user} onLogout={handleLogout} />;
}
