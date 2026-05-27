import React, { useState, useEffect, useCallback } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import { User, Event, Notification, ToastMessage } from "./types";
import RoleSelector from "./components/RoleSelector";
import OrganizerModule from "./components/OrganizerModule";
import VolunteerModule from "./components/VolunteerModule";
import SponsorModule from "./components/SponsorModule";
import ParticipantModule from "./components/ParticipantModule";
import Toast from "./components/Toast";
import LandingPage from "./components/landing/LandingPage";
import { useAuth } from "./context/AuthContext";
import RoleProtectedRoute from "./components/routes/RoleProtectedRoute";
import RoleSelection from "./pages/RoleSelection";
import Login from "./pages/Login";
import AnnouncementBanner from "./components/common/AnnouncementBanner";
import { Zap } from "lucide-react";

// Static — defined outside component to avoid useCallback dep churn
const ACCOUNT_EMAILS: Record<string, string> = {
  organizer: "organizer@eventtech.club",
  volunteer: "volunteer@eventtech.club",
  sponsor: "sponsor@google.com",
  participant: "mukundasaimothku@gmail.com",
};

export default function App() {
  const { currentUser, setCurrentUser, subRole, switchRole, logout } = useAuth();
  const [showLanding, setShowLanding] = useState(true);
  const [events, setEvents] = useState<Event[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const showToast = useCallback(
    (title: string, content: string, type: ToastMessage["type"]) => {
      const newToast: ToastMessage = {
        id: Math.random().toString(36).slice(2),
        type,
        title,
        content,
      };
      setToasts((prev) => [...prev, newToast]);
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const fetchEvents = useCallback(async () => {
    try {
      const res = await fetch("/api/events");
      if (res.ok) setEvents(await res.json());
    } catch {
      // API unavailable — silently ignore
    }
  }, []);

  const fetchNotifications = useCallback(
    async (userId: string, announce = false) => {
      try {
        const res = await fetch(`/api/notifications/${userId}`);
        if (res.ok) {
          const list: Notification[] = await res.json();
          if (announce) {
            setNotifications((prev) => {
              list
                .filter((n) => !prev.some((e) => e.id === n.id))
                .forEach((n) => showToast("Notification", n.content, "info"));
              return list;
            });
          } else {
            setNotifications(list);
          }
        }
      } catch {
        // Silently ignore
      }
    },
    [showToast]
  );

  const bootSession = useCallback(
    async (role: "organizer" | "volunteer" | "sponsor" | "participant") => {
      try {
        setLoading(true);
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: ACCOUNT_EMAILS[role] }),
        });
        const data = await res.json();
        if (res.ok) {
          setCurrentUser(data.user);
          // Fire-and-forget notification fetch — no circular dep
          fetch(`/api/notifications/${data.user.id}`)
            .then((r) => r.ok ? r.json() : [])
            .then((list: Notification[]) => setNotifications(list))
            .catch(() => {});
          showToast(
            "Authenticated",
            `Signed in as ${data.user.name} · ${data.user.role.toUpperCase()}`,
            "success"
          );
        } else {
          showToast("Auth failed", data.error || "Profile not found", "error");
        }
      } catch {
        showToast("Offline mode", "API server is not running — UI preview only.", "warning");
      } finally {
        setLoading(false);
      }
    },
    [setCurrentUser, showToast]
  );

  // Redirect logged-in users away from root/login
  useEffect(() => {
    if (currentUser) {
      setShowLanding(false);
      if (location.pathname === "/" || location.pathname === "/login") {
        if (currentUser.role === "organizer") {
          navigate("/dashboard/organizer", { replace: true });
        } else if (subRole) {
          navigate(`/dashboard/${subRole}`, { replace: true });
        } else {
          navigate("/select-role", { replace: true });
        }
      }
    } else {
      setShowLanding(true);
    }
  }, [currentUser, subRole, location.pathname, navigate]);

  // Fetch events on mount; poll notifications every 30s when logged in
  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  useEffect(() => {
    if (!currentUser) return;
    const interval = setInterval(() => {
      fetchNotifications(currentUser.id, true);
    }, 30_000);
    return () => clearInterval(interval);
  }, [currentUser, fetchNotifications]);

  const handleMarkNotificationsRead = useCallback(async () => {
    if (!currentUser) return;
    try {
      const res = await fetch(`/api/notifications/read/${currentUser.id}`, { method: "POST" });
      if (res.ok) fetchNotifications(currentUser.id, false);
    } catch {}
  }, [currentUser, fetchNotifications]);

  const refreshUserStats = useCallback(async () => {
    if (!currentUser) return;
    try {
      const res = await fetch("/api/users");
      if (res.ok) {
        const list: User[] = await res.json();
        const updated = list.find((u) => u.id === currentUser.id);
        if (updated) {
          setCurrentUser(updated);
          fetchNotifications(updated.id, false);
        }
      }
    } catch {}
  }, [currentUser, fetchNotifications, setCurrentUser]);

  const handleEnterApp = useCallback(
    async (role: "organizer" | "volunteer" | "sponsor" | "participant") => {
      await bootSession(role);
      if (role !== "organizer") switchRole(role);
      setShowLanding(false);
    },
    [bootSession, switchRole]
  );

  const Loader = () => (
    <div className="h-64 flex flex-col items-center justify-center gap-4">
      <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 animate-pulse">
        <Zap size={22} className="text-white" />
      </div>
      <div className="flex items-center gap-2 text-xs font-mono text-slate-600">
        <span className="w-4 h-4 border-2 border-blue-600/40 border-t-blue-500 rounded-full animate-spin" />
        Initializing session…
      </div>
    </div>
  );

  if (showLanding) {
    return (
      <Layout>
        <LandingPage onEnterApp={handleEnterApp} />
        <Toast toasts={toasts} removeToast={removeToast} />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-[#050a14] flex flex-col">
        {currentUser && <AnnouncementBanner eventId="event_1" />}

        {currentUser && (
          <RoleSelector
            currentUser={{
              ...currentUser,
              role:
                currentUser.role === "organizer"
                  ? "organizer"
                  : (subRole ?? "participant"),
            }}
            onUserSwitch={async (newRole) => {
              await bootSession(newRole);
              if (newRole !== "organizer") {
                switchRole(newRole);
                navigate(`/dashboard/${newRole}`);
              } else {
                navigate("/dashboard/organizer");
              }
            }}
            notifications={notifications}
            onMarkNotificationsRead={handleMarkNotificationsRead}
            onGoToLanding={() => {
              logout();
              setShowLanding(true);
              navigate("/");
            }}
          />
        )}

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-6">
          {loading ? (
            <Loader />
          ) : (
            <Routes>
              <Route
                path="/login"
                element={currentUser ? <Navigate to="/select-role" replace /> : <Login />}
              />

              <Route
                path="/"
                element={
                  currentUser ? (
                    currentUser.role === "organizer" ? (
                      <Navigate to="/dashboard/organizer" replace />
                    ) : subRole ? (
                      <Navigate to={`/dashboard/${subRole}`} replace />
                    ) : (
                      <Navigate to="/select-role" replace />
                    )
                  ) : (
                    <LandingPage onEnterApp={handleEnterApp} />
                  )
                }
              />

              <Route
                path="/select-role"
                element={
                  currentUser ? (
                    currentUser.role === "organizer" ? (
                      <Navigate to="/dashboard/organizer" replace />
                    ) : (
                      <RoleSelection />
                    )
                  ) : (
                    <Navigate to="/" replace />
                  )
                }
              />

              <Route
                path="/settings/role"
                element={
                  currentUser ? <RoleSelection isSettings /> : <Navigate to="/" replace />
                }
              />

              <Route
                path="/dashboard/organizer"
                element={
                  <RoleProtectedRoute allowedRoles={["organizer"]}>
                    <OrganizerModule
                      currentUser={currentUser!}
                      events={events}
                      onRefreshEvents={fetchEvents}
                      showToast={showToast}
                    />
                  </RoleProtectedRoute>
                }
              />

              <Route
                path="/dashboard/volunteer"
                element={
                  <RoleProtectedRoute allowedRoles={["volunteer"]}>
                    <VolunteerModule
                      currentUser={currentUser!}
                      onRefreshUser={refreshUserStats}
                      events={events}
                      showToast={showToast}
                    />
                  </RoleProtectedRoute>
                }
              />

              <Route
                path="/dashboard/sponsor"
                element={
                  <RoleProtectedRoute allowedRoles={["sponsor"]}>
                    <SponsorModule
                      currentUser={currentUser!}
                      events={events}
                      showToast={showToast}
                    />
                  </RoleProtectedRoute>
                }
              />

              <Route
                path="/dashboard/participant"
                element={
                  <RoleProtectedRoute allowedRoles={["participant"]}>
                    <ParticipantModule
                      currentUser={currentUser!}
                      onRefreshUser={refreshUserStats}
                      events={events}
                      showToast={showToast}
                    />
                  </RoleProtectedRoute>
                }
              />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          )}
        </main>

        <footer className="border-t border-white/5 px-4 md:px-8 py-5">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] font-mono text-slate-700">
            <span>EventTech Platform · React + Vite + Gemini AI</span>
            <div className="flex items-center gap-4">
              <span>Node + Express API</span>
              <span>·</span>
              <span>Tailwind CSS v3</span>
              <span>·</span>
              <span>Socket.IO Live</span>
            </div>
          </div>
        </footer>

        <Toast toasts={toasts} removeToast={removeToast} />
      </div>
    </Layout>
  );
}
