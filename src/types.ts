export interface User {
  id: string;
  name: string;
  email: string;
  role: "organizer" | "volunteer" | "sponsor" | "participant";
  avatar?: string;
  points?: number;
  badges?: string[];
  createdAt?: string;
}

export interface Event {
  id: string;
  title: string;
  description?: string;
  date?: string;
  venue?: string;
  organizerId?: string;
  status?: "draft" | "published" | "live" | "ended";
  registrations?: number;
  capacity?: number;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Notification {
  id: string;
  userId: string;
  content: string;
  read: boolean;
  type?: "info" | "success" | "warning" | "error";
  createdAt?: string;
}

export interface ToastMessage {
  id: string;
  type: "success" | "error" | "info" | "warning";
  title: string;
  content?: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  assignedTo?: string;
  status: "todo" | "in_progress" | "done";
  priority?: "low" | "medium" | "high";
  eventId?: string;
  createdAt?: string;
}

export interface SponsorPackage {
  id: string;
  name: string;
  tier: "bronze" | "silver" | "gold" | "platinum";
  price: number;
  perks: string[];
}
