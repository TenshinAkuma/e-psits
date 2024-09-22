<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <div class="fs-5 me-3" style="color: #46468f">Members</div>
      <NuxtLink
        to="/"
        class="d-flex align-items-center gap-3 btn px-4"
        style="color: #46468f; border-color: #46468f"
        ><Icon name="material-symbols:school-outline-rounded" />Register
        member</NuxtLink
      >
    </div>
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Address</th>
          <th scope="col">Email</th>
          <th scope="col">Contact Person</th>
          <th scope="col">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(school, id) in schools"
          class="table-row"
          @click="toUniversityProfile(id)"
        >
          <td>{{ school.schoolName }}</td>
          <td>{{ school.address }}</td>
          <td>{{ school.email }}</td>
          <td>{{ getContactPersonName(school.contactPersonID) }}</td>
          <td>{{ school.registrationStatus }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "main",
});

const { schools } = useSchools();
const { contact_person } = useContactPersons();

function getContactPersonName(contact_person_id) {
  return contact_person[contact_person_id]?.name || "no email";
}

const toUniversityProfile = async (universityID) => {
  await navigateTo(`/admin/university/${universityID}`);
};
</script>

<style scoped>
.view-btn {
  background-color: #46468f;
}
.remove-btn {
  color: #ed5176;
  border-color: #ed5176;
}
.table-row:hover {
  cursor: pointer;
}
</style>
