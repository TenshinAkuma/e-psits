<template>
	<div>
		<div class="d-flex justify-content-between">
			<div class="text-secondary fs-7">Brief Description</div>
			<button
				type="button"
				class="btn btn-sm d-flex align-items-center text-secondary"
				@click="ToggleEdit">
				<Icon name="material-symbols:edit-outline-rounded" />
			</button>
		</div>
		<p
			v-if="!IsEditing"
			class="fw-bold fs-7 lh-sm"
			style="max-width: 32ch">
			{{ eventDetails.description || "No description yet" }}
		</p>

		<form v-else @submit.prevent="OnSaveEventEdit" class="mt-1 mb-3">
			<textarea
				class="form-control border-secondary p-2 mb-2"
				style="max-height: 216px; resize: vertical"
				rows="4"
				v-model="newDescription.description" />

			<p class="fs-7 text-danger">{{ errorMessage }}</p>

			<div class="d-flex justify-content-end gap-2">
				<button
					type="submit"
					class="d-flex align-items-center btn btn-sm btn-success fw-bold gap-2"
					style="height: min-content"
					:disabled="_eventStatus === 'pending'">
					<span
						v-if="_eventStatus === 'pending'"
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
	const eventDetails = useEventDetails();
	const errorMessage = ref("");

	const newDescription = ref({
		description: eventDetails.value?.description,
	});

	const IsEditing = ref(false);

	const ToggleEdit = () => {
		IsEditing.value = !IsEditing.value;

		if (!IsEditing.value) {
			newDescription.value.description =
				eventDetails.value?.description;
		}
	};

	const {
		data: _event,
		status: _eventStatus,
		execute: SaveEventEdit,
	} = await useFetch(`/api/events/${eventID}`, {
		method: "PATCH",
		body: newDescription,
		immediate: false,
		watch: false,
	});

	const OnSaveEventEdit = async () => {
		await SaveEventEdit();

		if (_event.value?.error) {
			errorMessage.value = _event.value?.error;

			setTimeout(() => {
				errorMessage.value = "";
			}, 3000);

			return;
		}

		eventDetails.value = _event.value?.data;
		IsEditing.value = false;
	};
</script>

<style></style>
