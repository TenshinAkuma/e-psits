import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);
  const { eventID } = event.context.params;

  try {
    const { data: _event, error } = await client
      .from("events")
      .select("*")
      .eq("id", eventID)
      .single();

    if (error) throw error;
    return {
      status: 200,
      body: _event,
    };
  } catch (err) {
    return {
      status: 404,
      body: { message: err.message },
    };
  }
});
