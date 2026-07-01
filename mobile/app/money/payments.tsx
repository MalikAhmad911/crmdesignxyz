import React from "react";
import { View, Text } from "react-native";
import { Screen } from "@/components/Screen";
import { Header } from "@/components/Header";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { SectionHeader } from "@/components/SectionHeader";
import { colors, radius, space, type } from "@/theme/tokens";

const history = [
  { c: "Aisha O.",    m: "Stripe · card",   a: "$1,450", t: "Today, 9:14" },
  { c: "Nina B.",     m: "Stripe · ACH",    a: "$420",   t: "Yesterday" },
  { c: "Reyes HVAC",  m: "Card in-person",  a: "$189",   t: "Jun 28" },
  { c: "Jordan Pike", m: "Deposit",         a: "$200",   t: "Jun 26" },
];

export default function Payments() {
  return (
    <Screen>
      <Header title="Payments" back subtitle="Revenue overview" />

      <Card style={{ gap: space[2] }}>
        <Text style={type.micro}>REVENUE (MONTH TO DATE)</Text>
        <Text style={{ fontFamily: "Inter_700Bold", fontSize: 34, color: colors.ink, letterSpacing: -0.6 }}>$18,240</Text>
        <View style={{ flexDirection: "row", gap: space[2] }}>
          <Badge label="+22% vs last month" tone="success" />
          <Badge label="4 payouts pending" tone="info" />
        </View>
        {/* mini bar chart */}
        <View style={{ flexDirection: "row", alignItems: "flex-end", gap: 6, marginTop: space[3], height: 60 }}>
          {[24, 40, 33, 55, 48, 70, 62].map((h, i) => (
            <View key={i} style={{ flex: 1, height: `${h}%`, backgroundColor: i === 6 ? colors.primary : colors.primarySoft, borderRadius: 6 }} />
          ))}
        </View>
      </Card>

      <View style={{ flexDirection: "row", gap: space[3], marginTop: space[4] }}>
        <Card style={{ flex: 1, gap: 4 }}>
          <Text style={type.micro}>DEPOSITS</Text>
          <Text style={{ fontFamily: "Inter_700Bold", fontSize: 20, color: colors.ink }}>$2,300</Text>
          <Text style={[type.small, { fontSize: 12 }]}>3 upcoming</Text>
        </Card>
        <Card style={{ flex: 1, gap: 4 }}>
          <Text style={type.micro}>RECURRING</Text>
          <Text style={{ fontFamily: "Inter_700Bold", fontSize: 20, color: colors.ink }}>$1,120</Text>
          <Text style={[type.small, { fontSize: 12 }]}>12 plans active</Text>
        </Card>
      </View>

      <SectionHeader title="Payment history" action="Export" />
      <Card padded={false} style={{ padding: space[4] }}>
        {history.map((h, i) => (
          <View key={i} style={{ flexDirection: "row", alignItems: "center", gap: space[3], paddingVertical: space[3], borderBottomWidth: i === history.length - 1 ? 0 : 1, borderBottomColor: colors.hairline }}>
            <View style={{ width: 36, height: 36, borderRadius: radius.md, backgroundColor: colors.successSoft, alignItems: "center", justifyContent: "center" }}>
              <Text style={{ fontFamily: "Inter_700Bold", color: colors.success }}>$</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={type.bodyStrong}>{h.c}</Text>
              <Text style={[type.small, { fontSize: 12 }]}>{h.m} · {h.t}</Text>
            </View>
            <Text style={{ ...type.bodyStrong, fontFamily: "Inter_700Bold" }}>{h.a}</Text>
          </View>
        ))}
      </Card>
    </Screen>
  );
}
