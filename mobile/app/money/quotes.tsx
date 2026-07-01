import React from "react";
import { View, Text, Pressable } from "react-native";
import { router } from "expo-router";
import { Plus } from "lucide-react-native";
import { Screen } from "@/components/Screen";
import { Header } from "@/components/Header";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { colors, radius, space, type } from "@/theme/tokens";
import { quotes } from "@/mocks";

const toneFor: Record<string, any> = { accepted: "success", sent: "info", viewed: "primary", draft: "neutral", declined: "danger" };

export default function QuotesList() {
  return (
    <Screen>
      <Header title="Quotes" back subtitle={`${quotes.length} open`} right={
        <Pressable onPress={() => {}} style={{ width: 40, height: 40, borderRadius: 20, alignItems: "center", justifyContent: "center", backgroundColor: colors.primary }}>
          <Plus size={20} color="#fff" />
        </Pressable>
      } />
      <View style={{ gap: space[3] }}>
        {quotes.map(q => (
          <Card key={q.id} onPress={() => router.push(`/money/quotes/${q.id}`)} style={{ gap: space[2] }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <Text style={type.bodyStrong}>{q.number}</Text>
              <Badge label={q.status} tone={toneFor[q.status]} />
            </View>
            <Text style={type.small}>{q.customer} · sent {q.sent}</Text>
            <Text style={{ ...type.h2, fontFamily: "Inter_700Bold" }}>{q.amount}</Text>
          </Card>
        ))}
      </View>
    </Screen>
  );
}
