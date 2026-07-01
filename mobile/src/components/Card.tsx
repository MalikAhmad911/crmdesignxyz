import React from "react";
import { View, StyleSheet, ViewProps, ViewStyle, Pressable } from "react-native";
import { colors, radius, shadow, space } from "@/theme/tokens";

type Props = ViewProps & {
  elevated?: boolean;
  bordered?: boolean;
  padded?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
};

export function Card({ elevated = true, bordered = true, padded = true, onPress, style, children, ...rest }: Props) {
  const s: ViewStyle = {
    backgroundColor: colors.bg,
    borderRadius: radius.lg,
    borderWidth: bordered ? 1 : 0,
    borderColor: colors.hairline,
    padding: padded ? space[5] : 0,
    ...(elevated ? shadow.card : {}),
  };
  if (onPress) {
    return (
      <Pressable onPress={onPress} style={({ pressed }) => [s, style, { opacity: pressed ? 0.96 : 1 }]}>
        {children}
      </Pressable>
    );
  }
  return <View style={[s, style]} {...rest}>{children}</View>;
}
