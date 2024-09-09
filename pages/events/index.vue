<template>
  <div>
    <div class="d-flex justify-content-start align-items-center mb-5">
      <div class="fs-5 me-3" style="color: #46468f">List of events</div>
      <div class="add-event-btn btn px-4 py-2 me-4">Add event</div>
    </div>
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Duration</th>
          <th scope="col">Date</th>
          <th scope="col">Location</th>
          <th scope="col">Registration deadline</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(event, id) in events">
          <td>{{ event.title }}</td>
          <td>{{ event.duration }}</td>
          <td>{{ event.date }}</td>
          <td>{{ event.location }}</td>
          <td>{{ event.registrationDeadline }}</td>
          <td>
            <div class="d-flex justify-content-center column-gap-2">
              <NuxtLink
                :to="`/events/${id}`"
                class="view-btn d-flex align-items-center btn text-light"
                ><Icon name="material-symbols:visibility-outline-rounded"
              /></NuxtLink>
              <NuxtLink to="/" class="remove-btn d-flex align-items-center btn"
                ><Icon name="material-symbols:delete-outline-rounded"
              /></NuxtLink>
            </div>
          </td>
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
</script>

<style scoped>
.view-btn {
  background-color: #46468f;
}
.remove-btn {
  color: #ed5176;
  border-color: #ed5176;
}
.add-event-btn {
  color: #46468f;
  border-color: #46468f;
}
</style>
