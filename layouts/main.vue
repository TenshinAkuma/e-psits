<template>
  <div class="d-flex" style="height: 100%">
    <!-- SIDEBAR -->
    <div id="side-bar" class="border-end" style="width: 300px">
      <div class="hstack border-bottom px-3" style="height: 56px">
        <NuxtLink
          to="/#"
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

    <!-- BODY CONTENT -->
    <div id="content-body" class="h-100 w-100">
      <!-- HEADER -->
      <div
        class="d-flex justify-content-between align-items-center border-bottom p-3"
        style="height: 56px"
      >
        <div class="text-dark">Administrator Panel</div>
        <button
          class="d-flex align-items-center btn btn-link text-decoration-none text-dark px-3"
          @click="handleLogout()"
        >
          <Icon
            name="material-symbols:power-settings-new-outline-rounded"
            class="me-2"
          />
          <div>Logout</div>
        </button>
      </div>
      <div id="page-slot" class="p-5">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
const router = useRouter();
const client = useSupabaseClient();

const handleLogout = async () => {
  const { error } = await client.auth.signOut();
  router.push("/signIn");
};

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
#page-slot {
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
}
#page-slot::-webkit-scrollbar {
  display: none; /* Safari and Chrome */
}
</style>
