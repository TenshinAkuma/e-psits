import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);
  const { eventID } = event.context.params;

  const { data: _event, error } = await client
    .from("events")
    .select("*")
    .eq("id", eventID)
    .single();

  return _event;
});
