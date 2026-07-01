import React, { useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { router } from "expo-router";
import { Plus, Phone, MessageSquare, Mail } from "lucide-react-native";
import { Screen } from "@/components/Screen";
import { Header } from "@/components/Header";
import { Input } from "@/components/Input";
import { Avatar } from "@/components/Avatar";
import { Badge } from "@/components/Badge";
import { colors, radius, space, type } from "@/theme/tokens";
import { contacts } from "@/mocks";

export default function ContactsTab() {
  const [q, setQ] = useState("");
  const filtered = contacts.filter(c => c.name.toLowerCase().includes(q.toLowerCase()));
  const grouped = filtered.reduce<Record<string, typeof contacts>>((acc, c) => {
    const k = c.name[0].toUpperCase();
    (acc[k] ??= []).push(c);
    return acc;
  }, {});

  return (
    <Screen scroll={false}>
      <Header title="Contacts" subtitle={`${contacts.length} people`} onBell={() => {}} right={
        <Pressable onPress={() => router.push("/contacts/new")} style={{ width: 40, height: 40, borderRadius: 20, alignItems: "center", justifyContent: "center", backgroundColor: colors.primary }}>
          <Plus size={20} color="#fff" />
        </Pressable>
      } />
      <Input placeholder="Search by name, phone, email" value={q} onChangeText={setQ} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingTop: space[4], paddingBottom: space[8] }}>
        {Object.entries(grouped).map(([k, list]) => (
          <View key={k}>
            <Text style={{ ...type.micro, marginTop: space[3], marginBottom: space[2] }}>{k}</Text>
            {list.map(c => (
              <Pressable key={c.id} onPress={() => router.push(`/contacts/${c.id}`)}
                style={{ flexDirection: "row", alignItems: "center", gap: space[3], paddingVertical: space[3], borderBottomWidth: 1, borderBottomColor: colors.hairline }}>
                <Avatar name={c.name} />
                <View style={{ flex: 1 }}>
                  <Text style={type.bodyStrong}>{c.name}</Text>
                  <Text style={[type.small, { fontSize: 12 }]}>{c.phone} · {c.tag}</Text>
                </View>
                <Badge label={`${c.score}`} tone={c.score >= 80 ? "success" : c.score >= 50 ? "warning" : "neutral"} />
              </Pressable>
            ))}
          </View>
        ))}
      </ScrollView>
    </Screen>
  );
}
