<template>
  <h3 class="fw-bold">Create an event</h3>
  <hr />
  <form @submit.prevent="addEvent">
    <div class="row mb-5">
      <!-- TITLE -->
      <div class="col-9 mb-3">
        <label for="event_title" class="fw-bold">Title</label>
        <input
          type="text"
          class="form-control"
          id="event_title"
          v-model="title"
        />
      </div>
      <!-- CATEGORY -->
      <div class="col-3 mb-3">
        <label for="event-category" class="fw-bold">Category</label>
        <!-- <input
                type=""
                class="form-control"
                id="event-category"
                list="eventCategoryOptions"
                v-model="category"
                placeholder="Choose event category"
              />
              <datalist id="eventCategoryOptions">
                <option v-for="category in eventCategories" :value="category" />
              </datalist> -->

        <select
          class="form-select"
          name="event-category"
          id="event-category"
          v-model="category"
        >
          <option selected disabled value="">Select event category</option>
          <option v-for="category in eventCategories" :value="category">
            {{ category }}
          </option>
        </select>
      </div>

      <!-- DESCRIPTION -->
      <div class="col-12 mb-3">
        <label for="event-description" class="fw-bold">Description</label>
        <textarea class="form-control" id="event-description" wrap="hard">{{
          description
        }}</textarea>
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
        <div class="hstack align-items-center gap-2">
          <input type="time" class="form-control" v-model="time" />
        </div>
      </div>

      <!-- REGISTRATION DATE -->
      <div class="col-5 mb-3">
        <label for="event-date" class="fw-bold">Registration date</label>
        <div class="hstack align-items-center text-secondary gap-2">
          <input
            type="date"
            class="form-control"
            v-model="registration_start"
          />
          <div>
            <Icon name="material-symbols:arrow-right-alt-rounded"></Icon>
          </div>
          <input type="date" class="form-control" v-model="registration_end" />
        </div>
      </div>

      <!-- VENUE -->
      <div class="col-4 mb-3">
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
      <div class="col-8 mb-3">
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
        type="submit"
        class="btn btn-primary d-flex align-items-center gap-2 px-5"
      >
        <Icon name="material-symbols:add-rounded" />
        Create
      </button>
    </div>
  </form>
</template>

<script setup>
definePageMeta({
  layout: "main",
});

const client = useSupabaseClient();

const eventCategories = [
  "Competition",
  "Workshop",
  "Career fair",
  "Keynote speech",
];

const title = ref("");
const description = ref("");
const category = ref("");
const time = ref();
const date = ref();
const venue = ref("");
const address = ref("");
const registration_start = ref();
const registration_end = ref();

const addEvent = async () => {
  const { data: events, error } = await client
    .from("events")
    .insert({
      date: date.value,
      time: time.value,
      // registration_start: registration_start.value,
      // registration_end: registration_end.value,
    })
    .select();

  if (error) {
    console.log(error);
  } else {
    console.log(events);
  }
};
</script>

<style scoped>
textarea {
  resize: none;
  height: 10rem;
}
</style>
