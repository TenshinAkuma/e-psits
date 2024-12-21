<template>
	<div>
		<button
			:class="['nav-link', { active: Active }]"
			:id="`tab-header-${Id}`"
			data-bs-toggle="tab"
			:data-bs-target="`#tab-content-${Id}`"
			type="button"
			role="tab"
			:aria-controls="`tab-content-${Id}`"
			:aria-selected="Active">
			<slot> Tab Header </slot>
		</button>
	</div>
</template>

<script setup>
	const props = defineProps({
		Active: false,
		Id: "sample_tab",
	});
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
