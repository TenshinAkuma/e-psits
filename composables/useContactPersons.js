export function useContactPersons() {
   const contact_person = reactive({
         20001: {
         name: "Maria Clara",
         positionTitle: "Registrar",
         email: "maria.clara@sksu.edu.ph",
         phoneNumber: "09123456789"
      },
      20002: {
         name: "Jose Rizal",
         positionTitle: "Dean of Students",
         email: "jose.rizal@ndmu.edu.ph",
         phoneNumber: "09234567890"
      },
      20003: {
         name: "Andres Bonifacio",
         positionTitle: "Admissions Officer",
         email: "andres.bonifacio@usm.edu.ph",
         phoneNumber: "09345678901"
      }
   });

   return { contact_person };
}