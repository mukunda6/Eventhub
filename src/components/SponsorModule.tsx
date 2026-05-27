import React, { useState } from "react";
import { User, Event, ToastMessage } from "../types";
import { Briefcase, Zap, BarChart3, TrendingUp, RefreshCw } from "lucide-react";

interface SponsorModuleProps {
  currentUser: User;
  events: Event[];
  showToast: (title: string, content: string, type: ToastMessage["type"]) => void;
}

const PACKAGES = [
  { id: "bronze", name: "Bronze", price: 10000, color: "#cd7f32", perks: ["Logo on website", "1 booth", "50 passes"] },
  { id: "silver", name: "Silver", price: 25000, color: "#94a3b8", perks: ["Logo on banners", "2 booths", "150 passes", "Social mention"] },
  { id: "gold", name: "Gold", price: 50000, color: "#f59e0b", perks: ["Stage branding", "4 booths", "500 passes", "Demo slot", "Email blast"] },
];

export default function SponsorModule({ currentUser, events, showToast }: SponsorModuleProps) {
  const [aiMatching, setAiMatching] = useState(false);
  const [matchResult, setMatchResult] = useState<string | null>(null);

  const runAiMatch = async () => {
    setAiMatching(true);
    setMatchResult(null);
    await new Promise(r => setTimeout(r, 1800));
    setMatchResult("Based on your audience profile (tech-savvy, 18–25), EventTech Hackathon 2025 shows a 94% brand-fit score. Recommended tier: Gold. Expected reach: 12,000+ impressions.");
    setAiMatching(false);
    showToast("AI Match Ready", "Your sponsor compatibility report is ready.", "success");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 bg-amber-500/10 border border-amber-500/20 rounded-lg flex items-center justify-center">
          <Briefcase size={16} className="text-amber-400" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-extrabold text-white">Sponsor Hub</h1>
          <p className="text-xs text-slate-500 font-mono">Welcome, <span className="text-amber-400">{currentUser.name}</span></p>
        </div>
      </div>

      {/* AI Matching CTA */}
      <div className="glass rounded-2xl p-6 border border-amber-500/15 space-y-4">
        <div className="flex items-center gap-2">
          <Zap size={15} className="text-amber-400" />
          <h2 className="font-display text-base font-bold text-white">AI Sponsor Matching</h2>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">
          Our Gemini-powered engine analyzes event audience demographics, past ROI data, and brand goals to surface your best-fit sponsorship opportunities.
        </p>
        <button
          onClick={runAiMatch}
          disabled={aiMatching}
          className="btn-primary flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold disabled:opacity-60"
        >
          {aiMatching ? (
            <><span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Analyzing…</>
          ) : (
            <><Zap size={12} /> Run AI Match</>
          )}
        </button>
        {matchResult && (
          <div className="bg-amber-500/8 border border-amber-500/20 rounded-xl p-4 text-xs text-amber-200 leading-relaxed animate-scale-in">
            {matchResult}
          </div>
        )}
      </div>

      {/* Events available */}
      <div>
        <h2 className="font-display text-base font-bold text-white mb-3">Open Events ({events.length})</h2>
        {events.length === 0 ? (
          <div className="glass rounded-2xl p-8 border border-white/5 text-center text-xs text-slate-500">No open events at the moment.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {events.slice(0, 4).map(event => (
              <div key={event.id} className="glass rounded-xl p-4 border border-white/5 space-y-2">
                <h3 className="font-display font-bold text-white text-sm">{event.title}</h3>
                {event.description && <p className="text-xs text-slate-400 line-clamp-2">{event.description}</p>}
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
                    {event.registrations ?? 0} registrations
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Packages */}
      <div>
        <h2 className="font-display text-base font-bold text-white mb-3">Sponsorship Packages</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PACKAGES.map(pkg => (
            <div key={pkg.id} className="glass rounded-2xl p-5 border space-y-3" style={{ borderColor: `${pkg.color}30` }}>
              <div>
                <p className="font-display text-lg font-extrabold" style={{ color: pkg.color }}>{pkg.name}</p>
                <p className="text-xs text-slate-400 font-mono">₹{pkg.price.toLocaleString()}</p>
              </div>
              <ul className="space-y-1">
                {pkg.perks.map(perk => (
                  <li key={perk} className="text-xs text-slate-300 flex items-center gap-1.5">
                    <span style={{ color: pkg.color }}>✓</span> {perk}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => showToast("Interest noted!", `Your interest in the ${pkg.name} package has been recorded.`, "info")}
                className="w-full text-xs font-semibold py-2 rounded-xl border transition-all hover:opacity-80"
                style={{ borderColor: `${pkg.color}40`, color: pkg.color, background: `${pkg.color}10` }}
              >
                Express Interest
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
