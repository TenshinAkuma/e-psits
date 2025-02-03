<template>
	<ul class="nav nav-tabs">
		<li class="nav-item">
			<NuxtLink
				class="nav-link"
				:class="{ active: isActive('students') }"
				:to="`/admin/memberships`"
				>Students</NuxtLink
			>
		</li>
      <li class="nav-item">
			<NuxtLink
				class="nav-link"
				:class="{ active: isActive('institutions') }"
				:to="`/admin/memberships/institutions`"
				>Institutions</NuxtLink
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
