<template>
	<div class="col-6 border border-secondary rounded-3 p-3">
		<p>{{ registration }}</p>
      {{ _scoreData }}
	</div>
</template>

<script setup>
   const props = defineProps({
      registration: Object,
   });

   const registration = toRef(() => props.registration);

   const { data: _scoreData, status: _scoreStatus } = useFetch(
      `/api/participant-scores/${registration.value?.id}`,
      {
         method: "GET",
      }
   );
</script>

<style></style>
