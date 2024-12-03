<template>
	<div>
		<div class="d-flex justify-content-between">
			<div class="fw-bold text-secondary">Time</div>
			<button
				type="button"
				class="btn btn-sm d-flex align-items-center text-secondary"
				@click="ToggleEdit">
				<Icon name="material-symbols:edit-outline-rounded" />
			</button>
		</div>
		<div v-if="!IsEditingTime">
			{{ formattedTime }}
		</div>

		<form v-else @submit.prevent="OnSaveNewTime" class="mt-1">
			<input
				type="time"
				v-model="newTime"
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
	const EventTime = defineModel("EventTime");

	const newTime = ref();
	const IsEditingTime = ref(false);
	const eventDate = new Date(EventTime.value);

	const { status, execute, refresh } = await useFetch(
		`/api/events/${eventID}?column=date`,
		{
			method: "PATCH",
			body: { value: eventDate },
			immediate: false,
			watch: false,
		}
	);

	const OnSaveNewTime = async () => {
		try {
			const [hours, minutes] = newTime.value.split(":").map(Number);
			eventDate.setHours(hours, minutes);

			await execute();
			ToggleEdit();
			EventTime.value = eventDate;
		} catch (err) {
			console.log("Failed to update time", err);
		}
	};

	const ToggleEdit = () => {
		IsEditingTime.value = !IsEditingTime.value;
		if (IsEditingTime.value) {
			// Parse the string into a Date object
			convertTimeToHHMM();
		}
	};

	const convertTimeToHHMM = () => {
		// Extract and format time as HH:MM
		const hours = eventDate.getHours().toString().padStart(2, "0");
		const minutes = eventDate.getMinutes().toString().padStart(2, "0");
		newTime.value = `${hours}:${minutes}`;
	};

	// Computed Property for Formatted Time
	const formattedTime = computed(() =>
		new Date(EventTime.value).toLocaleTimeString([], {
			hour: "2-digit",
			minute: "2-digit",
		})
	);
</script>
