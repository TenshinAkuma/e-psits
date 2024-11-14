<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h3 class="fw-bold m-0">List of events</h3>
      <NuxtLink
        to="/admin/events/create"
        class="d-flex align-items-center gap-2 btn btn-outline-primary btn-sm rounded-pill px-4"
      >
        <Icon name="material-symbols:calendar-add-on-outline-rounded" />Create
        event
      </NuxtLink>
    </div>
    <div v-if="!loading" class="table-responsive">
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Category</th>
            <th scope="col">Modality</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody>
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
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="d-flex justify-content-center align-items-center m-auto">
      <div class="spinner-border text-secondary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "main",
});

const { events, loading, GetAllEvents } = useEvents();

const toEventDetails = async (eventID) => {
  await navigateTo(`/admin/events/${eventID}`);
};

onMounted(() => {
  GetAllEvents();
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
