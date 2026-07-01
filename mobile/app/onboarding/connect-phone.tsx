import React from "react";
import { View, Text } from "react-native";
import { router } from "expo-router";
import { Phone } from "lucide-react-native";
import { Screen } from "@/components/Screen";
import { Header } from "@/components/Header";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Progress } from "./workspace";
import { colors, radius, space, type } from "@/theme/tokens";

export default function ConnectPhone() {
  return (
    <Screen>
      <Header title="Connect phone" subtitle="Step 2 of 5" back />
      <Progress step={2} />
      <View style={{ gap: space[4], marginTop: space[5] }}>
        <View>
          <Text style={type.h1}>Never miss another call.</Text>
          <Text style={[type.body, { marginTop: 6 }]}>Point your existing number here or grab a new one.</Text>
        </View>

        <Card style={{ gap: space[3] }}>
          <IconTitle icon={<Phone size={18} color={colors.primaryDeep} />} title="Port an existing number" body="Keep your business line, we handle the port in ~7 days." />
          <Button label="Port a number" variant="secondary" fullWidth />
        </Card>
        <Card style={{ gap: space[3] }}>
          <IconTitle icon={<Phone size={18} color={colors.primaryDeep} />} title="Get a new number" body="Free local or toll-free number, active in minutes." />
          <Button label="Choose a number" fullWidth />
        </Card>
      </View>

      <View style={{ position: "absolute", left: space[5], right: space[5], bottom: space[6], gap: space[2] }}>
        <Button label="Continue" size="lg" fullWidth onPress={() => router.push("/onboarding/connect-email")} />
        <Button label="Skip for now" variant="ghost" onPress={() => router.push("/onboarding/connect-email")} />
      </View>
    </Screen>
  );
}

export function IconTitle({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <View style={{ flexDirection: "row", gap: space[3] }}>
      <View style={{ width: 36, height: 36, borderRadius: radius.md, backgroundColor: colors.primarySoft, alignItems: "center", justifyContent: "center" }}>
        {icon}
      </View>
      <View style={{ flex: 1 }}>
        <Text style={type.bodyStrong}>{title}</Text>
        <Text style={[type.small, { marginTop: 2 }]}>{body}</Text>
      </View>
    </View>
  );
}
