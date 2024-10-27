<template>
  <div
    class="d-flex justify-content-between align-items-center border-bottom p-3 sticky-top"
    style="height: 56px"
  >
    <div class="hstack align-items-center gap-3">
      <button
        class="btn btn-link d-flex align-items-center text-secondary border rounded p-1"
        data-bs-toggle="offcanvas"
        data-bs-target="#sideBarNavigation"
        aria-controls="sideBarNavigation"
      >
        <Icon name="material-symbols:menu-rounded" size="1.5rem" />
      </button>
      <NuxtLink
        to="/admin"
        class="fs-4 fw-bold text-decoration-none"
        style="color: #46468f"
        >E-PSITS</NuxtLink
      >
    </div>
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

  <Sidebar />
</template>

<script setup>
const router = useRouter();
const client = useSupabaseClient();

const handleLogout = async () => {
  const { error } = await client.auth.signOut();
  router.push("/signIn");
};
</script>
