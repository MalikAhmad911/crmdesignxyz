import React, { useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { router } from "expo-router";
import { Plus, LayoutGrid, List } from "lucide-react-native";
import { Screen } from "@/components/Screen";
import { Header } from "@/components/Header";
import { JobCard } from "@/components/JobCard";
import { Input } from "@/components/Input";
import { colors, radius, space, type } from "@/theme/tokens";
import { jobs } from "@/mocks";

const TABS = ["All", "Today", "Scheduled", "In progress", "Complete"] as const;

export default function JobsTab() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Today");
  const [mode, setMode] = useState<"list" | "board">("list");

  return (
    <Screen scroll={false}>
      <Header title="Jobs" subtitle={`${jobs.length} active`} onBell={() => {}} right={
        <Pressable onPress={() => {}} style={{ width: 40, height: 40, borderRadius: 20, alignItems: "center", justifyContent: "center", backgroundColor: colors.primary }}>
          <Plus size={20} color="#fff" />
        </Pressable>
      } />

      <View style={{ flexDirection: "row", gap: space[2], marginBottom: space[3] }}>
        <View style={{ flex: 1 }}><Input placeholder="Search jobs" /></View>
        <Pressable onPress={() => setMode(mode === "list" ? "board" : "list")}
          style={{ width: 50, height: 50, borderRadius: radius.md, borderWidth: 1, borderColor: colors.hairline, alignItems: "center", justifyContent: "center" }}>
          {mode === "list" ? <LayoutGrid size={18} color={colors.ink} /> : <List size={18} color={colors.ink} />}
        </Pressable>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: space[2], paddingBottom: space[3] }}>
        {TABS.map(t => {
          const active = t === tab;
          return (
            <Pressable key={t} onPress={() => setTab(t)}
              style={{ paddingHorizontal: space[4], paddingVertical: 8, borderRadius: radius.pill, backgroundColor: active ? colors.ink : colors.surface }}>
              <Text style={{ color: active ? "#fff" : colors.body, fontFamily: "Inter_600SemiBold", fontSize: 13 }}>{t}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {mode === "list" ? (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: space[3], paddingBottom: space[8] }}>
          {jobs.map(j => <JobCard key={j.id} job={j} onPress={() => router.push(`/jobs/${j.id}`)} />)}
        </ScrollView>
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: space[3], paddingBottom: space[8] }}>
          {["Scheduled", "En route", "In progress", "Complete"].map(col => (
            <View key={col} style={{ width: 260, gap: space[3] }}>
              <Text style={type.micro}>{col.toUpperCase()}</Text>
              {jobs.slice(0, 2).map(j => <JobCard key={col + j.id} job={j} onPress={() => router.push(`/jobs/${j.id}`)} />)}
            </View>
          ))}
        </ScrollView>
      )}
    </Screen>
  );
}
