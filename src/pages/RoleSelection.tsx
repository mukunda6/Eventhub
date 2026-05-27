import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Award, Briefcase, UserCheck, ArrowRight, Shield, Zap } from "lucide-react";
import { motion } from "framer-motion";

const ROLES = [
  {
    id: "volunteer" as const,
    title: "Volunteer",
    subtitle: "Portal",
    icon: Award,
    accent: "#10b981",
    accentBg: "rgba(16,185,129,0.08)",
    accentBorder: "rgba(16,185,129,0.2)",
    accentHover: "rgba(16,185,129,0.15)",
    textColor: "text-emerald-400",
    desc: "Claim tasks, log hours, earn achievement badges, and climb the leaderboard — your contribution tracked in real time.",
    tags: ["Kanban Board", "Badge System", "Live Rankings"],
  },
  {
    id: "sponsor" as const,
    title: "Sponsor",
    subtitle: "Hub",
    icon: Briefcase,
    accent: "#f59e0b",
    accentBg: "rgba(245,158,11,0.08)",
    accentBorder: "rgba(245,158,11,0.2)",
    accentHover: "rgba(245,158,11,0.15)",
    textColor: "text-amber-400",
    desc: "Explore fests, get Gemini-powered match reports, coordinate sponsorship packages, and track live brand ROI metrics.",
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
    accentHover: "rgba(139,92,246,0.15)",
    textColor: "text-violet-400",
    desc: "Register for events, claim early-bird QR tickets, form teams, and network through live chat hubs.",
    tags: ["QR Tickets", "Team Builder", "Networking"],
  },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } } };

export default function RoleSelection({ isSettings = false }: { isSettings?: boolean }) {
  const { switchRole } = useAuth();
  const navigate = useNavigate();

  const handleSelectRole = (role: "volunteer" | "sponsor" | "participant") => {
    switchRole(role);
    navigate(`/dashboard/${role}`);
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center py-16 px-4 select-none">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] rounded-full bg-blue-600/6 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-violet-600/6 blur-[100px]" />
      </div>

      <div className="relative max-w-5xl w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4 mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-blue-500/20 text-blue-400 text-xs font-mono tracking-wider">
            <Zap size={11} />
            {isSettings ? "Switch Workspace" : "Ecosystem Dashboard"}
          </div>

          <h2 className="font-display text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            {isSettings ? "Switch your console" : "Choose your workspace"}
          </h2>

          <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
            {isSettings
              ? "Change your active role to access a different set of tools. Your previous state will be cleared."
              : "Select one of the dedicated dashboards below to begin your EventTech session."}
          </p>
        </motion.div>

        {/* Role cards */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {ROLES.map((role) => {
            const Icon = role.icon;
            return (
              <motion.button
                key={role.id}
                variants={item}
                onClick={() => handleSelectRole(role.id)}
                className="group text-left glass rounded-2xl p-6 border transition-all duration-300 cursor-pointer flex flex-col gap-5 role-card"
                style={{
                  borderColor: role.accentBorder,
                  background: role.accentBg,
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = role.accentHover;
                  (e.currentTarget as HTMLElement).style.borderColor = role.accent;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = role.accentBg;
                  (e.currentTarget as HTMLElement).style.borderColor = role.accentBorder;
                }}
              >
                {/* Icon + title row */}
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

                {/* Text */}
                <div className="space-y-2">
                  <h3 className="font-display text-xl font-bold text-white leading-tight">
                    {role.title}{" "}
                    <span style={{ color: role.accent }} className="font-light">{role.subtitle}</span>
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{role.desc}</p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {role.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full"
                      style={{ background: `${role.accent}15`, color: role.accent, border: `1px solid ${role.accent}25` }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Organizer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-[11px] text-slate-600 font-mono mt-8"
        >
          Organizer access is granted automatically based on your account credentials.
        </motion.p>
      </div>
    </div>
  );
}
