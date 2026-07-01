import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, radius, space } from "@/theme/tokens";

type Tone = "neutral" | "primary" | "success" | "warning" | "danger" | "info";

const palette: Record<Tone, { bg: string; fg: string }> = {
  neutral: { bg: colors.surface, fg: colors.body },
  primary: { bg: colors.primarySoft, fg: colors.primaryDeep },
  success: { bg: colors.successSoft, fg: colors.success },
  warning: { bg: colors.warningSoft, fg: colors.warning },
  danger:  { bg: colors.dangerSoft,  fg: colors.danger },
  info:    { bg: colors.infoSoft,    fg: colors.info },
};

export function Badge({ label, tone = "neutral", dot }: { label: string; tone?: Tone; dot?: boolean }) {
  const p = palette[tone];
  return (
    <View style={[styles.pill, { backgroundColor: p.bg }]}>
      {dot ? <View style={[styles.dot, { backgroundColor: p.fg }]} /> : null}
      <Text style={[styles.txt, { color: p.fg }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: "row", alignItems: "center", gap: 6,
    paddingHorizontal: space[2] + 2, paddingVertical: 4,
    borderRadius: radius.pill, alignSelf: "flex-start",
  },
  dot: { width: 6, height: 6, borderRadius: 3 },
  txt: { fontSize: 12, fontFamily: "Inter_600SemiBold", letterSpacing: 0.1 },
});
