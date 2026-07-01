# RevenueSol Mobile

Expo React Native app. Design-only (no backend).

## Run

```bash
cd mobile
bun install       # or: npm install
bunx expo start   # scan QR with Expo Go
```

Requires Expo Go on device, or `expo run:ios` / `expo run:android` for native builds.

## Structure

- `app/` — expo-router file-based routes
- `src/theme/` — design tokens & provider
- `src/components/` — reusable UI
- `src/mocks/` — static fixtures used by every screen
