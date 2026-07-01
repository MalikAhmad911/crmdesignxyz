import React, { useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { router } from "expo-router";
import { Filter, Plus } from "lucide-react-native";
import { Screen } from "@/components/Screen";
import { Header } from "@/components/Header";
import { Input } from "@/components/Input";
import { ConversationRow } from "@/components/ConversationRow";
import { colors, radius, space, type } from "@/theme/tokens";
import { conversations } from "@/mocks";

const TABS = ["All", "Unread", "SMS", "Email", "Calls", "Webchat", "AI"] as const;

export default function InboxTab() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("All");
  const filtered = conversations.filter(c => {
    if (tab === "All") return true;
    if (tab === "Unread") return c.unread;
    if (tab === "AI") return c.aiHandled;
    return c.channel === tab.toLowerCase().replace("s", "").replace("calll", "call") ||
      (tab === "SMS" && c.channel === "sms") ||
      (tab === "Email" && c.channel === "email") ||
      (tab === "Calls" && c.channel === "call") ||
      (tab === "Webchat" && c.channel === "webchat");
  });

  return (
    <Screen scroll={false}>
      <Header title="Inbox" subtitle="Unified conversations" onBell={() => {}} right={
        <Pressable onPress={() => {}} style={{ width: 40, height: 40, borderRadius: 20, alignItems: "center", justifyContent: "center", backgroundColor: colors.primary }}>
          <Plus size={20} color="#fff" />
        </Pressable>
      } />
      <View style={{ paddingBottom: space[3] }}>
        <Input placeholder="Search conversations" />
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: space[2], paddingBottom: space[3] }}>
        {TABS.map(t => {
          const active = t === tab;
          return (
            <Pressable key={t} onPress={() => setTab(t)}
              style={{
                paddingHorizontal: space[4], paddingVertical: 8, borderRadius: radius.pill,
                backgroundColor: active ? colors.ink : colors.surface,
              }}>
              <Text style={{ color: active ? "#fff" : colors.body, fontFamily: "Inter_600SemiBold", fontSize: 13 }}>{t}</Text>
            </Pressable>
          );
        })}
      </ScrollView>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: space[8] }}>
        {filtered.map(c => <ConversationRow key={c.id} item={c} onPress={() => router.push(`/inbox/${c.id}`)} />)}
      </ScrollView>
    </Screen>
  );
}
