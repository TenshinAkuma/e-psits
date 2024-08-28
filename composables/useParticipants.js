export function useParticipants() {
  const participants = reactive({
    "P00001": {
      name: "Juan Dela Cruz",
      dateOfBirth: "2002-05-12",
      sex: "Male",
      school: 10001, // ID from useSchools composable
      course: "BSIT",
      yearLevel: "3rd Year",
      email: "juan.delacruz@sksu.edu.ph",
      phoneNumber: "09123456789",
      event: "E00001", // ID from useEvents composable
      registrationStatus: "Confirmed" // Added registration status
    },
    "P00002": {
      name: "Maria Santos",
      dateOfBirth: "2003-08-25",
      sex: "Female",
      school: 10002, // ID from useSchools composable
      course: "BSCS",
      yearLevel: "2nd Year",
      email: "maria.santos@ndmu.edu.ph",
      phoneNumber: "09234567890",
      event: "E00002", // ID from useEvents composable
      registrationStatus: "Pending" // Added registration status
    },
    "P00003": {
      name: "Pedro Reyes",
      dateOfBirth: "2001-01-15",
      sex: "Male",
      school: 10003, // ID from useSchools composable
      course: "BSCpE",
      yearLevel: "4th Year",
      email: "pedro.reyes@usm.edu.ph",
      phoneNumber: "09345678901",
      event: "E00003", // ID from useEvents composable
      registrationStatus: "Confirmed" // Added registration status
    },
    "P00004": {
      name: "Ana Cruz",
      dateOfBirth: "2002-11-10",
      sex: "Female",
      school: 10001, // ID from useSchools composable
      course: "BSIT",
      yearLevel: "3rd Year",
      email: "ana.cruz@sksu.edu.ph",
      phoneNumber: "09456789012",
      event: "E00004", // ID from useEvents composable
      registrationStatus: "Confirmed" // Added registration status
    },
    "P00005": {
      name: "Rafael Gomez",
      dateOfBirth: "2001-03-30",
      sex: "Male",
      school: 10002, // ID from useSchools composable
      course: "BSCS",
      yearLevel: "4th Year",
      email: "rafael.gomez@ndmu.edu.ph",
      phoneNumber: "09567890123",
      event: "E00005", // ID from useEvents composable
      registrationStatus: "Pending" // Added registration status
    },
    "P00006": {
      name: "Emily Flores",
      dateOfBirth: "2002-07-20",
      sex: "Female",
      school: 10003, // ID from useSchools composable
      course: "BSIT",
      yearLevel: "2nd Year",
      email: "emily.flores@usm.edu.ph",
      phoneNumber: "09678901234",
      event: "E00001", // ID from useEvents composable
      registrationStatus: "Confirmed" // Added registration status
    },
    "P00007": {
      name: "Carlos Mendoza",
      dateOfBirth: "2001-12-14",
      sex: "Male",
      school: 10001, // ID from useSchools composable
      course: "BSCpE",
      yearLevel: "4th Year",
      email: "carlos.mendoza@sksu.edu.ph",
      phoneNumber: "09789012345",
      event: "E00002", // ID from useEvents composable
      registrationStatus: "Confirmed" // Added registration status
    },
    "P00008": {
      name: "Sophia Martinez",
      dateOfBirth: "2003-03-18",
      sex: "Female",
      school: 10002, // ID from useSchools composable
      course: "BSCS",
      yearLevel: "1st Year",
      email: "sophia.martinez@ndmu.edu.ph",
      phoneNumber: "09890123456",
      event: "E00003", // ID from useEvents composable
      registrationStatus: "Pending" // Added registration status
    },
    "P00009": {
      name: "Miguel Rivera",
      dateOfBirth: "2000-10-05",
      sex: "Male",
      school: 10003, // ID from useSchools composable
      course: "BSIT",
      yearLevel: "5th Year",
      email: "miguel.rivera@usm.edu.ph",
      phoneNumber: "09901234567",
      event: "E00004", // ID from useEvents composable
      registrationStatus: "Confirmed" // Added registration status
    },
    "P00010": {
      name: "Isabella Reyes",
      dateOfBirth: "2002-02-28",
      sex: "Female",
      school: 10001, // ID from useSchools composable
      course: "BSCpE",
      yearLevel: "3rd Year",
      email: "isabella.reyes@sksu.edu.ph",
      phoneNumber: "09012345678",
      event: "E00005", // ID from useEvents composable
      registrationStatus: "Pending" // Added registration status
    }
  });

  return {
    participants
  };
}
