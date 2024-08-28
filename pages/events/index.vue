<template>
   <div>
      <div class="d-flex justify-content-between align-items-center mb-5">
         <div class="fs-5" style="color:#46468f;">List of events</div>
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
               <th class="d-flex justify-content-evenly" scope="col">Action</th>
            </tr>
         </thead>
         <tbody>
            <tr v-for="(event, id) in events">
               <td>{{ event.title }}</td>
               <td>{{ event.duration }}</td>
               <td>{{ event.date }}</td>
               <td>{{ event.location }}</td>
               <td>{{ event.registrationDeadline }}</td>
               <td class="d-flex justify-content-evenly">
                  <NuxtLink :to="`/events/${id}`" class="view-btn btn text-light">view</NuxtLink>
                  <NuxtLink to="/" class="remove-btn btn">Delete</NuxtLink>
               </td>
            </tr>
         </tbody>
      </table>
   </div>
</template>

<script setup>
   definePageMeta({
      layout: 'main'
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