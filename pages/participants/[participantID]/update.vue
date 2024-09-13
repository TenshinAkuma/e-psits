<template>
  <div class="h-100 d-flex flex-column justify-content-between">
    <div>
      <div>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb fs-5 mb-5">
            <NuxtLink
              to="/participants"
              class="breadcrumb-item text-decoration-none"
              style="color: #46468f"
            >
              List of participants
            </NuxtLink>
            <NuxtLink
              :to="`/participants/${participantID}`"
              class="breadcrumb-item text-decoration-none"
              style="color: #46468f"
            >
              Participant profile
            </NuxtLink>
            <li class="breadcrumb-item active" aria-current="page">
              Update participant details
            </li>
          </ol>
        </nav>
      </div>
      <div class="row gap-5">
        <div class="col-5 mb-3">
          <div class="row mb-5">
            <div class="col-12 mb-3">
              <label for="participant-name" class="text-secondary">Name</label>
              <input
                type="text"
                class="form-control"
                id="participant-name"
                v-model="name"
              />
            </div>
            <div class="col-6 mb-3">
              <label for="participant-birth" class="text-secondary"
                >Date of birth</label
              >
              <input
                type="date"
                class="form-control"
                id="participant-birth"
                v-model="birth"
              />
            </div>
            <div class="col-6 mb-3">
              <label for="participant-sex" class="text-secondary">Sex</label>
              <input
                type="text"
                class="form-control"
                id="participant-sex"
                v-model="sex"
              />
            </div>
            <div class="col-8 mb-3">
              <label for="participant-school" class="text-secondary"
                >School</label
              >
              <input
                type="text"
                class="form-control"
                id="participant-school"
                v-model="school"
              />
            </div>
            <div class="col-4 mb-3">
              <label for="participant-year-course" class="text-secondary"
                >Year & course</label
              >
              <input
                type="text"
                class="form-control"
                id="participant-year-course"
                v-model="year_course"
              />
            </div>
            <div class="col-6 mb-3">
              <label for="participant-email" class="text-secondary"
                >Email</label
              >
              <input
                type="text"
                class="form-control"
                id="participant-email"
                v-model="email"
              />
            </div>
            <div class="col-6 mb-3">
              <label for="participant-phone" class="text-secondary"
                >Phone number</label
              >
              <input
                type="tel"
                class="form-control"
                id="participant-phone"
                v-model="phone"
              />
            </div>
            <div class="col-8 mb-3">
              <label for="participant-school" class="text-secondary"
                >Event</label
              >
              <input
                type="text"
                class="form-control"
                id="participant-school"
                v-model="event"
              />
            </div>
            <div class="col-4 mb-3">
              <label for="participant-event-category" class="text-secondary"
                >Category</label
              >
              <input
                type="text"
                class="form-control"
                id="participant-event-category"
                v-model="event_category"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="">
      <NuxtLink :to="`/participants/${participantID}`">
        <div
          class="btn px-5 py-2 me-4"
          style="background-color: #e5e5e5; color: #46468f"
        >
          Cancel
        </div>
      </NuxtLink>
      <NuxtLink :to="`/participants/${participantID}`">
        <button
          @click="updateSchoolAndContactPerson()"
          class="btn text-light px-5 py-2"
          style="background-color: #46468f"
        >
          Confirm
        </button>
      </NuxtLink>
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

const name = ref(participant.name);
const birth = ref(participant.dateOfBirth);
const sex = ref(participant.sex);
const school = ref(getParticipantSchool(participant.school));
const year_course = ref(participant.yearLevel + " " + participant.course);
const email = ref(participant.email);
const phone = ref(participant.phoneNumber);
const event = ref(getParticipantEvent(participant.event));
const event_category = ref(getParticipantEventCategory(participant.event));
const registration = ref(participant.registrationStatus);
</script>
