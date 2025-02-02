<template>
	<ul class="nav nav-tabs">
		<li class="nav-item">
			<NuxtLink
				class="nav-link"
				:class="{ active: isActive('details') }"
				:to="`/admin/events/${eventId}v2`"
				>Details</NuxtLink
			>
		</li>
		<li class="nav-item">
			<NuxtLink
				class="nav-link"
				:class="{ active: isActive('registrations') }"
				:to="`/admin/events/${eventId}v2/registrations`"
				>Registrations</NuxtLink
			>
		</li>
		<li class="nav-item">
			<NuxtLink
				class="nav-link"
				:class="{ active: isActive('guidelines') }"
				:to="`/admin/events/${eventId}v2/guidelines`"
				>Guidelines</NuxtLink
			>
		</li>
		<li class="nav-item">
			<NuxtLink
				class="nav-link"
				:class="{ active: isActive('criteria') }"
				:to="`/admin/events/${eventId}v2/criteria`"
				>Criteria</NuxtLink
			>
		</li>
		<li class="nav-item">
			<NuxtLink
				class="nav-link"
				:class="{ active: isActive('results') }"
				:to="`/admin/events/${eventId}v2/results`"
				>Results</NuxtLink
			>
		</li>
		<li class="nav-item">
			<NuxtLink
				class="nav-link"
				:class="{ active: isActive('settings') }"
				:to="`/admin/events/${eventId}v2/settings`"
				>Settings</NuxtLink
			>
		</li>
	</ul>
</template>

<script setup>
	const props = defineProps({
		activeTab: {
			type: String,
			required: true,
		},
   });

   const eventId = useRoute().params.eventId;
   
	const isActive = (tab) => {
		return tab === props.activeTab;
	};
</script>

<style scoped>
	.nav-link {
		color: #424242;
	}
	.nav-link.active {
		color: #242424 !important;
		font-weight: bold;
	}
</style>
