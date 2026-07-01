import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "@/theme/tokens";

const TONES = ["#EEEDFF", "#E4F4FD", "#E7F7EC", "#FFF4E0", "#FDECEC"];
const FGS   = ["#4F46E5", "#0EA5E9", "#16A34A", "#D97706", "#DC2626"];

export function Avatar({ name, size = 40 }: { name: string; size?: number }) {
  const initials = name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
  const idx = Math.abs(hash(name)) % TONES.length;
  return (
    <View style={[styles.wrap, { width: size, height: size, borderRadius: size / 2, backgroundColor: TONES[idx] }]}>
      <Text style={{ color: FGS[idx], fontFamily: "Inter_600SemiBold", fontSize: size * 0.36 }}>{initials}</Text>
    </View>
  );
}

function hash(s: string) { let h = 0; for (let i = 0; i < s.length; i++) h = (h << 5) - h + s.charCodeAt(i); return h; }

const styles = StyleSheet.create({ wrap: { alignItems: "center", justifyContent: "center" } });
