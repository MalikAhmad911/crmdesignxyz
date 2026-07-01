import React from "react";
import { View, Text } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { Screen } from "@/components/Screen";
import { Header } from "@/components/Header";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { Input } from "@/components/Input";
import { SectionHeader } from "@/components/SectionHeader";
import { colors, radius, space, type } from "@/theme/tokens";
import { appts } from "@/mocks";

export default function ApptDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  if (id === "new") return <NewAppt />;
  const a = appts.find(x => x.id === id) ?? appts[0];
  return (
    <Screen>
      <Header title="Appointment" back />
      <View style={{ gap: space[2] }}>
        <Text style={type.h1}>{a.title}</Text>
        <Text style={type.body}>{a.customer}</Text>
        <View style={{ flexDirection: "row", gap: space[2] }}>
          <Badge label={a.status} tone={a.status === "confirmed" ? "success" : "warning"} />
          <Badge label={a.type} tone="neutral" />
        </View>
      </View>
      <Card style={{ gap: space[3], marginTop: space[4] }}>
        <Row k="Starts" v={`Today · ${a.start} PM`} />
        <Row k="Ends" v={a.end} />
        <Row k="Assigned" v="Marcus L." />
        <Row k="Reminder" v="SMS 30 min before" />
      </Card>
      <View style={{ flexDirection: "row", gap: space[2], marginTop: space[4] }}>
        <Button label="Reschedule" variant="secondary" style={{ flex: 1 }} />
        <Button label="Cancel" variant="secondary" style={{ flex: 1 }} />
        <Button label="Complete" style={{ flex: 1 }} />
      </View>
    </Screen>
  );
}

function NewAppt() {
  return (
    <Screen>
      <Header title="New appointment" back />
      <View style={{ gap: space[3], marginTop: space[3] }}>
        <Input label="Title" placeholder="AC diagnostic" />
        <Input label="Customer" placeholder="Search contacts" />
        <View style={{ flexDirection: "row", gap: space[3] }}>
          <View style={{ flex: 1 }}><Input label="Date" placeholder="Jun 30, 2026" /></View>
          <View style={{ flex: 1 }}><Input label="Time" placeholder="3:00 PM" /></View>
        </View>
        <Input label="Duration" placeholder="60 min" />
        <Input label="Assign to" placeholder="Marcus L." />
        <Input label="Notes" placeholder="Anything the tech should know" />
        <Button label="Book appointment" size="lg" fullWidth style={{ marginTop: space[3] }} onPress={() => router.back()} />
      </View>
    </Screen>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return <View style={{ flexDirection: "row", justifyContent: "space-between" }}><Text style={type.small}>{k}</Text><Text style={type.bodyStrong}>{v}</Text></View>;
}
