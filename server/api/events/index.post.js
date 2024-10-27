import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const client = await serverSupabaseClient(event);

  try {
    const { data, error } = await client
      .from("events")
      .insert(body)
      .select()
      .single();

    if (error) throw error;
    return {
      status: 201,
      body: data,
    };
  } catch (err) {
    return {
      status: 500,
      body: { message: err.message },
    };
  }
});
