import React, { useState } from "react";
import { User, Event, ToastMessage, Task } from "../types";
import { Award, CheckSquare, Clock, Star, RefreshCw } from "lucide-react";

interface VolunteerModuleProps {
  currentUser: User;
  events: Event[];
  onRefreshUser: () => void;
  showToast: (title: string, content: string, type: ToastMessage["type"]) => void;
}

const SAMPLE_TASKS: Task[] = [
  { id: "t1", title: "Set up registration desk", status: "todo", priority: "high" },
  { id: "t2", title: "Manage sponsor booth signage", status: "in_progress", priority: "medium" },
  { id: "t3", title: "Coordinate catering arrival", status: "done", priority: "low" },
  { id: "t4", title: "Help with tech setup on Stage A", status: "todo", priority: "high" },
];

const PRIORITY_COLORS = { high: "#ef4444", medium: "#f59e0b", low: "#10b981" };
const STATUS_CONFIG = {
  todo: { label: "To Do", color: "#64748b" },
  in_progress: { label: "In Progress", color: "#3b82f6" },
  done: { label: "Done", color: "#10b981" },
};

export default function VolunteerModule({ currentUser, onRefreshUser, showToast }: VolunteerModuleProps) {
  const [tasks, setTasks] = useState<Task[]>(SAMPLE_TASKS);

  const claimTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: "in_progress" as const } : t));
    showToast("Task claimed!", "The task has been moved to In Progress.", "success");
  };

  const completeTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: "done" as const } : t));
    showToast("Task completed!", "Great work! +50 points awarded.", "success");
  };

  const doneCount = tasks.filter(t => t.status === "done").length;
  const totalHours = doneCount * 2;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center justify-center">
            <Award size={16} className="text-emerald-400" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-extrabold text-white">Volunteer Portal</h1>
            <p className="text-xs text-slate-500 font-mono">Hey, <span className="text-emerald-400">{currentUser.name}</span></p>
          </div>
        </div>
        <button onClick={onRefreshUser} className="h-8 w-8 glass border border-white/8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-colors">
          <RefreshCw size={13} />
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Points", value: (currentUser.points ?? 0) + doneCount * 50, icon: Star, color: "#f59e0b" },
          { label: "Tasks Done", value: doneCount, icon: CheckSquare, color: "#10b981" },
          { label: "Hours Logged", value: totalHours, icon: Clock, color: "#3b82f6" },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="glass rounded-2xl p-4 border border-white/5 space-y-1">
            <Icon size={14} style={{ color }} />
            <p className="font-display text-2xl font-extrabold" style={{ color }}>{value}</p>
            <p className="text-[10px] text-slate-500 font-mono">{label}</p>
          </div>
        ))}
      </div>

      {/* Kanban-style task list */}
      <div>
        <h2 className="font-display text-base font-bold text-white mb-3">Your Tasks</h2>
        <div className="space-y-3">
          {tasks.map((task) => (
            <div key={task.id} className="glass rounded-xl p-4 border border-white/5 flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full"
                    style={{ background: `${PRIORITY_COLORS[task.priority]}15`, color: PRIORITY_COLORS[task.priority], border: `1px solid ${PRIORITY_COLORS[task.priority]}25` }}
                  >
                    {task.priority}
                  </span>
                  <span
                    className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full"
                    style={{ background: `${STATUS_CONFIG[task.status].color}15`, color: STATUS_CONFIG[task.status].color, border: `1px solid ${STATUS_CONFIG[task.status].color}25` }}
                  >
                    {STATUS_CONFIG[task.status].label}
                  </span>
                </div>
                <p className={`text-sm font-medium ${task.status === "done" ? "text-slate-500 line-through" : "text-slate-200"}`}>
                  {task.title}
                </p>
              </div>
              <div className="shrink-0">
                {task.status === "todo" && (
                  <button onClick={() => claimTask(task.id)} className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 border border-emerald-500/25 px-3 py-1.5 rounded-lg hover:bg-emerald-500/10 transition-all">
                    Claim
                  </button>
                )}
                {task.status === "in_progress" && (
                  <button onClick={() => completeTask(task.id)} className="text-xs font-semibold text-blue-400 hover:text-blue-300 border border-blue-500/25 px-3 py-1.5 rounded-lg hover:bg-blue-500/10 transition-all">
                    Complete
                  </button>
                )}
                {task.status === "done" && (
                  <span className="text-[10px] font-mono text-emerald-500">✓ Done</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
