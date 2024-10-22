<template>
  <div
    style="width: 300px"
    class="offcanvas offcanvas-start border-end"
    data-bs-scroll="true"
    tabindex="-1"
    id="offcanvasWithBothOptions"
    aria-labelledby="offcanvasWithBothOptionsLabel"
  >
    <div class="hstack border-bottom px-3" style="height: 56px">
      <NuxtLink
        to="/admin"
        class="fs-4 fw-bold text-decoration-none"
        style="color: #46468f"
        >E-PSITS</NuxtLink
      >
    </div>
    <div class="p-3">
      <NuxtLink
        v-for="menu in Menus"
        :to="`/admin/${menu.route}`"
        class="d-flex align-items-center text-decoration-none text-secondary py-3 w-100"
        ><Icon :name="`${menu.icon}`" class="me-3" />
        <div>{{ menu.selection }}</div></NuxtLink
      >
    </div>
  </div>
</template>

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

<style scoped>
.router-link-active {
  color: #46468f !important;
  font-weight: bold;
}
.logout-btn {
  color: #46468f;
  text-decoration: none;
}
</style>
