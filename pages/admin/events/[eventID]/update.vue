<template>
  <h3 class="fw-bold">Create an event</h3>
  <hr />
  <form @submit.prevent="updateEvent(eventID)">
    <div class="row mb-5">
      <!-- TITLE -->
      <div class="col-12 mb-5">
        <label for="event_title" class="fw-bold">Title</label>
        <input
          type="text"
          class="form-control"
          id="event_title"
          v-model="event.title"
        />
      </div>

      <!-- CATEGORY -->
      <div class="col-6 mb-5">
        <label for="event-category" class="fw-bold">Category</label>
        <select
          class="form-select"
          name="event-category"
          id="event-category"
          v-model="event.category"
        >
          <option selected disabled value="">Select event category</option>
          <option v-for="category in event_categories" :value="category">
            {{ category }}
          </option>
        </select>
      </div>

      <!-- MODALITY -->
      <div class="col-6 mb-5">
        <label for="event-modality" class="fw-bold">Modality</label>
        <select
          class="form-select"
          name="event-modality"
          id="event-category"
          v-model="event.modality"
        >
          <option selected disabled value="">Select event modality</option>
          <option v-for="modality in event_modalities" :value="modality">
            {{ modality }}
          </option>
        </select>
      </div>

      <!-- DESCRIPTION -->
      <div class="col-12 mb-5">
        <label for="event-description" class="fw-bold">Description</label>
        <textarea
          v-model="event.description"
          name="description"
          class="form-control"
          id="event-description"
          wrap="hard"
        />
      </div>

      <!-- EVENT DATE -->
      <div class="col-6 mb-5">
        <label for="event-date" class="fw-bold">Date</label>
        <input
          type="date"
          class="form-control"
          id="event-date"
          v-model="event.date"
        />
      </div>

      <!-- EVENT TIME -->
      <div class="col-6 mb-5">
        <label for="event-time" class="fw-bold">Time</label>
        <input type="time" class="form-control" />
      </div>

      <!-- REGISTRATION DATE -->
      <div class="col-7 mb-5">
        <label for="event-registration" class="fw-bold"
          >Registration date</label
        >
        <div class="hstack align-items-center text-secondary gap-2">
          <input
            type="date"
            class="form-control"
            v-model="event.registration_start"
          />
          <div>
            <Icon name="material-symbols:arrow-right-alt-rounded"></Icon>
          </div>
          <input
            type="date"
            class="form-control"
            v-model="event.registration_end"
          />
        </div>
      </div>

      <div class="col-5"></div>

      <!-- VENUE -->
      <div class="col-4 mb-5">
        <label for="event-location" class="fw-bold">Venue</label>
        <div class="input-group">
          <input
            type="text"
            class="form-control"
            id="event-location"
            v-model="event.venue"
          />
        </div>
      </div>

      <!-- ADDRESS -->
      <div class="col-8 mb-5">
        <label for="event-location" class="fw-bold">Address</label>
        <div class="input-group">
          <input
            type="text"
            class="form-control"
            id="event-location"
            v-model="event.address"
          />
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-end gap-2">
      <button
        @click="toEventDetails(eventID)"
        class="btn btn-outline-primary d-flex align-items-center gap-2 px-5"
      >
        <Icon name="material-symbols:close-rounded" />
        Cancel
      </button>
      <button
        type="submit"
        class="btn btn-primary d-flex align-items-center gap-2 px-5"
      >
        <Icon name="material-symbols:add-rounded" />
        Save
      </button>
    </div>
  </form>
</template>

<script setup>
definePageMeta({
  layout: "main",
});

const client = useSupabaseClient();
const route = useRoute();
const eventID = route.params.eventID;
const event = ref({});

const event_categories = [
  "Competition",
  "Workshop",
  "Career fair",
  "Keynote speech",
];

const toEventDetails = async (eventID) => {
  await navigateTo(`/admin/events/${eventID}`);
};

const updateEvent = async () => {
  const { error } = await client
    .from("events")
    .update(event.value)
    .eq("id", eventID)
    .select();

  if (error) {
    console.log(error.message);
  }
};

const fetchEvent = async (eventID) => {
  const { data: _event, error } = await client
    .from("events")
    .select("*")
    .eq("id", eventID)
    .single();

  if (error) {
    console.log(error.message);
  }

  if (_event != null) {
    event.value = _event;
  }
};

onMounted(() => {
  fetchEvent(eventID);
});
</script>

<style scoped>
textarea {
  resize: none;
  height: 10rem;
}
</style>
