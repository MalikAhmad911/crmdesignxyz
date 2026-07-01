import React from "react";
import { View, Text } from "react-native";
import { TrendingUp, TrendingDown } from "lucide-react-native";
import { Card } from "./Card";
import { colors, space, type } from "@/theme/tokens";

type Props = {
  label: string;
  value: string;
  delta?: string;
  positive?: boolean;
  hint?: string;
  icon?: React.ReactNode;
};

export function MetricCard({ label, value, delta, positive = true, hint, icon }: Props) {
  return (
    <Card style={{ flex: 1, gap: space[2], minWidth: 0 }}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Text style={type.micro}>{label.toUpperCase()}</Text>
        {icon}
      </View>
      <Text style={{ fontFamily: "Inter_700Bold", fontSize: 24, color: colors.ink, letterSpacing: -0.4 }}>{value}</Text>
      {delta ? (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
          {positive ? <TrendingUp size={13} color={colors.success} /> : <TrendingDown size={13} color={colors.danger} />}
          <Text style={{ fontSize: 12, color: positive ? colors.success : colors.danger, fontFamily: "Inter_600SemiBold" }}>{delta}</Text>
          {hint ? <Text style={[type.small, { fontSize: 12 }]}>{hint}</Text> : null}
        </View>
      ) : null}
    </Card>
  );
}
