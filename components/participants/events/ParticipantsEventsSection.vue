<template>
  <div>
   <div class="border border-secondary rounded-3 p-3">
      Events
      {{ _registrationData.data }}
   </div>
  </div>
</template>

<script setup>

  const participantId = Number(useRoute().params.participantId)

  const { data: _registrationData } = await useFetch(`/api/participant-registrations/${participantId}`, {
    method: "GET",
  })
</script>

<style></style>