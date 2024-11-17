<template>
  <div class="container-xxl mt-5">
    <img
      src="https://img.freepik.com/free-vector/hand-drawn-digital-natives-illustration_23-2151254821.jpg?t=st=1731840750~exp=1731844350~hmac=eb39ceb6b6da135b93198fb9a50b86b38563edd3d263dc2c2f4c3f912e0db15e&w=1380"
      style="height: 288px; width: 100%; object-fit: cover"
      class="rounded-3 overflow-hidden"
    />

    <div class="row mt-3">
      <div class="col-9">
        <h1 class="fw-bold m-0">{{ event.title }}</h1>
      </div>
      <div class="col-3">
        <button class="btn btn-outline-primary rounded-pill w-100 mb-1">
          Add participant
        </button>
        <div class="fst-italic text-center m-0" style="font-size: 0.8rem">
          Register a participant in this event
        </div>
        <hr />
        <div class="fw-bold">Overview</div>
        <div>{{ event.description }}</div>
        <hr />
        <div class="fw-bold">Date and time</div>
        <div>{{ event.date }}</div>
        <div>{{ event.time }}</div>
        <hr />
        <div class="fw-bold">Location</div>
        <div>{{ event.venue }}</div>
        <div>{{ event.address }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "main",
});

const route = useRoute();
const eventID = route.params.eventID;

const { status, data: event } = await useLazyFetch(`/api/events/${eventID}`, {
  headers: useRequestHeaders(["cookie"]),
  method: "GET",
  lazy: true,
});
</script>

<style scoped>
.list-group-item {
  font-size: 0.9rem !important;
}

.forms {
  cursor: pointer;
}
.forms:hover {
  color: black !important;
}
</style>
