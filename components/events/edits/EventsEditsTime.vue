<template>
	<div>
		<div class="d-flex justify-content-between">
			<div class="text-secondary fs-7">Time</div>
			<button
				type="button"
				class="btn btn-sm d-flex align-items-center text-secondary"
				@click="ToggleEdit">
				<Icon name="material-symbols:edit-outline-rounded" />
			</button>
		</div>
		<p v-if="!IsEditing" class="fw-bold fs-7 lh-sm">
			{{ formatTime(eventDetails.date) }}
		</p>

		<form v-else @submit.prevent="OnSaveEventEdit" class="mt-1 mb-3">
			<input
				type="time"
				v-model="eventTime"
				class="form-select border-secondary p-2 mb-3 w-100" />
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

	const convertTimeToHHMM = (date) => {
		const eventDate = new Date(date);
		// Extract and format time as HH:MM
		const hours = eventDate.getHours().toString().padStart(2, "0");
		const minutes = eventDate.getMinutes().toString().padStart(2, "0");
		return `${hours}:${minutes}`;
	};

	const eventTime = ref(convertTimeToHHMM(eventDetails.value?.date));

	const newTime = ref({
		date: eventDetails.value?.date,
	});

	const IsEditing = ref(false);

	const {
		data: _event,
		status: _eventStatus,
		execute: SaveEventEdit,
	} = await useFetch(`/api/events/${eventID}`, {
		method: "PATCH",
		body: newTime,
		immediate: false,
		watch: false,
	});

	const OnSaveEventEdit = async () => {
		try {
			// Split eventTime into hours and minutes
			const [hours, minutes] = eventTime.value.split(":").map(Number);

			// Ensure eventDetails.value?.date is a valid date
			const originalDate = new Date(eventDetails.value?.date);
			if (isNaN(originalDate)) throw new Error("Invalid date");

			// Set hours and minutes while preserving the original date
			newTime.value.date = new Date(
				originalDate.setHours(hours, minutes)
			);

			await SaveEventEdit();

			if (_event.value?.error) {
				throw new Error(_event.value?.error);
			}

			eventDetails.value = _event.value?.data;
			IsEditing.value = false;
		} catch (error) {
			console.error("Error updating event time:", error.message);
			errorMessage.value = error.message;

			setTimeout(() => {
				errorMessage.value = "";
			}, 3000);
		}
	};

	const ToggleEdit = () => {
		IsEditing.value = !IsEditing.value;

		if (!IsEditing.value) {
			eventTime.value = convertTimeToHHMM(eventDetails.value?.date);
		}
	};
</script>
