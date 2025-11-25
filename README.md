# F1 Manager Simulation

A lightweight Formula 1 management sandbox built with React and Vite. The current UI presents a live race control dashboard with a track visual, leaderboard, race info, and event log, backed by typed sample data that mirrors how real simulation state would flow through the app.

## Features
- Vite-powered React app that runs in the browser with hot module replacement in development.
- Modular components for race information: header, leaderboard, track overview, and race log.
- Typed domain models in `types.ts` that describe drivers, teams, tyres, race sessions, and events.
- Built-in race simulation loop with start/pause/step/reset controls, dynamic gaps, tyre wear, and fastest-lap event tracking.
- Sample data in `App.tsx` that demonstrates how to wire race state into the UI components.

## Project Structure
- `index.html` – Vite entry page with a `#root` mount point for React.
- `index.tsx` – React entry file bootstrapping the app.
- `App.tsx` – App shell that seeds sample race data and renders the `RaceHub` dashboard.
- `components/` – UI pieces such as `RaceHub`, `Leaderboard`, `TrackDisplay`, `RaceLog`, and `RaceInfo`, plus a reusable `ui/Card` wrapper.
- `services/` – Stubs for `raceEngine` and `offSeasonService` where simulation logic can grow.
- `types.ts` and `constants.ts` – Shared domain types and constants.

## Prerequisites
- Node.js 18 or later
- npm 10 or later
- (Optional) `GEMINI_API_KEY` if you want to integrate the Gemini-based features referenced in the Vite config.

## Getting Started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create an `.env.local` file (same directory as `package.json`) and set your Gemini API key if needed:
   ```bash
   GEMINI_API_KEY=your_api_key_here
   ```
3. Run the development server with hot reload:
   ```bash
   npm run dev
   ```
   Then open the printed local URL (defaults to `http://localhost:3000`).

## How to Play the Race Simulation
1. Press **Start** to let the race auto-simulate; use **Pause** to halt the tick loop.
2. Move the **simulation speed** slider to accelerate or slow the lap generation (0.5x–3x).
3. Tap **Step +1 lap** for manual control when paused.
4. Use **Reset session** to return to the seeded lap 17 baseline, or **Restart** after the chequered flag to run another race.
5. Watch the **Leaderboard** (positions, tyre wear, and gaps), **Track Overview** (car markers), and **Race Log** (fastest lap and tyre wear alerts) update in real time.

## Production Build & Preview
Build the static assets and preview them locally:
```bash
npm run build
npm run preview
```
`npm run build` outputs to `dist/`, and `npm run preview` serves that directory on port 4173 by default.

## Development Notes
- The Vite config sets the dev server to `0.0.0.0:3000`, making it reachable from containers or remote environments.
- `App.tsx` provides sample drivers, teams, race session data, and event logs so new features have realistic data to build against.
- Components favor small, typed props; extend the models in `types.ts` and thread new data through `RaceHub` rather than relying on globals.
- Keep simulation logic in `services/` or new utility modules; React components should stay focused on presentation and user interaction.

## Troubleshooting
- If the app does not render, ensure `index.html` still contains the `<div id="root"></div>` mount point and loads `index.tsx` via a `<script type="module">` tag.
- Missing environment variables will appear as `undefined` in `process.env`; set them in `.env.local` when adding API integrations.
- When editing TypeScript configs, keep `moduleResolution` set to `bundler` for compatibility with Vite and the existing `@` alias.

## Contribution Workflow
- Run `npm run build` before committing to catch type or syntax errors.
- Prefer small, focused components and keep styling inline or in dedicated CSS modules if you add them.
- Use meaningful commit messages that describe the behavior change.
