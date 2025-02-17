<template>
  <div>
    <button class="btn btn-primary" @click="SendSms">SEND SMS</button>
  </div>
</template>

<script setup>
async function SendSms() {
  await $fetch(`/api/sms`, {
    method: "POST",
  });
}
</script>
