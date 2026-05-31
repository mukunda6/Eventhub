
<div align="center">

# 🚀 EventTech Platform

### The Intelligent Event Ecosystem for Modern College Events

<p align="center">
  <img src="https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/TypeScript-Ready-blue?style=for-the-badge&logo=typescript" />
  <img src="https://img.shields.io/badge/Vite-5-purple?style=for-the-badge&logo=vite" />
  <img src="https://img.shields.io/badge/TailwindCSS-3-38BDF8?style=for-the-badge&logo=tailwindcss" />
  <img src="https://img.shields.io/badge/Socket.io-RealTime-black?style=for-the-badge&logo=socketdotio" />
  <img src="https://img.shields.io/badge/Gemini-AI-orange?style=for-the-badge&logo=google" />
</p>

# ⚡ Unique Selling Points

<div align="center">

| 🚀 Feature | 💡 Description |
|---|---|
| Automatic Poster Generation | AI-powered instant event poster creation system |
| QR-Based Verification | Secure QR verification for tickets & certificates |
| Real-Time QR Check-In | Live attendee counter updates instantly |
| Gemini AI Matching | AI-powered sponsor-event compatibility |
| Automated Certificates | Zero-touch PDF generation system |
| Volunteer Gamification | Reputation scores, badges & leaderboards |
| Multi-Role Accounts | One account with multiple role switching |
| WebSocket Sync | Real-time Kanban & announcements |
| HMAC Security | Cryptographically signed QR tokens |
| Production Architecture | Scalable modern SaaS infrastructure |

</div>
### ⚡ Four Roles • One Platform • Zero Spreadsheets

A production-ready AI-powered event management SaaS platform built for hackathons, workshops, tech fests, seminars, and college events.

</div>

---

# 🌟 Overview

Managing college events today means juggling:

- Google Forms 📄
- WhatsApp Groups 💬
- Excel Sheets 📊
- Manual Certificates 🏅
- Cold Sponsor Outreach 📧

EventTech eliminates fragmented workflows and replaces them with one unified intelligent ecosystem powered by:

✅ AI Automation  
✅ Real-Time Systems  
✅ QR Infrastructure  
✅ Analytics Dashboards  
✅ Multi-Role Architecture  
✅ Live Collaboration  

---

# 🎯 Core Modules

## 🧑‍💼 Organizer Dashboard
Powerful admin ecosystem for managing entire events.

### Features
- Multi-Step Event Creation Wizard
- Live QR Check-In Dashboard
- Volunteer Hiring & Management
- AI Sponsor Discovery
- Budget Tracking & Analytics
- Certificate Automation
- Communication Hub
- Real-Time Metrics

---

## 🏆 Volunteer Ecosystem
Transforms volunteering into a career portfolio.

### Features
- Skill-Based Profiles
- Achievement Badge System
- Reputation Score
- Leaderboards
- Personal Task Kanban
- Public Volunteer Portfolio
- Certificate Wallet
- Skill Endorsements

---

## 💼 Sponsor Marketplace
AI-powered sponsorship intelligence system.

### Features
- AI Event Matching
- ROI Tracking Dashboard
- Sponsorship Marketplace
- Smart Proposal Tracking
- Package Builder
- Industry-Based Discovery
- Analytics Reports

---

## 🎫 Participant Experience
Modern attendee-first event experience.

### Features
- Smart Registration System
- QR Digital Tickets
- Live Event Announcements
- Networking Hub
- Team Formation Board
- Session Reminders
- Instant Certificates

---

# ⚡ Unique Selling Points

<div align="center">

| 🚀 Feature | 💡 Description |
|---|---|
| Real-Time QR Check-In | Live attendee counter updates instantly |
| Gemini AI Matching | AI-powered sponsor-event compatibility |
| Automated Certificates | Zero-touch PDF generation system |
| Volunteer Gamification | Reputation scores, badges & leaderboards |
| Multi-Role Accounts | One account with multiple role switching |
| WebSocket Sync | Real-time Kanban & announcements |
| HMAC Security | Cryptographically signed QR tokens |
| Production Architecture | Scalable modern SaaS infrastructure |

</div>

---

# 🛠 Tech Stack

## Frontend
```bash
React 19
TypeScript
Vite 5
Tailwind CSS 3
Framer Motion
React Router v6
Lucide React
```

## Backend
```bash
Spring Boot
JWT Authentication
REST APIs
Socket.io
PostgreSQL
```

## AI & Automation
```bash
Gemini API
Puppeteer
QR Generation
HMAC-SHA256
```

## Deployment
```bash
Vercel
Netlify
Nginx
GitHub Actions
```

---

# 👥 User Roles

| Role | Route | Access |
|---|---|---|
| Organizer | `/dashboard/organizer` | Event operations & analytics |
| Volunteer | `/dashboard/volunteer` | Tasks & achievements |
| Sponsor | `/dashboard/sponsor` | ROI & AI sponsor matching |
| Participant | `/dashboard/participant` | Registration & networking |

---

# 📂 Project Structure

```bash
src
│
├── components
│   ├── common
│   ├── landing
│   ├── routes
│   ├── Layout.tsx
│   ├── OrganizerModule.tsx
│   ├── VolunteerModule.tsx
│   ├── SponsorModule.tsx
│   └── ParticipantModule.tsx
│
├── context
│   └── AuthContext.tsx
│
├── pages
│   ├── Login.tsx
│   └── RoleSelection.tsx
│
├── App.tsx
├── main.tsx
├── types.ts
└── index.css
```

---

# ⚙️ Getting Started

## 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/eventtech-platform.git
cd eventtech-platform
```

---

## 2️⃣ Install Dependencies

```bash
npm install
```

---

## 3️⃣ Configure Environment Variables

Create a `.env` file in the root directory.

```env
VITE_API_BASE_URL=http://localhost:3001
VITE_APP_ENV=development
```

---

## 4️⃣ Run Development Server

```bash
npm run dev
```

Frontend:

```bash
http://localhost:5173
```

Backend:

```bash
http://localhost:3001
```

---

# 🏗 Production Build

## Build Application

```bash
npm run build
```

---

## Preview Production Build

```bash
npm run preview
```

---

# 🚀 Deployment

## Vercel / Netlify

### Build Configuration

```bash
Build Command: npm run build
Output Directory: dist
```

---

## SPA Redirect Support

Create:

```bash
public/_redirects
```

Add:

```bash
/* /index.html 200
```

---

# 🌐 Nginx Configuration

```nginx
server {
    listen 80;
    root /var/www/eventtech-platform/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
    }
}
```

---

# 🔐 Security Features

- JWT Authentication
- Role-Based Access Control
- HMAC-Signed QR Tokens
- Secure API Protection
- Anti-Duplicate Check-In Logic
- Protected Certificate Verification
- Secure Route Middleware

---

# 📡 Real-Time Features

## Live QR Check-In
Participant scans QR → Backend validates token → Organizer dashboard updates instantly.

---

## WebSocket Kanban Sync
Task updates reflect live across all organizer & volunteer dashboards.

---

## Live Event Feed
Announcements broadcast instantly to all attendees without refresh.

---

# 🤖 AI-Powered Features

## Gemini Sponsor Matching
AI analyzes:

- Audience demographics
- Industry fit
- Budget compatibility
- Event categories

Returns:
- Match Score
- Compatibility Analysis
- Sponsorship Suggestions

---

# 🏅 Automated Certificate Engine

Organizer clicks:

```bash
Close Event
```

System automatically:

✅ Generates PDFs  
✅ Embeds QR Verification  
✅ Sends Email Certificates  
✅ Stores Wallet Access  

Zero manual work required.

---

# 📊 Analytics Dashboard

Track:

- Registrations
- Check-In Rates
- Volunteer Performance
- Sponsor ROI
- Budget Breakdown
- Event Funnel Analytics

---

# 🔑 Demo Accounts

| Role | Email | Password |
|---|---|---|
| Organizer | organizer@eventtech.club | demo1234 |
| Volunteer | volunteer@eventtech.club | demo1234 |
| Sponsor | sponsor@sponsor.com | demo1234 |
| Participant | participant@eventtech.club | demo1234 |

---

# 📈 Future Enhancements

- Mobile Application
- Payment Gateway Integration
- AI Chat Assistant
- Push Notifications
- Event Recommendation Engine
- Multi-Language Support
- Advanced AI Analytics

---

# 🤝 Contributing

```bash
# Fork repository

# Create feature branch
git checkout -b feature-name

# Commit changes
git commit -m "Added feature"

# Push branch
git push origin feature-name

# Open Pull Request
```

---

# 📜 License

Licensed under the MIT License.

---

# 👨‍💻 Author

<div align="center">

## Mukunda Sai

B.Tech CSE Student • Full Stack Developer • AI Enthusiast

Building scalable AI-powered modern web applications.

</div>

---

<div align="center">

# ⭐ Final Vision

### “The Future of College Event Management.”

EventTech is not just another event platform.

It is a complete intelligent ecosystem designed to modernize event operations using AI, automation, analytics, and real-time experiences.

</div>

## 🎨 Creative Architecture Blueprint

```
                     +------------------------------------------------+
                     |              React Frontend SPA                |
                     | (Organizer, Volunteer, Sponsor, Participant)   |
                     +-----------------------+------------------------+
                                             |
                                             | REST HTTP Requests
                                             v
                     +------------------------------------------------+
                     |              Express API Portal                |
                     |             (server.ts Controller)             |
                     +---+-------------------+--------------------+---+
                         |                   |                    |
                         | Lazy init         | Local JSON Sync    | Public Checkups
                         v                   v                    v
             +-----------------------+  +------------------+  +-----------------------+
             |   Gemini 3.5 AI Core  |  |    Active DB     |  |    Ticket QR Code     |
             |   Sponsor Matching    |  |  (server_db.json)|  |  Certificate Verifier |
             +-----------------------+  +------------------+  +-----------------------+
```

---

## 💾 Relational Database Schema & Prisma Models

Below is the production-grade PostgreSQL Schema declared as programmatic **Prisma models** describing the relations between users, tickets, budgets, Kanban tasks, and signed academic certificates:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum UserRole {
  organizer
  volunteer
  sponsor
  participant
}

enum EventStatus {
  draft
  published
  active
  completed
}

enum TaskStatus {
  backlog
  in_progress
  review
  done
}

enum TaskPriority {
  low
  medium
  high
}

enum TicketPass {
  free
  early_bird
  general
  vip
}

model User {
  id               String            @id @default(uuid())
  email            String            @unique
  name             String
  role             UserRole          @default(participant)
  skills           String[]          @default([])
  reputation_score Int               @default(0)
  volunteer_hours  Int               @default(0)
  badges           String[]          @default([])
  company          String?
  industry         String[]          @default([])
  budgetRange      String?
  created_at       DateTime          @default(now())

  // Relationships
  events           Event[]           @relation("OrganizerEvents")
  registrations    Registration[]
  assignedTasks    Task[]            @relation("VolunteerTasks")
  proposals        SponsorProposal[] @relation("SponsorProposals")
  certificates     Certificate[]
  notifications    Notification[]
}

model Event {
  id               String            @id @default(uuid())
  organizer_id     String
  title            String
  description      String            @db.Text
  type             String            @default("hackathon")
  status           EventStatus       @default(published)
  capacity         Int               @default(150)
  location         String
  start_date       String
  end_date         String
  tags             String[]          @default([])
  accentColor      String            @default("indigo")

  // Relationships
  organizer        User              @relation("OrganizerEvents", fields: [organizer_id], references: [id], onDelete: Cascade)
  registrations    Registration[]
  tasks            Task[]
  packages         SponsorPackage[]
  proposals        SponsorProposal[]
  budgetItems      BudgetItem[]
}

model Registration {
  id              String      @id @default(uuid())
  event_id        String
  user_id         String
  ticket_type     TicketPass  @default(general)
  qr_code         String      @unique
  check_in_status Boolean     @default(false)
  check_in_time   DateTime?
  payment_status  String      @default("free")
  created_at      DateTime    @default(now())

  // Relationships
  event           Event       @relation(fields: [event_id], references: [id], onDelete: Cascade)
  user            User        @relation(fields: [user_id], references: [id], onDelete: Cascade)
}

model Task {
  id          String       @id @default(uuid())
  event_id    String
  assignee_id String?
  title       String
  description String       @db.Text
  status      TaskStatus   @default(backlog)
  priority    TaskPriority @default(medium)
  deadline    String
  category    String       @default("operations")

  // Relationships
  event       Event        @relation(fields: [event_id], references: [id], onDelete: Cascade)
  assignee    User?        @relation("VolunteerTasks", fields: [assignee_id], references: [id], onDelete: SetNull)
}

model SponsorPackage {
  id           String            @id @default(uuid())
  event_id     String
  tier         String            // bronze, silver, gold, platinum
  price        Float
  deliverables String[]          @default([])
  isAvailable  Boolean           @default(true)

  // Relationships
  event        Event             @relation(fields: [event_id], references: [id], onDelete: Cascade)
  proposals    SponsorProposal[]
}

model SponsorProposal {
  id         String   @id @default(uuid())
  sponsor_id String
  event_id   String
  package_id String
  status     String   @default("pending") // pending, approved, declined
  created_at DateTime @default(now())

  // Relationships
  sponsor    User           @relation("SponsorProposals", fields: [sponsor_id], references: [id], onDelete: Cascade)
  event      Event          @relation(fields: [event_id], references: [id], onDelete: Cascade)
  package    SponsorPackage @relation(fields: [package_id], references: [id], onDelete: Cascade)
}

model BudgetItem {
  id          String   @id @default(uuid())
  event_id    String
  type        String   // income or expense
  category    String
  description String
  amount      Float
  date        String

  // Relationships
  event       Event    @relation(fields: [event_id], references: [id], onDelete: Cascade)
}

model Certificate {
  id              String   @id @default(uuid())
  user_id         String
  user_name       String
  event_id        String
  event_title     String
  type            String   @default("participation") // participation, excellence, volunteer
  qr_verify_token String   @unique
  issued_at       DateTime @default(now())

  // Relationships
  user            User     @relation(fields: [user_id], references: [id], onDelete: Cascade)
}

model Notification {
  id         String   @id @default(uuid())
  user_id    String
  type       String   // info, alert, badge, task
  title      String
  content    String   @db.Text
  read       Boolean  @default(false)
  created_at DateTime @default(now())

  // Relationships
  user       User     @relation(fields: [user_id], references: [id], onDelete: Cascade)
}
```

---

## 🛠️ Complete Local Installation & Run Guide

### 1. Configure the Environment Layout
Copy `.env.example` into a local `.env` and fill out credentials:
```bash
cp .env.example .env
```
*Note: Include your `GEMINI_API_KEY` to activate real-time Gemini AI capabilities in corporate matching.*

### 2. Launch Development Microserver
Spawn the hot-reloading Express master server with TypeScript types support on port `3000`:
```bash
npm run dev
```

### 3. Build & Package standalones
Compile the React bundle and transpile the Express entry point server using `esbuild`:
```bash
npm run build
```

---

## 🐳 Docker Container & DevOps Config

To deploy EventTechUnavailable seamlessly across Vercel, Railway, Render, or AWS ECS, use the config structures provided below:

### 📄 Dockerfile
```dockerfile
# Use precise LTS slim node container
FROM node:18-slim AS builder

WORKDIR /app

# Pre-install dependencies list
COPY package*.json ./
RUN npm ci

# Copy full bundle resources
COPY . .

# Compile and package binaries
RUN npm run build

# Production staging
FROM node:18-slim AS runner
WORKDIR /app
ENV NODE_ENV=production

# Install essential dependencies
COPY package*.json ./
RUN npm ci --only=production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server_db.json ./server_db.json

EXPOSE 3000

CMD ["node", "dist/server.cjs"]
```

### 📄 Github Actions Workflow (`.github/workflows/deploy.yml`)
```yaml
name: EventTechUnavailable CI/CD

on:
  push:
    branches: [ main ]

jobs:
  validate-and-pack:
    runs-on: ubuntu-latest
    steps:
    - name: Clone Repository
      uses: actions/checkout@v3

    - name: Provision Node Runtime
      uses: actions/setup-node@v3
      with:
        node-version: 18
        cache: 'npm'

    - name: Pull Dependencies
      run: npm ci

    - name: Run Build Diagnostics
      run: npm run build
```

---

## 🏁 Hackathon Demo Walkthrough & Interactive Scripts

The UI features a **"Demo Multi-Role Persona Switcher"** inside the top navigation header bar to easily demonstrate the platform’s connected workflows to judges:

1. **Attendee Hub (Mukunda Sai Mothku)**:
   - Go to **Catalog Discovery** and click **Book Ticket Pass** for the AI LLM Workshop.
   - Go to **My Passes & Certificates** to view your ticket pass containing unique security QR keys (`TICK_...`).

2. **Organizer Terminal (Mukunda mothku)**:
   - Select **National College Hackathon 2026** on the sidebar.
   - Under **Attendee QR Check-In**, click **Simulate Scan** next to Mukunda Sai's registration. The live checked-in count ticker increments instantly!
   - Under **Digital Certificates Wallet**, click **Bulk Create & Issue Verified Certificates**. This issues a blockchain-like credential in seconds.
   - Under **Budget Ledger**, type a category line and click **Add Ledger entry** to verify the balance recalculating.

3. **Volunteer Portal (Aarav Sharma)**:
   - View your points and badges.
   - Under the **Scrumboard Column**, click **Claim Block** or **Submit Review** to move tasks from Backlog to Done. On completion, earn reputation points (+25 / +40 pts) and hours, immediately unlocking achievements in your badges wallet!

4. **Sponsor Hub (Google Developer Relations)**:
   - Select **AI & LLM Intensive Workshop** in the marketplace.
   - Click **Compute Gemini AI Match**. This triggers a live query to standard Gemini models, returning match percentages, assessments, fit rationales, and activation action ideas.
   - Click **Dispatch Proposal Contract** for Gold tier. When the organizer approves it, the budget ledger automatically logs the cash flow income!