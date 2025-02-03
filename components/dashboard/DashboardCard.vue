<template>
	<div>
		<NuxtLink :to="`${link}`" class="text-decoration-none">
			<div
				class="dashboard-card text-dark d-flex justify-content-between align-items-center border bg-secondary bg-opacity-10 rounded gap-2 p-3">
				<div class="">
					{{ action_shortcut }}
				</div>
				<Icon :name="`${action_icon}`" />
			</div>
		</NuxtLink>
	</div>
</template>

<script setup>
	const props = defineProps({
		action_shortcut: String,
		action_icon: String,
		link: String,
	});
</script>

<style scoped>
	.dashboard-card:hover {
		font-weight: bold !important;
		border: 1px solid darkgrey !important;
	}
</style>
