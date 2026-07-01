import React from "react";
import { View, Text, Switch } from "react-native";
import { Phone, Clock, PhoneForwarded } from "lucide-react-native";
import { Screen } from "@/components/Screen";
import { Header } from "@/components/Header";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { Avatar } from "@/components/Avatar";
import { SectionHeader } from "@/components/SectionHeader";
import { colors, radius, space, type } from "@/theme/tokens";

const recent = [
  { name: "Priya Rao",     dur: "1:42", summary: "Booked 3pm AC diagnostic.",              time: "12m" },
  { name: "Unknown",       dur: "0:34", summary: "Voicemail — wants estimate for repipe.", time: "42m" },
  { name: "Jordan Pike",   dur: "2:11", summary: "Rescheduled to Wed 4pm.",                time: "2h" },
  { name: "Alicia Weber",  dur: "0:58", summary: "Wanted after-hours pricing, transferred to on-call.", time: "yday" },
];

export default function VoiceAI() {
  return (
    <Screen>
      <Header title="Voice AI Receptionist" back subtitle="Answering (512) 555-0199" />

      <Card style={{ gap: space[3] }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: space[3] }}>
          <View style={{ width: 48, height: 48, borderRadius: radius.lg, backgroundColor: colors.successSoft, alignItems: "center", justifyContent: "center" }}>
            <Phone size={22} color={colors.success} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={type.h2}>Live</Text>
            <Text style={type.small}>12 calls answered today · 9 booked</Text>
          </View>
          <Badge label="98% pickup" tone="success" />
        </View>
      </Card>

      <SectionHeader title="Call routing" />
      <Card style={{ gap: space[3] }}>
        <Toggle label="AI answers first" hint="Warm greeting, qualifies lead, books job" value={true} />
        <Toggle label="Transfer emergencies to on-call" hint="Detects keywords like 'flood, leak, no heat'" value={true} icon={<PhoneForwarded size={16} color={colors.muted} />} />
        <Toggle label="Send SMS summary to owner" hint="After every AI-handled call" value={true} />
      </Card>

      <SectionHeader title="Business hours" />
      <Card style={{ gap: space[3] }}>
        {["Mon–Fri", "Saturday", "Sunday"].map((d, i) => (
          <View key={d} style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: space[2] }}>
              <Clock size={14} color={colors.muted} />
              <Text style={type.bodyStrong}>{d}</Text>
            </View>
            <Text style={type.small}>{i === 2 ? "Closed (AI takes msg)" : i === 1 ? "9:00 – 3:00" : "7:00 – 7:00"}</Text>
          </View>
        ))}
      </Card>

      <SectionHeader title="Recent AI calls" action="See all" />
      <Card padded={false} style={{ padding: space[4] }}>
        {recent.map((c, i) => (
          <View key={i} style={{ flexDirection: "row", gap: space[3], paddingVertical: space[3], borderBottomWidth: i === recent.length - 1 ? 0 : 1, borderBottomColor: colors.hairline }}>
            <Avatar name={c.name} size={36} />
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={type.bodyStrong}>{c.name}</Text>
                <Text style={[type.small, { fontSize: 11 }]}>{c.time}</Text>
              </View>
              <Text style={type.small} numberOfLines={2}>{c.summary}</Text>
              <Text style={[type.small, { fontSize: 11, marginTop: 2 }]}>Duration {c.dur}</Text>
            </View>
          </View>
        ))}
      </Card>
    </Screen>
  );
}

function Toggle({ label, hint, value, icon }: any) {
  const [v, setV] = React.useState(value);
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: space[3] }}>
      {icon}
      <View style={{ flex: 1 }}>
        <Text style={type.bodyStrong}>{label}</Text>
        <Text style={[type.small, { fontSize: 12 }]}>{hint}</Text>
      </View>
      <Switch value={v} onValueChange={setV} trackColor={{ true: colors.primary, false: colors.hairline }} thumbColor="#fff" />
    </View>
  );
}
