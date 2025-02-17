import notificationapi from "notificationapi-node-server-sdk";

notificationapi.init(
	"nzuz4b0o2cbjv1ivtiu53m3fap", // clientId
	"49m97wv9i3zqwcle4vqpd97wyahyt991hxxaymvxoluzb5kr4x5eub4ji0" // clientSecret
);

export default defineEventHandler(async (event) => {
	const body = await readBody(event);

	console.log(body);
	try {
		const response = await notificationapi.send({
			notificationId: "epsits",
			user: {
				id: body.id,
				// email: body.email,
				number: body.number, // Replace with your phone number
			},
			mergeTags: {},
		});

		console.log(response);
	} catch (err) {
		console.error(err);
	}
});
