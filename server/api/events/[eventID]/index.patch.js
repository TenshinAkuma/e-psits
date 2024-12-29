import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const { eventID } = event.context.params;
	const body = await readBody(event);

	try {
		const { data: event, error: eventError } = await client
			.from("events")
			.update(body)
			.eq("id", eventID)
			.select()
			.single();

		if (eventError) {
			throw new Error(eventError.message);
		}

		return {
			success: true,
			data: event,
		};
	} catch (err) {
		console.log("Error while updating event", err.message);

		return {
			success: false,
			error: err.message,
		};
	}
});
