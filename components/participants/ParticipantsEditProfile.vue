<template>
	<div>
		<form>
			<label for="participant-name" class="fw-bold">Name</label>
			<input
				id="participant-name"
				type="text"
				placeholder="Name"
				class="form-control mb-3"
				v-model="Participant.name" />

			<label for="participant-email" class="fw-bold">Email</label>
			<input
				id="participant-email"
				type="text"
				placeholder="Name"
				class="form-control mb-3"
				v-model="Participant.email" />

			<label for="participant-address" class="fw-bold">Address</label>
			<input
				id="participant-address"
				type="text"
				placeholder="Name"
				class="form-control mb-3"
				v-model="Participant.address" />

			<label for="participant-number" class="fw-bold"
				>Contact number</label
			>
			<input
				id="participant-address"
				type="text"
				placeholder="Name"
				class="form-control mb-3"
				v-model="Participant.phone_number" />

			<button
				type="button"
				class="btn btn-sm btn-secondary"
				@click="OnEdit">
				Cancel
			</button>
		</form>
	</div>
</template>

<script setup>
	const Participant = defineModel("Participant");
	const IsEditing = defineModel("IsEditing");

	const OnEdit = () => {
		IsEditing.value = !IsEditing.value;
	};
</script>

<style></style>
