# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm run dev       # Start dev server at localhost:3000
npm run build     # Build for production
npm run start     # Run production build
npm run lint      # Run ESLint

# Package manager: both npm and bun are present (bun.lock exists)
# npm is currently used for installs (package-lock.json is the canonical lock file)
```

No test suite is configured.

## Architecture

This is a single-page Next.js 15 (App Router) site for yoga instructor Mackenzie Homan ("Kenz"). It has no routing beyond the root `/` — everything is a single scrollable page.

**Page composition** (`src/app/page.tsx`): Sections rendered in order — `Navbar → Hero → SubscribeSection → MembershipSection → AboutSection → ExperienceSection → Footer`. Scroll-based navigation (no client-side routing).

**Data flow for membership signups:**
1. `MembershipSection` auto-opens `ContactPopup` after 2 seconds and exposes a manual trigger button.
2. `ContactPopup` POSTs `{ name, email }` to `/api/contact`.
3. `src/app/api/contact/route.ts` (Next.js Route Handler) validates input, inserts into Supabase `membership_signups` table via `supabaseAdmin`, then optionally sends an email notification via Resend.

**Supabase clients** (`src/lib/supabase.ts`):
- `supabase` — anon client for client-side use (uses `NEXT_PUBLIC_` keys)
- `supabaseAdmin` — service role client for server-side API routes only (uses `SUPABASE_SERVICE_ROLE_KEY`)

**Styling system:** Tailwind CSS with a custom theme defined in `globals.css` CSS variables and extended in `tailwind.config.ts`. Components use inline `style` props with hex values directly rather than Tailwind color classes — this is intentional and consistent throughout the codebase. The brand palette is documented in `colors.txt`.

Brand colors (use these hex values for inline styles):
- `#F2E8DE` — cream/background
- `#153F55` — dark teal/primary
- `#B97230` — amber/accent
- `#92A07F` — sage green
- `#3D5019` — dark green
- `#486668` — muted teal

**`ClientBody.tsx`** wraps `<body>` to suppress hydration warnings caused by browser extensions injecting classes.

**Hero videos:** Two `.webm` files in `public/videos/` — `Website.webm` (desktop) and `mobile_movie.webm` (portrait). CSS in `globals.css` toggles between them at the 768px breakpoint.

**`ImageSlider`** is a reusable component used in `SubscribeSection` and `ExperienceSection` for image carousels. Images live in `public/images/` with subdirectories per section.

**shadcn/ui** components are present in `src/components/ui/` but components in the codebase largely use raw HTML elements with Tailwind rather than the shadcn components.

## Environment Variables

Required in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=          # Optional — email notifications still work without it
```

The Supabase schema is in `supabase-schema.sql`. Setup instructions are in `SUPABASE_SETUP.md`.
