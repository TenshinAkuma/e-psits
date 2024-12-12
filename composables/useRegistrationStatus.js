export const useRegistrationStatus = () => {
	const registrationStatuses = ref(["Registered", "Pending", "Cancelled"]);
	return { registrationStatuses };
};
