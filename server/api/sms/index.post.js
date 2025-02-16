import { useRuntimeConfig } from "#imports"; // or from 'nuxt/app' depending on your setup

export default defineEventHandler(async (event) => {
	// Access the runtime configuration to get the Semaphore API key.
	const config = useRuntimeConfig();
	const apiKey = config.semaphoreApiKey;

	// Read the incoming request body.
	const body = await readBody(event);

	// Validate required parameters: number and message.
	if (!body.number || !body.message) {
		throw createError({
			statusCode: 400,
			message: "Missing required parameters: number and message",
		});
	}

	// Prepare the payload to send to Semaphore's API.
	const payload = {
		apikey: apiKey, // API key from environment config.
		number: body.number, // Recipient's mobile number(s).
		message: body.message, // The SMS message to send.
	};

	try {
		// Send the POST request to Semaphore's SMS API.
		const response = await $fetch(
			"https://api.semaphore.co/api/v4/messages",
			{
				method: "POST",
				body: payload,
			}
		);

		console.log(response);

		// Return a success response with the data received from Semaphore.
		return {
			success: true,
			data: response,
		};
	} catch (err) {
		// Log error and return an error response.
		console.error("Error sending SMS:", err.message);
		return {
			success: false,
			error: err.message,
		};
	}
});
