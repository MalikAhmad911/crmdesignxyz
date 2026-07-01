import React from "react";
import { View, Text, Pressable } from "react-native";
import { colors, space, type } from "@/theme/tokens";

export function SectionHeader({ title, action, onAction }: { title: string; action?: string; onAction?: () => void }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: space[6], marginBottom: space[3] }}>
      <Text style={type.h2}>{title}</Text>
      {action ? (
        <Pressable onPress={onAction} hitSlop={8}>
          <Text style={{ color: colors.primaryDeep, fontFamily: "Inter_600SemiBold", fontSize: 13 }}>{action}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}
