import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);
  const body = await readBody(event);

  const { data, error } = await client.from("participants").select("*");

  if (error) {
    console.error("Error fetching all members", error.message);
    return { error: error.message, data: null };
  }

  return { data, error: null };
});
