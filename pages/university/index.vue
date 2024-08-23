<template>
   <div>
      <div class="fs-5 mb-5" style="color:#46468f;">List of Universities</div>
      <table class="table table-hover">
         <thead>
            <tr>
               <th scope="col">Name</th>
               <th scope="col">Address</th>
               <th scope="col">Email</th>
               <th scope="col">Contact Person</th>
               <th scope="col">Status</th>
               <th class="d-flex justify-content-evenly" scope="col">Action</th>
            </tr>
         </thead>
         <tbody>
            <tr v-for="(school, id) in schools">
               <td>{{ school.schoolName }}</td>
               <td>{{ school.address }}</td>
               <td>{{ school.email }}</td>
               <td>{{ getContactPersonName(school.contactPersonID) }}</td>
               <td>{{ school.registrationStatus }}</td>
               <td class="d-flex justify-content-evenly">
                  <NuxtLink :to="`/university/${id}`" class="view-btn btn text-light">view</NuxtLink>
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

   const { schools } = useSchools();
   const { contact_person } = useContactPersons();

   function getContactPersonName(contact_person_id) {
      return contact_person[contact_person_id]?.name || "no email";
      }
      
</script>


<style scoped>
   .view-btn {
      background-color: #46468f;
   }
   .remove-btn {
      color: #46468f;
      background-color: #c4c4db;
   }
</style>