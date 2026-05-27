# EventTechUnavailable 🚀
> **Ecosystem Management Platform for College Hackathons, Workshops, & Events**

EventTechUnavailable is a production-grade, multi-sided SaaS platform that replaces 10+ disconnected tools within the university event ecosystem with a unified, real-time command center.

The application is written in **TypeScript** using a full-stack **Express + React (Vite)** architecture, with **Tailwind CSS** styling and core intelligence powered by **Gemini 3.5 Flash** models via the official `@google/genai` Node.js SDK.

---

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
