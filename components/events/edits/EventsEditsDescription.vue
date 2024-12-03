<template>
	<div>
		<div class="d-flex justify-content-between">
			<div class="fw-bold text-secondary">Brief Description</div>
			<button
				type="button"
				class="btn btn-sm d-flex align-items-center text-secondary"
				@click="ToggleEdit">
				<Icon name="material-symbols:edit-outline-rounded" />
			</button>
		</div>
		<div v-if="!IsEditingDescription" class="text-dark">
			{{ EventDescription }}
		</div>

		<form v-else @submit.prevent="OnSaveNewDescription" class="mt-1">
			<textarea
				class="form-control border-secondary p-2 mb-3"
				style="max-height: 216px; resize: vertical"
				rows="4"
				v-model="newDescription" />
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
	const EventDescription = defineModel("EventDescription");

	const newDescription = ref("");
	const IsEditingDescription = ref(false);

	const ToggleEdit = () => {
		IsEditingDescription.value = !IsEditingDescription.value;
		if (IsEditingDescription.value) {
			newDescription.value = EventDescription.value;
		}
	};

	const { status, execute } = await useFetch(
		`/api/events/${eventID}?column=description`,
		{
			method: "PATCH",
			body: { value: newDescription },
			immediate: false,
			watch: false,
		}
	);

	const OnSaveNewDescription = async () => {
		try {
			await execute();
			ToggleEdit();
			EventDescription.value = newDescription.value;
		} catch (err) {
			newDescription.value = err.message;
		}
	};
</script>

<style></style>
