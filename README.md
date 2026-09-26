# ELEV8 — Frontend

AI-powered retail transformation: *one product → multiple experiences.*
This repo holds the **frontend** (Next.js App Router, plain JavaScript). It's a responsive web app that works on desktop and phone. There is no backend yet: data lives in the browser (localStorage) and the AI steps are simulated.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

**Windows: "Turbopack is not supported on this platform" / "not a valid Win32 application"?**
Next.js's native compiler failed to load. Use the Webpack scripts instead:

```bash
npm run dev:webpack
npm run build:webpack && npm start
```

To get the faster default working again, reinstall clean: delete `node_modules`, run `npm cache clean --force`, then `npm install`. Make sure your Node.js is 64-bit and version 20.9 or newer.

**Layout:** on desktop (≥1024px) you get a sidebar and multi-column pages. On phones, pages go full width with a bottom navigation bar. Sign-up and onboarding use a split screen on desktop.

**What works:** adding products (photo upload or drag-and-drop), editing the detected attributes, reviewing and editing captions, approving, and scheduling or publishing posts (they show up on the calendar, home and analytics). You can also delete products, search, filter and sort them, and edit Brand Brain. Everything persists across reloads. Use *Profile → Reset demo data* to start over.

## Screens

| Flow | Routes |
|---|---|
| Onboarding | `/` splash · `/welcome` · `/signup` · `/onboarding/business` · `/onboarding/brand` |
| Workspace | `/home` · `/products` · `/products/new` · `/products/new/analyzing` · `/products/new/details` |
| Create content | `/create` · `/create/processing` · `/create/review` · `/create/feedback` · `/create/voice` · `/create/interpretation` · `/create/regenerating` · `/publish` |
| Virtual experience | `/experience` · `/experience/try-on` (live camera) · `/experience/model` · `/experience/model/view` · `/experience/360` |
| Grow | `/calendar` · `/analytics` · `/brand` · `/profile` |

## Structure

```
src/
  app/            one folder per route (page.js), globals.css holds design tokens
  components/     AppShell (sidebar + bottom nav), AuthLayout, Screen/TopBar, GarmentArt, Charts, calendar…
  lib/
    store.js      React context: business, brand, products, posts + actions (persisted to localStorage)
    hooks.js      useSequence / useCountUp for the simulated AI progress screens
    posts.js      calendar helpers
```

## Notes for wiring up the backend

- **Product imagery** is drawn by `components/GarmentArt.js` (SVG illustrations). Swap it for `<img>` tags once the AI image/video generator returns real assets.
- **AI progress screens** (`analyzing`, `processing`, `regenerating`) advance on timers via `useSequence`. Drive them from job status instead.
- **Live try-on** (`/experience/try-on`) already opens the device camera with `getUserMedia` and lays a garment overlay on top. It falls back to an illustrated model when the camera is unavailable. The real body-tracking/cloth model plugs in here, and the same screen can later run on the smart mirror.
- **Voice** (`/create/voice`) shows a simulated transcript. Replace it with speech-to-text.
