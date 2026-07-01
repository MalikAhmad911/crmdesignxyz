import React from "react";
import { View, Text } from "react-native";
import { Inbox } from "lucide-react-native";
import { Button } from "./Button";
import { colors, space, type } from "@/theme/tokens";

export function EmptyState({ title, description, actionLabel, onAction, icon }: {
  title: string; description?: string; actionLabel?: string; onAction?: () => void; icon?: React.ReactNode;
}) {
  return (
    <View style={{ alignItems: "center", paddingVertical: space[10], paddingHorizontal: space[6], gap: space[3] }}>
      <View style={{
        width: 64, height: 64, borderRadius: 32, alignItems: "center", justifyContent: "center",
        backgroundColor: colors.primarySoft,
      }}>
        {icon ?? <Inbox size={28} color={colors.primaryDeep} />}
      </View>
      <Text style={[type.h2, { textAlign: "center" }]}>{title}</Text>
      {description ? <Text style={[type.body, { textAlign: "center", maxWidth: 280 }]}>{description}</Text> : null}
      {actionLabel ? <Button label={actionLabel} onPress={onAction} style={{ marginTop: space[3] }} /> : null}
    </View>
  );
}

export function LoadingState() {
  return (
    <View style={{ gap: space[3], paddingVertical: space[4] }}>
      {[0,1,2].map(i => (
        <View key={i} style={{ height: 72, borderRadius: 16, backgroundColor: colors.surface }} />
      ))}
    </View>
  );
}

export function ErrorState({ onRetry }: { onRetry?: () => void }) {
  return <EmptyState title="Something went wrong" description="Pull to refresh or try again." actionLabel={onRetry ? "Retry" : undefined} onAction={onRetry} />;
}
