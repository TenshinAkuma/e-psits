<template>
   <div>
      <NuxtLink to="/" class="text-decoration-none">
         <div class="border rounded-2 px-4 py-5">
            <div class="fs-4" style="color:#46468f;">{{ action_shortcut }}</div>
            <div class="text-secondary">{{ action_description }}</div>
         </div>
      </NuxtLink>
   </div>
</template>

<script setup>
   const props = defineProps({
      action_shortcut: String,
      action_description: String,
   });
</script>

<style scoped>
   
</style>