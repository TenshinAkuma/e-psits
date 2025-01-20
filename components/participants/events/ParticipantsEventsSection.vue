<template>
	<div>
		<div
			v-for="registration in _registrationData.data"
			:key="registration.id"
			class="border border-secondary rounded-3 p-3">
			<p>{{ registration.events.title }}</p>
		</div>
	</div>
</template>

<script setup>
  const participantId = Number(useRoute().params.participantId);

  const { data: _registrationData } = await useFetch(
    `/api/participant-registrations/${participantId}`,
    {
      method: "GET",
    }
  );
</script>

<style></style>
