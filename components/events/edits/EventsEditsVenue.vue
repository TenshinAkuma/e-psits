<template>
	<div>
		<div class="d-flex justify-content-between">
			<div class="text-secondary fs-7">Venue</div>
			<button
				type="button"
				class="btn btn-sm d-flex align-items-center text-secondary"
				@click="ToggleEdit">
				<Icon name="material-symbols:edit-outline-rounded" />
			</button>
		</div>
		<p v-if="!IsEditing" class="fw-bold fs-7 lh-sm">
			{{ eventDetails.venue || `To be announced` }}
		</p>

		<form v-else @submit.prevent="OnSaveEventEdit" class="mt-1 mb-3">
			<input
				type="text"
				v-model="newVenue.venue"
				class="form-control border-secondary p-2 mb-2 w-100" />

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

	const newVenue = ref({
		venue: eventDetails.value?.venue,
	});

	const IsEditing = ref(false);

	const {
		data: _event,
		status: _eventStatus,
		execute: SaveEventEdit,
	} = await useFetch(`/api/events/${eventID}`, {
		method: "PATCH",
		body: newVenue,
		immediate: false,
		watch: false,
	});

	const OnSaveEventEdit = async () => {
		try {
			await SaveEventEdit();

			if (_event.value?.error) {
				throw new Error(_event.value?.error);
			}

			eventDetails.value = _event.value?.data;
			ToggleEdit();
		} catch (error) {
			console.log("Failed to update venue", err);

			errorMessage.value = error.message;

			setTimeout(() => {
				errorMessage.value = "";
			}, 3000);
		}
	};

	const ToggleEdit = () => {
		IsEditing.value = !IsEditing.value;

		if (!IsEditing.value) {
			newVenue.value.venue = eventDetails.value?.venue;
		}
	};
</script>

<style></style>
