import { Redirect } from "expo-router";
// Toggle to true to skip onboarding.
const ONBOARDED = false;
export default function Index() {
  return ONBOARDED ? <Redirect href="/(tabs)/dashboard" /> : <Redirect href="/onboarding/welcome" />;
}
