<template>
	<div>
		<NuxtLink :to="`${link}`" class="text-decoration-none">
			<div
				class="dashboard-card text-secondary d-flex justify-content-between align-items-center border border-secondary rounded gap-2 p-3">
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
		color: #0d6efd !important;
		font-weight: bold !important;
		border: 1px solid #0d6efd !important;
	}
</style>
