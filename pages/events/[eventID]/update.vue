<template>
  <div class="h-100 d-flex flex-column justify-content-between">
    <div>
      <div>
        <div class="fs-5">Update event details</div>
        <div class="d-flex justify-content-between align-items-center mb-4">
          <div class="fs-2 fw-bold">{{ title }}</div>
          <NuxtLink
            :to="`/events/${eventID}/update`"
            class="text-decoration-none text-danger d-flex align-items-center gap-2 px-2"
            ><Icon
              name="material-symbols:delete-outline-rounded"
            />Remove</NuxtLink
          >
        </div>
      </div>
      <div>
        <div class="col-12 mb-3">
          <div class="row mb-5">
            <div class="fw-bold text-secondary mb-3">Event details</div>
            <div class="col-12 mb-3">
              <label for="event_title" class="text-secondary">Title</label>
              <input
                type="text"
                class="form-control"
                id="event_title"
                v-model="title"
              />
            </div>
            <div class="col-12 mb-3">
              <label for="event-description" class="text-secondary"
                >Description</label
              >
              <textarea
                class="form-control"
                id="event-description"
                wrap="hard"
                >{{ description }}</textarea
              >
            </div>
            <div class="col-4 mb-3">
              <label for="event-category" class="text-secondary"
                >Category</label
              >
              <input
                type="text"
                class="form-control"
                id="event-category"
                v-model="category"
              />
            </div>
            <div class="col-4 mb-3">
              <label for="event-date" class="text-secondary">Date</label>
              <input
                type="date"
                class="form-control"
                id="event-date"
                v-model="date"
              />
            </div>
            <div class="col-4 mb-3">
              <label for="event-location" class="text-secondary"
                >Duration</label
              >
              <input
                type="text"
                class="form-control"
                id="event-location"
                v-model="duration"
              />
            </div>
            <div class="col-12 mb-3">
              <label for="event-location" class="text-secondary"
                >Location</label
              >
              <input
                type="text"
                class="form-control"
                id="event-location"
                v-model="location"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="">
      <NuxtLink :to="`/events/${eventID}`">
        <div
          class="btn px-5 py-2 me-4"
          style="background-color: #e5e5e5; color: #46468f"
        >
          Cancel
        </div>
      </NuxtLink>
      <NuxtLink :to="`/university/${uniID}`">
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
const eventID = route.params.eventID;

const { events } = useEvents();
const event = events[eventID];

const title = ref(event.title);
const description = ref(event.description);
const category = ref(event.category);
const duration = ref(event.duration);
const date = ref(event.date);
const location = ref(event.location);
const eligibility = ref(event.eligibility);
const participant = ref(event.requiredParticipants);
const deadline = ref(event.registrationDeadline);
</script>

<style scoped>
textarea {
  resize: none;
  height: 10rem;
}
</style>
