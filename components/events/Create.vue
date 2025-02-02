<template>
	<Dialog
		dialogId="create-event"
		dialogTitle="Add New Event"
		openButtonStyle="btn-primary hstack gap-2"
		ref="createEventRef">
		<template #ButtonLabel>
			<i class="bi bi-plus-lg" /> Add New Event
		</template>

		<template #Body>
			<form @submit.prevent="CreateEvent" id="create-event">
				<input
					type="text"
					placeholder="Event name"
					class="form-control border-secondary mb-3"
					v-model="eventDetails.title" />

				<div class="hstack gap-2 mb-2">
					<div class="w-75">
						<label class="fw-bold">Date</label>
						<input
							type="date"
							class="form-control border-secondary"
							v-model="dateInput" />
					</div>
					<div class="w-25">
						<label class="fw-bold">Time</label>
						<input
							type="time"
							class="form-control border-secondary"
							v-model="timeInput" />
					</div>
				</div>
				<p
					style="font-size: 0.75rem"
					class="fst-italic text-secondary">
					This event will start on
					{{ formatDateString(eventDetails.date) }}
				</p>

				<hr />

				<label class="fw-bold mb-2">Attendance type</label>
				<select
					class="form-select border-secondary mb-2"
					v-model="eventDetails.type">
					<option hidden selected disabled value="">
						Choose an event type
					</option>
					<option
						v-for="(type, index) in eventTypes"
						:key="index"
						:value="type">
						{{ type }}
					</option>
				</select>

				<div v-if="eventDetails.type == 'Virtual'" class="mb-3">
					<input
						type="text"
						placeholder="Meeting link"
						class="form-control border-secondary mb-2"
						v-model="eventDetails.link" />
					<p
						style="font-size: 0.75rem"
						class="fst-italic text-secondary">
						This event will be held on a virtual meeting
						platform.
					</p>
				</div>

				<div v-else class="mb-3">
					<input
						type="text"
						placeholder="Venue"
						class="form-control border-secondary mb-2"
						v-model="eventDetails.venue" />
					<input
						type="text"
						placeholder="Address"
						class="form-control border-secondary mb-2"
						v-model="eventDetails.address" />
					<p
						style="font-size: 0.75rem"
						class="fst-italic text-secondary">
						{{`This event will be held at ${eventDetails.venue}, ${eventDetails.address}.`}}
					</p>
				</div>

				<select
					class="form-select border-secondary mb-3"
					v-model="eventDetails.category">
					<option value="" hidden selected>
						Choose category
					</option>
					<option
						v-for="(category, index) in EventCategories"
						:key="index"
						:value="category">
						{{ category }}
					</option>
				</select>

				<textarea
					class="form-control border-secondary mb-3"
					placeholder="Description"
					rows="5"
					style="max-height: 288px; resize: vertical"
					v-model="eventDetails.description" />
			</form>
			<p class="fs-7 text-danger text-center m-0">
				{{ errorMessage }}
			</p>
		</template>

		<template #Submit>
			<button
				type="submit"
				form="create-event"
				class="d-flex align-items-center btn btn-primary gap-2"
				:disabled="isLoading">
				<span
					v-if="isLoading"
					class="spinner-border spinner-border-sm"
					aria-hidden="true" />
				<span role="status">Create event</span>
			</button>
		</template>
	</Dialog>
</template>

<script setup>
	let createEventRef = ref(null);
	const isLoading = ref(false);
	const errorMessage = ref("");
	const { EventCategories } = useInputOptions();

	const eventDetails = ref({
		title: "",
		date: new Date().toISOString(),
		type: "",
		link: "",
		venue: "",
		address: "",
		category: "",
		description: "",
	});

	const dateInput = ref(new Date().toISOString().split("T")[0]);
	const timeInput = ref(new Date().toTimeString().slice(0, 5));

	const eventTypes = ["Face-to-face", "Virtual"];

	async function CreateEvent() {
		isLoading.value = true;
		const { data, error } = await $fetch(`/api/events`, {
			method: "POST",
			body: eventDetails.value,
		});

		if (error) {
			console.log("Error loading events: ", error);

			errorMessage.value = error;
			setTimeout(() => {
				errorMessage.value = "";
			}, 3000);
		}

		isLoading.value = false;
		navigateTo(`/admin/events/${data.id}v2`);
		createEventRef.value?.closeDialog();
	}

	// Watchers to sync changes to dateInput and timeInput with eventDetails.date
	watch([dateInput, timeInput], ([newDate, newTime]) => {
		if (!newDate || !newTime) return;

		const updatedDate = new Date(newDate); // Parse date input
		const [hours, minutes] = newTime.split(":").map(Number); // Parse time input
		updatedDate.setHours(hours, minutes);

		// Update eventDetails.date in ISO format
		eventDetails.date = updatedDate;
	});
</script>
