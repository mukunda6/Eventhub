import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#050a14] text-slate-200 overflow-x-hidden">
      {children}
    </div>
  );
}
