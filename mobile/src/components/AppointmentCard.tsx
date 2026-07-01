import React from "react";
import { View, Text } from "react-native";
import { Card } from "./Card";
import { Badge } from "./Badge";
import { colors, space, type } from "@/theme/tokens";

export type Appt = { id: string; title: string; customer: string; start: string; end: string; type: string; status: "confirmed" | "pending" | "cancelled" };

export function AppointmentCard({ appt, onPress }: { appt: Appt; onPress?: () => void }) {
  const tone = appt.status === "confirmed" ? "success" : appt.status === "pending" ? "warning" : "danger";
  return (
    <Card onPress={onPress} style={{ flexDirection: "row", gap: space[4], alignItems: "center", padding: space[4] }}>
      <View style={{ width: 4, alignSelf: "stretch", borderRadius: 2, backgroundColor: colors.primary }} />
      <View style={{ width: 60 }}>
        <Text style={{ ...type.h3, fontFamily: "Inter_700Bold" }}>{appt.start}</Text>
        <Text style={[type.small, { fontSize: 11 }]}>{appt.end}</Text>
      </View>
      <View style={{ flex: 1, gap: 4 }}>
        <Text style={type.bodyStrong} numberOfLines={1}>{appt.title}</Text>
        <Text style={type.small} numberOfLines={1}>{appt.customer} · {appt.type}</Text>
      </View>
      <Badge label={appt.status} tone={tone as any} />
    </Card>
  );
}
