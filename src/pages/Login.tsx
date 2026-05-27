import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Zap, Shield, Users, BarChart3 } from "lucide-react";

const FEATURES = [
  { icon: Zap, label: "AI-powered matching", desc: "Gemini-driven sponsor compatibility" },
  { icon: Shield, label: "Role-based access", desc: "Organizer, Volunteer, Sponsor & Attendee" },
  { icon: Users, label: "Live collaboration", desc: "Real-time Kanban & chat hubs" },
  { icon: BarChart3, label: "Analytics dashboard", desc: "ROI tracking & event metrics" },
];

const DEMO_ACCOUNTS = [
  { role: "organizer", email: "organizer@eventtech.club", color: "blue" },
  { role: "volunteer", email: "volunteer@eventtech.club", color: "emerald" },
  { role: "sponsor", email: "sponsor@google.com", color: "amber" },
  { role: "participant", email: "mukundasaimothku@gmail.com", color: "violet" },
];

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || "/dashboard";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signIn(email, password);
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message?.replace("Firebase: ", "").replace(" (auth/invalid-credential).", "") || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword("demo1234");
    setError(null);
  };

  return (
    <div className="min-h-screen mesh-bg bg-[#050a14] flex">
      {/* ── Left panel (decorative) ───────────────── */}
      <div className="hidden lg:flex lg:w-[52%] relative overflow-hidden flex-col justify-between p-12">
        {/* Ambient orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-blue-600/10 blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-violet-600/10 blur-[80px]" />
        </div>

        {/* Logo */}
        <div className="relative">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Zap size={20} className="text-white" />
            </div>
            <div>
              <p className="font-display text-xl font-extrabold text-white tracking-tight">
                EVENT<span className="text-blue-400">TECH</span>
              </p>
              <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Platform</p>
            </div>
          </div>
        </div>

        {/* Hero text */}
        <div className="relative space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-blue-500/20 text-blue-400 text-xs font-mono tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            College Event Management SaaS
          </div>

          <h1 className="font-display text-5xl font-extrabold leading-[1.1] text-white">
            Manage events<br />
            <span className="gradient-text">at scale.</span>
          </h1>

          <p className="text-slate-400 text-base leading-relaxed max-w-md">
            The all-in-one platform for college hackathons — from live QR check-ins and AI sponsor matching to volunteer Kanban boards and NPS analytics.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-2">
            {FEATURES.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="glass rounded-xl p-4 space-y-1.5">
                <div className="flex items-center gap-2 text-slate-300">
                  <Icon size={14} className="text-blue-400 shrink-0" />
                  <span className="text-xs font-semibold">{label}</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom note */}
        <p className="relative text-[11px] text-slate-600 font-mono">
          © 2025 EventTech · Built with React 19 + Vite 6 + Gemini AI
        </p>
      </div>

      {/* ── Right panel (form) ────────────────────── */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md animate-fade-up">
          {/* Mobile logo */}
          <div className="flex items-center gap-2.5 mb-10 lg:hidden">
            <div className="h-9 w-9 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center">
              <Zap size={18} className="text-white" />
            </div>
            <p className="font-display text-lg font-extrabold text-white">
              EVENT<span className="text-blue-400">TECH</span>
            </p>
          </div>

          <div className="space-y-2 mb-8">
            <h2 className="font-display text-3xl font-extrabold text-white">Welcome back</h2>
            <p className="text-slate-400 text-sm">Sign in to your workspace to continue.</p>
          </div>

          {/* Demo accounts quick-fill */}
          <div className="glass rounded-2xl p-4 mb-6 space-y-3">
            <p className="text-[11px] font-mono text-slate-500 uppercase tracking-widest font-semibold">Demo accounts</p>
            <div className="grid grid-cols-2 gap-2">
              {DEMO_ACCOUNTS.map(({ role, email: dEmail, color }) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => fillDemo(dEmail)}
                  className={`text-left px-3 py-2 rounded-lg border transition-all text-xs font-medium capitalize
                    ${color === "blue"    ? "border-blue-500/20 bg-blue-500/8 text-blue-400 hover:bg-blue-500/15 hover:border-blue-500/40"    : ""}
                    ${color === "emerald" ? "border-emerald-500/20 bg-emerald-500/8 text-emerald-400 hover:bg-emerald-500/15 hover:border-emerald-500/40" : ""}
                    ${color === "amber"   ? "border-amber-500/20 bg-amber-500/8 text-amber-400 hover:bg-amber-500/15 hover:border-amber-500/40"   : ""}
                    ${color === "violet"  ? "border-violet-500/20 bg-violet-500/8 text-violet-400 hover:bg-violet-500/15 hover:border-violet-500/40"  : ""}
                  `}
                >
                  <span className="block font-semibold">{role}</span>
                  <span className="block text-[10px] opacity-60 font-mono truncate">{dEmail.split("@")[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm animate-scale-in">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                {error}
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">Email</label>
              <div className={`relative transition-all rounded-xl ${focusedField === "email" ? "glow-border-active" : ""}`}>
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="input-dark w-full rounded-xl pl-9 pr-4 py-3 text-sm"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">Password</label>
              <div className={`relative transition-all rounded-xl ${focusedField === "password" ? "glow-border-active" : ""}`}>
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••"
                  className="input-dark w-full rounded-xl pl-9 pr-10 py-3 text-sm"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  required
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full rounded-xl py-3 text-sm font-semibold flex items-center justify-center gap-2 mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Authenticating…
                </>
              ) : (
                <>
                  Sign in
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-slate-600 mt-6">
            Demo credentials: any demo account above · password{" "}
            <span className="font-mono text-slate-400">demo1234</span>
          </p>
        </div>
      </div>
    </div>
  );
}
