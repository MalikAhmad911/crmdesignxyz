import React from "react";
import { View, Text, Switch } from "react-native";
import { router } from "expo-router";
import { Sparkles, MessageSquare, PhoneCall, CalendarCheck, Star } from "lucide-react-native";
import { Screen } from "@/components/Screen";
import { Header } from "@/components/Header";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { AISuggestionCard } from "@/components/AISuggestionCard";
import { SectionHeader } from "@/components/SectionHeader";
import { colors, radius, space, type } from "@/theme/tokens";

export default function AIEmployee() {
  return (
    <Screen>
      <Header title="AI Employee" back subtitle="Working 24/7" />

      <Card style={{ gap: space[3], backgroundColor: "#FBFAFF", borderColor: colors.primarySoft }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: space[3] }}>
          <View style={{ width: 48, height: 48, borderRadius: radius.lg, backgroundColor: colors.primary, alignItems: "center", justifyContent: "center" }}>
            <Sparkles size={22} color="#fff" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={type.h2}>All systems normal</Text>
            <Text style={type.small}>42 tasks handled today · 7 waiting your approval</Text>
          </View>
          <Badge label="Active" tone="success" dot />
        </View>
        <View style={{ flexDirection: "row", gap: space[3] }}>
          <Mini icon={<MessageSquare size={14} color={colors.primaryDeep} />} label="Replies"  value="28" />
          <Mini icon={<PhoneCall size={14} color={colors.primaryDeep} />}   label="Calls"    value="12" />
          <Mini icon={<CalendarCheck size={14} color={colors.primaryDeep} />} label="Booked" value="9" />
          <Mini icon={<Star size={14} color={colors.primaryDeep} />}       label="Reviews"  value="4" />
        </View>
      </Card>

      <SectionHeader title="Auto-reply settings" />
      <Card style={{ gap: space[3] }}>
        <Toggle label="Answer inbound calls" hint="24/7 AI receptionist" value={true} />
        <Toggle label="Reply to missed calls" hint="SMS in under 60 seconds" value={true} />
        <Toggle label="Reply to webchat" hint="Book jobs directly" value={true} />
        <Toggle label="Ask for reviews after job" hint="After 'complete' status" value={false} />
      </Card>

      <SectionHeader title="Knowledge base" action="Manage" />
      <Card style={{ gap: space[3] }}>
        <Row k="Website pages ingested" v="42" />
        <Row k="FAQs" v="128" />
        <Row k="Service pricing entries" v="34" />
        <Row k="Last refresh" v="Today, 8:14 AM" />
      </Card>

      <SectionHeader title="Approval queue" action="See all" />
      <View style={{ gap: space[3] }}>
        <AISuggestionCard title="Approve reply to Priya Rao" body="Confirming 3pm today. Sends the tech's ETA text automatically." />
        <AISuggestionCard title="Approve quote for Jordan Pike" body="$980 for bathroom repipe based on your standard rate + parts." />
      </View>

      <Button label="Open AI Brain" style={{ marginTop: space[5] }} onPress={() => router.push("/ai/brain")} />
    </Screen>
  );
}

function Mini({ icon, label, value }: any) {
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg, borderRadius: radius.md, padding: space[3], gap: 4 }}>
      {icon}
      <Text style={{ fontFamily: "Inter_700Bold", fontSize: 18, color: colors.ink }}>{value}</Text>
      <Text style={[type.small, { fontSize: 11 }]}>{label}</Text>
    </View>
  );
}
function Toggle({ label, hint, value }: { label: string; hint: string; value: boolean }) {
  const [v, setV] = React.useState(value);
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: space[3] }}>
      <View style={{ flex: 1 }}>
        <Text style={type.bodyStrong}>{label}</Text>
        <Text style={[type.small, { fontSize: 12 }]}>{hint}</Text>
      </View>
      <Switch value={v} onValueChange={setV} trackColor={{ true: colors.primary, false: colors.hairline }} thumbColor="#fff" />
    </View>
  );
}
function Row({ k, v }: { k: string; v: string }) {
  return <View style={{ flexDirection: "row", justifyContent: "space-between" }}><Text style={type.small}>{k}</Text><Text style={type.bodyStrong}>{v}</Text></View>;
}
