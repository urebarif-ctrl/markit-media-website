"use client";

import { useState } from "react";
import { LeadsPanel } from "./leads-panel";
import { PostsPanel } from "./posts-panel";
import { MediaPanel } from "./media-panel";
import { AnalyticsPanel } from "./analytics-panel";

interface DashboardProps {
  token: string;
  user: { name: string; email: string; role: string };
  onLogout: () => void;
}

const tabs = [
  { id: "analytics", label: "Dashboard" },
  { id: "leads", label: "Leads" },
  { id: "posts", label: "Blog Posts" },
  { id: "media", label: "Media" },
] as const;

type TabId = typeof tabs[number]["id"];

export function AdminDashboard({ token, user, onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<TabId>("analytics");

  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <header className="bg-black text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <h1 className="text-lg font-extrabold uppercase tracking-wide">Markit CMS</h1>
          <nav className="hidden md:flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-white text-black"
                    : "text-gray-300 hover:text-white hover:bg-white/10"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400 hidden sm:block">{user.email}</span>
          <button onClick={onLogout} className="text-sm text-gray-300 hover:text-white transition-colors px-3 py-2">
            Logout
          </button>
        </div>
      </header>

      {/* Mobile tabs */}
      <nav className="md:hidden flex border-b border-gray-200 bg-white overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
              activeTab === tab.id
                ? "border-black text-black"
                : "border-transparent text-gray-500 hover:text-black"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Content */}
      <main className="p-6 max-w-7xl mx-auto">
        {activeTab === "analytics" && <AnalyticsPanel headers={headers} />}
        {activeTab === "leads" && <LeadsPanel headers={headers} />}
        {activeTab === "posts" && <PostsPanel headers={headers} />}
        {activeTab === "media" && <MediaPanel token={token} />}
      </main>
    </div>
  );
}
