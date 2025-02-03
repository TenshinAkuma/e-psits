import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);
  const { id } = event.context.params;
  const body = await readBody(event);

  const { data, error } = await client
    .from("participants")
    .update(body)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating member: ", error.message);
    return { error: error.message, data: null };
  }

  return { data, error: null };
});
