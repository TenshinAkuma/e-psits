<template>
  <div class="container-xxl pt-3 h-100">
    <div class="row gap-3">
      <div class="col-2 align-items-start">
        <div
          class="d-flex justify-content-between align-items-center px-3 w-100"
          style="height: 72px"
        >
          <div class="fs-4 fw-bold" style="color: #46468f">E-PSITS</div>
          <Icon name="material-symbols:keyboard-backspace-rounded" />
        </div>
        <NuxtLink
          to="/dashboard"
          class="d-flex align-items-center text-decoration-none text-secondary p-3 mt-5 w-100"
          ><Icon
            name="material-symbols:app-registration-outline-rounded"
            class="me-3"
          />
          <div>Dashboard</div></NuxtLink
        >
        <NuxtLink
          to="/events"
          class="d-flex align-items-center text-decoration-none text-secondary p-3 w-100"
          ><Icon name="material-symbols:event-outline-rounded" class="me-3" />
          <div>Events</div></NuxtLink
        >
        <NuxtLink
          to="/participants"
          class="d-flex align-items-center text-decoration-none text-secondary p-3 w-100"
          ><Icon
            name="material-symbols:group-auto-outline-rounded"
            class="me-3"
          />
          <div>Participants</div></NuxtLink
        >
        <NuxtLink
          to="/university"
          class="d-flex align-items-center text-decoration-none text-secondary p-3 w-100"
          ><Icon name="material-symbols:school-outline-rounded" class="me-3" />
          <div>Members</div></NuxtLink
        >
        <NuxtLink
          to="/registration"
          class="d-flex align-items-center text-decoration-none text-secondary p-3 w-100"
          ><Icon
            name="material-symbols:app-registration-outline-rounded"
            class="me-3"
          />
          <div>Registration</div></NuxtLink
        >
        <NuxtLink
          to="/entryForms"
          class="d-flex align-items-center text-decoration-none text-secondary p-3 w-100"
          ><Icon
            name="material-symbols:file-present-outline-rounded"
            class="me-3"
          />
          <div>Forms</div></NuxtLink
        >
      </div>
      <div class="col-9">
        <div
          class="d-flex justify-content-between align-items-center px-3 border rounded"
          style="height: 72px"
        >
          <div class="fs-5 text-secondary">Administrator Panel</div>
          <NuxtLink
            to="/"
            class="d-flex align-items-center text-decoration-none text-secondary px-3"
            ><Icon
              name="material-symbols:power-settings-new-outline-rounded"
              class="me-2"
            />
            <div>Logout</div></NuxtLink
          >
        </div>
        <div
          id="page-slot"
          class="border rounded p-5 mt-3"
          style="height: 100vh; overflow-y: scroll"
        >
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.router-link-active {
  color: #46468f !important;
  font-weight: bold;
}
.logout-btn {
  color: #46468f;
  text-decoration: none;
}

#page-slot {
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
}
#page-slot::-webkit-scrollbar {
  display: none; /* Safari and Chrome */
}
</style>
