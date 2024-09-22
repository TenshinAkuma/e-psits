<template>
  <div class="h-100 d-flex flex-column justify-content-between">
    <div>
      <div>
        <div class="fw-bold text-secondary">Event details</div>
        <div class="d-flex justify-content-between align-items-center">
          <div class="fs-2 fw-bold">{{ event.title }}</div>
          <NuxtLink
            :to="`/admin/events/${eventID}/update`"
            class="text-decoration-none text-secondary d-flex align-items-center gap-2 px-2"
            ><Icon name="material-symbols:edit-outline-rounded" />Edit</NuxtLink
          >
        </div>
      </div>
      <!-- <div class="row">
        <div class="col-12 text-secondary mb-5 p-0">
          <div class="row m-0">
            <div class="col-3">Description:</div>
            <div class="col-9 text-wrap">{{ event.description }}</div>
            <div class="col-3">Category:</div>
            <div class="col-9 text-wrap">{{ event.category }}</div>
            <div class="col-3">Duration:</div>
            <div class="col-9 text-wrap">{{ event.duration }}</div>
            <div class="col-3">Date:</div>
            <div class="col-9 text-wrap">{{ event.date }}</div>
            <div class="col-3">Location:</div>
            <div class="col-9 text-wrap">{{ event.location }}</div>
            <br />
            <br />
            <div class="col-12 fw-bold">Participant requirements</div>
            <br />
            <br />
            <div class="col-3">Eligibility:</div>
            <div class="col-9 text-wrap">{{ event.eligibility }}</div>
            <div class="col-3">Num. of participants:</div>
            <div class="col-9 text-wrap">{{ event.requiredParticipants }}</div>
            <div class="col-3">Registration deadline:</div>
            <div class="col-9 text-wrap">{{ event.registrationDeadline }}</div>
          </div>
        </div>
      </div> -->

      <table class="table table-borderless table-sm">
        <tbody>
          <tr>
            <td>Description:</td>
            <td>{{ event.description }}</td>
          </tr>
          <tr>
            <td>Category:</td>
            <td>{{ event.category }}</td>
          </tr>
          <tr>
            <td>Duration:</td>
            <td>{{ event.duration }}</td>
          </tr>
          <tr>
            <td>Date:</td>
            <td>{{ event.date }}</td>
          </tr>
          <tr>
            <td>Location</td>
            <td>{{ event.location }}</td>
          </tr>
          <div class="py-2"></div>
          <tr>
            <th colspan="2">Partcipant requirements</th>
          </tr>
          <tr>
            <td>Eligibility</td>
            <td>{{ event.eligibility }}</td>
          </tr>
          <tr>
            <td>Num. of participants</td>
            <td>{{ event.requiredParticipants }}</td>
          </tr>
          <tr>
            <td>Registration Deadline</td>
            <td>{{ event.registrationDeadline }}</td>
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

const route = useRoute();
const eventID = route.params.eventID;

const { events } = useEvents();
const event = events[eventID];
</script>
