<template>
<div class="h-100 d-flex flex-column justify-content-between">
      <div>
         <div>
            <nav aria-label="breadcrumb">
               <ol class="breadcrumb fs-5 mb-5">
                  <NuxtLink to="/participants" class="breadcrumb-item text-decoration-none" style="color: #46468f;">List of participants</NuxtLink>
                  <li class="breadcrumb-item active" aria-current="page">Participant profile</li>
               </ol>
            </nav>
               <div class="fs-2 fw-bold mb-4">{{ participant.name }}</div>
         </div>
         <div class="row">
            <div class="col-6 text-secondary mb-5 p-0">
               <div class="row m-0">
                  <div class="col-3">Date of birth:</div>
                  <div class="col-9">{{ participant.dateOfBirth }}</div>
                  <div class="col-3">Sex:</div>
                  <div class="col-9">{{ participant.sex }}</div>
                  <div class="col-3">School:</div>
                  <div class="col-9">{{ getParticipantSchool(participant.school) }}</div>
                  <div class="col-3">Year & Course:</div>
                  <div class="col-9">{{ participant.yearLevel + " " + participant.course }}</div>
                  <div class="col-3">Email:</div>
                  <div class="col-9">{{ participant.email }}</div>
                  <div class="col-3">Phone number:</div>
                  <div class="col-9">{{ participant.phoneNumber }}</div> <br> <br>
                  <div class="col-12 fw-bold">Event participation</div> <br> <br>
                  <div class="col-3">Title:</div>
                  <div class="col-9">{{ getParticipantEvent(participant.event) }}</div>
                  <div class="col-3">category:</div>
                  <div class="col-9">{{ getParticipantEventCategory(participant.event) }}</div>
                  <div class="col-3">Registration status:</div>
                  <div class="col-9">{{ participant.registrationStatus }}</div>
               </div>
            </div>
         </div>
      </div>
      <div class="">
        <div class="btn text-light px-5 py-2 me-4" style="background-color: #ed5176;">Remove</div>
        <NuxtLink :to="`/participants/${participantID}/update`">
          <div class="btn text-light px-5 py-2" style="background-color: #46468f">Update</div>
        </NuxtLink>
        
      </div>
   </div>
</template>

<script setup>
definePageMeta({
   layout: 'main',
});
const route = useRoute();
const participantID = route.params.participantID;

const { participants } = useParticipants();
const { schools } = useSchools();
const { events } = useEvents();

const participant = participants[participantID];

function getParticipantSchool(schoolID) {
   return schools[schoolID]?.schoolName || "School name not found";
}

function getParticipantEvent(eventID) {
   return events[eventID]?.title || "Attendee"
}

function getParticipantEventCategory(eventID) {
   return events[eventID]?.category || "Category not found"
}

</script>