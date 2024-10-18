import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const client = await serverSupabaseClient(event);

  // Destructure properties from 'body'
  const {
    title,
    category,
    modality,
    description,
    date,
    time,
    registration_start,
    registration_end,
    venue,
    address,
  } = body;

  // Store all the required fields in an array for easier iteration and validation
  const requiredFields = [
    title,
    category,
    modality,
    description,
    date,
    time,
    registration_start,
    registration_end,
    venue,
    address,
  ];

  // Check if any of the required fields are missing using 'some' method for brevity
  if (requiredFields.some((field) => !field)) {
    return {
      success: false,
      message: "Invalid input",
    };
  }

  try {
    const { data, error } = await client.from("events").insert([
      {
        title,
        category,
        modality,
        description,
        date,
        time,
        registration_start,
        registration_end,
        venue,
        address,
      },
    ]);

    if (error) throw error;

    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || "Failed to create event",
    };
  }
});
