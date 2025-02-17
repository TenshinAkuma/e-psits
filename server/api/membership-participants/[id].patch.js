import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const { id } = event.context.params;
	const body = await readBody(event);

	try {
		const { data, error } = await client
			.from("participants")
			.update(body)
			.eq("id", id)
			.select()
			.single();

		if (error) {
			throw new Error(error.message);
		}

		if (!data.membership_status) {
			return {
				success: false,
				error: "Internal server error. Invalid membership status.",
			};
		}

		console.log(data.membership_status);

		return {
			success: true,
			data,
		};
	} catch (error) {
		console.error("Error updating membership status: ", error.message);
		return {
			success: false,
			error: error.message,
		};
	}
});
