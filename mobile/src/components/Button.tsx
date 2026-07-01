import React from "react";
import { Pressable, Text, ActivityIndicator, StyleSheet, ViewStyle, View } from "react-native";
import { colors, radius, space, type } from "@/theme/tokens";

type Variant = "primary" | "secondary" | "ghost" | "destructive";
type Size = "sm" | "md" | "lg";

type Props = {
  label: string;
  onPress?: () => void;
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
  style?: ViewStyle;
};

export function Button({
  label, onPress, variant = "primary", size = "md", loading, disabled, icon, iconRight, fullWidth, style,
}: Props) {
  const height = size === "lg" ? 54 : size === "sm" ? 36 : 46;
  const px = size === "lg" ? space[6] : size === "sm" ? space[3] : space[5];
  const palette = paletteFor(variant, !!disabled);

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.base,
        {
          height, paddingHorizontal: px,
          backgroundColor: palette.bg,
          borderColor: palette.border,
          borderWidth: palette.border === "transparent" ? 0 : 1,
          width: fullWidth ? "100%" : undefined,
          opacity: pressed ? 0.9 : 1,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={palette.fg} />
      ) : (
        <View style={styles.row}>
          {icon}
          <Text style={[type.bodyStrong, { color: palette.fg, fontSize: size === "lg" ? 16 : 14 }]}>
            {label}
          </Text>
          {iconRight}
        </View>
      )}
    </Pressable>
  );
}

function paletteFor(v: Variant, disabled: boolean) {
  if (disabled) return { bg: colors.surface, fg: colors.muted, border: "transparent" };
  switch (v) {
    case "primary":     return { bg: colors.primary, fg: "#fff", border: "transparent" };
    case "secondary":   return { bg: colors.bg, fg: colors.ink, border: colors.hairline };
    case "ghost":       return { bg: "transparent", fg: colors.ink, border: "transparent" };
    case "destructive": return { bg: colors.danger, fg: "#fff", border: "transparent" };
  }
}

const styles = StyleSheet.create({
  base: { borderRadius: radius.pill, alignItems: "center", justifyContent: "center" },
  row: { flexDirection: "row", alignItems: "center", gap: space[2] },
});
