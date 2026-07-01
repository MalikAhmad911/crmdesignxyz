import React from "react";
import { View, Text } from "react-native";
import { router } from "expo-router";
import { CheckCircle2 } from "lucide-react-native";
import { Screen } from "@/components/Screen";
import { Button } from "@/components/Button";
import { colors, radius, space, type } from "@/theme/tokens";

export default function Complete() {
  return (
    <Screen scroll={false} padded={false}>
      <View style={{ flex: 1, padding: space[6], justifyContent: "space-between" }}>
        <View />
        <View style={{ alignItems: "center", gap: space[4] }}>
          <View style={{ width: 88, height: 88, borderRadius: 44, backgroundColor: colors.successSoft, alignItems: "center", justifyContent: "center" }}>
            <CheckCircle2 size={44} color={colors.success} />
          </View>
          <Text style={{ ...type.display, textAlign: "center" }}>You're live.</Text>
          <Text style={[type.body, { textAlign: "center", maxWidth: 300 }]}>
            Your AI receptionist is answering, your inbox is unified, and your calendar is synced.
            Let's book some jobs.
          </Text>
        </View>
        <View style={{ gap: space[3] }}>
          <Button label="Open dashboard" size="lg" fullWidth onPress={() => router.replace("/(tabs)/dashboard")} />
          <Button label="Take a 30-second tour" variant="ghost" onPress={() => router.replace("/(tabs)/dashboard")} />
        </View>
      </View>
    </Screen>
  );
}
