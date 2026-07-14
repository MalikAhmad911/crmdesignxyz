// Tiny client-side store for trial/paid state + onboarding answers.
// Keeps state in localStorage so the UI can demo the full flow without a backend.

export type Plan = "trial" | "paid";

const KEY = "rs.account.v1";

export type Account = {
  plan: Plan;
  trialDaysLeft: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  role?: string;
  company?: string;
  address?: string;
  industry?: string;
  website?: string;
  teamSize?: string;
  yearsInBusiness?: string;
  revenue?: string;
  goal?: string;
  focusAreas?: string[];
  referralSource?: string;
  onboardingComplete?: boolean;
};

const DEFAULT: Account = { plan: "trial", trialDaysLeft: 14 };

export function getAccount(): Account {
  if (typeof window === "undefined") return DEFAULT;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? { ...DEFAULT, ...JSON.parse(raw) } : DEFAULT;
  } catch {
    return DEFAULT;
  }
}

export function setAccount(patch: Partial<Account>) {
  if (typeof window === "undefined") return;
  const next = { ...getAccount(), ...patch };
  window.localStorage.setItem(KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent("rs:account", { detail: next }));
}

export function upgradeToPaid() {
  setAccount({ plan: "paid" });
}

export function resetAccount() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KEY);
  window.dispatchEvent(new CustomEvent("rs:account", { detail: DEFAULT }));
}

import { useEffect, useState } from "react";
export function useAccount(): Account {
  const [acc, setAcc] = useState<Account>(DEFAULT);
  useEffect(() => {
    setAcc(getAccount());
    const onChange = (e: Event) => setAcc((e as CustomEvent<Account>).detail);
    window.addEventListener("rs:account", onChange as EventListener);
    return () => window.removeEventListener("rs:account", onChange as EventListener);
  }, []);
  return acc;
}
