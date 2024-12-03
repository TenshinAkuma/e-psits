<template>
	<div>
		<div class="d-flex justify-content-between">
			<div class="fw-bold text-secondary">Address</div>
			<button
				type="button"
				class="btn btn-sm d-flex align-items-center text-secondary"
				@click="ToggleEdit">
				<Icon name="material-symbols:edit-outline-rounded" />
			</button>
		</div>
		<div v-if="!IsEditingAddress">
			{{ newAddress || `To be announced` }}
		</div>

		<form v-else @submit.prevent="OnSaveNewAddress" class="mt-1">
			<input
				type="text"
				v-model="newAddress"
				class="form-select border-secondary p-2 mb-3 w-100" />
			<div class="d-flex justify-content-end gap-2">
				<button
					type="submit"
					class="d-flex align-items-center btn btn-sm btn-success fw-bold gap-2"
					style="height: min-content"
					:disabled="status === 'pending'">
					<span
						v-if="status === 'pending'"
						class="spinner-border spinner-border-sm"
						aria-hidden="true" />
					<span role="status">Save</span>
				</button>
				<button
					type="button"
					class="btn btn-sm btn-outline-secondary"
					@click="ToggleEdit">
					Cancel
				</button>
			</div>
		</form>
	</div>
</template>

<script setup>
	const eventID = useRoute().params.eventID;
	const EventAddress = defineModel("EventAddress");

	const newAddress = ref();
	const IsEditingAddress = ref(false);

	const { status, execute } = await useFetch(
		`/api/events/${eventID}?column=address`,
		{
			method: "PATCH",
			body: { value: newAddress },
			immediate: false,
			watch: false,
		}
	);

	const OnSaveNewAddress = async () => {
		try {
			await execute();
			ToggleEdit();
			EventAddress.value = newAddress.value;
		} catch (err) {
			console.log("Failed to update address", err);
		}
	};

	const ToggleEdit = () => {
		IsEditingAddress.value = !IsEditingAddress.value;
		if (IsEditingAddress.value) {
			newAddress.value = EventAddress.value;
		}
	};
</script>

<style></style>
