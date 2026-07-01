import React from "react";
import { View, Text } from "react-native";
import { router } from "expo-router";
import { Mail } from "lucide-react-native";
import { Screen } from "@/components/Screen";
import { Header } from "@/components/Header";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Progress } from "./workspace";
import { IconTitle } from "./connect-phone";
import { colors, space, type } from "@/theme/tokens";

export default function ConnectEmail() {
  return (
    <Screen>
      <Header title="Connect email" subtitle="Step 3 of 5" back />
      <Progress step={3} />
      <View style={{ gap: space[4], marginTop: space[5] }}>
        <Text style={type.h1}>All customer email in one inbox.</Text>
        <Text style={type.body}>We support Gmail, Google Workspace, Outlook, and any IMAP.</Text>
        <View style={{ gap: space[3] }}>
          <Card><IconTitle icon={<Mail size={18} color={colors.primaryDeep} />} title="Connect Gmail" body="OAuth in one tap, no password needed." /><View style={{ height: space[2] }} /><Button label="Connect Gmail" fullWidth /></Card>
          <Card><IconTitle icon={<Mail size={18} color={colors.primaryDeep} />} title="Connect Outlook" body="Microsoft 365 & Outlook.com." /><View style={{ height: space[2] }} /><Button label="Connect Outlook" variant="secondary" fullWidth /></Card>
          <Card><IconTitle icon={<Mail size={18} color={colors.primaryDeep} />} title="Use IMAP" body="For custom domains and older providers." /><View style={{ height: space[2] }} /><Button label="Configure IMAP" variant="secondary" fullWidth /></Card>
        </View>
      </View>
      <View style={{ position: "absolute", left: space[5], right: space[5], bottom: space[6], gap: space[2] }}>
        <Button label="Continue" size="lg" fullWidth onPress={() => router.push("/onboarding/connect-calendar")} />
        <Button label="Skip for now" variant="ghost" onPress={() => router.push("/onboarding/connect-calendar")} />
      </View>
    </Screen>
  );
}
