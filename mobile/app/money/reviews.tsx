import React from "react";
import { View, Text } from "react-native";
import { Star } from "lucide-react-native";
import { Screen } from "@/components/Screen";
import { Header } from "@/components/Header";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { ReviewCard } from "@/components/ReviewCard";
import { SectionHeader } from "@/components/SectionHeader";
import { colors, radius, space, type } from "@/theme/tokens";
import { reviews } from "@/mocks";

export default function Reviews() {
  return (
    <Screen>
      <Header title="Reviews" back subtitle="4.8 avg · 132 total" />

      <Card style={{ flexDirection: "row", alignItems: "center", gap: space[4] }}>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontFamily: "Inter_700Bold", fontSize: 40, color: colors.ink }}>4.8</Text>
          <View style={{ flexDirection: "row", gap: 2 }}>
            {[0,1,2,3,4].map(i => <Star key={i} size={13} color="#F59E0B" fill="#F59E0B" />)}
          </View>
        </View>
        <View style={{ flex: 1, gap: 6 }}>
          {[5,4,3,2,1].map(n => (
            <View key={n} style={{ flexDirection: "row", alignItems: "center", gap: space[2] }}>
              <Text style={[type.small, { width: 12 }]}>{n}</Text>
              <View style={{ flex: 1, height: 6, backgroundColor: colors.surface, borderRadius: 3, overflow: "hidden" }}>
                <View style={{ height: 6, width: `${[80,14,4,1,1][5-n]}%`, backgroundColor: colors.primary }} />
              </View>
              <Text style={[type.small, { fontSize: 11, width: 24, textAlign: "right" }]}>{[80,14,4,1,1][5-n]}%</Text>
            </View>
          ))}
        </View>
      </Card>

      <View style={{ flexDirection: "row", gap: space[2], marginTop: space[4] }}>
        <Button label="Send review request" style={{ flex: 1 }} />
        <Button label="Preview widget" variant="secondary" style={{ flex: 1 }} />
      </View>

      <SectionHeader title="Recent" action="Filters" />
      <View style={{ gap: space[3] }}>
        {reviews.map(r => <ReviewCard key={r.id} r={r} />)}
      </View>
    </Screen>
  );
}
