<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <div class="fs-5 me-3" style="color: #46468f">List of events</div>
      <NuxtLink
        to="/"
        class="d-flex align-items-center gap-2 btn btn-sm rounded-pill px-4"
        style="color: #46468f; border-color: #46468f"
        ><Icon name="material-symbols:calendar-add-on-outline-rounded" />Add
        event</NuxtLink
      >
    </div>
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
          <td>{{ event.registrationDeadline }}</td>
        </tr>
      </tbody>
    </table>
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
