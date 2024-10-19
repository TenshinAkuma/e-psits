/**
 * Composable to create a new event using the API.
 * @returns {Object} - `createEvent` function and `eventResponse` state.
 */
export const useCreateEvent = () => {
  // useState is used to store the response from the API
  const eventResponse = useState("eventResponse", () => null);

  /**
   * Calls the create event API to store a new event.
   * @param {Object} eventDetails - Object containing event details.
   * @returns {Promise<void>}
   */
  const createEvent = async (eventDetails) => {
    try {
      // Call the API using Nuxt's built-in fetch
      const response = await $fetch("/api/events", {
        method: "POST",
        body: eventDetails,
      });

      // Store the response in the `eventResponse` state for use in the component
      eventResponse.value = response;

      if (response.success) {
        console.log("Event created successfully", response.data);
      } else {
        console.error("Failed to create event", response.error);
      }
    } catch (error) {
      console.error("Error while creating event", error);
      eventResponse.value = { success: false, error: error.message };
    }
  };

  return {
    createEvent,
    eventResponse,
  };
};
