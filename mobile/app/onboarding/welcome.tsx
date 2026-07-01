import React from "react";
import { View, Text } from "react-native";
import { router } from "expo-router";
import { Sparkles } from "lucide-react-native";
import { Screen } from "@/components/Screen";
import { Button } from "@/components/Button";
import { colors, radius, space, type } from "@/theme/tokens";

export default function Welcome() {
  return (
    <Screen padded={false} scroll={false}>
      <View style={{ flex: 1, padding: space[6], justifyContent: "space-between" }}>
        <View style={{ paddingTop: space[6] }}>
          <View style={{ width: 56, height: 56, borderRadius: radius.lg, backgroundColor: colors.primary, alignItems: "center", justifyContent: "center" }}>
            <Sparkles size={26} color="#fff" />
          </View>
        </View>

        <View style={{ gap: space[3] }}>
          <Text style={{ ...type.display, fontSize: 36, lineHeight: 42 }}>Run your business from anywhere.</Text>
          <Text style={type.body}>
            RevenueSol helps you capture leads, answer customers, book jobs, collect reviews,
            manage payments, and automate follow-up with AI.
          </Text>
        </View>

        <View style={{ gap: space[3] }}>
          <Button label="Get started" size="lg" fullWidth onPress={() => router.push("/onboarding/sign-in")} />
          <Button label="I already have an account" size="lg" variant="ghost" fullWidth onPress={() => router.push("/onboarding/sign-in")} />
          <Text style={[type.small, { textAlign: "center", fontSize: 12 }]}>
            By continuing you agree to our Terms & Privacy Policy.
          </Text>
        </View>
      </View>
    </Screen>
  );
}
