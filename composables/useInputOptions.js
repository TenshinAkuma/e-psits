export const useInputOptions = () => {
	const RegistrationStatuses = ref(["Registered", "Pending", "Cancelled"]);

	const EventCategories = ref([
		"Competition",
		"Workshop",
		"Career fair",
		"Keynote speech",
	]);

	const EventTypes = ref(["In-person", "Virtual"]);

	const MembershipStatuses = ref([
		"Member",
		"Pending",
		"Cancelled",
		"Restricted",
	]);

	return {
		RegistrationStatuses,
		EventCategories,
		EventTypes,
		MembershipStatuses,
	};
};
