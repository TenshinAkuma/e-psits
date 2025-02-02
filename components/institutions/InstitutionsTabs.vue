<template>
	<ul class="nav nav-tabs">
		<li class="nav-item">
			<NuxtLink
				class="nav-link"
				:class="{ active: isActive('details') }"
				:to="`/admin/institutions/${institutionId}`"
				>Details</NuxtLink
			>
		</li>
		<li class="nav-item">
			<NuxtLink
				class="nav-link"
				:class="{ active: isActive('settings') }"
				:to="`/admin/institutions/${institutionId}/settings`"
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

   const institutionId = useRoute().params.institutionId;
   
	const isActive = (tab) => {
		return tab === props.activeTab.toLowerCase();
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
