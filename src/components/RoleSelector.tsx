import React, { useState, useEffect, useRef } from "react";
import { User, Notification } from "../types";
import {
  Shield, Award, Briefcase, UserCheck, Bell, CheckCheck,
  Zap, LogOut, ChevronDown, Settings, X, Clock
} from "lucide-react";

interface RoleSelectorProps {
  currentUser: User;
  onUserSwitch: (role: "organizer" | "volunteer" | "sponsor" | "participant") => void;
  notifications: Notification[];
  onMarkNotificationsRead: () => void;
  onGoToLanding?: () => void;
}

const ROLE_CONFIG = {
  organizer:   { label: "Organizer",   icon: Shield,    accent: "#3b82f6", bg: "rgba(59,130,246,0.12)",  border: "rgba(59,130,246,0.25)"  },
  volunteer:   { label: "Volunteer",   icon: Award,     accent: "#10b981", bg: "rgba(16,185,129,0.12)", border: "rgba(16,185,129,0.25)" },
  sponsor:     { label: "Sponsor",     icon: Briefcase, accent: "#f59e0b", bg: "rgba(245,158,11,0.12)", border: "rgba(245,158,11,0.25)" },
  participant: { label: "Attendee",    icon: UserCheck, accent: "#8b5cf6", bg: "rgba(139,92,246,0.12)", border: "rgba(139,92,246,0.25)" },
};

export default function RoleSelector({
  currentUser,
  onUserSwitch,
  notifications = [],
  onMarkNotificationsRead,
  onGoToLanding,
}: RoleSelectorProps) {
  const [showNotifs,  setShowNotifs]  = useState(false);
  const [showRoles,   setShowRoles]   = useState(false);
  const notifsRef = useRef<HTMLDivElement>(null);
  const rolesRef  = useRef<HTMLDivElement>(null);

  const unread = notifications.filter(n => !n.read).length;
  const activeRole = (currentUser.role as keyof typeof ROLE_CONFIG);
  const config = ROLE_CONFIG[activeRole] ?? ROLE_CONFIG.participant;
  const Icon = config.icon;

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifsRef.current && !notifsRef.current.contains(e.target as Node)) setShowNotifs(false);
      if (rolesRef.current  && !rolesRef.current.contains(e.target as Node))  setShowRoles(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header className="navbar sticky top-0 z-50 px-4 md:px-8 h-14 flex items-center justify-between gap-4">

      {/* ── Logo ────────────────────────────────── */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center shadow shadow-blue-500/30">
          <Zap size={15} className="text-white" />
        </div>
        <div className="hidden sm:block">
          <p className="font-display text-base font-extrabold text-white leading-none tracking-tight">
            EVENT<span className="text-blue-400">TECH</span>
          </p>
          <p className="text-[8px] font-mono text-slate-600 uppercase tracking-widest">Platform</p>
        </div>
      </div>

      {/* ── Role quick-switcher ───────────────────── */}
      <div className="hidden md:flex items-center gap-1 p-1 rounded-xl glass border border-white/6">
        {(Object.keys(ROLE_CONFIG) as (keyof typeof ROLE_CONFIG)[]).map((role) => {
          const { label, icon: RoleIcon, accent, bg, border } = ROLE_CONFIG[role];
          const isActive = activeRole === role;
          return (
            <button
              key={role}
              onClick={() => onUserSwitch(role)}
              className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200"
              style={{
                background: isActive ? bg : "transparent",
                border: `1px solid ${isActive ? border : "transparent"}`,
                color: isActive ? accent : "rgba(148,163,184,0.7)",
              }}
            >
              <RoleIcon size={12} />
              {label}
              {isActive && (
                <span
                  className="w-1 h-1 rounded-full absolute -top-0.5 -right-0.5 animate-pulse"
                  style={{ background: accent }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* ── Mobile role dropdown ──────────────────── */}
      <div ref={rolesRef} className="relative md:hidden">
        <button
          onClick={() => setShowRoles(!showRoles)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
          style={{ background: config.bg, border: `1px solid ${config.border}`, color: config.accent }}
        >
          <Icon size={13} />
          <span>{config.label}</span>
          <ChevronDown size={11} className={`transition-transform ${showRoles ? "rotate-180" : ""}`} />
        </button>

        {showRoles && (
          <div className="absolute left-0 top-full mt-2 w-44 glass border border-white/8 rounded-2xl py-1.5 shadow-2xl animate-scale-in z-50">
            {(Object.keys(ROLE_CONFIG) as (keyof typeof ROLE_CONFIG)[]).map((role) => {
              const { label, icon: RoleIcon, accent } = ROLE_CONFIG[role];
              const isActive = activeRole === role;
              return (
                <button
                  key={role}
                  onClick={() => { onUserSwitch(role); setShowRoles(false); }}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-xs hover:bg-white/5 transition-colors"
                  style={{ color: isActive ? accent : "rgba(148,163,184,0.8)" }}
                >
                  <RoleIcon size={13} />
                  {label}
                  {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full" style={{ background: accent }} />}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Right controls ────────────────────────── */}
      <div className="flex items-center gap-2 shrink-0">

        {/* Notifications */}
        <div ref={notifsRef} className="relative">
          <button
            onClick={() => {
              setShowNotifs(!showNotifs);
              if (!showNotifs && unread > 0) onMarkNotificationsRead();
            }}
            className="relative h-8 w-8 glass rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:border-white/15 transition-all border border-white/6"
          >
            <Bell size={14} />
            {unread > 0 && (
              <span className="notif-badge absolute -top-1 -right-1 min-w-[16px] h-4 rounded-full text-[9px] font-bold text-white flex items-center justify-center px-1">
                {unread > 9 ? "9+" : unread}
              </span>
            )}
          </button>

          {showNotifs && (
            <div className="absolute right-0 top-full mt-2 w-80 glass border border-white/8 rounded-2xl shadow-2xl animate-scale-in z-50 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/6">
                <span className="text-xs font-semibold text-white font-display">Notifications</span>
                <div className="flex items-center gap-2">
                  {unread > 0 && (
                    <button onClick={onMarkNotificationsRead} className="text-[10px] text-blue-400 hover:text-blue-300 font-mono flex items-center gap-1">
                      <CheckCheck size={11} /> Mark read
                    </button>
                  )}
                  <button onClick={() => setShowNotifs(false)} className="text-slate-500 hover:text-white transition-colors">
                    <X size={13} />
                  </button>
                </div>
              </div>

              <div className="max-h-72 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="py-8 text-center text-xs text-slate-500 font-mono">
                    No notifications
                  </div>
                ) : (
                  notifications.slice(0, 8).map((n, i) => (
                    <div
                      key={n.id ?? i}
                      className={`px-4 py-3 border-b border-white/4 last:border-0 hover:bg-white/3 transition-colors ${!n.read ? "bg-blue-500/4" : ""}`}
                    >
                      <div className="flex items-start gap-2.5">
                        {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1 shrink-0" />}
                        <div className={`flex-1 min-w-0 ${n.read ? "pl-4" : ""}`}>
                          <p className="text-xs text-slate-200 leading-relaxed line-clamp-2">{n.content}</p>
                          <div className="flex items-center gap-1 mt-1 text-[10px] text-slate-600 font-mono">
                            <Clock size={9} />
                            {n.createdAt ? new Date(n.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "Just now"}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User pill */}
        <div
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 glass rounded-lg border border-white/6 text-xs"
          style={{ borderColor: config.border }}
        >
          <div
            className="h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-bold"
            style={{ background: config.bg, color: config.accent }}
          >
            {currentUser.name?.charAt(0).toUpperCase() ?? "U"}
          </div>
          <span className="text-slate-300 font-medium truncate max-w-[90px]">{currentUser.name?.split(" ")[0]}</span>
        </div>

        {/* Sign out */}
        {onGoToLanding && (
          <button
            onClick={onGoToLanding}
            className="h-8 w-8 glass rounded-lg flex items-center justify-center text-slate-500 hover:text-red-400 border border-white/6 hover:border-red-500/30 transition-all"
            title="Sign out"
          >
            <LogOut size={13} />
          </button>
        )}
      </div>
    </header>
  );
}
