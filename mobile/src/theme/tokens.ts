export const colors = {
  primary: "#635BFF",
  primaryDeep: "#4F46E5",
  primarySoft: "#EEEDFF",
  ink: "#0A2540",
  body: "#425466",
  muted: "#697386",
  surface: "#F6F9FC",
  hairline: "#E6EBF1",
  bg: "#FFFFFF",
  success: "#16A34A",
  successSoft: "#E7F7EC",
  warning: "#D97706",
  warningSoft: "#FFF4E0",
  danger: "#DC2626",
  dangerSoft: "#FDECEC",
  info: "#0EA5E9",
  infoSoft: "#E4F4FD",
} as const;

export const radius = { xs: 6, sm: 8, md: 12, lg: 16, xl: 20, xxl: 28, pill: 999 } as const;
export const space = { 1: 4, 2: 8, 3: 12, 4: 16, 5: 20, 6: 24, 7: 28, 8: 32, 10: 40, 12: 48 } as const;

export const type = {
  display: { fontFamily: "Inter_700Bold", fontSize: 28, lineHeight: 34, color: colors.ink, letterSpacing: -0.4 },
  h1: { fontFamily: "Inter_700Bold", fontSize: 22, lineHeight: 28, color: colors.ink, letterSpacing: -0.3 },
  h2: { fontFamily: "Inter_600SemiBold", fontSize: 18, lineHeight: 24, color: colors.ink, letterSpacing: -0.2 },
  h3: { fontFamily: "Inter_600SemiBold", fontSize: 15, lineHeight: 20, color: colors.ink },
  body: { fontFamily: "Inter_400Regular", fontSize: 15, lineHeight: 22, color: colors.body },
  bodyStrong: { fontFamily: "Inter_500Medium", fontSize: 15, lineHeight: 22, color: colors.ink },
  small: { fontFamily: "Inter_400Regular", fontSize: 13, lineHeight: 18, color: colors.body },
  smallStrong: { fontFamily: "Inter_500Medium", fontSize: 13, lineHeight: 18, color: colors.ink },
  micro: { fontFamily: "Inter_500Medium", fontSize: 11, lineHeight: 14, color: colors.muted, letterSpacing: 0.4 },
  mono: { fontFamily: "Inter_500Medium", fontSize: 14, lineHeight: 20, color: colors.ink, fontVariant: ["tabular-nums"] as const },
} as const;

export const shadow = {
  soft: {
    shadowColor: "#0A2540",
    shadowOpacity: 0.06,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  card: {
    shadowColor: "#0A2540",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
} as const;
