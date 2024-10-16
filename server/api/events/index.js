import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);

  try {
    const { data: _events, error } = await client.from("events").select("*");

    if (error) {
      return { statusCode: 500, body: { message: error.message } };
    }
    return { statusCode: 200, body: _events };
  } catch (err) {
    return { statusCode: 500, body: { message: "Server error" } };
  }
});
