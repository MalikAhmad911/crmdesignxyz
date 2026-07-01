import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Phone, MessageSquare, UserPlus, Briefcase, Receipt } from "lucide-react-native";
import { colors, radius, space, type } from "@/theme/tokens";

const items = [
  { key: "call",  label: "Call",     Icon: Phone },
  { key: "text",  label: "Text",     Icon: MessageSquare },
  { key: "lead",  label: "Add Lead", Icon: UserPlus },
  { key: "job",   label: "New Job",  Icon: Briefcase },
  { key: "inv",   label: "Invoice",  Icon: Receipt },
];

export function QuickActions({ onPress }: { onPress?: (key: string) => void }) {
  return (
    <View style={styles.row}>
      {items.map(({ key, label, Icon }) => (
        <Pressable key={key} onPress={() => onPress?.(key)} style={styles.cell}>
          <View style={styles.iconWrap}>
            <Icon size={20} color={colors.primaryDeep} />
          </View>
          <Text style={[type.small, { color: colors.ink, fontFamily: "Inter_500Medium" }]}>{label}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", justifyContent: "space-between", gap: space[2] },
  cell: { flex: 1, alignItems: "center", gap: 6 },
  iconWrap: {
    width: 52, height: 52, borderRadius: radius.lg,
    backgroundColor: colors.primarySoft,
    alignItems: "center", justifyContent: "center",
  },
});
