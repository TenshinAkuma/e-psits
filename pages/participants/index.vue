<template>
   <div>
      <div class="d-flex justify-content-between align-items-center mb-5">
         <div class="fs-5" style="color:#46468f;">List of participants</div>
         <div class="add-event-btn btn px-4 py-2 me-4">Add event</div>
      </div>
      <table class="table table-hover">
         <thead>
            <tr>
               <th scope="col">Name</th>
               <th scope="col">School</th>
               <th scope="col">Year & Course</th>
               <th scope="col">Event</th>
               <th scope="col">Email</th>
               <th scope="col">Status</th>
               <th class="d-flex justify-content-evenly" scope="col">Action</th>
            </tr>
         </thead>
         <tbody>
            <tr v-for="(participant, id) in participants">
               <td>{{ participant.name }}</td>
               <td>{{ getParticipantSchool(participant.school) }}</td>
               <td>{{ participant.course + ", " + participant.yearLevel }}</td>
               <td>{{ getParticipantEvent(participant.event) }}</td>
               <td>{{ participant.email }}</td>
               <td>{{ participant.registrationStatus }}</td>
               <td class="d-flex justify-content-evenly">
                  <NuxtLink :to="`/participants/${id}`" class="view-btn btn text-light">view</NuxtLink>
                  <NuxtLink to="/" class="remove-btn btn">Delete</NuxtLink>
               </td>
            </tr>
         </tbody>
      </table>
   </div>
</template>

<script setup>
   definePageMeta({
      layout: 'main'
   });

const { participants } = useParticipants();
const { schools } = useSchools();
const { events } = useEvents();

function getParticipantSchool(schoolID) {
   return schools[schoolID]?.schoolName || "School name not found";
}

function getParticipantEvent(eventID) {
   return events[eventID]?.title || "Attendee"
}
</script>


<style scoped>
   .view-btn {
      background-color: #46468f;
   }
   .remove-btn {
      color: #ed5176;
      border-color: #ed5176;
   }
</style> 