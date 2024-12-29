<template>
	<div
		:class="['tab-pane fade', { 'show active': active }]"
		:id="`tab-content-${id}`"
		role="tabpanel"
		:aria-labelledby="`tab-header-${id}`"
		tabindex="0">
		<slot> Tab Content </slot>
	</div>
</template>

<script setup>
	const props = defineProps({
		active: false,
		id: "sample_tab",
	});
</script>
