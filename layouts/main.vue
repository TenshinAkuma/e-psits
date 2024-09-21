<script setup>
const Menus = [
  {
    selection: "Dashboard",
    route: "#",
    icon: "material-symbols:space-dashboard-outline-rounded",
  },
  {
    selection: "Events",
    route: "events",
    icon: "material-symbols:event-outline-rounded",
  },
  {
    selection: "Participants",
    route: "participants",
    icon: "material-symbols:group-auto-outline-rounded",
  },
  {
    selection: "Members",
    route: "university",
    icon: "material-symbols:school-outline-rounded",
  },
  {
    selection: "Registration",
    route: "registration",
    icon: "material-symbols:app-registration-outline-rounded",
  },
  {
    selection: "Forms",
    route: "entryForms",
    icon: "material-symbols:file-present-outline-rounded",
  },
];
</script>

<template>
  <div class="container-xxl pt-3 h-100">
    <div class="row">
      <div class="col-2 align-items-start">
        <div
          class="d-flex justify-content-between align-items-center px-3 mb-5 w-100"
          style="height: 72px"
        >
          <NuxtLink
            to="/dashboard"
            class="fs-4 fw-bold text-decoration-none"
            style="color: #46468f"
            >E-PSITS</NuxtLink
          >
          <Icon
            name="material-symbols:keyboard-backspace-rounded"
            size="1.5rem"
            class="text-secondary"
            @click="$router.back()"
            style="cursor: pointer"
          />
        </div>
        <NuxtLink
          v-for="menu in Menus"
          :to="`/admin/${menu.route}`"
          class="d-flex align-items-center text-decoration-none text-secondary p-3 w-100"
          ><Icon :name="`${menu.icon}`" class="me-3" />
          <div>{{ menu.selection }}</div></NuxtLink
        >
      </div>
      <div class="col-10">
        <div
          class="d-flex justify-content-between align-items-center px-3 border rounded"
          style="height: 72px"
        >
          <div class="fs-5 text-secondary">Administrator Panel</div>
          <NuxtLink
            to="/"
            class="menu-selection d-flex align-items-center text-decoration-none text-secondary px-3"
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
          style="overflow-y: hidden"
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
