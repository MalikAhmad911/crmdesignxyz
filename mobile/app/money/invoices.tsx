import React from "react";
import { View, Text, Pressable } from "react-native";
import { router } from "expo-router";
import { Plus } from "lucide-react-native";
import { Screen } from "@/components/Screen";
import { Header } from "@/components/Header";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { colors, space, type } from "@/theme/tokens";
import { invoices } from "@/mocks";

const toneFor: Record<string, any> = { paid: "success", sent: "info", overdue: "danger", draft: "neutral" };

export default function InvoicesList() {
  const totals = {
    outstanding: "$2,589",
    overdue: "$980",
    paidMTD: "$18,240",
  };
  return (
    <Screen>
      <Header title="Invoices" back right={
        <Pressable onPress={() => {}} style={{ width: 40, height: 40, borderRadius: 20, alignItems: "center", justifyContent: "center", backgroundColor: colors.primary }}>
          <Plus size={20} color="#fff" />
        </Pressable>
      } />

      <View style={{ flexDirection: "row", gap: space[3] }}>
        <Stat label="Outstanding" v={totals.outstanding} />
        <Stat label="Overdue" v={totals.overdue} bad />
        <Stat label="Paid MTD" v={totals.paidMTD} good />
      </View>

      <View style={{ gap: space[3], marginTop: space[4] }}>
        {invoices.map(i => (
          <Card key={i.id} onPress={() => router.push(`/money/invoices/${i.id}`)} style={{ gap: 4 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <Text style={type.bodyStrong}>{i.number}</Text>
              <Badge label={i.status} tone={toneFor[i.status]} />
            </View>
            <Text style={type.small}>{i.customer} · {i.due}</Text>
            <Text style={{ ...type.h2, fontFamily: "Inter_700Bold", marginTop: 2 }}>{i.amount}</Text>
          </Card>
        ))}
      </View>
    </Screen>
  );
}

function Stat({ label, v, good, bad }: any) {
  return (
    <Card style={{ flex: 1, gap: 4 }}>
      <Text style={type.micro}>{label.toUpperCase()}</Text>
      <Text style={{ fontFamily: "Inter_700Bold", fontSize: 18, color: bad ? colors.danger : good ? colors.success : colors.ink }}>{v}</Text>
    </Card>
  );
}
