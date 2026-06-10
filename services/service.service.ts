import { supabase } from "@/lib/supabase";

export async function getServices() {
  const { data, error } =
    await supabase
      .from("services")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

  if (error) throw error;

  return data;
}

export async function createService(
  payload: {
    name: string;
    description: string;
    duration: number;
    price: number;
  }
) {
  const { error } =
    await supabase
      .from("services")
      .insert({
        ...payload,
        is_active: true,
      });

  if (error) throw error;

  return true;
}

export async function updateService(
  id: string,
  payload: {
    name: string;
    description: string;
    duration: number;
    price: number;
  }
) {
  const { error } =
    await supabase
      .from("services")
      .update(payload)
      .eq("id", id);

  if (error) throw error;

  return true;
}

export async function toggleService(
  id: string,
  isActive: boolean
) {
  const { error } =
    await supabase
      .from("services")
      .update({
        is_active: isActive,
      })
      .eq("id", id);

  if (error) throw error;

  return true;
}