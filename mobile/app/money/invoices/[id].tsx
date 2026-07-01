import React from "react";
import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { CreditCard, Link2 } from "lucide-react-native";
import { Screen } from "@/components/Screen";
import { Header } from "@/components/Header";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { SectionHeader } from "@/components/SectionHeader";
import { colors, space, type } from "@/theme/tokens";
import { invoices } from "@/mocks";

const toneFor: Record<string, any> = { paid: "success", sent: "info", overdue: "danger", draft: "neutral" };

export default function InvoiceDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const inv = invoices.find(x => x.id === id) ?? invoices[0];
  return (
    <Screen>
      <Header title={inv.number} back subtitle={inv.customer} />

      <Card style={{ alignItems: "center", gap: space[2] }}>
        <Text style={type.micro}>{inv.status === "paid" ? "PAID" : "AMOUNT DUE"}</Text>
        <Text style={{ fontFamily: "Inter_700Bold", fontSize: 40, color: colors.ink, letterSpacing: -0.6 }}>{inv.amount}</Text>
        <Badge label={inv.status} tone={toneFor[inv.status]} />
        <Text style={type.small}>{inv.due}</Text>
      </Card>

      {inv.status !== "paid" && (
        <View style={{ flexDirection: "row", gap: space[2], marginTop: space[4] }}>
          <Button label="Send request" icon={<Link2 size={14} color="#fff" />} style={{ flex: 1 }} />
          <Button label="Take payment" variant="secondary" icon={<CreditCard size={14} color={colors.ink} />} style={{ flex: 1 }} />
        </View>
      )}

      <SectionHeader title="Details" />
      <Card style={{ gap: space[2] }}>
        <Row k="Issued" v="Jun 25, 2026" />
        <Row k="Due" v="Jul 5, 2026" />
        <Row k="Job" v="Bathroom repipe" />
        <Row k="Payment method" v="Card, ACH via Stripe" />
      </Card>

      <SectionHeader title="Activity" />
      <Card padded={false} style={{ padding: space[4] }}>
        {[
          { t: "Invoice created", who: "You", w: "Jun 25" },
          { t: "Invoice sent by AI", who: "AI Employee", w: "Jun 25" },
          { t: "Customer viewed", who: "Jordan Pike", w: "Jun 26" },
          { t: "Reminder sent", who: "AI Employee", w: "Jun 30" },
        ].map((e, i, arr) => (
          <View key={i} style={{ flexDirection: "row", gap: space[3], paddingVertical: space[3], borderBottomWidth: i === arr.length - 1 ? 0 : 1, borderBottomColor: colors.hairline }}>
            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: colors.primary, marginTop: 6 }} />
            <View style={{ flex: 1 }}>
              <Text style={type.smallStrong}>{e.t}</Text>
              <Text style={[type.small, { fontSize: 12 }]}>{e.who} · {e.w}</Text>
            </View>
          </View>
        ))}
      </Card>
    </Screen>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return <View style={{ flexDirection: "row", justifyContent: "space-between" }}><Text style={type.small}>{k}</Text><Text style={type.bodyStrong}>{v}</Text></View>;
}
