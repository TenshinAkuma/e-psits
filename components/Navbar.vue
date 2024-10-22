<template>
  <div
    class="d-flex justify-content-between align-items-center border-bottom p-3 sticky-top"
    style="height: 56px"
  >
    <NuxtLink
      to="/#"
      class="fs-4 fw-bold text-decoration-none"
      style="color: #46468f"
      >E-PSITS</NuxtLink
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
</template>

<script setup>
const router = useRouter();
const client = useSupabaseClient();

const handleLogout = async () => {
  const { error } = await client.auth.signOut();
  router.push("/signIn");
};
</script>
