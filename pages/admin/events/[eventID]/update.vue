<template>
  <div class="h-100 d-flex flex-column justify-content-between">
    <div>
      <div>
        <h3 class="fw-bold">Update event details</h3>
        <hr />
        <div
          class="d-flex justify-content-between align-items-center mb-4"
        ></div>
      </div>
      <div>
        <!-- TITLE -->
        <div class="col-12 mb-3">
          <div class="row mb-5">
            <div class="col-9 mb-3">
              <label for="event_title" class="fw-bold">Title</label>
              <input
                type="text"
                class="form-control"
                id="event_title"
                v-model="title"
              />
            </div>

            <!-- EVENT DATE -->
            <div class="col-3 mb-3">
              <label for="event-date" class="fw-bold">Date</label>
              <input
                type="date"
                class="form-control"
                id="event-date"
                v-model="date"
              />
            </div>

            <!-- DESCRIPTION -->
            <div class="col-12 mb-3">
              <label for="event-description" class="fw-bold">Description</label>
              <textarea
                class="form-control"
                id="event-description"
                wrap="hard"
                >{{ description }}</textarea
              >
            </div>

            <!-- CATEGORY -->
            <div class="col-4 mb-3">
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
              >
                <option selected="selected" hidden="true">
                  Select event category
                </option>
                <option v-for="category in eventCategories" :value="category">
                  {{ category }}
                </option>
              </select>
            </div>

            <!-- REGISTRATION DATE -->
            <div class="col-5 mb-3">
              <label for="event-date" class="fw-bold">Registration date</label>
              <div class="hstack align-items-center text-secondary gap-2">
                <input
                  type="date"
                  class="form-control"
                  id="event-date"
                  v-model="registration_start"
                />
                <div>
                  <Icon name="material-symbols:arrow-right-alt-rounded"></Icon>
                </div>
                <input
                  type="date"
                  class="form-control"
                  id="event-date"
                  v-model="registration_end"
                />
              </div>
            </div>

            <!-- EVENT DURATION -->
            <div class="col-3 mb-3">
              <label for="event-location" class="fw-bold">Duration</label>
              <div class="input-group">
                <input
                  type="number"
                  class="form-control"
                  id="event-location"
                  v-model="duration"
                />
                <span class="input-group-text">Hours</span>
              </div>
            </div>

            <!-- LOCATION -->
            <div class="col-12 mb-3">
              <label for="event-location" class="fw-bold">Location</label>
              <div class="input-group">
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
    </div>
    <div class="d-flex justify-content-between">
      <div class="hstack gap-3">
        <button
          class="btn btn-outline-primary btn-sm fw-bold d-flex align-items-center gap-2 px-5"
        >
          <Icon name="material-symbols:close-rounded" />
          Cancel
        </button>
        <button
          class="btn btn-primary btn-sm d-flex align-items-center gap-2 px-5"
        >
          <Icon name="line-md:confirm" />
          Confirm
        </button>
      </div>
      <button
        class="btn btn-outline-danger btn-sm fw-bold d-flex align-items-center gap-2 px-5"
      >
        <Icon name="material-symbols:delete-outline-rounded" />Remove
      </button>
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

const eventCategories = [
  "Competition",
  "Workshop",
  "Career fair",
  "Keynote speech",
];

const title = ref(event.title);
const description = ref(event.description);
const category = ref(event.category);
const duration = ref(event.duration);
const date = ref(event.date);
const location = ref(event.location);
const registration_start = ref(event.registrationStart);
const registration_end = ref(event.registrationEnd);

const checkCategoryInput = () => {
  return isValidOption(category.value, eventCategories);
};
</script>

<style scoped>
textarea {
  resize: none;
  height: 10rem;
}
</style>
