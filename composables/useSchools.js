export function useSchools() {
	// Array of school objects
	var schools = reactive({
		10001: {
			schoolName: "Sultan Kudarat State University",
			address: "Isulan, Sultan Kudarat, Philippines",
			email: "info@sksu.edu.ph",
			contactPersonID: 20001,
			phoneNumber: "09181234567", // Added phone number
			registrationStatus: "Approved",
		},
		10002: {
			schoolName: "Notre Dame of Marbel University",
			address: "Koronadal City, South Cotabato, Philippines",
			email: "contact@ndmu.edu.ph",
			contactPersonID: 20002,
			phoneNumber: "09181234568", // Added phone number
			registrationStatus: "Pending",
		},
		10003: {
			schoolName: "University of Southern Mindanao",
			address: "Kabacan, North Cotabato, Philippines",
			email: "admissions@usm.edu.ph",
			contactPersonID: 20003,
			phoneNumber: "09181234569", // Added phone number
			registrationStatus: "Approved",
		},
	});

	// Return the array so it can be used in components
	return { schools };
}
