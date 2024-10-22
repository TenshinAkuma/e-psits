<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h3 class="fw-bold m-0">List of events</h3>
      <NuxtLink
        to="/admin/events/create"
        class="d-flex align-items-center gap-2 btn btn-outline-primary btn-sm rounded-pill px-4"
        ><Icon name="material-symbols:calendar-add-on-outline-rounded" />Create
        event</NuxtLink
      >
    </div>
    <div v-if="!loading" class="table-responsive">
      <table class="table table-hover h-100">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Category</th>
            <th scope="col">Modality</th>
            <th scope="col">Date</th>
            <th scope="col">Description</th>
          </tr>
        </thead>
        <tbody class="h-50s overflow-y-auto">
          <tr
            v-for="event in events"
            :key="event.id"
            class="table-row"
            @click="toEventDetails(event.id)"
          >
            <td>{{ event.title }}</td>
            <td>{{ event.category }}</td>
            <td>{{ event.modality }}</td>
            <td>{{ event.date }}</td>
            <td>{{ event.description }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "main",
});

const { events, loading, fetchEvents } = useEvents();

const toEventDetails = async (eventID) => {
  await navigateTo(`/admin/events/${eventID}`);
};

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
