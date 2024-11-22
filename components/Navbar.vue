<template>
   <header class="border-bottom border-2">
      <div class="container-xxl d-flex justify-content-between align-items-center gap-5" style="height: 56px">
         <div class="hstack align-items-center gap-5">
            <div class="fs-4 fw-bold">E-PSITS</div>
            <div class="text-dark">Administrator Panel</div>
         </div>
         <button
            class="hstack align-items-center btn btn-link text-decoration-none text-dark px-3 gap-1"
            @click="handleLogout()">
               <Icon name="material-symbols:power-settings-new-outline-rounded"/>Logout
         </button>
      </div>
   </header>
</template>

<script setup>
  const router = useRouter();
  const client = useSupabaseClient();

  const handleLogout = async () => {
    const { error } = await client.auth.signOut();
    router.push("/signIn");
  };
</script>
