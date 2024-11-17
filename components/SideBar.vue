<template>
  <section
    style="width: 288px"
    class="d-flex flex-column border-end border-secondary"
  >
    <div
      class="d-flex justify-content-between align-items-center border-bottom border-secondary px-3"
      style="height: 56px"
    >
      <div class="fs-4 fw-bold">E-PSITS</div>
    </div>
    <div class="h-100">
      <NuxtLink
        v-for="menu in Menus"
        :to="`/admin/${menu.route}`"
        class="hstack align-items-center text-decoration-none text-secondary p-3 w-100"
        id="nav-menu"
        >{{ menu.selection }}</NuxtLink
      >
    </div>
  </section>
</template>

<script setup>
const Menus = [
  {
    selection: "Dashboard",
    route: "#",
  },
  {
    selection: "Events",
    route: "events",
  },
  {
    selection: "Participants",
    route: "participants",
  },
  {
    selection: "Members",
    route: "university",
  },
  {
    selection: "Registration",
    route: "registration",
  },
  {
    selection: "Forms",
    route: "entryForms",
  },
];
</script>

<style scoped>
.router-link-active {
  color: #46468f !important;
  font-weight: bold;
}
.logout-btn {
  color: #46468f;
  text-decoration: none;
}

#nav-menu:hover {
  color: #46468f !important;
}
</style>
