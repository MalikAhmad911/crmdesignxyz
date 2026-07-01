import React, { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { Sparkles, Send, CheckCircle2 } from "lucide-react-native";
import { Screen } from "@/components/Screen";
import { Header } from "@/components/Header";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { SectionHeader } from "@/components/SectionHeader";
import { colors, radius, space, type } from "@/theme/tokens";

const EXAMPLES = [
  "Text every unpaid invoice from last week a friendly reminder.",
  "Book Priya at 3pm and confirm by SMS.",
  "Draft review replies for anything ≥4 stars from Google this week.",
  "Follow up with all leads that haven't heard from us in 48 hours.",
];

const PLAN = [
  { t: "Find invoices marked 'sent' or 'overdue' in the last 7 days", ok: true },
  { t: "Compose personalized SMS using customer name and amount", ok: true },
  { t: "Skip anyone who paid in the last 24 hours", ok: true },
  { t: "Send via Twilio at 10:00 AM local time", ok: true },
];

export default function AIBrain() {
  const [cmd, setCmd] = useState("");
  const [state, setState] = useState<"idle" | "plan" | "done">("idle");
  return (
    <Screen>
      <Header title="AI Brain" back subtitle="Give it any task in plain English" />

      <Card style={{ gap: space[3], borderColor: colors.primarySoft, backgroundColor: "#FBFAFF" }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: space[2] }}>
          <View style={{ width: 32, height: 32, borderRadius: radius.md, backgroundColor: colors.primary, alignItems: "center", justifyContent: "center" }}>
            <Sparkles size={16} color="#fff" />
          </View>
          <Text style={type.h3}>Command center</Text>
        </View>
        <View style={{ borderWidth: 1, borderColor: colors.hairline, borderRadius: radius.md, backgroundColor: colors.bg, padding: space[3], minHeight: 96 }}>
          <TextInput
            multiline placeholder="Ask AI to do anything — draft, book, send, follow up…"
            placeholderTextColor={colors.muted}
            value={cmd} onChangeText={setCmd}
            style={{ fontSize: 15, color: colors.ink, fontFamily: "Inter_400Regular", textAlignVertical: "top" }}
          />
        </View>
        <Button label="Plan it" icon={<Send size={14} color="#fff" />} onPress={() => setState("plan")} />
      </Card>

      {state === "idle" && (
        <>
          <SectionHeader title="Try an example" />
          <View style={{ gap: space[2] }}>
            {EXAMPLES.map(e => (
              <Pressable key={e} onPress={() => { setCmd(e); setState("plan"); }}
                style={{ padding: space[4], borderRadius: radius.md, backgroundColor: colors.surface }}>
                <Text style={type.smallStrong}>{e}</Text>
              </Pressable>
            ))}
          </View>
        </>
      )}

      {state === "plan" && (
        <>
          <SectionHeader title="Plan preview" />
          <Card style={{ gap: space[3] }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: space[2] }}>
              <Badge label="Approval required" tone="warning" dot />
              <Text style={[type.small, { flex: 1 }]}>Affects ~12 customers · uses SMS credits</Text>
            </View>
            {PLAN.map((p, i) => (
              <View key={i} style={{ flexDirection: "row", gap: space[2] }}>
                <CheckCircle2 size={16} color={colors.success} />
                <Text style={[type.small, { flex: 1 }]}>{p.t}</Text>
              </View>
            ))}
          </Card>
          <View style={{ flexDirection: "row", gap: space[2], marginTop: space[3] }}>
            <Button label="Edit" variant="secondary" style={{ flex: 1 }} onPress={() => setState("idle")} />
            <Button label="Approve & run" style={{ flex: 2 }} onPress={() => setState("done")} />
          </View>
        </>
      )}

      {state === "done" && (
        <Card style={{ gap: space[3], alignItems: "center", marginTop: space[4] }}>
          <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: colors.successSoft, alignItems: "center", justifyContent: "center" }}>
            <CheckCircle2 size={32} color={colors.success} />
          </View>
          <Text style={type.h2}>Done — 12 messages sent</Text>
          <Text style={[type.small, { textAlign: "center" }]}>3 customers already replied. Check inbox for follow-ups.</Text>
          <Button label="Open inbox" variant="secondary" onPress={() => setState("idle")} />
        </Card>
      )}
    </Screen>
  );
}
