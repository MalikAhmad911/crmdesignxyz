import React, { useState } from "react";
import { View, Text, ScrollView, TextInput, Pressable, KeyboardAvoidingView, Platform } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { Phone, MoreHorizontal, Send, Sparkles, Paperclip } from "lucide-react-native";
import { Screen } from "@/components/Screen";
import { Avatar } from "@/components/Avatar";
import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { AISuggestionCard } from "@/components/AISuggestionCard";
import { colors, radius, space, type } from "@/theme/tokens";
import { conversations } from "@/mocks";

const messages = [
  { id: "m1", who: "them",     text: "Hi — my AC stopped cooling this morning, can someone come today?", time: "1:12 PM" },
  { id: "m2", who: "ai",       text: "Hi Priya, I have a 2pm slot open with Marcus. Should I book it?", time: "1:13 PM" },
  { id: "m3", who: "them",     text: "Yes, 3pm would be better if possible.", time: "1:14 PM" },
];

export default function ConversationDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const c = conversations.find(x => x.id === id) ?? conversations[0];
  const [text, setText] = useState("");

  return (
    <Screen scroll={false} padded={false}>
      {/* Top bar */}
      <View style={{ flexDirection: "row", alignItems: "center", padding: space[4], gap: space[3], borderBottomWidth: 1, borderBottomColor: colors.hairline }}>
        <Pressable onPress={() => router.back()} hitSlop={12}><Text style={{ color: colors.primaryDeep, fontFamily: "Inter_600SemiBold" }}>Back</Text></Pressable>
        <Avatar name={c.name} size={36} />
        <View style={{ flex: 1 }}>
          <Text style={type.bodyStrong}>{c.name}</Text>
          <Text style={[type.small, { fontSize: 11 }]}>{c.channel.toUpperCase()} · (512) 555-0123</Text>
        </View>
        <Pressable style={iconBtn}><Phone size={18} color={colors.primaryDeep} /></Pressable>
        <Pressable style={iconBtn}><MoreHorizontal size={18} color={colors.ink} /></Pressable>
      </View>

      <ScrollView contentContainerStyle={{ padding: space[4], gap: space[3] }}>
        <Card padded={false} style={{ padding: space[3], flexDirection: "row", gap: space[2], alignItems: "center", backgroundColor: colors.surface, borderColor: "transparent" }}>
          <Avatar name={c.name} size={28} />
          <View style={{ flex: 1 }}>
            <Text style={type.smallStrong}>Priya Rao</Text>
            <Text style={[type.small, { fontSize: 11 }]}>Lead score 92 · HVAC customer since 2022</Text>
          </View>
          <Badge label="Hot lead" tone="success" />
        </Card>

        {messages.map(m => <Bubble key={m.id} m={m} />)}

        <AISuggestionCard
          title="Suggested reply"
          body="“No problem — 3pm works. I'll send Marcus your way and text his ETA when he's on route.”"
          onApprove={() => {}}
          onDismiss={() => {}}
        />
      </ScrollView>

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: space[2], padding: space[3], borderTopWidth: 1, borderTopColor: colors.hairline }}>
          <Pressable style={iconBtn}><Paperclip size={18} color={colors.muted} /></Pressable>
          <View style={{ flex: 1, borderWidth: 1, borderColor: colors.hairline, borderRadius: radius.pill, paddingHorizontal: space[4], height: 44, justifyContent: "center" }}>
            <TextInput value={text} onChangeText={setText} placeholder="Message" placeholderTextColor={colors.muted} style={{ fontSize: 15, color: colors.ink, fontFamily: "Inter_400Regular" }} />
          </View>
          <Pressable style={[iconBtn, { backgroundColor: colors.primarySoft }]}><Sparkles size={18} color={colors.primaryDeep} /></Pressable>
          <Pressable style={[iconBtn, { backgroundColor: colors.primary }]}><Send size={18} color="#fff" /></Pressable>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}

function Bubble({ m }: { m: { who: string; text: string; time: string } }) {
  const isMe = m.who === "me";
  const isAI = m.who === "ai";
  const align = isMe || isAI ? "flex-end" : "flex-start";
  const bg = isAI ? colors.primary : isMe ? colors.ink : colors.surface;
  const fg = isAI || isMe ? "#fff" : colors.ink;
  return (
    <View style={{ alignItems: align, gap: 4 }}>
      {isAI ? <Badge label="AI reply · sent for you" tone="primary" dot /> : null}
      <View style={{ maxWidth: "82%", padding: space[3], backgroundColor: bg, borderRadius: 16, borderBottomRightRadius: isMe || isAI ? 4 : 16, borderBottomLeftRadius: isMe || isAI ? 16 : 4 }}>
        <Text style={{ color: fg, fontFamily: "Inter_400Regular", fontSize: 15, lineHeight: 21 }}>{m.text}</Text>
      </View>
      <Text style={[type.small, { fontSize: 11 }]}>{m.time}</Text>
    </View>
  );
}

const iconBtn = { width: 40, height: 40, borderRadius: 20, alignItems: "center" as const, justifyContent: "center" as const, backgroundColor: colors.surface };
