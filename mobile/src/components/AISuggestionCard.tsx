import React from "react";
import { View, Text } from "react-native";
import { Sparkles } from "lucide-react-native";
import { Card } from "./Card";
import { Button } from "./Button";
import { colors, radius, space, type } from "@/theme/tokens";

export function AISuggestionCard({ title, body, onApprove, onDismiss }: {
  title: string; body: string; onApprove?: () => void; onDismiss?: () => void;
}) {
  return (
    <Card style={{ gap: space[3], borderColor: colors.primarySoft, backgroundColor: "#FBFAFF" }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: space[2] }}>
        <View style={{ width: 28, height: 28, borderRadius: radius.md, backgroundColor: colors.primary, alignItems: "center", justifyContent: "center" }}>
          <Sparkles size={15} color="#fff" />
        </View>
        <Text style={type.h3}>{title}</Text>
      </View>
      <Text style={type.small}>{body}</Text>
      <View style={{ flexDirection: "row", gap: space[2] }}>
        <Button label="Dismiss" variant="secondary" size="sm" onPress={onDismiss} style={{ flex: 1 }} />
        <Button label="Approve & send" size="sm" onPress={onApprove} style={{ flex: 2 }} />
      </View>
    </Card>
  );
}
