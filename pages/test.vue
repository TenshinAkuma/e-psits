<template>
	<div>
		<button @click="execute">Send</button>
	</div>
</template>

<script setup>
	const sms = {
		number: "09996737611",
		message: "You are registered",
	};

	const { data, execute } = await useFetch("/api/sms", {
		method: "POST",
		body: sms,
	});
</script>

<style></style>
