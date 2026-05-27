import React, { useState, useEffect } from "react";
import { User, Event, ToastMessage } from "../types";
import { Shield, Calendar, Users, BarChart3, Plus, RefreshCw } from "lucide-react";

interface OrganizerModuleProps {
  currentUser: User;
  events: Event[];
  onRefreshEvents: () => void;
  showToast: (title: string, content: string, type: ToastMessage["type"]) => void;
}

export default function OrganizerModule({ currentUser, events, onRefreshEvents, showToast }: OrganizerModuleProps) {
  const [activeTab, setActiveTab] = useState<"events" | "volunteers" | "analytics">("events");

  const tabs = [
    { id: "events" as const, label: "Events", icon: Calendar },
    { id: "volunteers" as const, label: "Volunteers", icon: Users },
    { id: "analytics" as const, label: "Analytics", icon: BarChart3 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="h-8 w-8 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-center justify-center">
              <Shield size={16} className="text-blue-400" />
            </div>
            <h1 className="font-display text-2xl font-extrabold text-white">Organizer Console</h1>
          </div>
          <p className="text-xs text-slate-500 font-mono">
            Welcome back, <span className="text-blue-400">{currentUser.name}</span> · Managing {events.length} event{events.length !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onRefreshEvents}
            className="h-8 w-8 glass border border-white/8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-colors"
            title="Refresh events"
          >
            <RefreshCw size={13} />
          </button>
          <button
            onClick={() => showToast("Coming soon", "Event creation wizard is under development", "info")}
            className="btn-primary flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold"
          >
            <Plus size={13} />
            New Event
          </button>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Events", value: events.length, color: "#3b82f6" },
          { label: "Live Now", value: events.filter(e => e.status === "live").length, color: "#10b981" },
          { label: "Registrations", value: events.reduce((s, e) => s + (e.registrations ?? 0), 0), color: "#f59e0b" },
          { label: "Published", value: events.filter(e => e.status === "published").length, color: "#8b5cf6" },
        ].map(({ label, value, color }) => (
          <div key={label} className="glass rounded-2xl p-4 border border-white/5 space-y-1">
            <p className="text-[11px] text-slate-500 font-mono uppercase tracking-wider">{label}</p>
            <p className="font-display text-3xl font-extrabold" style={{ color }}>{value}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 p-1 glass rounded-xl border border-white/5 w-fit">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === id
                ? "bg-blue-500/15 text-blue-400 border border-blue-500/25"
                : "text-slate-500 hover:text-slate-300"
            }`}
          >
            <Icon size={12} />
            {label}
          </button>
        ))}
      </div>

      {/* Events list */}
      {activeTab === "events" && (
        <div className="space-y-3">
          {events.length === 0 ? (
            <div className="glass rounded-2xl p-12 border border-white/5 text-center">
              <Calendar size={32} className="text-slate-600 mx-auto mb-3" />
              <p className="text-slate-500 text-sm">No events yet. Create your first event to get started.</p>
            </div>
          ) : (
            events.map((event) => (
              <div key={event.id} className="glass rounded-2xl p-5 border border-white/5 hover:border-white/10 transition-all">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1 flex-1 min-w-0">
                    <h3 className="font-display font-bold text-white truncate">{event.title}</h3>
                    {event.description && (
                      <p className="text-xs text-slate-400 line-clamp-2">{event.description}</p>
                    )}
                    <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] font-mono text-slate-500">
                      {event.date && <span>{new Date(event.date).toLocaleDateString()}</span>}
                      {event.venue && <span>· {event.venue}</span>}
                      {event.registrations !== undefined && (
                        <span>· {event.registrations}/{event.capacity ?? "∞"} registered</span>
                      )}
                    </div>
                  </div>
                  {event.status && (
                    <span className={`shrink-0 text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full border ${
                      event.status === "live"
                        ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                        : event.status === "published"
                        ? "bg-blue-500/10 border-blue-500/20 text-blue-400"
                        : "bg-slate-500/10 border-slate-500/20 text-slate-400"
                    }`}>
                      {event.status}
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === "volunteers" && (
        <div className="glass rounded-2xl p-12 border border-white/5 text-center">
          <Users size={32} className="text-slate-600 mx-auto mb-3" />
          <p className="text-slate-500 text-sm">Volunteer management coming soon.</p>
        </div>
      )}

      {activeTab === "analytics" && (
        <div className="glass rounded-2xl p-12 border border-white/5 text-center">
          <BarChart3 size={32} className="text-slate-600 mx-auto mb-3" />
          <p className="text-slate-500 text-sm">Analytics dashboard coming soon.</p>
        </div>
      )}
    </div>
  );
}
