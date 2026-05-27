import React, { useEffect } from "react";
import { X, CheckCircle2, AlertTriangle, Info, AlertCircle } from "lucide-react";
import { ToastMessage } from "../types";

interface ToastProps {
  toasts: ToastMessage[];
  removeToast: (id: string) => void;
}

const CONFIG = {
  success: { icon: CheckCircle2, accent: "#10b981", bg: "rgba(16,185,129,0.08)", border: "rgba(16,185,129,0.2)",  text: "#6ee7b7" },
  error:   { icon: AlertCircle,  accent: "#ef4444", bg: "rgba(239,68,68,0.08)",   border: "rgba(239,68,68,0.2)",  text: "#fca5a5" },
  warning: { icon: AlertTriangle,accent: "#f59e0b", bg: "rgba(245,158,11,0.08)",  border: "rgba(245,158,11,0.2)", text: "#fcd34d" },
  info:    { icon: Info,         accent: "#3b82f6", bg: "rgba(59,130,246,0.08)",  border: "rgba(59,130,246,0.2)", text: "#93c5fd" },
};

const AUTO_DISMISS_MS = 5000;

export default function Toast({ toasts, removeToast }: ToastProps) {
  useEffect(() => {
    if (toasts.length === 0) return;
    const latest = toasts[toasts.length - 1];
    const timer = setTimeout(() => removeToast(latest.id), AUTO_DISMISS_MS);
    return () => clearTimeout(timer);
  }, [toasts, removeToast]);

  return (
    <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const cfg = CONFIG[toast.type] ?? CONFIG.info;
        const Icon = cfg.icon;
        return (
          <div
            key={toast.id}
            role="alert"
            className="pointer-events-auto flex gap-3 p-4 rounded-2xl border backdrop-blur-xl shadow-2xl animate-scale-in"
            style={{
              background: "rgba(5,10,20,0.92)",
              borderColor: cfg.border,
              boxShadow: `0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px ${cfg.border}`,
            }}
          >
            <Icon size={16} style={{ color: cfg.accent }} className="shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white">{toast.title}</p>
              {toast.content && (
                <p className="mt-0.5 text-xs font-mono text-slate-400 leading-relaxed line-clamp-2">{toast.content}</p>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="shrink-0 text-slate-600 hover:text-white transition-colors mt-0.5"
              aria-label="Dismiss notification"
            >
              <X size={13} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
