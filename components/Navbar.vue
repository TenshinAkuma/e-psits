<template>
  <div
    class="d-flex justify-content-between align-items-center border border-bottom p-3 position-absolute top-0 start-50 translate-middle-x w-100 bg-white"
    style="height: 56px; z-index: 10"
  >
    <div class="hstack align-items-center gap-3">
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
</template>

<script setup>
const router = useRouter();
const client = useSupabaseClient();

const handleLogout = async () => {
  const { error } = await client.auth.signOut();
  router.push("/signIn");
};
</script>
