import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

/**
 * Preferences persisted per user. Kept flat & boolean-heavy so the UI
 * (toggle switches) maps 1:1 to columns.
 */
export const preferencesSchema = z.object({
  email_notifications: z.boolean(),
  push_notifications: z.boolean(),
  sms_alerts: z.boolean(),
  weekly_digest: z.boolean(),
  marketing_emails: z.boolean(),
  theme: z.enum(["light", "dark", "system"]),
  language: z.string().min(2).max(10),
  compact_mode: z.boolean(),
  sound_effects: z.boolean(),
  auto_reply_enabled: z.boolean(),
  ai_suggestions: z.boolean(),
});

export type Preferences = z.infer<typeof preferencesSchema>;

export const DEFAULT_PREFERENCES: Preferences = {
  email_notifications: true,
  push_notifications: true,
  sms_alerts: false,
  weekly_digest: true,
  marketing_emails: false,
  theme: "light",
  language: "en",
  compact_mode: false,
  sound_effects: true,
  auto_reply_enabled: false,
  ai_suggestions: true,
};

/** Load current user's preferences, creating them with defaults on first read. */
export const getMyPreferences = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<Preferences> => {
    const { supabase, userId } = context;

    const { data, error } = await supabase
      .from("user_preferences")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle();

    if (error) throw new Error(error.message);
    if (data) {
      // Strip metadata; return only the schema fields.
      const parsed = preferencesSchema.safeParse(data);
      return parsed.success ? parsed.data : DEFAULT_PREFERENCES;
    }

    const { data: inserted, error: insertErr } = await supabase
      .from("user_preferences")
      .insert({ user_id: userId, ...DEFAULT_PREFERENCES })
      .select("*")
      .single();

    if (insertErr) throw new Error(insertErr.message);
    const parsed = preferencesSchema.safeParse(inserted);
    return parsed.success ? parsed.data : DEFAULT_PREFERENCES;
  });

/** Save a partial update to the current user's preferences. */
export const savePreferences = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) => preferencesSchema.partial().parse(data))
  .handler(async ({ data, context }): Promise<Preferences> => {
    const { supabase, userId } = context;

    const { data: updated, error } = await supabase
      .from("user_preferences")
      .upsert({ user_id: userId, ...DEFAULT_PREFERENCES, ...data }, { onConflict: "user_id" })
      .select("*")
      .single();

    if (error) throw new Error(error.message);
    const parsed = preferencesSchema.safeParse(updated);
    return parsed.success ? parsed.data : { ...DEFAULT_PREFERENCES, ...data };
  });
