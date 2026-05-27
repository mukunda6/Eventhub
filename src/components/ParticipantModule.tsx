import React, { useState } from "react";
import { User, Event, ToastMessage } from "../types";
import { UserCheck, Ticket, Users, MessageCircle, RefreshCw } from "lucide-react";

interface ParticipantModuleProps {
  currentUser: User;
  events: Event[];
  onRefreshUser: () => void;
  showToast: (title: string, content: string, type: ToastMessage["type"]) => void;
}

export default function ParticipantModule({ currentUser, events, onRefreshUser, showToast }: ParticipantModuleProps) {
  const [registered, setRegistered] = useState<string[]>([]);

  const registerForEvent = (eventId: string, eventTitle: string) => {
    if (registered.includes(eventId)) {
      showToast("Already registered", `You're already registered for ${eventTitle}.`, "warning");
      return;
    }
    setRegistered(prev => [...prev, eventId]);
    showToast("Registered!", `Your QR ticket for "${eventTitle}" will be emailed shortly.`, "success");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-violet-500/10 border border-violet-500/20 rounded-lg flex items-center justify-center">
            <UserCheck size={16} className="text-violet-400" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-extrabold text-white">Attendee Hub</h1>
            <p className="text-xs text-slate-500 font-mono">Hey, <span className="text-violet-400">{currentUser.name}</span></p>
          </div>
        </div>
        <button onClick={onRefreshUser} className="h-8 w-8 glass border border-white/8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-colors">
          <RefreshCw size={13} />
        </button>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Registered", value: registered.length, icon: Ticket, color: "#8b5cf6" },
          { label: "Teams", value: 0, icon: Users, color: "#3b82f6" },
          { label: "Messages", value: 0, icon: MessageCircle, color: "#10b981" },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="glass rounded-2xl p-4 border border-white/5 space-y-1">
            <Icon size={14} style={{ color }} />
            <p className="font-display text-2xl font-extrabold" style={{ color }}>{value}</p>
            <p className="text-[10px] text-slate-500 font-mono">{label}</p>
          </div>
        ))}
      </div>

      {/* Event listings */}
      <div>
        <h2 className="font-display text-base font-bold text-white mb-3">Available Events</h2>
        {events.length === 0 ? (
          <div className="glass rounded-2xl p-12 border border-white/5 text-center">
            <Ticket size={32} className="text-slate-600 mx-auto mb-3" />
            <p className="text-slate-500 text-sm">No events available right now. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {events.map(event => {
              const isRegistered = registered.includes(event.id);
              return (
                <div
                  key={event.id}
                  className="glass rounded-2xl p-5 border border-white/5 hover:border-violet-500/20 transition-all space-y-3"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-display font-bold text-white">{event.title}</h3>
                      {event.status === "live" && (
                        <span className="shrink-0 text-[9px] font-mono bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">LIVE</span>
                      )}
                    </div>
                    {event.description && (
                      <p className="text-xs text-slate-400 line-clamp-2">{event.description}</p>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono text-slate-500">
                    {event.date && <span>{new Date(event.date).toLocaleDateString()}</span>}
                    {event.venue && <span>· {event.venue}</span>}
                    {event.registrations !== undefined && (
                      <span className="text-violet-400">· {event.registrations} registered</span>
                    )}
                  </div>

                  <button
                    onClick={() => registerForEvent(event.id, event.title)}
                    disabled={isRegistered}
                    className={`w-full text-xs font-semibold py-2.5 rounded-xl border transition-all ${
                      isRegistered
                        ? "border-emerald-500/25 bg-emerald-500/10 text-emerald-400 cursor-default"
                        : "border-violet-500/25 bg-violet-500/10 text-violet-400 hover:bg-violet-500/20 hover:border-violet-500/40"
                    }`}
                  >
                    {isRegistered ? "✓ Registered — QR Ticket Issued" : "Register & Get QR Ticket"}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Networking placeholder */}
      <div className="glass rounded-2xl p-6 border border-white/5 space-y-3">
        <div className="flex items-center gap-2">
          <MessageCircle size={15} className="text-violet-400" />
          <h2 className="font-display text-base font-bold text-white">Live Chat Hubs</h2>
        </div>
        <p className="text-xs text-slate-400">Join event-specific networking rooms to connect with other attendees, find teammates, and discuss ideas.</p>
        <button
          onClick={() => showToast("Coming soon", "Live chat hubs will be available once you register for an event.", "info")}
          className="text-xs font-semibold text-violet-400 hover:text-violet-300 border border-violet-500/25 px-4 py-2 rounded-xl hover:bg-violet-500/10 transition-all"
        >
          Browse Rooms
        </button>
      </div>
    </div>
  );
}
