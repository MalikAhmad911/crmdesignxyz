import React, { useState } from "react";
import { View, Text } from "react-native";
import { router } from "expo-router";
import { Globe, Sparkles } from "lucide-react-native";
import { Screen } from "@/components/Screen";
import { Header } from "@/components/Header";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Progress } from "./workspace";
import { colors, radius, space, type } from "@/theme/tokens";

export default function ImportWebsite() {
  const [url, setUrl] = useState("");
  return (
    <Screen>
      <Header title="Teach the AI" subtitle="Step 5 of 5" back />
      <Progress step={5} />
      <View style={{ gap: space[4], marginTop: space[5] }}>
        <Text style={type.h1}>Import your website.</Text>
        <Text style={type.body}>We'll ingest your services, pricing, FAQs, and hours so the AI can answer like you.</Text>
        <Input label="Website URL" placeholder="https://reyeshvac.com" leftIcon={<Globe size={18} color={colors.muted} />} value={url} onChangeText={setUrl} autoCapitalize="none" />

        <Card style={{ gap: space[3], backgroundColor: "#FBFAFF", borderColor: colors.primarySoft }}>
          <View style={{ flexDirection: "row", gap: space[2], alignItems: "center" }}>
            <View style={{ width: 32, height: 32, borderRadius: radius.md, backgroundColor: colors.primary, alignItems: "center", justifyContent: "center" }}>
              <Sparkles size={16} color="#fff" />
            </View>
            <Text style={type.h3}>We'll extract:</Text>
          </View>
          {["Services & pricing", "Business hours & service area", "FAQs and policies", "Team & specialties"].map(x => (
            <Text key={x} style={type.small}>•  {x}</Text>
          ))}
        </Card>
      </View>
      <View style={{ position: "absolute", left: space[5], right: space[5], bottom: space[6], gap: space[2] }}>
        <Button label="Import & finish" size="lg" fullWidth onPress={() => router.push("/onboarding/complete")} />
        <Button label="I'll add later" variant="ghost" onPress={() => router.push("/onboarding/complete")} />
      </View>
    </Screen>
  );
}
