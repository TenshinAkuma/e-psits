<template>
   <div class="h-100 d-flex flex-column justify-content-between">
      <div>
         <div>
            <nav aria-label="breadcrumb">
               <ol class="breadcrumb fs-5 mb-5">
                  <NuxtLink to="/events" class="breadcrumb-item text-decoration-none" style="color: #46468f;"> List of events </NuxtLink>
                  <li class="breadcrumb-item active" aria-current="page">Event details</li>
               </ol>
            </nav>
               <div class="fs-2 fw-bold mb-4">{{ event.title }}</div>
         </div>
         <div class="row">
            <div class="col-6 text-secondary mb-5 p-0">
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
                  <div class="col-9 text-wrap">{{ event.location }}</div> <br> <br>
                  <div class="col-12 fw-bold">Participant requirements</div> <br> <br>
                  <div class="col-3">Eligibility:</div>
                  <div class="col-9 text-wrap">{{ event.eligibility }}</div>
                  <div class="col-3">Num. of participants:</div>
                  <div class="col-9 text-wrap">{{ event.requiredParticipants }}</div>
                  <div class="col-3">Registration deadline:</div>
                  <div class="col-9 text-wrap">{{ event.registrationDeadline }}</div>
               </div>
            </div>
         </div>
      </div>
      <div class="">
        <div class="btn text-light px-5 py-2 me-4" style="background-color: #ed5176;">Remove</div>
        <NuxtLink :to="`/events/${eventID}/update`">
          <div class="btn text-light px-5 py-2" style="background-color: #46468f">Update</div>
        </NuxtLink>
        
      </div>
   </div>
</template>

<script setup>
definePageMeta({
      layout: 'main',
})

const route = useRoute();
const eventID = route.params.eventID;

const { events } = useEvents();
const event = events[eventID];
</script>