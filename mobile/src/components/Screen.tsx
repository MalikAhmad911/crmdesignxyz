import React from "react";
import { View, ScrollView, StatusBar, StyleSheet, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, space } from "@/theme/tokens";

type Props = {
  children: React.ReactNode;
  scroll?: boolean;
  padded?: boolean;
  background?: string;
  contentStyle?: ViewStyle;
  edges?: ("top" | "bottom" | "left" | "right")[];
};

export function Screen({ children, scroll = true, padded = true, background = colors.bg, contentStyle, edges = ["top"] }: Props) {
  const Wrapper: any = scroll ? ScrollView : View;
  const inner = padded ? { paddingHorizontal: space[5], paddingBottom: space[8] } : {};
  return (
    <SafeAreaView edges={edges} style={[styles.safe, { backgroundColor: background }]}>
      <StatusBar barStyle="dark-content" backgroundColor={background} />
      <Wrapper
        style={{ flex: 1 }}
        contentContainerStyle={scroll ? [inner, contentStyle] : undefined}
        showsVerticalScrollIndicator={false}
      >
        {scroll ? children : <View style={[{ flex: 1 }, inner, contentStyle]}>{children}</View>}
      </Wrapper>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({ safe: { flex: 1 } });
