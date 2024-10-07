<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h3 class="fw-bold m-0">List of events</h3>
      <div v-if="error_message">{{ error_message }}</div>
      <NuxtLink
        to="events/create"
        class="d-flex align-items-center gap-2 btn btn-outline-primary btn-sm rounded-pill px-4"
        ><Icon name="material-symbols:calendar-add-on-outline-rounded" />Create
        event</NuxtLink
      >
    </div>
    <div class="table-responsive">
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Category</th>
            <th scope="col">Modality</th>
            <th scope="col">Date</th>
            <th scope="col">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(event, id) in events" class="table-row">
            <td>{{ event.title }}</td>
            <td>{{ event.category }}</td>
            <td>{{ event.modality }}</td>
            <td>{{ event.date }}</td>
            <td>{{ event.description }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "main",
});

const client = useSupabaseClient();

const events = ref([]);
const error_message = ref();

const fetchEvents = async () => {
  const { data: _events, error } = await client.from("events").select("*");

  if (error) {
    error_message.value = error.message;
    console.log(error_message);
  }

  if (_events != null) {
    events.value = _events;
  }
  console.log(_events);
};
// const toEventDetails = async (eventID) => {
//   await navigateTo(`/admin/events/${eventID}`);
// };

onMounted(() => {
  fetchEvents();
});
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
