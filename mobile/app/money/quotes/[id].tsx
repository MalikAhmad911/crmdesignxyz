import React from "react";
import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Screen } from "@/components/Screen";
import { Header } from "@/components/Header";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { SectionHeader } from "@/components/SectionHeader";
import { colors, space, type } from "@/theme/tokens";
import { quotes } from "@/mocks";

const items = [
  { t: "Diagnostic + inspection", q: 1, u: "$120", tot: "$120" },
  { t: "Copper fitting kit",       q: 2, u: "$45",  tot: "$90"  },
  { t: "Labor (est. 6h)",         q: 6, u: "$125", tot: "$750" },
];

export default function QuoteDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const q = quotes.find(x => x.id === id) ?? quotes[0];
  return (
    <Screen>
      <Header title={q.number} back subtitle={q.customer} />
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Text style={{ fontFamily: "Inter_700Bold", fontSize: 32, color: colors.ink }}>{q.amount}</Text>
        <Badge label={q.status} tone="info" />
      </View>

      <SectionHeader title="Line items" />
      <Card padded={false} style={{ padding: space[4] }}>
        {items.map((it, i) => (
          <View key={i} style={{ flexDirection: "row", paddingVertical: space[3], borderBottomWidth: i === items.length - 1 ? 0 : 1, borderBottomColor: colors.hairline }}>
            <View style={{ flex: 1 }}>
              <Text style={type.bodyStrong}>{it.t}</Text>
              <Text style={type.small}>{it.q} × {it.u}</Text>
            </View>
            <Text style={type.bodyStrong}>{it.tot}</Text>
          </View>
        ))}
      </Card>

      <SectionHeader title="Summary" />
      <Card style={{ gap: space[2] }}>
        <Row k="Subtotal" v="$960" />
        <Row k="Tax" v="$20" />
        <Row k="Total" v={q.amount} strong />
      </Card>

      <View style={{ flexDirection: "row", gap: space[2], marginTop: space[4] }}>
        <Button label="Convert to invoice" style={{ flex: 1 }} />
        <Button label="Send" variant="secondary" style={{ flex: 1 }} />
      </View>
    </Screen>
  );
}

function Row({ k, v, strong }: { k: string; v: string; strong?: boolean }) {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <Text style={type.small}>{k}</Text>
      <Text style={strong ? { ...type.bodyStrong, fontFamily: "Inter_700Bold" } : type.bodyStrong}>{v}</Text>
    </View>
  );
}
