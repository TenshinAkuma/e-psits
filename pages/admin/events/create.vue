<template>
  <div class="h-100 d-flex flex-column justify-content-between">
    <div>
      <div>
        <div class="fw-bold text-secondary">Create event</div>
        <div
          class="d-flex justify-content-between align-items-center mb-4"
        ></div>
      </div>
      <div>
        <div class="col-12 mb-3">
          <div class="row mb-5">
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
                list="eventCategoryOptions"
                v-model="category"
                placeholder="Choose event category"
              />
              <datalist id="eventCategoryOptions">
                <option v-for="category in eventCategories" :value="category" />
              </datalist>
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
            <div class="col-12 mb-3">
              <label for="event-location" class="text-secondary"
                >Location</label
              >
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
    <div class="d-flex gap-3">
      <button
        class="btn d-flex align-items-center gap-2 px-5"
        style="background-color: #e5e5e5; color: #46468f"
        @click="checkCategoryInput()"
      >
        <Icon name="material-symbols:close-rounded" />
        Cancel
      </button>
      <button
        class="btn text-light d-flex align-items-center gap-2 px-5"
        style="background-color: #46468f"
      >
        <Icon name="material-symbols:calendar-add-on-outline-rounded" />
        Create
      </button>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "main",
});

const route = useRoute();

const eventCategories = [
  "Competition",
  "Workshop",
  "Career fair",
  "Keynote speech",
];

const title = ref("");
const description = ref("");
const category = ref("");
const duration = ref("");
const date = ref("");
const location = ref("");

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
