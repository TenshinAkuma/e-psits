<template>
	<div class="w-100 pb-5">
		<EventsDetails>
			<template #tabs> hello </template>
		</EventsDetails>
	</div>
</template>

<script setup>
	definePageMeta({
		layout: "main",
	});

	const eventID = useRoute().params.eventID;
</script>
