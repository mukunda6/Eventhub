import React, { useState, useEffect } from "react";
import { Megaphone, X } from "lucide-react";

interface AnnouncementBannerProps {
  eventId?: string;
}

export default function AnnouncementBanner({ eventId }: AnnouncementBannerProps) {
  const [announcement, setAnnouncement] = useState<string | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (!eventId) return;
    fetch(`/api/events/${eventId}/announcement`)
      .then((r) => r.ok ? r.json() : null)
      .then((data) => {
        if (data?.message) setAnnouncement(data.message);
      })
      .catch(() => {});
  }, [eventId]);

  if (!announcement || dismissed) return null;

  return (
    <div className="w-full bg-blue-600/10 border-b border-blue-500/20 px-4 md:px-8 py-2.5 flex items-center gap-3">
      <Megaphone size={13} className="text-blue-400 shrink-0" />
      <p className="text-xs text-blue-200 flex-1 leading-relaxed">{announcement}</p>
      <button
        onClick={() => setDismissed(true)}
        className="text-slate-500 hover:text-white transition-colors shrink-0"
        aria-label="Dismiss announcement"
      >
        <X size={13} />
      </button>
    </div>
  );
}
