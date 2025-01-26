export const useInputOptions = () => {
	const RegistrationStatuses = ref(["Registered", "Pending", "Cancelled"]);
	const EventCategories = ref([
		"Competition",
		"Workshop",
		"Career fair",
		"Keynote speech",
	]);
	const EventTypes = ref(["In-person", "Virtual"]);

	return {
		RegistrationStatuses,
		EventCategories,
		EventTypes,
	};
};
