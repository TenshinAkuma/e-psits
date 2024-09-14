<template>
  <div class="">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <div class="fs-5 me-3" style="color: #46468f">List of participants</div>
      <NuxtLink
        to="/"
        class="add-event-btn d-flex align-items-center gap-3 btn px-4"
        style="color: #46468f; border-color: #46468f"
        ><Icon name="material-symbols:person-add-outline-rounded" />Register a
        participant</NuxtLink
      >
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
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(participant, id) in participants"
          class="table-row"
          @click="toParticipantProfile(id)"
        >
          <td>{{ participant.name }}</td>
          <td>{{ getParticipantSchool(participant.school) }}</td>
          <td>{{ participant.course + ", " + participant.yearLevel }}</td>
          <td>{{ getParticipantEvent(participant.event) }}</td>
          <td>{{ participant.email }}</td>
          <td>{{ participant.registrationStatus }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "main",
});

const { participants } = useParticipants();
const { schools } = useSchools();
const { events } = useEvents();

function getParticipantSchool(schoolID) {
  return schools[schoolID]?.schoolName || "School name not found";
}

function getParticipantEvent(eventID) {
  return events[eventID]?.title || "Attendee";
}

const toParticipantProfile = async (participantID) => {
  await navigateTo(`/participants/${participantID}`);
};
</script>

<style scoped>
.view-btn {
  background-color: #46468f;
}
.remove-btn {
  color: #ed5176;
  border-color: #ed5176;
}

.table-row:hover {
  cursor: pointer;
}
</style>
