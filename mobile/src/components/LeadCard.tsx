import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Phone, MessageSquare } from "lucide-react-native";
import { Card } from "./Card";
import { Avatar } from "./Avatar";
import { Badge } from "./Badge";
import { Button } from "./Button";
import { colors, space, type } from "@/theme/tokens";

export type Lead = { id: string; name: string; source: string; score: number; need: string; time: string };

export function LeadCard({ lead, onPress }: { lead: Lead; onPress?: () => void }) {
  const tone = lead.score >= 80 ? "success" : lead.score >= 50 ? "warning" : "neutral";
  return (
    <Card onPress={onPress} style={{ gap: space[3] }}>
      <View style={{ flexDirection: "row", gap: space[3], alignItems: "center" }}>
        <Avatar name={lead.name} size={44} />
        <View style={{ flex: 1 }}>
          <Text style={type.bodyStrong} numberOfLines={1}>{lead.name}</Text>
          <Text style={type.small}>{lead.source} · {lead.time}</Text>
        </View>
        <Badge label={`${lead.score}`} tone={tone as any} />
      </View>
      <Text style={type.small} numberOfLines={2}>{lead.need}</Text>
      <View style={{ flexDirection: "row", gap: space[2] }}>
        <Button label="Call"  size="sm" variant="secondary" icon={<Phone size={14} color={colors.ink} />} style={{ flex: 1 }} />
        <Button label="Text"  size="sm" variant="secondary" icon={<MessageSquare size={14} color={colors.ink} />} style={{ flex: 1 }} />
        <Button label="Book"  size="sm" style={{ flex: 1 }} />
      </View>
    </Card>
  );
}
