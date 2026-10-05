"use client";

import { useCallback, useEffect, useState } from "react";
import { AdminLogin } from "./components/login";
import { AdminDashboard } from "./components/dashboard";

type AdminUser = { name: string; email: string; role: string };

export default function AdminPage() {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [sessionError, setSessionError] = useState("");

  const loadSession = useCallback(async () => {
    setLoading(true);
    setSessionError("");
    try {
      const res = await fetch("/api/admin/session", { cache: "no-store" });
      if (res.status === 401) {
        setUser(null);
        return;
      }
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || "Dashboard session is temporarily unavailable.");
      }
      setUser(data.user || null);
    } catch (error) {
      setSessionError(error instanceof Error ? error.message : "Dashboard session is temporarily unavailable.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSession();
  }, [loadSession]);

  function handleLogin(nextUser: AdminUser) {
    setSessionError("");
    setUser(nextUser);
  }

  async function handleLogout() {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } finally {
      setUser(null);
    }
  }

  if (loading) {
    return <div className="min-h-screen grid place-items-center bg-[#f4f4f2]"><div className="text-sm font-semibold text-zinc-500">Checking secure session...</div></div>;
  }

  if (sessionError) {
    return (
      <div className="min-h-screen grid place-items-center bg-[#f4f4f2] px-5">
        <div className="w-full max-w-md rounded-3xl border bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-black">Dashboard connection issue</h1>
          <p className="mt-3 text-sm leading-6 text-zinc-500">{sessionError}</p>
          <button onClick={loadSession} className="mt-6 rounded-xl bg-black px-5 py-3 text-sm font-bold text-white">Try again</button>
        </div>
      </div>
    );
  }

  if (!user) return <AdminLogin onLogin={handleLogin} />;

  return <AdminDashboard user={user} onLogout={handleLogout} />;
}
