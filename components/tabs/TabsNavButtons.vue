<template>
	<div>
		<button
			:class="['nav-link', { active: active }]"
			:id="`tab-header-${id}`"
			data-bs-toggle="tab"
			:data-bs-target="`#tab-content-${id}`"
			type="button"
			role="tab"
			:aria-controls="`tab-content-${id}`"
			:aria-selected="active">
			<slot> Tab Header </slot>
		</button>
	</div>
</template>

<script setup>
	const props = defineProps({
		active: false,
		id: "sample_tab",
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
