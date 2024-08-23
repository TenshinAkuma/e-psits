<template>
   <div class="h-100 d-flex flex-column justify-content-between">
      <div>
        <div>
         <div class="fs-5 mb-5" style="color:#46468f;">List of Universities</div>
         <div class="fs-2 fw-bold mb-4">{{ university.schoolName }}</div>
      </div>
      <div class="d-flex text-secondary mb-5">
        <div class="me-5">
          Address: <br>
          Email: <br>
          Registration Status: <br> <br>
          <div class="fw-bold">Contact person</div> <br>
          Name: <br>
          Position: <br>
          Email: <br>
          Phone number: <br>
        </div>
        <div class="">
          {{ university.address }} <br>
          {{ university.email }} <br>
          {{ university.registrationStatus }} <br> <br>
          <div class="fw-bold">Contact person</div> <br>
          {{ contact.name }} <br>
          {{ contact.positionTitle }} <br>
          {{ contact.email }} <br>
          {{ contact.phoneNumber }} <br>
        </div>
      </div>
      </div>
      <div class="">
        <div class="btn text-light px-5 py-2 me-4" style="background-color: #ed5176;">Remove</div>
        <div class="btn text-light px-5 py-2" style="background-color: #46468f">Update</div>
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

const university = schools[uniID];
const contact = contact_person[university.contactPersonID];
</script>