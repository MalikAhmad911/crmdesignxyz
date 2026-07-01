import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { ChevronRight } from "lucide-react-native";
import { Badge } from "./Badge";
import { colors, radius, space, type } from "@/theme/tokens";

export type ConnectorStatus = "connected" | "needs-setup" | "error";
type Props = { name: string; description: string; status: ConnectorStatus; letter?: string; onPress?: () => void };

export function ConnectorRow({ name, description, status, letter, onPress }: Props) {
  const tone = status === "connected" ? "success" : status === "error" ? "danger" : "warning";
  const label = status === "connected" ? "Connected" : status === "error" ? "Error" : "Needs setup";
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.row, { opacity: pressed ? 0.7 : 1 }]}>
      <View style={styles.logo}>
        <Text style={{ fontFamily: "Inter_700Bold", color: colors.ink }}>{letter ?? name[0]}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={type.bodyStrong}>{name}</Text>
        <Text style={[type.small, { fontSize: 12 }]} numberOfLines={1}>{description}</Text>
      </View>
      <Badge label={label} tone={tone as any} dot />
      <ChevronRight size={16} color={colors.muted} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row", alignItems: "center", gap: space[3],
    paddingVertical: space[3], borderBottomWidth: 1, borderBottomColor: colors.hairline,
  },
  logo: {
    width: 40, height: 40, borderRadius: radius.md,
    backgroundColor: colors.surface, alignItems: "center", justifyContent: "center",
    borderWidth: 1, borderColor: colors.hairline,
  },
});
