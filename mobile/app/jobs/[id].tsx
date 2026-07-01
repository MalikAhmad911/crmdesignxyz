import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Navigation, Phone, Camera, CheckSquare, User } from "lucide-react-native";
import { Screen } from "@/components/Screen";
import { Header } from "@/components/Header";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { SectionHeader } from "@/components/SectionHeader";
import { colors, radius, space, type } from "@/theme/tokens";
import { jobs } from "@/mocks";

const checklist = [
  { t: "Confirm arrival window with customer", done: true },
  { t: "Load parts: R-410a, capacitor",         done: true },
  { t: "Run diagnostic + take before photos",    done: false },
  { t: "Present quote + collect deposit",        done: false },
];

export default function JobDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const j = jobs.find(x => x.id === id) ?? jobs[0];
  return (
    <Screen>
      <Header title="Job detail" back />
      <View style={{ gap: space[3] }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
          <View style={{ flex: 1 }}>
            <Text style={type.h1}>{j.title}</Text>
            <Text style={type.body}>{j.customer}</Text>
          </View>
          <Badge label={j.status.replace("-", " ")} tone="primary" />
        </View>

        <View style={{ flexDirection: "row", gap: space[2] }}>
          <Button label="Route" icon={<Navigation size={14} color="#fff" />} style={{ flex: 1 }} />
          <Button label="Call" variant="secondary" icon={<Phone size={14} color={colors.ink} />} style={{ flex: 1 }} />
          <Button label="Update" variant="secondary" style={{ flex: 1 }} />
        </View>

        <Card style={{ gap: space[3] }}>
          <Kv k="When" v={j.when} />
          <Kv k="Address" v={j.address} />
          <Kv k="Assigned" v={j.tech} />
          <Kv k="Value" v={j.value} strong />
        </Card>
      </View>

      <SectionHeader title="Crew" />
      <Card style={{ flexDirection: "row", alignItems: "center", gap: space[3] }}>
        <View style={{ width: 42, height: 42, borderRadius: 21, backgroundColor: colors.primarySoft, alignItems: "center", justifyContent: "center" }}>
          <User size={20} color={colors.primaryDeep} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={type.bodyStrong}>{j.tech}</Text>
          <Text style={type.small}>Senior tech · HVAC certified</Text>
        </View>
        <Badge label="En route · 6 min" tone="warning" />
      </Card>

      <SectionHeader title="Checklist" />
      <Card padded={false} style={{ padding: space[4] }}>
        {checklist.map((c, i) => (
          <View key={i} style={{ flexDirection: "row", alignItems: "center", gap: space[3], paddingVertical: space[3], borderBottomWidth: i === checklist.length - 1 ? 0 : 1, borderBottomColor: colors.hairline }}>
            <View style={{ width: 22, height: 22, borderRadius: 6, borderWidth: 1.5, borderColor: c.done ? colors.success : colors.hairline, backgroundColor: c.done ? colors.success : "transparent", alignItems: "center", justifyContent: "center" }}>
              {c.done ? <CheckSquare size={13} color="#fff" /> : null}
            </View>
            <Text style={[type.bodyStrong, { flex: 1, color: c.done ? colors.muted : colors.ink, textDecorationLine: c.done ? "line-through" : "none" }]}>{c.t}</Text>
          </View>
        ))}
      </Card>

      <SectionHeader title="Photos" action="Add" />
      <View style={{ flexDirection: "row", gap: space[3] }}>
        {[0,1,2].map(i => (
          <View key={i} style={{ flex: 1, aspectRatio: 1, borderRadius: radius.lg, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.hairline, alignItems: "center", justifyContent: "center" }}>
            <Camera size={22} color={colors.muted} />
          </View>
        ))}
      </View>
    </Screen>
  );
}

function Kv({ k, v, strong }: { k: string; v: string; strong?: boolean }) {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <Text style={type.small}>{k}</Text>
      <Text style={strong ? { ...type.bodyStrong, fontFamily: "Inter_700Bold" } : type.bodyStrong}>{v}</Text>
    </View>
  );
}
