# Mango 🥭

Mango is a playful, friends-first social journal prototype inspired by Peach's final 2016–2017 feature set. It is being explored as a small private iPhone app for a close group of friends.

**Live prototype:** [mango-share-vividly.evan226987.chatgpt.site](https://mango-share-vividly.evan226987.chatgpt.site)

## What is here

- conversational onboarding
- friend-based navigation instead of a central feed
- chronological personal streams
- magic-word posting tools
- rich posts, likes, comments, waves, activity, and one-to-one chat
- Mango-branded splash screen, favicon, and Mangoball mini-game
- browser-local demo data that persists across reloads

## Run locally

Requires Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

To verify a production build:

```bash
npm run build
node --test tests/rendered-html.test.mjs
```

## Current status

This repository contains a polished interactive prototype, not yet a live multi-user network. The current data model is simulated in the browser and is intended to make the product direction tangible before investing in native and backend development.

Likely next steps are a native iPhone design pass, real accounts and invitations, shared persistence, private-network controls, push notifications, media storage, and TestFlight distribution.
