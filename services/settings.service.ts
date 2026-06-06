import { supabase } from "@/lib/supabase";

export async function getSettings() {
  const { data, error } =
    await supabase
      .from("business_settings")
      .select("*");

  if (error) {
    throw error;
  }

  const settings =
    data.reduce(
      (acc, item) => {
        acc[item.key] = item.value;
        return acc;
      },
      {} as Record<string, string>
    );

  return settings;
}

export async function updateSettings(
  settings: Record<string, string>
) {
  const updates = Object.entries(
    settings
  ).map(([key, value]) => ({
    key,
    value,
  }));

  for (const item of updates) {
    const { error } =
      await supabase
        .from("business_settings")
        .update({
          value: item.value,
        })
        .eq("key", item.key);

    if (error) {
      throw error;
    }
  }

  return true;
}