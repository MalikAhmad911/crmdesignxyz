import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { router } from "expo-router";
import { Mail, Lock } from "lucide-react-native";
import { Screen } from "@/components/Screen";
import { Header } from "@/components/Header";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { colors, radius, space, type } from "@/theme/tokens";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  return (
    <Screen>
      <Header title="Sign in" back />
      <View style={{ gap: space[4], paddingTop: space[2] }}>
        <Text style={type.body}>Welcome back. Sign in to keep your phones answered.</Text>

        <View style={{ gap: space[3] }}>
          <Button label="Continue with Google" variant="secondary" fullWidth />
          <Button label="Continue with Apple"  variant="secondary" fullWidth />
        </View>

        <View style={{ flexDirection: "row", alignItems: "center", gap: space[3], marginVertical: space[2] }}>
          <View style={{ flex: 1, height: 1, backgroundColor: colors.hairline }} />
          <Text style={type.small}>or with email</Text>
          <View style={{ flex: 1, height: 1, backgroundColor: colors.hairline }} />
        </View>

        <Input label="Work email" placeholder="you@company.com" keyboardType="email-address" autoCapitalize="none"
          leftIcon={<Mail size={18} color={colors.muted} />} value={email} onChangeText={setEmail} />
        <Input label="Password" placeholder="••••••••" secureTextEntry
          leftIcon={<Lock size={18} color={colors.muted} />} value={pw} onChangeText={setPw} />
        <Pressable><Text style={{ color: colors.primaryDeep, fontFamily: "Inter_600SemiBold", fontSize: 13, textAlign: "right" }}>Forgot password?</Text></Pressable>

        <Button label="Sign in" size="lg" fullWidth onPress={() => router.push("/onboarding/workspace")} />
      </View>
    </Screen>
  );
}
