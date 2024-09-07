<template>
  <div class="container-sm p-3">
    <div class="d-flex">
      <div class="d-flex flex-column align-items-start border rounded-3">
        <div class="fs-4 fw-bold border-bottom p-3">E-PSITS</div>
        <NuxtLink
          to="/dashboard"
          class="text-decoration-none text-secondary px-5 py-3 w-100"
          >Dashboard</NuxtLink
        >
        <NuxtLink
          to="/events"
          class="text-decoration-none text-secondary px-5 py-3 w-100"
          >Events</NuxtLink
        >
        <NuxtLink
          to="/participants"
          class="text-decoration-none text-secondary px-5 py-3 w-100"
          >Participants</NuxtLink
        >
        <NuxtLink
          to="/registration"
          class="text-decoration-none text-secondary px-5 py-3 w-100"
          >Registration</NuxtLink
        >
        <NuxtLink
          to="/entryForms"
          class="text-decoration-none text-secondary px-5 py-3 w-100"
          >Forms</NuxtLink
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
.router-link-active {
  color: #121212 !important;
  font-weight: bold;
}
.logout-btn {
  color: #46468f;
  text-decoration: none;
}
</style>
