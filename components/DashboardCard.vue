<template>
  <div>
    <NuxtLink to="/" class="text-decoration-none">
      <div
        class="dashboard-card text-secondary d-flex justify-content-between align-items-center border rounded gap-2 p-3"
      >
        <div class="">
          {{ action_shortcut }}
        </div>
        <Icon :name="`${action_icon}`" />
      </div>
    </NuxtLink>
  </div>
</template>

<script setup>
const props = defineProps({
  action_shortcut: String,
  action_icon: String,
});
</script>

<style scoped>
.dashboard-card:hover {
  color: #46468f !important;
  font-weight: bold !important;
}
</style>
