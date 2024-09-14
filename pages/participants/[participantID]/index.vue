<template>
  <div class="h-100 d-flex flex-column justify-content-between">
    <div>
      <div>
        <div class="fs-5">Participant profile</div>
        <div class="d-flex justify-content-between align-items-center mb-4">
          <div class="fs-2 fw-bold">{{ participant.name }}</div>
          <NuxtLink
            :to="`/participants/${participantID}/update`"
            class="text-decoration-none text-secondary d-flex align-items-center gap-2 px-2"
            ><Icon name="material-symbols:edit-outline-rounded" />Edit</NuxtLink
          >
        </div>
      </div>
      <div class="row">
        <div class="col-6 text-secondary mb-5 p-0">
          <div class="row m-0">
            <div class="col-3">Date of birth:</div>
            <div class="col-9">{{ participant.dateOfBirth }}</div>
            <div class="col-3">Sex:</div>
            <div class="col-9">{{ participant.sex }}</div>
            <div class="col-3">School:</div>
            <div class="col-9">
              {{ getParticipantSchool(participant.school) }}
            </div>
            <div class="col-3">Year & Course:</div>
            <div class="col-9">
              {{ participant.yearLevel + " " + participant.course }}
            </div>
            <div class="col-3">Email:</div>
            <div class="col-9">{{ participant.email }}</div>
            <div class="col-3">Phone number:</div>
            <div class="col-9">{{ participant.phoneNumber }}</div>
            <br />
            <br />
            <div class="col-12 fw-bold">Event participation</div>
            <br />
            <br />
            <div class="col-3">Title:</div>
            <div class="col-9">
              {{ getParticipantEvent(participant.event) }}
            </div>
            <div class="col-3">category:</div>
            <div class="col-9">
              {{ getParticipantEventCategory(participant.event) }}
            </div>
            <div class="col-3">Registration status:</div>
            <div class="col-9">{{ participant.registrationStatus }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "main",
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
  return events[eventID]?.title || "Attendee";
}

function getParticipantEventCategory(eventID) {
  return events[eventID]?.category || "Category not found";
}
</script>
