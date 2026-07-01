import React from "react";
import { TextInput, View, Text, StyleSheet, TextInputProps } from "react-native";
import { colors, radius, space, type } from "@/theme/tokens";

type Props = TextInputProps & {
  label?: string;
  hint?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

export function Input({ label, hint, error, leftIcon, rightIcon, style, ...rest }: Props) {
  return (
    <View style={{ gap: 6 }}>
      {label ? <Text style={type.smallStrong}>{label}</Text> : null}
      <View style={[styles.wrap, { borderColor: error ? colors.danger : colors.hairline }]}>
        {leftIcon ? <View style={{ marginRight: space[2] }}>{leftIcon}</View> : null}
        <TextInput
          placeholderTextColor={colors.muted}
          style={[styles.input, style]}
          {...rest}
        />
        {rightIcon}
      </View>
      {error ? <Text style={[type.small, { color: colors.danger }]}>{error}</Text>
        : hint ? <Text style={type.small}>{hint}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row", alignItems: "center",
    borderWidth: 1, borderRadius: radius.md,
    paddingHorizontal: space[4], height: 50,
    backgroundColor: colors.bg,
  },
  input: { flex: 1, fontSize: 15, color: colors.ink, fontFamily: "Inter_400Regular" },
});
