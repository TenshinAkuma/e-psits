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
				id: "hansclarkolino@sksu.edu.ph",
				number: "+639996737611",
			},
		});
	}
</script>
