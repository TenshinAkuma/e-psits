<template>
	<div>
		<button class="btn btn-primary" @click="SendSms">SEND SMS</button>
	</div>
</template>

<script setup>
	async function SendSms() {
		await $fetch(`/api/sms`, {
			method: "POST",
			body: {
				id: "tenshinakuma022501@gmail.com",
				email: "tenshinakuma022501@gmail.com",
				number: "+639670289112",
			},
		});
	}
</script>
