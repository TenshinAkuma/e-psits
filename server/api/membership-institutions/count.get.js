import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);

	try {
		// Use Promise.all() to run all queries in parallel for efficiency
		const [
			{ count: Member, error: memberError },
			{ count: Pending, error: pendingError },
			{ count: Restricted, error: restrictedError },
			{ count: Cancelled, error: cancelledError },
		] = await Promise.all([
			client
				.from("institutions")
				.select("*", { count: "exact", head: true })
				.eq("membership_status", "Member"),
			client
				.from("institutions")
				.select("*", { count: "exact", head: true })
				.eq("membership_status", "Pending"),
			client
				.from("institutions")
				.select("*", { count: "exact", head: true })
				.eq("membership_status", "Restricted"),
			client
				.from("institutions")
				.select("*", { count: "exact", head: true })
				.eq("membership_status", "Cancelled"),
		]);

		// Handle errors collectively
		if (
			memberError ||
			pendingError ||
			restrictedError ||
			cancelledError
		) {
			throw new Error(
				memberError?.message ||
					pendingError?.message ||
					restrictedError?.message ||
					cancelledError?.message
			);
		}

		return {
			success: true,
			data: [
				{ name: "Member", stat: Member },
				{ name: "Pending", stat: Pending },
				{ name: "Restricted", stat: Restricted },
				{ name: "Cancelled", stat: Cancelled },
			],
		};
	} catch (error) {
		console.error("Error counting institutions:", error.message);
		return {
			success: false,
			error: error.message,
		};
	}
});
