"use client";

import { useState, type FormEvent } from "react";

interface LoginProps {
  onLogin: (token: string, user: { name: string; email: string; role: string }) => void;
}

export function AdminLogin({ onLogin }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }

      onLogin(data.token, data.user);
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-extrabold text-black uppercase tracking-wide">Markit Media</h1>
          <p className="text-base text-gray-500 mt-2">CMS Dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 border border-gray-200 space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-bold text-black uppercase tracking-wide mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 px-4 py-3 text-base focus-visible:border-black focus-visible:outline-none"
              placeholder="admin@markitmedia.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-bold text-black uppercase tracking-wide mb-2">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 px-4 py-3 text-base focus-visible:border-black focus-visible:outline-none"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-base" role="alert">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-4 font-bold text-base hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
