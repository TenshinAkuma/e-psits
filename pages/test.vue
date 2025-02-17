<template>
	<div>
		<button class="btn btn-primary fw-bold" @click="SendNotif">
			Send notify
		</button>
	</div>
</template>

<script setup>
	async function SendNotif() {
		const { error } = await $fetch(`/api/movider-sms`, {
			method: "POST",
			body: {
				to: "+639670289112", //+639996737611
				text: "This is EPSITS. You are now registered.",
			},
		});
	}
</script>

<style></style>
