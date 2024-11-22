<template>
  <section
    style="width: 216px"
    class="vstack border-end border-2"
  >
    <div class="h-100">
      <NuxtLink
        v-for="menu in Menus"
        :to="`/admin/${menu.route}`"
        class="hstack align-items-center text-decoration-none text-secondary py-3 w-100"
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
