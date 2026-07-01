import React from "react";
import { Tabs } from "expo-router";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Home, Inbox, Users, Calendar, Briefcase } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, space } from "@/theme/tokens";

const items = [
  { name: "dashboard", label: "Home",     Icon: Home },
  { name: "inbox",     label: "Inbox",    Icon: Inbox },
  { name: "contacts",  label: "Contacts", Icon: Users },
  { name: "calendar",  label: "Calendar", Icon: Calendar },
  { name: "jobs",      label: "Jobs",     Icon: Briefcase },
] as const;

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false, tabBarShowLabel: false }}
      tabBar={(props) => {
        const { state, navigation } = props;
        return (
          <SafeAreaView edges={["bottom"]} style={{ backgroundColor: colors.bg, borderTopWidth: 1, borderTopColor: colors.hairline }}>
            <View style={styles.bar}>
              {items.map((it, idx) => {
                const focused = state.index === idx;
                const Icon = it.Icon;
                return (
                  <Pressable
                    key={it.name}
                    onPress={() => navigation.navigate(it.name as never)}
                    style={styles.tab}
                  >
                    <Icon size={22} color={focused ? colors.primaryDeep : colors.muted} strokeWidth={focused ? 2.4 : 2} />
                    <Text style={[styles.lbl, { color: focused ? colors.primaryDeep : colors.muted, fontFamily: focused ? "Inter_600SemiBold" : "Inter_500Medium" }]}>
                      {it.label}
                    </Text>
                    {focused ? <View style={styles.pill} /> : null}
                  </Pressable>
                );
              })}
            </View>
          </SafeAreaView>
        );
      }}
    >
      {items.map((it) => (<Tabs.Screen key={it.name} name={it.name} />))}
    </Tabs>
  );
}

const styles = StyleSheet.create({
  bar: { flexDirection: "row", paddingTop: 8, paddingBottom: 6, paddingHorizontal: space[2] },
  tab: { flex: 1, alignItems: "center", justifyContent: "center", gap: 3, paddingVertical: 6 },
  lbl: { fontSize: 11 },
  pill: { position: "absolute", top: 0, height: 3, width: 26, borderRadius: 3, backgroundColor: colors.primary },
});
