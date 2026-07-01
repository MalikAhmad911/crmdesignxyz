import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { Phone, MessageSquare, Mail, MapPin } from "lucide-react-native";
import { Screen } from "@/components/Screen";
import { Header } from "@/components/Header";
import { Card } from "@/components/Card";
import { Avatar } from "@/components/Avatar";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { SectionHeader } from "@/components/SectionHeader";
import { colors, radius, space, type } from "@/theme/tokens";
import { contacts, activity } from "@/mocks";

export default function ContactDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  if (id === "new") return <NewContact />;
  const c = contacts.find(x => x.id === id) ?? contacts[0];
  return (
    <Screen>
      <Header title="Contact" back />
      <View style={{ alignItems: "center", gap: space[2], paddingVertical: space[4] }}>
        <Avatar name={c.name} size={72} />
        <Text style={type.h1}>{c.name}</Text>
        <View style={{ flexDirection: "row", gap: space[2] }}>
          <Badge label={c.tag} tone="primary" />
          <Badge label={`Score ${c.score}`} tone={c.score >= 80 ? "success" : "warning"} />
        </View>
      </View>

      <View style={{ flexDirection: "row", gap: space[2], marginBottom: space[3] }}>
        <Button label="Call" icon={<Phone size={14} color="#fff" />} style={{ flex: 1 }} />
        <Button label="Text" variant="secondary" icon={<MessageSquare size={14} color={colors.ink} />} style={{ flex: 1 }} />
        <Button label="Email" variant="secondary" icon={<Mail size={14} color={colors.ink} />} style={{ flex: 1 }} />
      </View>

      <Card style={{ gap: space[3] }}>
        <Row k="Phone" v={c.phone} />
        <Row k="Email" v={c.email} />
        <Row k="Source" v={c.tag} />
        <Row k="Address" v="182 W 5th St, Austin, TX" icon={<MapPin size={14} color={colors.muted} />} />
      </Card>

      <SectionHeader title="Tags" />
      <View style={{ flexDirection: "row", gap: space[2], flexWrap: "wrap" }}>
        {["Repeat customer", "AC", "Warranty", "Referral"].map(t => <Badge key={t} label={t} tone="neutral" />)}
      </View>

      <SectionHeader title="Notes" />
      <Card>
        <Text style={type.small}>Prefers late-afternoon appointments. Dog on premises. Called 3× this year for HVAC issues; consider maintenance plan pitch.</Text>
      </Card>

      <SectionHeader title="Activity timeline" />
      <Card padded={false} style={{ padding: space[4] }}>
        {activity.map((a, i) => (
          <View key={a.id} style={{ flexDirection: "row", gap: space[3], paddingVertical: space[3], borderBottomWidth: i === activity.length - 1 ? 0 : 1, borderBottomColor: colors.hairline }}>
            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: colors.primary, marginTop: 6 }} />
            <View style={{ flex: 1 }}>
              <Text style={type.smallStrong}>{a.who}</Text>
              <Text style={type.small}>{a.what}</Text>
              <Text style={[type.small, { fontSize: 11, marginTop: 2 }]}>{a.time}</Text>
            </View>
          </View>
        ))}
      </Card>
    </Screen>
  );
}

function Row({ k, v, icon }: { k: string; v: string; icon?: React.ReactNode }) {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: space[3] }}>
      <Text style={type.small}>{k}</Text>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
        {icon}
        <Text style={type.bodyStrong}>{v}</Text>
      </View>
    </View>
  );
}

function NewContact() {
  return (
    <Screen>
      <Header title="Add contact" back />
      <View style={{ gap: space[3], marginTop: space[3] }}>
        {["First name","Last name","Phone","Email","Company","Tags"].map(l => (
          <View key={l} style={{ borderWidth: 1, borderColor: colors.hairline, borderRadius: radius.md, paddingHorizontal: space[4], height: 50, justifyContent: "center" }}>
            <Text style={type.small}>{l}</Text>
          </View>
        ))}
        <Button label="Save contact" size="lg" fullWidth style={{ marginTop: space[3] }} onPress={() => router.back()} />
      </View>
    </Screen>
  );
}
