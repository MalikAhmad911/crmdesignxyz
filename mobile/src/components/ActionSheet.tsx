import React from "react";
import { Modal, View, Text, Pressable, StyleSheet } from "react-native";
import { colors, radius, space, type } from "@/theme/tokens";

type Item = { label: string; onPress: () => void; destructive?: boolean };
export function ActionSheet({ open, onClose, title, items }: { open: boolean; onClose: () => void; title?: string; items: Item[] }) {
  return (
    <Modal transparent visible={open} animationType="slide" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose} />
      <View style={styles.sheet}>
        {title ? <Text style={[type.h3, { textAlign: "center", marginBottom: space[3] }]}>{title}</Text> : null}
        {items.map((it, i) => (
          <Pressable
            key={i}
            onPress={() => { it.onPress(); onClose(); }}
            style={({ pressed }) => [styles.item, { opacity: pressed ? 0.6 : 1 }]}
          >
            <Text style={{ ...type.bodyStrong, color: it.destructive ? colors.danger : colors.ink, textAlign: "center" }}>{it.label}</Text>
          </Pressable>
        ))}
        <Pressable onPress={onClose} style={[styles.item, { marginTop: space[2], backgroundColor: colors.surface }]}>
          <Text style={{ ...type.bodyStrong, textAlign: "center" }}>Cancel</Text>
        </Pressable>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: "rgba(10,37,64,0.35)" },
  sheet: {
    position: "absolute", left: 0, right: 0, bottom: 0,
    backgroundColor: colors.bg, borderTopLeftRadius: radius.xxl, borderTopRightRadius: radius.xxl,
    padding: space[4], paddingBottom: space[8], gap: space[1],
  },
  item: { paddingVertical: space[4], borderRadius: radius.md },
});
