<template>
  <div>
    Hello, world
    <button type="button" class="btn btn-primary" @click="SendNotification">
      SEND NOTIF
    </button>
  </div>
</template>

<script setup>
async function SendNotification() {
  const { data, error } = await $fetch(`/api/sms`, {
    method: "POST",
  });
}
</script>
