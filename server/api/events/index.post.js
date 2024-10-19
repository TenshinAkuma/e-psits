import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const client = await serverSupabaseClient(event);

  try {
    const { data, error } = await client.from("events").insert(body).single();

    if (error) throw error;

    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || `Failed to create event: ${error.message}`,
    };
  }
});
