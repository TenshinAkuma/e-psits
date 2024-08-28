<template>
   <div class="h-100 d-flex flex-column justify-content-between">
      <div>
        <div>
            <nav aria-label="breadcrumb">
               <ol class="breadcrumb fs-5 mb-5">
                  <NuxtLink to="/events" class="breadcrumb-item text-decoration-none" style="color: #46468f;"> List of events </NuxtLink>
                  <NuxtLink :to="`/events/${eventID}`" class="breadcrumb-item text-decoration-none" style="color: #46468f;"> Event details </NuxtLink>
                  <li class="breadcrumb-item active" aria-current="page">Update event</li>
               </ol>
            </nav>
         </div>
         <div class="row gap-5">
            <div class="col-5 mb-3">
               <div class="row mb-5">
                  <div class="fw-bold text-secondary mb-3">Event details</div>
                  <div class="col-12 mb-3">
                     <label for="event_title" class="text-secondary">Title</label>
                     <input type="text" class="form-control" id="event_title" v-model="title">
                  </div>
                  <div class="col-12 mb-3">
                     <label for="event-description" class="text-secondary">Description</label>
                     <textarea class="form-control" id="event-description" wrap="hard">{{ description }}</textarea>
                  </div>
                  <div class="col-4 mb-3">
                     <label for="event-category" class="text-secondary">Category</label>
                     <input type="text" class="form-control" id="event-category" v-model="category">
                  </div>
                  <div class="col-4 mb-3">
                     <label for="event-date" class="text-secondary">Date</label>
                     <input type="date" class="form-control" id="event-date" v-model="date">
                  </div>
                  <div class="col-4 mb-3">
                     <label for="event-location" class="text-secondary">Duration</label>
                     <input type="text" class="form-control" id="event-location" v-model="duration">
                  </div>
                  <div class="col-12 mb-3">
                     <label for="event-location" class="text-secondary">Location</label>
                     <input type="text" class="form-control" id="event-location" v-model="location">
                  </div>
               </div>
            </div>
            <div class="col-5">
               <div class="row">
                  <div class="fw-bold text-secondary mb-3">Participant requirements</div>
                  <div class="col-12 mb-3">
                     <label for="participant-eligibility" class="text-secondary">Eligibility</label>
                     <textarea type="text" class="form-control" id="participant-eligibility"> {{ eligibility }}</textarea>
                  </div>
                  <div class="col-6 mb-3">
                     <label for="participant-number" class="text-secondary">Num. of participant</label>
                     <input type="number" class="form-control" id="participant-number" v-model="participant">
                  </div>
                  <div class="col-6 mb-3">
                     <label for="registration-deadline" class="text-secondary">Deadline of registration</label>
                     <input type="date" class="form-control" id="registration-deadline" v-model="deadline">
                  </div>
               </div>
            </div>
         </div>
      </div>
      <div class="">
         <NuxtLink :to="`/events/${eventID}`">
            <div class="btn px-5 py-2 me-4" style="background-color: #e5e5e5; color: #46468f;">Cancel</div>
         </NuxtLink>
         <NuxtLink :to="`/university/${uniID}`">
            <button @click="updateSchoolAndContactPerson()"class="btn text-light px-5 py-2" style="background-color: #46468f">Confirm</button>
         </NuxtLink>
      </div>
   </div>
</template>

<script setup>
definePageMeta({
   layout: 'main',
});

const route = useRoute();
const eventID = route.params.eventID

const { events } = useEvents();
const event = events[eventID];

const title = ref(event.title);
const description = ref(event.description);
const category = ref(event.category);
const duration = ref(event.duration);
const date = ref(event.date);
const location = ref(event.location);
const eligibility = ref(event.eligibility);
const participant = ref(event.requiredParticipants);
const deadline = ref(event.registrationDeadline);
</script>

<style scoped>
   textarea {
      resize: none;
      height: 10rem;
   }
</style>