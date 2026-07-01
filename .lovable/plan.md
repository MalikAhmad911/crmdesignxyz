# RevenueSol Mobile — Expo React Native app

A separate Expo project inside this repo at `mobile/`, independent of the existing TanStack Start web app. Real RN code, previewable via `expo start` locally / on device / EAS — not in the Lovable web preview.

## Stack

- Expo SDK 51+ (managed workflow), TypeScript
- Expo Router (file-based, mirrors TanStack Start mental model)
- React Native core + `react-native-svg`, `expo-linear-gradient`, `expo-blur`
- Fonts: Inter (display + body) via `expo-font` / `@expo-google-fonts/inter`
- Icons: `lucide-react-native`
- No backend, no data layer — all screens use typed mock fixtures under `mobile/src/mocks/`

## Folder layout

```text
mobile/
  app.json
  package.json
  tsconfig.json
  babel.config.js
  app/                           # expo-router routes
    _layout.tsx                  # root: fonts, theme provider
    index.tsx                    # entry redirect (onboarding vs tabs)
    onboarding/
      _layout.tsx
      welcome.tsx
      sign-in.tsx
      workspace.tsx
      connect-phone.tsx
      connect-email.tsx
      connect-calendar.tsx
      import-website.tsx
      complete.tsx
    (tabs)/
      _layout.tsx                # bottom tab bar
      dashboard.tsx
      inbox.tsx
      contacts.tsx
      calendar.tsx
      jobs.tsx
    inbox/[id].tsx               # conversation detail
    contacts/[id].tsx
    jobs/[id].tsx
    ai/
      employee.tsx
      brain.tsx
      voice.tsx
    money/
      quotes.tsx
      quotes/[id].tsx
      invoices.tsx
      invoices/[id].tsx
      payments.tsx
      reviews.tsx
  src/
    theme/
      tokens.ts                  # colors, radii, spacing, shadows, type scale
      ThemeProvider.tsx
    components/
      Screen.tsx                 # safe-area + scroll wrapper
      Header.tsx                 # title + notification bell
      TabBar.tsx                 # custom bottom tabs
      Button.tsx                 # primary/secondary/ghost/destructive
      Input.tsx, TextField.tsx
      Badge.tsx                  # status pills (success/warn/danger/info)
      Card.tsx, MetricCard.tsx
      LeadCard.tsx
      ConversationRow.tsx
      JobCard.tsx
      AppointmentCard.tsx
      ReviewCard.tsx
      AISuggestionCard.tsx
      ConnectorRow.tsx
      EmptyState.tsx, LoadingState.tsx, ErrorState.tsx
      BottomSheet.tsx            # @gorhom/bottom-sheet
      ActionSheet.tsx
      Avatar.tsx
      SectionHeader.tsx
      QuickActions.tsx           # Call / Text / Add Lead / Job / Invoice
    mocks/
      leads.ts, conversations.ts, jobs.ts, appts.ts, invoices.ts,
      quotes.ts, reviews.ts, activity.ts, ai.ts
```

## Design tokens (locked)

```ts
// src/theme/tokens.ts
colors: {
  primary: '#635BFF',
  primaryDeep: '#4F46E5',
  ink: '#0A2540',
  body: '#425466',
  muted: '#697386',
  surface: '#F6F9FC',
  hairline: '#E6EBF1',
  bg: '#FFFFFF',
  success: '#16A34A',
  warning: '#D97706',
  danger:  '#DC2626',
}
radius: { sm: 8, md: 12, lg: 16, xl: 20, pill: 999 }
space:  4 / 8 / 12 / 16 / 20 / 24 / 32
type:   Inter — display 28/22/18, body 15/13, mono for numbers
shadow: soft: 0 8 24 rgba(10,37,64,0.06); card: 0 2 8 rgba(10,37,64,0.04)
```

## Scope for this build (first pass)

**Onboarding (8)** — welcome, sign in, workspace, connect phone, connect email, connect calendar, import website, complete.

**Core 5 tabs** — dashboard, inbox (+ conversation detail), contacts (+ contact detail + add), calendar (day/week + appt detail + create), jobs (+ job detail).

**AI surfaces (3)** — AI Employee (status, auto-reply, approval queue), AI Brain (command input, plan preview, result), Voice AI (receptionist status, routing, hours, recent calls).

**Money surfaces (4)** — Quotes (list + detail + create), Invoices (list + detail + send request), Payments (overview + history), Reviews (dashboard + AI reply + request).

**Design system** — every reusable component in the list above.

Out of scope for pass 1 (call out to user): Automations, Webchat & Forms, Analytics, Team, Settings, Connectors list, Contacts activity timeline animations, dispatch board drag interactions. Easy follow-up pass once the shell is approved.

## How you'll preview

Won't render in the Lovable preview panel. To run:

```bash
cd mobile
bun install
bunx expo start           # scan QR with Expo Go on iPhone/Android
# or: bunx expo run:ios / run:android for native builds
```

## Deliverable per screen

Real Expo screen file, uses the token system, wired to mock data, no `TODO` placeholders, empty/loading/error states included where meaningful, thumb-reachable primary actions, safe-area correct.

---

Confirm and I'll build it. If you want any of the out-of-scope items pulled into pass 1, say which and I'll add them.
