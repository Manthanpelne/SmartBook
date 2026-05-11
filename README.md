# 🔖 BookMark | Real-Time Bookmark Manager

A Real time bookmark manager built for speed and focus. This project was developed as a technical assessment focusing on real-time synchronization, secure data architecture, and modern UI/UX.

**Live Demo:** https://smart-book-plum.vercel.app/

## ✨ Key Features

- **Google OAuth:** Secure authentication via Supabase Auth and Google Identity.
- **Real-Time Sync:** Bookmarks update instantly across all open tabs/devices using Supabase PostgreSQL replication.
- **Smart Search:** Instant, zero-latency filtering of your bookmark library.
- **Private Data Architecture:** User privacy is enforced via PostgreSQL Row Level Security (RLS).
- **Apple-Sleek UI:** High-end aesthetic using Glassmorphism, Bento-box layouts, and a "Silver" color palette.
- **Micro-interactions:** Interactive "Sonner" notifications and Radix-based accessible dialogs for a premium feel.

## 🛠️ Technical Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Database & Auth:** Supabase (PostgreSQL)
- **Styling:** Tailwind CSS
- **Components:** Radix UI (Alert Dialog), Sonner (Toasts)
- **Icons:** Lucide React

## 🔒 Security & Architecture Decisions

### 1. Database-Level Protection (RLS)
Security is enforced at the database level. I implemented **Row Level Security (RLS)** policies that ensure users can only `SELECT`, `INSERT`, and `DELETE` rows where the `user_id` matches the authenticated user's ID (`auth.uid()`). This prevents unauthorized data access even if the client-side code is bypassed.

### 2. Optimized Real-Time Engine
Instead of expensive polling or frequent re-fetching, the app utilizes a **Postgres Changes** subscription via Supabase Realtime. This minimizes server load and provides a "native app" experience where changes reflect across devices in milliseconds.

### 3. Server-First Auth Flow
Used Next.js Middleware and Server Components to handle authentication states. This eliminates "Layout Shift" during auth checks and ensures that protected routes are gated before the page even reaches the browser.

### 4. Smart Favicon Fetching
Implemented a dynamic favicon resolver using Google's S2 service, providing a visual identity for each bookmark without requiring the user to manually upload images.


### Challenges Faced & Solutions

The Problem: During deployment, I noticed that while data persisted in the database, the UI wouldn't update in real-time on Vercel unless the page was refreshed. Curiously, DELETE worked fine, but INSERT wouldn't trigger a broadcast to other tabs.

The Root Cause: This was a two-fold issue: Supabase's default replication settings weren't sending the full row data, and the production environment was filtering "self-broadcasts."

The Solution: I used the SQL Editor to set the table's replica identity to FULL (ALTER TABLE bookmarks REPLICA IDENTITY FULL) and updated the frontend channel configuration to { config: { broadcast: { self: true } } }. This ensured the database shouted the entire bookmark object to all listening clients instantly.



## 🚀 Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Manthanpelne/SmartBook
   npm install
   npm run dev
