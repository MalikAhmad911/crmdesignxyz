import React from "react";
import { View, Text, ScrollView } from "react-native";
import { router } from "expo-router";
import { Phone, PhoneMissed, CalendarCheck, DollarSign, Star, Sparkles } from "lucide-react-native";
import { Screen } from "@/components/Screen";
import { Header } from "@/components/Header";
import { MetricCard } from "@/components/MetricCard";
import { QuickActions } from "@/components/QuickActions";
import { SectionHeader } from "@/components/SectionHeader";
import { LeadCard } from "@/components/LeadCard";
import { AISuggestionCard } from "@/components/AISuggestionCard";
import { Card } from "@/components/Card";
import { Avatar } from "@/components/Avatar";
import { colors, space, type } from "@/theme/tokens";
import { leads, activity } from "@/mocks";

export default function Dashboard() {
  return (
    <Screen>
      <Header title="Good afternoon, Alex" subtitle="Tuesday, June 30" onBell={() => {}} onSearch={() => {}} />

      <View style={{ gap: space[3] }}>
        <View style={{ flexDirection: "row", gap: space[3] }}>
          <MetricCard label="New leads"        value="12" delta="+4"    positive hint="today"    icon={<Sparkles size={16} color={colors.primary} />} />
          <MetricCard label="Missed → recovered" value="7/8" delta="88%" positive hint="rate"    icon={<PhoneMissed size={16} color={colors.warning} />} />
        </View>
        <View style={{ flexDirection: "row", gap: space[3] }}>
          <MetricCard label="Booked"           value="9"    delta="+2"    positive hint="today"    icon={<CalendarCheck size={16} color={colors.success} />} />
          <MetricCard label="Collected"        value="$3.2K" delta="+18%" positive hint="vs yday"  icon={<DollarSign size={16} color={colors.success} />} />
        </View>
        <View style={{ flexDirection: "row", gap: space[3] }}>
          <MetricCard label="Reviews"          value="4"    delta="+1"    positive hint="new"      icon={<Star size={16} color="#F59E0B" />} />
          <MetricCard label="AI tasks"         value="42"   delta="+11"   positive hint="today"    icon={<Sparkles size={16} color={colors.primaryDeep} />} />
        </View>
      </View>

      <SectionHeader title="Quick actions" />
      <QuickActions onPress={() => {}} />

      <SectionHeader title="Needs your attention" action="View AI queue" onAction={() => router.push("/ai/employee")} />
      <AISuggestionCard
        title="Approve reply to Priya Rao"
        body="Draft: “Hi Priya — we can be there at 3pm today. I'll send a confirmation text with the tech's ETA.”"
      />

      <SectionHeader title="Fresh leads" action="See all" onAction={() => router.push("/(tabs)/contacts")} />
      <View style={{ gap: space[3] }}>
        {leads.slice(0, 3).map(l => <LeadCard key={l.id} lead={l} onPress={() => router.push(`/contacts/${l.id}`)} />)}
      </View>

      <SectionHeader title="Recent activity" action="Open feed" onAction={() => {}} />
      <Card padded={false} style={{ padding: space[4] }}>
        {activity.map((a, i) => (
          <View key={a.id} style={{ flexDirection: "row", gap: space[3], paddingVertical: space[3], borderBottomWidth: i === activity.length - 1 ? 0 : 1, borderBottomColor: colors.hairline }}>
            <Avatar name={a.who} size={32} />
            <View style={{ flex: 1 }}>
              <Text style={type.smallStrong}>{a.who}</Text>
              <Text style={type.small}>{a.what}</Text>
            </View>
            <Text style={[type.small, { fontSize: 11 }]}>{a.time}</Text>
          </View>
        ))}
      </Card>
    </Screen>
  );
}
