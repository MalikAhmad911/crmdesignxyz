import React from "react";
import { View, Text } from "react-native";
import { Star } from "lucide-react-native";
import { Card } from "./Card";
import { Avatar } from "./Avatar";
import { Badge } from "./Badge";
import { colors, space, type } from "@/theme/tokens";

export type Review = { id: string; author: string; source: string; rating: number; body: string; time: string; sentiment: "positive" | "neutral" | "negative"; replied?: boolean };

export function ReviewCard({ r, onReply }: { r: Review; onReply?: () => void }) {
  const tone = r.sentiment === "positive" ? "success" : r.sentiment === "negative" ? "danger" : "neutral";
  return (
    <Card style={{ gap: space[3] }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: space[3] }}>
        <Avatar name={r.author} size={36} />
        <View style={{ flex: 1 }}>
          <Text style={type.bodyStrong}>{r.author}</Text>
          <Text style={[type.small, { fontSize: 12 }]}>{r.source} · {r.time}</Text>
        </View>
        <View style={{ flexDirection: "row", gap: 2 }}>
          {[0,1,2,3,4].map(i => <Star key={i} size={13} color={i < r.rating ? "#F59E0B" : colors.hairline} fill={i < r.rating ? "#F59E0B" : "transparent"} />)}
        </View>
      </View>
      <Text style={type.small}>{r.body}</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Badge label={r.sentiment} tone={tone as any} />
        {r.replied ? <Badge label="AI replied" tone="primary" /> : (
          <Text onPress={onReply} style={{ color: colors.primaryDeep, fontFamily: "Inter_600SemiBold", fontSize: 13 }}>Draft reply →</Text>
        )}
      </View>
    </Card>
  );
}
