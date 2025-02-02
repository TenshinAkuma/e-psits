<template>
	<section class="pb-5">
		<article class="d-flex justify-content-between align-items-center">
			<h1 class="fw-bold m-0">{{ EventDetails.title }}</h1>
		</article>

		<br />
		<EventsTabs activeTab="settings" />
		<br />

		<section class="col-lg-8 col-md-12">
			<h4 class="fw-bold">Edit Event Details</h4>
			<hr />

			<form
				:id="`create-event-form-${EventDetails.id}`"
				@submit.prevent="OnSaveEventEdit">
				<dl class="row g-2">
					<dt class="col-sm-3">Title</dt>
					<dd class="col-sm-9">
						<input
							type="text"
							class="form-control bg-secondary bg-opacity-10"
							placeholder="Enter event title"
							v-model="EventEdit.title"
							:disabled="isLoading"
							required />
					</dd>

					<dt class="col-sm-3">Schedule</dt>
					<dd class="col-sm-9">
						<div class="d-flex gap-2">
							<input
								type="date"
								class="form-control bg-secondary bg-opacity-10"
								v-model="dateInput"
								:disabled="isLoading"
								required />
							<input
								type="time"
								class="form-control bg-secondary bg-opacity-10"
								v-model="timeInput"
								:disabled="isLoading"
								required />
						</div>
					</dd>

					<dt class="col-sm-3">Registration period</dt>
					<dd class="col-sm-9">
						<div class="d-flex gap-3 align-items-center">
							<input
								type="date"
								class="form-control bg-secondary bg-opacity-10"
								:disabled="isLoading"
								v-model="EventEdit.registration_start"
								required />
							<i class="bi bi-arrow-right border-0" />
							<input
								type="date"
								:disabled="isLoading"
								class="form-control bg-secondary bg-opacity-10"
								v-model="EventEdit.registration_end"
								required />
						</div>
					</dd>

					<dt class="col-sm-3">Category</dt>
					<dd class="col-sm-9">
						<select
							class="form-select bg-secondary bg-opacity-10"
							:disabled="isLoading"
							v-model="EventEdit.category"
							required>
							<option
								v-for="(
									category, index
								) in EventCategories"
								:key="index"
								:value="category">
								{{ category }}
							</option>
						</select>
					</dd>

					<dt class="col-sm-3">Attendance</dt>
					<dd class="col-sm-9">
						<select
							class="form-select bg-secondary bg-opacity-10"
							:disabled="isLoading"
							v-model="EventEdit.type">
							<option
								v-for="(type, index) in EventTypes"
								:key="index"
								:value="type">
								{{ type }}
							</option>
						</select>
					</dd>

					<dt
						v-if="EventEdit.type.toLowerCase() == 'in-person'"
						class="col-sm-3">
						Location
					</dt>
					<dd
						v-if="EventEdit.type.toLowerCase() == 'in-person'"
						class="col-sm-9">
						<input
							type="text"
							class="form-control bg-secondary bg-opacity-10 mb-2"
							:disabled="isLoading"
							v-model="EventEdit.venue" />
						<input
							type="text"
							class="form-control bg-secondary bg-opacity-10"
							v-model="EventEdit.address" />
					</dd>

					<dt
						v-if="EventEdit.type.toLowerCase() == 'virtual'"
						class="col-sm-3">
						Virtual address
					</dt>
					<dd
						v-if="EventEdit.type.toLowerCase() == 'virtual'"
						class="col-sm-9">
						<input
							type="text"
							class="form-control bg-secondary bg-opacity-10 mb-2"
							:disabled="isLoading"
							v-model="EventEdit.link" />
					</dd>

					<dt class="col-sm-3">Description</dt>
					<dd class="col-sm-9">
						<textarea
							rows="7"
							class="form-control bg-secondary bg-opacity-10 lh-sm"
							style="max-height: 214px; resize: vertical"
							:disabled="isLoading"
							v-model="EventEdit.description" />
					</dd>
				</dl>
				<br />
				<br />
				<button
					type="submit"
					:form="`create-event-form-${EventDetails.id}`"
					class="d-flex align-items-center btn btn-success gap-3 px-3 ms-auto"
					:disabled="isLoading">
					<span
						v-if="isLoading"
						class="spinner-border spinner-border-sm"
						aria-hidden="true"></span>
					<i v-else class="bi bi-floppy2-fill"></i>
					<span role="status">Save edit</span>
				</button>
			</form>

			<br />
			<br />
			<br />
			<article>
				<h4 class="fw-bold">Danger Zone</h4>
				<hr />

				<div
					class="d-flex justify-content-between align-items-center bg-danger bg-opacity-10 border border-danger rounded rounded-3 p-4">
					<p class="m-0">
						<b>Delete this event</b> <br />
						<span
							>Once this event is deleted, it cannot be
							undone.</span
						>
					</p>
					<EventsDelete :event="EventDetails" />
				</div>
			</article>
		</section>
	</section>
</template>

<script setup>
	definePageMeta({
		layout: "main",
	});

	const eventId = useRoute().params.eventId;
	const EventDetails = ref({});
	const { EventCategories, EventTypes } = useInputOptions();
	const errorMessage = ref("");
	const isLoading = ref(false);

	const LoadData = async () => {
		isLoading.value = true;
		const { data, error } = await $fetch(`/api/events/${eventId}`, {
			method: "GET",
		});

		if (error) {
			console.error("Error fetching event: ", error);

			errorMessage.value = "Internal server error. Please try again.";
			setTimeout(() => {
				errorMessage.value = "";
			}, 3000);
		}

		EventDetails.value = data;
		isLoading.value = false;
	};

	await LoadData();

	const dateInput = ref(
		new Date(EventDetails.value?.date).toISOString().split("T")[0]
	);
	const timeInput = ref(
		new Date(EventDetails.value?.date).toTimeString().slice(0, 5)
	);

	const EventEdit = ref({
		title: EventDetails.value?.title,
		description: EventDetails.value?.description,
		category: EventDetails.value?.category,
		date: EventDetails.value?.date,
		type: EventDetails.value?.type,
		link: EventDetails.value?.link,
		venue: EventDetails.value?.venue,
		address: EventDetails.value?.address,
		registration_start: EventDetails.value?.registration_start,
		registration_end: EventDetails.value?.registration_end,
	});

	// Watchers to sync changes to dateInput and timeInput with eventDetails.date
	watch([dateInput, timeInput], ([newDate, newTime]) => {
		if (!newDate || !newTime) return;

		const updatedDate = new Date(newDate); // Parse date input
		const [hours, minutes] = newTime.split(":").map(Number); // Parse time input
		updatedDate.setHours(hours, minutes);

		// Update eventDetails.date in ISO format
		EventEdit.value.date = updatedDate;
	});

	async function OnSaveEventEdit(){
		isLoading.value = true;
		const { error } = await useFetch(`/api/events/${eventId}`, {
			method: "PATCH",
			body: EventEdit.value,
		});

		if (_eventData.value?.error) {
			console.error("Error updating event: ", error);

			errorMessage.value = error;
			setTimeout(() => {
				errorMessage.value = "";
			}, 3000);
		}

		isLoading.value = false;
		await LoadData();
	};
</script>
