# MeriCloset — Frontend

MeriCloset is a personalized fashion shopping platform built as my BSc Computer Science final year project. It pulls products together from multiple brands and layers an AI recommendation/styling engine on top, so instead of browsing one store at a time, you get a single feed tailored to what you actually wear.

This repo is the client — React + TypeScript, talking to the [MeriCloset backend](https://github.com/saadamir1/mericloset-backend).

## What's in it

- **"For You" feed** — personalized product recommendations, powered by the backend's intelligence engine (collaborative filtering + content-based scoring, not just "sort by popular")
- **Outfit Builder** — put pieces together and get a completed look
- **Product comparison** — line up products from different brands side by side
- **Search & filtering** — by size, color, price, material
- **Wishlist & favorites**, with a dedicated wishlist checkout flow
- **Milo**, an in-app AI stylist chatbot (Gemini-backed) that recommends products conversationally
- **Checkout** — Stripe (card) and cash-on-delivery
- **Admin & Brand portals** — separate authenticated dashboards for platform admins and brand accounts to manage their own product catalogs
- **Personal closet** — data model and API exist end-to-end; there's no dedicated closet UI yet (noted here so it's not a surprise)
- Light/dark mode, responsive layout

## Stack

React 18 + TypeScript · Vite · Chakra UI (+ some MUI components) · Zustand · TanStack Query · React Router · Axios · Framer Motion · React Hook Form · Stripe.js

## Running it locally

You'll need the [backend](https://github.com/saadamir1/mericloset-backend) running too — this app doesn't do anything on its own without an API to talk to.

```bash
git clone https://github.com/saadamir1/mericloset.git
cd mericloset
npm install
```

Copy `.env.example` to `.env` (or `.env.development`) and point it at your backend:

```env
PORT=5173
VITE_API_BASE_URL=http://localhost:3000/api/v1
```

That's the only variable this app actually reads — there's no separate Stripe key needed on the frontend; checkout sessions are created server-side.

```bash
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server |
| `npm start` | Same, but auto-opens the browser |
| `npm run build` | Type-check + production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | ESLint |

## Project structure

```
src/
├── assets/          # images, icons
├── components/      # shared UI (NavBar, ProductCard, chatbot, admin-central/, brand-central/, ...)
├── pages/           # routed pages (HomePage, Wishlist, OutfitBuilderPage, admin-central/, brand-central/, ...)
├── entities/        # TypeScript types
├── hooks/           # custom hooks
├── services/        # API calls
├── store.ts         # main app state (Zustand)
├── userStore.ts     # auth state
├── comparisonStore.ts
├── theme.ts         # Chakra theme
├── config.ts        # API base URL / media URL helpers
└── routes.tsx
```

## Deployment

`npm run build` outputs a static bundle; `vercel.json` is already set up for SPA routing on Vercel. Just make sure `VITE_API_BASE_URL` in your Vercel project settings points at your deployed backend.

## About this project

Built by **Saad Amir** as a BSc Computer Science final year project — the goal was to go past a basic CRUD storefront and actually build a recommendation/personalization layer that does something (see the [backend's intelligence engine](https://github.com/saadamir1/mericloset-backend) for the interesting part).

- GitHub: [github.com/saadamir1](https://github.com/saadamir1)
- LinkedIn: [in/saadamir](https://linkedin.com/in/saadamir)