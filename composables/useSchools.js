export function useSchools() {
  // Array of school objects
  const schools = {
    10001: {
      schoolName: "Sultan Kudarat State University",
      address: "Isulan, Sultan Kudarat, Philippines",
      email: "info@sksu.edu.ph",
      contactPersonID: 20001, // Foreign key reference
      registrationStatus: "Approved"
    },
    10002: {
      schoolName: "Notre Dame of Marbel University",
      address: "Koronadal City, South Cotabato, Philippines",
      email: "contact@ndmu.edu.ph",
      contactPersonID: 20002, // Foreign key reference
      registrationStatus: "Pending"
    },
    10003: {
      schoolName: "University of Southern Mindanao",
      address: "Kabacan, North Cotabato, Philippines",
      email: "admissions@usm.edu.ph",
      contactPersonID: 20003, // Foreign key reference
      registrationStatus: "Approved"
    }
  };

  // Return the array so it can be used in components
  return { schools };
}
