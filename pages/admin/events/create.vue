<template>
  <div class="w-50">
    <h3 class="fw-bold">Create an event</h3>
    <hr />

    <form @submit.prevent="AddEvent">
      <div class="row mb-5">
        <!-- TITLE -->
        <div class="col-12 mb-3">
          <label for="event_title" class="fw-bold">Title</label>
          <input
            type="text"
            class="form-control"
            id="event_title"
            v-model="title"
          />
        </div>

        <!-- CATEGORY -->
        <div class="col-6 mb-3">
          <label for="event-category" class="fw-bold">Category</label>
          <select
            class="form-select"
            name="event-category"
            id="event-category"
            v-model="category"
          >
            <option selected disabled value="">Select event category</option>
            <option v-for="category in event_categories" :value="category">
              {{ category }}
            </option>
          </select>
        </div>

        <!-- MODALITY -->
        <div class="col-6 mb-3">
          <label for="event-modality" class="fw-bold">Modality</label>
          <select
            class="form-select"
            name="event-modality"
            id="event-category"
            v-model="modality"
          >
            <option selected disabled value="">Select event modality</option>
            <option v-for="modality in event_modalities" :value="modality">
              {{ modality }}
            </option>
          </select>
        </div>

        <!-- DESCRIPTION -->
        <div class="col-12 mb-3">
          <label for="event-description" class="fw-bold">Description</label>
          <textarea
            v-model="description"
            name="description"
            class="form-control"
            rows="3"
            style="resize: none"
            id="event-description"
            wrap="hard"
          />
        </div>

        <!-- EVENT DATE -->
        <div class="col-6 mb-3">
          <label for="event-date" class="fw-bold">Date</label>
          <input
            type="date"
            class="form-control"
            id="event-date"
            v-model="date"
          />
        </div>

        <!-- EVENT TIME -->
        <div class="col-6 mb-3">
          <label for="event-time" class="fw-bold">Time</label>
          <input type="time" class="form-control" v-model="time" />
        </div>

        <!-- REGISTRATION PERIOD -->
        <div class="col-12 mb-3">
          <label for="event-registration" class="fw-bold"
            >Registration period</label
          >
          <div class="hstack align-items-center text-secondary gap-2">
            <input
              type="date"
              class="form-control"
              v-model="registration_start"
            />
            <div>
              <Icon name="material-symbols:arrow-right-alt-rounded"></Icon>
            </div>
            <input
              type="date"
              class="form-control"
              v-model="registration_end"
            />
          </div>
        </div>

        <!-- VENUE -->
        <div class="col-4">
          <label for="event-location" class="fw-bold">Venue</label>
          <div class="input-group">
            <input
              type="text"
              class="form-control"
              id="event-location"
              v-model="venue"
            />
          </div>
        </div>

        <!-- ADDRESS -->
        <div class="col-8">
          <label for="event-location" class="fw-bold">Address</label>
          <div class="input-group">
            <input
              type="text"
              class="form-control"
              id="event-location"
              v-model="address"
            />
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-end gap-2">
        <NuxtLink
          to="/admin/events"
          class="btn btn-outline-primary d-flex align-items-center gap-2 px-5"
        >
          <Icon name="material-symbols:close-rounded" />
          Cancel
        </NuxtLink>

        <button
          v-if="loading"
          class="btn btn-primary d-flex align-items-center gap-2 px-5"
          type="button"
          disabled
        >
          <span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
          <span role="status">Loading...</span>
        </button>

        <button
          v-else
          type="submit"
          class="btn btn-primary d-flex align-items-center gap-2 px-5"
        >
          <Icon name="material-symbols:add-rounded" />
          Create
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "main",
});

const title = ref("");
const description = ref("");
const category = ref("");
const modality = ref("");
const time = ref();
const date = ref();
const venue = ref("");
const address = ref("");
const registration_start = ref();
const registration_end = ref();

const { PostEvent, loading, isSuccess, eventId } = useCreateEvent();

const AddEvent = async () => {
  const eventDetails = {
    title: title.value,
    description: description.value,
    category: category.value,
    modality: modality.value,
    time: date.value,
    date: date.value,
    venue: venue.value,
    address: address.value,
    registration_start: registration_start.value,
    registration_end: registration_end.value,
  };

  await PostEvent(eventDetails);
  if (isSuccess) {
    navigateTo(`/admin/events/${eventId.value}`);
  }
};
const event_categories = [
  "Competition",
  "Workshop",
  "Career fair",
  "Keynote speech",
];

const event_modalities = ["Face-to-face", "Virtual"];
</script>
