<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h3 class="fw-bold m-0">List of events</h3>
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
            <th scope="col">Duration</th>
            <th scope="col">Date</th>
            <th scope="col">Location</th>
            <th scope="col">Registration deadline</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(event, id) in events"
            class="table-row"
            @click="toEventDetails(id)"
          >
            <td>{{ event.title }}</td>
            <td>{{ event.duration }}</td>
            <td>{{ event.date }}</td>
            <td>{{ event.location }}</td>
            <td>{{ event.registrationEnd.toLocaleDateString() }}</td>
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

const { events } = useEvents();
const toEventDetails = async (eventID) => {
  await navigateTo(`/admin/events/${eventID}`);
};
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
