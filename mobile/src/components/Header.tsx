import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Bell, ChevronLeft, Search } from "lucide-react-native";
import { router } from "expo-router";
import { colors, space, type } from "@/theme/tokens";

type Props = {
  title: string;
  subtitle?: string;
  back?: boolean;
  onBell?: () => void;
  onSearch?: () => void;
  right?: React.ReactNode;
};

export function Header({ title, subtitle, back, onBell, onSearch, right }: Props) {
  return (
    <View style={styles.row}>
      {back ? (
        <Pressable onPress={() => router.back()} hitSlop={12} style={styles.icon}>
          <ChevronLeft size={22} color={colors.ink} />
        </Pressable>
      ) : null}
      <View style={{ flex: 1 }}>
        <Text style={type.h1} numberOfLines={1}>
          {title}
        </Text>
        {subtitle ? <Text style={[type.small, { marginTop: 2 }]}>{subtitle}</Text> : null}
      </View>
      <View style={{ flexDirection: "row", gap: space[2] }}>
        {onSearch ? (
          <Pressable onPress={onSearch} hitSlop={10} style={styles.icon}>
            <Search size={20} color={colors.ink} />
          </Pressable>
        ) : null}
        {onBell ? (
          <Pressable onPress={onBell} hitSlop={10} style={styles.icon}>
            <Bell size={20} color={colors.ink} />
            <View style={styles.dot} />
          </Pressable>
        ) : null}
        {right}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: space[3],
    paddingTop: space[3],
    paddingBottom: space[4],
  },
  icon: {
    width: 40, height: 40, borderRadius: 20,
    alignItems: "center", justifyContent: "center",
    backgroundColor: colors.surface,
  },
  dot: {
    position: "absolute", top: 10, right: 10,
    width: 8, height: 8, borderRadius: 4, backgroundColor: colors.primary,
    borderWidth: 2, borderColor: colors.surface,
  },
});
