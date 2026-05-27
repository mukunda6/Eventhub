# EventTech Platform — Frontend

A production-ready college event management SaaS built with React + Vite + Tailwind CSS + Framer Motion.

## Tech Stack

- **React 19** + TypeScript
- **Vite 5** (build & dev server)
- **Tailwind CSS 3** (utility styling)
- **Framer Motion** (animations)
- **React Router v6** (client-side routing)
- **Lucide React** (icons)

## Roles

| Role | Dashboard | Access |
|---|---|---|
| Organizer | `/dashboard/organizer` | Event management, volunteer oversight, analytics |
| Volunteer | `/dashboard/volunteer` | Kanban tasks, hours log, badge system |
| Sponsor | `/dashboard/sponsor` | AI matching, ROI tracking, package selection |
| Attendee | `/dashboard/participant` | Event registration, QR tickets, team builder |

## Getting Started

```bash
# Install dependencies
npm install

# Start development server (requires backend at localhost:3001)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `VITE_API_BASE_URL` | Backend API base URL |
| `VITE_APP_ENV` | `development` or `production` |

## Production Deployment

### Vercel / Netlify

1. Connect your Git repo
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Add environment variables from `.env.example`
5. For SPA routing, add a redirect rule: `/* → /index.html` (200)

### Netlify `_redirects` file (auto SPA routing)

Create `public/_redirects`:
```
/* /index.html 200
```

### Nginx

```nginx
server {
    listen 80;
    root /var/www/eventtechunavailable-redesign/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Demo Accounts

| Role | Email | Password |
|---|---|---|
| Organizer | `organizer@eventtech.club` | `demo1234` |
| Volunteer | `volunteer@eventtech.club` | `demo1234` |
| Sponsor | `sponsor@google.com` | `demo1234` |
| Attendee | `mukundasaimothku@gmail.com` | `demo1234` |

## Project Structure

```
src/
├── components/
│   ├── common/          # Shared UI (AnnouncementBanner)
│   ├── landing/         # LandingPage
│   ├── routes/          # RoleProtectedRoute
│   ├── Layout.tsx
│   ├── RoleSelector.tsx  (navbar)
│   ├── Toast.tsx
│   ├── OrganizerModule.tsx
│   ├── VolunteerModule.tsx
│   ├── SponsorModule.tsx
│   └── ParticipantModule.tsx
├── context/
│   └── AuthContext.tsx
├── pages/
│   ├── Login.tsx
│   └── RoleSelection.tsx
├── types.ts
├── App.tsx
├── main.tsx
└── index.css
```
