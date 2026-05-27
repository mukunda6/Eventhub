import React from "react";
import { Zap, Shield, Award, Briefcase, UserCheck, ArrowRight, BarChart3, Users } from "lucide-react";

interface LandingPageProps {
  onEnterApp: (role: "organizer" | "volunteer" | "sponsor" | "participant") => void;
}

const ROLES = [
  {
    id: "organizer" as const,
    title: "Organizer",
    subtitle: "Console",
    icon: Shield,
    accent: "#3b82f6",
    accentBg: "rgba(59,130,246,0.08)",
    accentBorder: "rgba(59,130,246,0.2)",
    desc: "Create & manage events, assign volunteers, track sponsors, and monitor live analytics.",
    tags: ["Event Builder", "Analytics", "Team Mgmt"],
  },
  {
    id: "volunteer" as const,
    title: "Volunteer",
    subtitle: "Portal",
    icon: Award,
    accent: "#10b981",
    accentBg: "rgba(16,185,129,0.08)",
    accentBorder: "rgba(16,185,129,0.2)",
    desc: "Claim tasks, log hours, earn achievement badges, and climb the leaderboard.",
    tags: ["Kanban Board", "Badge System", "Rankings"],
  },
  {
    id: "sponsor" as const,
    title: "Sponsor",
    subtitle: "Hub",
    icon: Briefcase,
    accent: "#f59e0b",
    accentBg: "rgba(245,158,11,0.08)",
    accentBorder: "rgba(245,158,11,0.2)",
    desc: "Explore events, get AI-powered match reports, and track live brand ROI metrics.",
    tags: ["AI Matching", "ROI Charts", "Packages"],
  },
  {
    id: "participant" as const,
    title: "Attendee",
    subtitle: "Hub",
    icon: UserCheck,
    accent: "#8b5cf6",
    accentBg: "rgba(139,92,246,0.08)",
    accentBorder: "rgba(139,92,246,0.2)",
    desc: "Register for events, claim QR tickets, form teams, and network through live chat.",
    tags: ["QR Tickets", "Team Builder", "Networking"],
  },
];

const STATS = [
  { label: "Events Managed", value: "1,200+" },
  { label: "Active Users", value: "18K+" },
  { label: "Sponsors Matched", value: "340+" },
  { label: "Volunteer Hours", value: "92K+" },
];

export default function LandingPage({ onEnterApp }: LandingPageProps) {
  return (
    <div className="min-h-screen mesh-bg bg-[#050a14] relative overflow-hidden">
      {/* Ambient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-600/8 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full bg-violet-600/8 blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
        {/* Hero */}
        <div className="text-center space-y-6 mb-20 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-blue-500/20 text-blue-400 text-xs font-mono tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            College Event Management SaaS · v2.0
          </div>

          <h1 className="font-display text-5xl md:text-7xl font-extrabold text-white leading-[1.05] tracking-tight">
            The platform that<br />
            <span className="gradient-text">runs your fest.</span>
          </h1>

          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            From AI-powered sponsor matching and live QR check-ins to volunteer Kanban boards and
            real-time NPS analytics — everything your event needs, in one place.
          </p>

          {/* Stats bar */}
          <div className="flex flex-wrap justify-center gap-8 pt-4">
            {STATS.map(({ label, value }) => (
              <div key={label} className="text-center">
                <p className="font-display text-2xl font-extrabold text-white">{value}</p>
                <p className="text-[11px] text-slate-500 font-mono mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Role cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-16">
          {ROLES.map((role, i) => {
            const Icon = role.icon;
            return (
              <button
                key={role.id}
                onClick={() => onEnterApp(role.id)}
                className="group text-left glass rounded-2xl p-6 border transition-all duration-300 cursor-pointer flex flex-col gap-5 role-card animate-fade-up"
                style={{
                  borderColor: role.accentBorder,
                  background: role.accentBg,
                  animationDelay: `${i * 0.1}s`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = role.accent;
                  (e.currentTarget as HTMLElement).style.background = role.accentBg.replace("0.08", "0.14");
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = role.accentBorder;
                  (e.currentTarget as HTMLElement).style.background = role.accentBg;
                }}
              >
                <div className="flex items-start justify-between">
                  <div
                    className="h-12 w-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                    style={{ background: `${role.accent}20`, border: `1px solid ${role.accent}30` }}
                  >
                    <Icon size={22} style={{ color: role.accent }} />
                  </div>
                  <div
                    className="h-7 w-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                    style={{ background: role.accent }}
                  >
                    <ArrowRight size={13} className="text-white" />
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-display text-xl font-bold text-white leading-tight">
                    {role.title}{" "}
                    <span style={{ color: role.accent }} className="font-light">{role.subtitle}</span>
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{role.desc}</p>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {role.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full"
                      style={{ background: `${role.accent}15`, color: role.accent, border: `1px solid ${role.accent}25` }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </button>
            );
          })}
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { icon: Zap, title: "AI-Powered Matching", desc: "Gemini AI surfaces the best sponsor–event pairings instantly based on audience overlap and brand goals." },
            { icon: Users, title: "Real-time Collaboration", desc: "Live Kanban boards, chat hubs, and instant notifications keep every team member in sync." },
            { icon: BarChart3, title: "Deep Analytics", desc: "ROI dashboards, NPS scores, volunteer-hour logs, and registration funnels — all in one view." },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="glass rounded-2xl p-6 space-y-3 border border-white/5">
              <div className="h-10 w-10 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center">
                <Icon size={18} className="text-blue-400" />
              </div>
              <h3 className="font-display text-base font-bold text-white">{title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
