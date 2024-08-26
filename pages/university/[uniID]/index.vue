@ -0,0 +1,51 @@
<template>
   <div class="h-100 d-flex flex-column justify-content-between">
      <div>
        <div>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb fs-5 mb-5">
            <NuxtLink to="/university" class="breadcrumb-item text-decoration-none" style="color: #46468f;"> List of universities </NuxtLink>
            <li class="breadcrumb-item active" aria-current="page">University profile</li>
          </ol>
        </nav>
         <div class="fs-2 fw-bold mb-4">{{ school.schoolName }}</div>
      </div>
      <div class="d-flex text-secondary mb-5">
        <div class="me-5">
          Address: <br>
          Email: <br>
          Phone number: <br>
          Registration Status: <br> <br>
          <div class="fw-bold">Contact person</div> <br>
          Name: <br>
          Position: <br>
          Email: <br>
          Phone number: <br>
        </div>
        <div class="">
          {{ school.address }} <br>
          {{ school.email }} <br>
          {{ school.phoneNumber }} <br>
          {{ school.registrationStatus }} <br> <br> <br> <br>
          {{ contact.name }} <br>
          {{ contact.positionTitle }} <br>
          {{ contact.email }} <br>
          {{ contact.phoneNumber }} <br>
        </div>
      </div>
      </div>
      <div class="">
        <div class="btn text-light px-5 py-2 me-4" style="background-color: #ed5176;">Remove</div>
        <NuxtLink :to="`/university/${uniID}/update`">
          <div class="btn text-light px-5 py-2" style="background-color: #46468f">Update</div>
        </NuxtLink>
        
      </div>
   </div>
</template>

<script setup>
definePageMeta({
  layout: 'main'
});

const route = useRoute();
const uniID = route.params.uniID;

const { schools } = useSchools();
const { contact_person } = useContactPersons();

const school = schools[uniID];
const contact = contact_person[school.contactPersonID];
</script>