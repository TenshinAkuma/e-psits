@ -0,0 +1,51 @@
<template>
  <div class="h-100 d-flex flex-column justify-content-between">
    <div>
      <div>
        <div class="fs-5">University profile</div>
        <div class="d-flex justify-content-between align-items-center mb-4">
          <div class="fs-2 fw-bold">{{ school.schoolName }}</div>
          <NuxtLink
            :to="`/university/${uniID}/update`"
            class="text-decoration-none text-secondary d-flex align-items-center gap-2 px-2"
            ><Icon name="material-symbols:edit-outline-rounded" />Edit</NuxtLink
          >
        </div>
      </div>
      <div class="d-flex text-secondary mb-5">
        <div class="me-5">
          Address: <br />
          Email: <br />
          Phone number: <br />
          Registration Status: <br />
          <br />
          <div class="fw-bold">Contact person</div>
          <br />
          Name: <br />
          Position: <br />
          Email: <br />
          Phone number: <br />
        </div>
        <div class="">
          {{ school.address }} <br />
          {{ school.email }} <br />
          {{ school.phoneNumber }} <br />
          {{ school.registrationStatus }} <br />
          <br />
          <br />
          <br />
          {{ contact.name }} <br />
          {{ contact.positionTitle }} <br />
          {{ contact.email }} <br />
          {{ contact.phoneNumber }} <br />
        </div>
      </div>
    </div>
    <div class="">
      <div
        class="btn text-light px-5 py-2 me-4"
        style="background-color: #ed5176"
      >
        Remove
      </div>
      <NuxtLink :to="`/university/${uniID}/update`">
        <div class="btn text-light px-5 py-2" style="background-color: #46468f">
          Update
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "main",
});

const route = useRoute();
const uniID = route.params.uniID;

const { schools } = useSchools();
const { contact_person } = useContactPersons();

const school = schools[uniID];
const contact = contact_person[school.contactPersonID];
</script>
