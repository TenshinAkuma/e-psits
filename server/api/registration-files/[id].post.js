import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event);
	const { id } = event.context.params;
	const { filePath, fieldName, file } = await readBody(event);

	console.log(file); // Changed from 'body' to 'file' to log the correct variable

	try {
		// Step 1: Upload the file
		const { data: uploadData, error: uploadError } = await client.storage
			.from("registration_files")
			.upload(filePath, file, { upsert: true });

		if (uploadError) {
			throw new Error(uploadError.message);
		}

		// Step 2: Capture the public url
		const { data: fileURL, error: fileURLError } = client.storage
			.from("registration_files")
			.getPublicUrl(uploadData.path);

		if (fileURLError) {
			throw new Error("File not found");
		}

		console.log(fileURL);

		// Step 3: Update the participants table with the file location
		const { error: participantFileError } = await client
			.from("participants")
			.update({ [fieldName]: fileURL.getPublicUrl })
			.eq("id", id);

		if (participantFileError) {
			throw new Error(participantFileError.message);
		}

		console.log(uploadData);
		return {
			success: true,
			data: uploadData,
		};
	} catch (error) {
		console.error("Error occurred uploading file", error.message);

		return {
			success: false,
			error: error.message,
		};
	}
});
