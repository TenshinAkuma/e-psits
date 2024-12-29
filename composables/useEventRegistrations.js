export const useEventRegistrations = () => {
	// Reactive state to store the list of participants for an event
	const eventParticipants = useState("EventParticipants", () => []);

	// Reactive variable to store error messages, if any
	const errorMessage = ref("");

	/**
	 * Fetch all participants for a specific event and store them in the global state.
	 *
	 * @param {Number} eventID - The ID of the event whose participants need to be fetched.
	 * @returns {void}
	 */
	const getAllEventParticipants = async (eventID) => {
		eventParticipants.value.length = 0;

		// Fetch participants from the API using the provided eventID
		const { data: participants, error } = await $fetch(
			`/api/events/${eventID}/getParticipants`
		);

		// Handle any errors that occur during the fetch operation
		if (error) {
			errorMessage.value = error;
		}

		// Update the global state with the fetched participants data
		eventParticipants.value = participants;
	};

	/**
	 * Add a new participant to the event and update the global state.
	 *
	 * @param {Object} newEventParticipant - The participant data to be added to the event.
	 * @returns {void}
	 */
	const createEventParticipant = async (newEventParticipant) => {
		// Send a POST request to add a new participant
		const { data: _newEventParticipant, error } = await $fetch(
			"/api/registrations/participants/ByParticipantId",
			{
				method: "POST",
				body: newEventParticipant,
			}
		);

		// Handle any errors that occur during the request
		if (error) {
			errorMessage.value = error;
		}

		// Add the new participant to the global state if successfully created
		if (_newEventParticipant) {
			eventParticipants.value.push(_newEventParticipant);
		}
	};

	/**
	 * Update an existing participant's registration for an event.
	 *
	 * @param {Number} registrationID - The ID of the participant's registration to be updated.
	 * @param {Object} registration - The updated registration data.
	 * @returns {void}
	 */
	const editEventParticipantRegistration = async (
		registrationID,
		registration
	) => {
		// Send a PATCH request to update the participant's registration
		const { data: participantRegistration, error } = await $fetch(
			`/api/registrations/participants/${registrationID}`,
			{
				method: "PATCH",
				body: registration,
			}
		);

		// Handle potential errors (if any handling logic is needed, it can be added here)
	};

	// Return the state and functions for use in components
	return {
		eventParticipants, // Global state of participants
		errorMessage, // Reactive error message variable
		getAllEventParticipants, // Function to fetch all participants for an event
		createEventParticipant, // Function to add a new participant
		editEventParticipantRegistration, // Function to edit a participant's registration
	};
};
