import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Phone, Mail, MessageSquare, Globe } from "lucide-react-native";
import { Avatar } from "./Avatar";
import { Badge } from "./Badge";
import { colors, space, type } from "@/theme/tokens";

export type Channel = "sms" | "email" | "call" | "webchat";
export type Conversation = {
  id: string;
  name: string;
  channel: Channel;
  preview: string;
  time: string;
  unread?: boolean;
  aiHandled?: boolean;
};

const ChannelIcon = { sms: MessageSquare, email: Mail, call: Phone, webchat: Globe };

export function ConversationRow({ item, onPress }: { item: Conversation; onPress?: () => void }) {
  const Icon = ChannelIcon[item.channel];
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.row, { opacity: pressed ? 0.7 : 1 }]}>
      <Avatar name={item.name} />
      <View style={{ flex: 1, gap: 3 }}>
        <View style={styles.line}>
          <Text style={type.bodyStrong} numberOfLines={1}>{item.name}</Text>
          <Text style={type.small}>{item.time}</Text>
        </View>
        <View style={styles.line}>
          <View style={styles.channel}>
            <Icon size={12} color={colors.muted} />
            <Text style={[type.small, { fontSize: 12 }]} numberOfLines={1}>{item.preview}</Text>
          </View>
          {item.unread ? <View style={styles.dot} /> : item.aiHandled ? <Badge label="AI" tone="primary" /> : null}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", gap: space[3], paddingVertical: space[3], borderBottomWidth: 1, borderBottomColor: colors.hairline, alignItems: "center" },
  line: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: space[3] },
  channel: { flexDirection: "row", alignItems: "center", gap: 6, flex: 1 },
  dot: { width: 9, height: 9, borderRadius: 5, backgroundColor: colors.primary },
});
