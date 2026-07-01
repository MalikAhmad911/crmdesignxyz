import React, { useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { router } from "expo-router";
import { Plus } from "lucide-react-native";
import { Screen } from "@/components/Screen";
import { Header } from "@/components/Header";
import { AppointmentCard } from "@/components/AppointmentCard";
import { colors, radius, space, type } from "@/theme/tokens";
import { appts } from "@/mocks";

const DAYS = ["Mon 30", "Tue 1", "Wed 2", "Thu 3", "Fri 4", "Sat 5", "Sun 6"];

export default function CalendarTab() {
  const [view, setView] = useState<"Day" | "Week">("Day");
  const [dayIdx, setDayIdx] = useState(0);

  return (
    <Screen scroll={false}>
      <Header title="Calendar" subtitle="Today · 3 appointments" onBell={() => {}} right={
        <Pressable onPress={() => router.push("/calendar/new")} style={{ width: 40, height: 40, borderRadius: 20, alignItems: "center", justifyContent: "center", backgroundColor: colors.primary }}>
          <Plus size={20} color="#fff" />
        </Pressable>
      } />

      <View style={{ flexDirection: "row", backgroundColor: colors.surface, borderRadius: radius.pill, padding: 4, alignSelf: "flex-start" }}>
        {(["Day","Week"] as const).map(v => (
          <Pressable key={v} onPress={() => setView(v)}
            style={{ paddingHorizontal: 18, paddingVertical: 8, borderRadius: radius.pill, backgroundColor: view === v ? colors.bg : "transparent" }}>
            <Text style={{ color: view === v ? colors.ink : colors.muted, fontFamily: "Inter_600SemiBold", fontSize: 13 }}>{v}</Text>
          </Pressable>
        ))}
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: space[2], marginTop: space[4], marginBottom: space[4] }}>
        {DAYS.map((d, i) => {
          const active = dayIdx === i;
          const [dow, num] = d.split(" ");
          return (
            <Pressable key={d} onPress={() => setDayIdx(i)}
              style={{
                width: 56, paddingVertical: 10, alignItems: "center", borderRadius: radius.lg,
                backgroundColor: active ? colors.primary : colors.surface,
              }}>
              <Text style={{ fontSize: 11, color: active ? "#fff" : colors.muted, fontFamily: "Inter_600SemiBold" }}>{dow.toUpperCase()}</Text>
              <Text style={{ fontSize: 18, color: active ? "#fff" : colors.ink, fontFamily: "Inter_700Bold" }}>{num}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: space[3], paddingBottom: space[8] }}>
        <Text style={type.micro}>MORNING</Text>
        {appts.slice(0, 1).map(a => <AppointmentCard key={a.id} appt={a} onPress={() => router.push(`/calendar/${a.id}`)} />)}
        <Text style={[type.micro, { marginTop: space[3] }]}>AFTERNOON</Text>
        {appts.map(a => <AppointmentCard key={a.id + "-a"} appt={a} onPress={() => router.push(`/calendar/${a.id}`)} />)}
      </ScrollView>
    </Screen>
  );
}
