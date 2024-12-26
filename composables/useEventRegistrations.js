export const useEventRegistrations = () => {
	// Create a global state to store event participants
	const eventParticipants = useState("EventParticipants", () => []);
	const errorMessage = ref("");
	const loading = ref(false);

	// Function to fetch participants for a specific event
	const getAllEventParticipants = async (eventID) => {
		loading.value = true;
		// Fetch participants from the API using the eventID
		const { data: participants, error } = await $fetch(
			`/api/events/${eventID}/getParticipants`
		);

		if (error) {
			errorMessage.value = error;
		}

		// Update the global state with fetched participants
		eventParticipants.value = participants;
		loading.value = false;
	};

	const createEventParticipant = async (newEventParticipant) => {
		console.log(newEventParticipant);
		const { data: _newEventParticipant, error } = await $fetch(
			"/api/registrations/participants/ByParticipantId",
			{
				method: "POST",
				body: newEventParticipant,
			}
		);

		if (error) {
			errorMessage.value = error;
		}

		if (_newEventParticipant) {
			eventParticipants.value.push(_newEventParticipant);
		}
	};

	const editEventParticipantRegistration = async (
		registrationID,
		registration
	) => {
		const { data: participantRegistration, error } = await $fetch(
			`/api/registrations/participants/${registrationID}`,
			{
				method: "PATCH",
				body: registration,
			}
		);
	};
	// Return the state and function for use in components
	return {
		eventParticipants,
		errorMessage,
		loading,
		getAllEventParticipants,
		createEventParticipant,
		editEventParticipantRegistration,
	};
};
