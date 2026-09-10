# Rudy Hamame — Portfolio

Dark, minimal portfolio. React + Vite + React Router.

Routes:
- `/` — home (about, what I build, method, contact)
- `/projects` — dedicated projects page with three tabs
  (`/projects/website`, `/projects/web-app`, `/projects/android`)

## Develop

This folder lives on an exFAT drive, which can't hold symlinks, so install with
`--no-bin-links` and the npm scripts call Vite via `node` directly.

```bash
npm install --no-bin-links
npm run dev
```

## Build

```bash
npm run build      # outputs to dist/
npm run preview    # serve the production build locally
```

## Editing content

All copy lives in [`src/data.js`](src/data.js):

- `profile` — name, title, tagline, and links. **Fill in the real `github` and
  `linkedin` URLs** (currently placeholders).
- `about` — bio paragraphs.
- `skills` — the pill list.
- `projects` — project cards on the home teaser (unused now that `/projects`
  exists, kept for reference).
- `projectsPage.tabs` — the three tabs on `/projects`:
  - `website` / `web-app`: set `url` to a deployed site (embedded in an iframe
    with an "open in new tab" link). Optionally set `screenshot` to a file in
    `public/shots/`.
  - `android`: see below.

Drop your résumé at `public/resume.pdf` so the Contact link resolves.

## Android tab (the phone on /projects/android)

Streams the local `portfolio` Android emulator through ws-scrcpy inside the
phone frame, with a **Download the APK** button. Both processes must be running.

Start the emulator in one terminal:

```bash
/home/rudy/Android/Sdk/emulator/emulator -avd portfolio -port 5554 -no-window -no-audio
```

Start the existing streaming server in another terminal:

```bash
cd /home/rudy/ws-scrcpy-host/dist
node index.js
```

Check `adb devices`: `emulator-5554` must show `device`, not `offline`.
Wait for `adb -s emulator-5554 shell getprop sys.boot_completed` to return `1`
before starting the streaming server after a cold boot.

The demo emulator uses a 720×1600 display override at 280 dpi, with animations
disabled, to reduce software-rendering load on this host. To reapply:

```bash
adb -s emulator-5554 shell wm size 720x1600
adb -s emulator-5554 shell wm density 280
adb -s emulator-5554 shell settings put global window_animation_scale 0
adb -s emulator-5554 shell settings put global transition_animation_scale 0
adb -s emulator-5554 shell settings put global animator_duration_scale 0
```

The configured demo URL uses the MSE player for the local HTTP stream.
The portfolio adds `?portfolio=1` to the iframe URL. The local ws-scrcpy frontend
in `/home/rudy/ws-scrcpy-host` supports this layout: a 52px control column with
a 24px gap sits outside the phone bezel. After changing that frontend, run
`npm run dist:prod` in its directory. Other streaming URLs keep their usual layout.
The private LAN URL works only where this machine is reachable; a public HTTPS
portfolio needs a separately configured HTTPS streaming service.

- Put the APK at `public/downloads/app-debug.apk` (or change `apkUrl` in
  `projectsPage.tabs[2].android`).
- Set `android.liveUrl` in `src/data.js` to change the streaming address, or
  leave it empty to show the offline message.

## Client portal + AI assistant (`server/`)

`/portal` lets clients sign up, submit a project request, and follow its
progress. Each request has a status timeline and file uploads. A Claude-powered
assistant (`src/components/ChatBot.jsx`) does three jobs: answer questions about
services, help scope a rough idea into a request, and answer status questions on
an existing request.

This needs the backend in [`server/`](server/) — Node/Express + MongoDB.

### Run it

```bash
cd server
npm install --no-bin-links
cp .env.example .env      # then fill in the values (see below)
npm start                 # -> http://localhost:8600
```

Frontend side: copy `.env.example` to `.env` and set `VITE_API_URL` to the
backend URL, then `npm run dev` / `npm run build` as usual.

### `server/.env`

- `MONGO_URI` — local MongoDB (`mongodb://127.0.0.1:27017/portfolio`). Mongo is
  running on this machine; for a remote deploy, point it at that host's Mongo or
  a free [Atlas](https://www.mongodb.com/cloud/atlas) cluster.
- `JWT_SECRET` — `openssl rand -hex 32`.
- `ADMIN_EMAIL` — the account that signs up with this email becomes the admin:
  sees every request, posts updates, changes status. Everyone else is a client.
- `ANTHROPIC_API_KEY` — from <https://console.anthropic.com/settings/keys>.
- `CHAT_MODEL` — defaults to `claude-opus-5`. For a high-traffic FAQ bot,
  `claude-haiku-4-5` costs ~5× less; `claude-sonnet-5` is in between.
- `CLIENT_ORIGIN` — comma-separated list of frontend origins (CORS).

### Deploy the backend

Needs an always-on host (not static): Render / Railway / Fly / a VPS. Set the
same env vars there. File uploads go to `server/uploads/` on local disk — fine
for a VPS, but move to S3/R2 if the host has an ephemeral filesystem.

## Deploy

Static host, but it needs an **SPA fallback** (every path serves `index.html`)
so `/projects` works on refresh. Config is already included:

- **Netlify:** `public/_redirects` handles it. Build `npm run build`, publish `dist`.
- **Vercel:** `vercel.json` handles it.
- **GitHub Pages / other:** add a catch-all that rewrites unknown paths to
  `/index.html`, or copy `dist/index.html` to `dist/404.html`.
