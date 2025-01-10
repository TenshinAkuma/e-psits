<template>
	<Dialog
		dialogId="createEvent"
		dialogTitle="Add New Event"
		openButtonStyle="btn-primary"
		ref="createEventRef">
		<template #ButtonLabel> New Event </template>
		<template #Body>
			<form @submit.prevent="OnSaveNewEvent" id="createEvent">
				<input
					type="text"
					placeholder="Event name"
					class="form-control mb-3"
					v-model="eventDetails.title" />

				<div class="d-flex gap-2 mb-2">
					<div class="w-100">
						<label class="text-secondary" for="eventDate"
							>Date</label
						>
						<input
							type="date"
							class="form-control"
							id="eventDate"
							v-model="dateInput" />
					</div>
					<div>
						<label class="text-secondary" for="eventTime"
							>Time</label
						>
						<input
							type="time"
							class="form-control w-100"
							id="eventTime"
							v-model="timeInput" />
					</div>
				</div>
				<p
					style="font-size: 0.75rem"
					class="fst-italic text-secondary">
					This event will start on
					{{ formatDateString(eventDetails.date) }}
				</p>
				<select
					class="form-select mb-3"
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

				<input
					v-if="eventDetails.type == 'Virtual'"
					type="text"
					placeholder="Meeting link"
					class="form-control mb-3"
					v-model="eventDetails.link" />

				<div v-else>
					<input
						type="text"
						placeholder="Venue"
						class="form-control mb-3"
						v-model="eventDetails.venue" />

					<input
						type="text"
						placeholder="Address"
						class="form-control mb-3"
						v-model="eventDetails.address" />
				</div>

				<select
					class="form-select mb-3"
					v-model="eventDetails.category">
					<option value="" hidden selected>
						Choose category
					</option>
					<option
						v-for="(category, index) in eventCategories"
						:key="index"
						:value="category">
						{{ category }}
					</option>
				</select>

				<textarea
					class="form-control mb-3"
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
				form="createEvent"
				class="d-flex align-items-center btn btn-primary gap-2"
				:disabled="_eventsStatus === 'pending'">
				<span
					v-if="_eventsStatus === 'pending'"
					class="spinner-border spinner-border-sm"
					aria-hidden="true" />
				<span role="status">Create event</span>
			</button>
		</template>
	</Dialog>
</template>

<script setup>
	const createEventRef = ref(null);
	const events = useEvents();
	const errorMessage = ref("");

	const eventDetails = reactive({
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

	const eventCategories = [
		"Competition",
		"Workshop",
		"Career fair",
		"Keynote speech",
	];

	const eventTypes = ["Face-to-face", "Virtual"];

	const {
		data: _eventsData,
		status: _eventsStatus,
		execute: SaveNewEvent,
	} = await useFetch(`/api/events`, {
		method: "POST",
		body: eventDetails,
		immediate: false,
		watch: false,
	});

	const OnSaveNewEvent = async () => {
		try {
			await SaveNewEvent();
			if (_eventsData.value?.error) {
				throw new Error(_eventsData.value?.error);
			}

			events.value?.push(_eventsData.value?.data);
			navigateTo(`/admin/events/${_eventsData.value?.data.id}`)
			createEventRef.value?.closeDialog();
		} catch (err) {
			console.log("Failed adding new event", err.value);

			errorMessage.value = err.message;
			setTimeout(() => {
				errorMessage.value = "";
			}, 3000);
		}
	};

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
