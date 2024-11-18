<template>
  <div class="container-xxl mt-5 pb-5">
    <img
      src="C:\Projects\073024_E-PSITS\e-psits\public\img\undraw_wait_in_line_o2aq.svg"
      style="height: 288px; width: 100%; object-fit: cover"
      class="rounded-3 overflow-hidden border"
    />

    <div class="row mt-3 g-3">
      <div class="col-8">
        <h1 class="fw-bold m-0">{{ event.title }}</h1>
      </div>
      <div class="col-4">
        <div class="border rounded-3 p-4">
          <div class="fw-bold">BASIC INFORMATION</div>
          <br />
          <div class="fw-bold text-secondary">Description</div>
          <div>{{ event.description }}</div>
          <br />
          <div class="fw-bold text-secondary">Category</div>
          <div>{{ event.category }}</div>
          <br />
          <hr />
          <div class="fw-bold">EVENT SCHEDULE</div>
          <br />
          <div class="fw-bold text-secondary">Date and time</div>
          <div>{{ formatDate(event.date) }}</div>
          <div>{{ new Date(event.date).toLocaleTimeString() }}</div>
          <br />
          <div class="fw-bold text-secondary">Modality</div>
          <div>{{ event.modality }}</div>
          <br />
          <hr />
          <div class="fw-bold">LOCATION</div>
          <div class="fw-bold text-secondary">Venue</div>
          <div>{{ event.venue }}</div>
          <br />
          <div class="fw-bold text-secondary">Address</div>
          <div>{{ event.address }}</div>
          <br />
          <hr />
          <button
            class="btn btn-sm btn-outline-primary rounded-pill w-100 mb-1"
          >
            Add participant
          </button>
          <div class="fst-italic text-center m-0" style="font-size: 0.8rem">
            Register a participant in this event
          </div>
        </div>
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
var eventDate;

const { status, data: event } = await useFetch(`/api/events/${eventID}`, {
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
