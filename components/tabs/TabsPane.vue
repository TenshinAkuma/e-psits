<template>
	<div
		:class="['tab-pane fade', { 'show active': Active }]"
		:id="`tab-content-${Id}`"
		role="tabpanel"
		:aria-labelledby="`tab-header-${Id}`"
		tabindex="0">
		<slot> Tab Content </slot>
	</div>
</template>

<script setup>
	const props = defineProps({
		Active: false,
		Id: "sample_tab",
	});
</script>
