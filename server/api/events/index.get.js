import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);
  const query = getQuery(event);
  const page = parseInt(query.page, 10) || 1;
  const itemsPerPage = 10;
  const offset = (page - 1) * itemsPerPage;

  try {
    const { data: _events, error } = await client.from("events").select("*");

    if (error) throw error;

    return {
      status: 200,
      body: _events,
    };
  } catch (err) {
    return {
      status: 500,
      body: { message: err.message },
    };
  }
});
