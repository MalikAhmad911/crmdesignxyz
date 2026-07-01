import React from "react";
import { View, Text } from "react-native";
import { router } from "expo-router";
import { Calendar } from "lucide-react-native";
import { Screen } from "@/components/Screen";
import { Header } from "@/components/Header";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Progress } from "./workspace";
import { IconTitle } from "./connect-phone";
import { colors, space, type } from "@/theme/tokens";

export default function ConnectCalendar() {
  return (
    <Screen>
      <Header title="Connect calendar" subtitle="Step 4 of 5" back />
      <Progress step={4} />
      <View style={{ gap: space[4], marginTop: space[5] }}>
        <Text style={type.h1}>Two-way calendar sync.</Text>
        <Text style={type.body}>AI books jobs straight onto your team's real availability.</Text>
        <View style={{ gap: space[3] }}>
          <Card><IconTitle icon={<Calendar size={18} color={colors.primaryDeep} />} title="Google Calendar" body="Recommended · syncs in real time." /><View style={{ height: space[2] }} /><Button label="Connect Google" fullWidth /></Card>
          <Card><IconTitle icon={<Calendar size={18} color={colors.primaryDeep} />} title="Apple Calendar" body="iCloud calendar sync." /><View style={{ height: space[2] }} /><Button label="Connect Apple" variant="secondary" fullWidth /></Card>
          <Card><IconTitle icon={<Calendar size={18} color={colors.primaryDeep} />} title="Microsoft Outlook" body="Office 365 & Outlook.com." /><View style={{ height: space[2] }} /><Button label="Connect Outlook" variant="secondary" fullWidth /></Card>
        </View>
      </View>
      <View style={{ position: "absolute", left: space[5], right: space[5], bottom: space[6], gap: space[2] }}>
        <Button label="Continue" size="lg" fullWidth onPress={() => router.push("/onboarding/import-website")} />
        <Button label="Skip for now" variant="ghost" onPress={() => router.push("/onboarding/import-website")} />
      </View>
    </Screen>
  );
}
