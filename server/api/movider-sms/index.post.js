import movider from "@api/movider";

export default defineEventHandler(async (event) => {
	try {
		const config = useRuntimeConfig();
		const { to, text } = await readBody(event);

		if (!to || !text) {
			return {
				success: false,
				error: "Missing recipient number or message",
			};
		}

		const response = await movider.postSms({
			api_key: config.moviderApiKey,
			api_secret: config.moviderApiSecret,
			to,
			text,
		});

		console.log("SMS response: ", response);

		return { success: true, data: response.data };
	} catch (error) {
		console.error("Error sms: Send failed", error.message);
		return { success: false, error: error.message };
	}
});
