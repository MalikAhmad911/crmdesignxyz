import React, { useState } from "react";
import { View, Text } from "react-native";
import { router } from "expo-router";
import { Screen } from "@/components/Screen";
import { Header } from "@/components/Header";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { colors, space, type } from "@/theme/tokens";

export default function Workspace() {
  const [name, setName] = useState("");
  const [industry, setIndustry] = useState("");
  return (
    <Screen>
      <Header title="Set up workspace" subtitle="Step 1 of 5" back />
      <Progress step={1} />
      <View style={{ gap: space[4], marginTop: space[5] }}>
        <View>
          <Text style={type.h1}>Tell us about your business.</Text>
          <Text style={[type.body, { marginTop: 6 }]}>We'll tailor RevenueSol to your industry.</Text>
        </View>
        <Input label="Business name" placeholder="Reyes HVAC" value={name} onChangeText={setName} />
        <Input label="Industry" placeholder="HVAC, plumbing, roofing…" value={industry} onChangeText={setIndustry} />
        <Input label="Team size" placeholder="e.g. 3–10" />
      </View>
      <View style={{ position: "absolute", left: space[5], right: space[5], bottom: space[6] }}>
        <Button label="Continue" size="lg" fullWidth onPress={() => router.push("/onboarding/connect-phone")} />
      </View>
    </Screen>
  );
}

export function Progress({ step, total = 5 }: { step: number; total?: number }) {
  return (
    <View style={{ flexDirection: "row", gap: 6, marginTop: space[2] }}>
      {Array.from({ length: total }).map((_, i) => (
        <View key={i} style={{ flex: 1, height: 4, borderRadius: 2, backgroundColor: i < step ? colors.primary : colors.hairline }} />
      ))}
    </View>
  );
}
