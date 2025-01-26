<template>
	<div>
		<h1 class="fw-bold">{{ EventDetails.title }}</h1>
		<br />
		<ul class="nav nav-tabs">
			<li class="nav-item">
				<NuxtLink
					class="nav-link active"
					aria-current="page"
					href="#"
					>Details</NuxtLink
				>
			</li>
			<li class="nav-item">
				<NuxtLink class="nav-link" to="/admin/events"
					>Events</NuxtLink
				>
			</li>
			<li class="nav-item">
				<a class="nav-link" href="#">Link</a>
			</li>
		</ul>

		<form @submit.prevent="OnSaveEventEdit" style="max-width: 768px" class="mx-auto">
			<br />

			<h4 class="fw-bold">Edit Event Details</h4>
			<br />
			<dl class="row g-2">
				<dt class="col-sm-3">Title</dt>
				<dd class="col-sm-9">
					<input
						type="text"
						class="form-control bg-secondary bg-opacity-10"
						placeholder="Enter event title"
						v-model="EventEdit.title"
						required />
				</dd>

				<dt class="col-sm-3">Schedule</dt>
				<dd class="col-sm-9">
					<div class="d-flex gap-2">
						<input
							type="date"
							class="form-control bg-secondary bg-opacity-10"
							v-model="dateInput"
							required />
						<input
							type="time"
							class="form-control bg-secondary bg-opacity-10"
							v-model="timeInput"
							required />
					</div>
				</dd>

				<dt class="col-sm-3">Registration period</dt>
				<dd class="col-sm-9">
					<div class="d-flex gap-3 align-items-center">
						<input
							type="date"
							class="form-control bg-secondary bg-opacity-10"
							v-model="EventEdit.registration_start"
							required />
						<i class="bi bi-arrow-right border-0" />
						<input
							type="date"
							class="form-control bg-secondary bg-opacity-10"
							v-model="EventEdit.registration_end"
							required />
					</div>
				</dd>

				<dt class="col-sm-3">Category</dt>
				<dd class="col-sm-9">
					<select
						class="form-select bg-secondary bg-opacity-10"
						v-model="EventEdit.category"
						required>
						<option
							v-for="(category, index) in EventCategories"
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
						v-model="EventEdit.link" />
				</dd>

				<dt class="col-sm-3">Description</dt>
				<dd class="col-sm-9">
					<textarea
						rows="7"
						class="form-control bg-secondary bg-opacity-10 lh-sm"
						style="max-height: 214px; resize: vertical"
						v-model="EventEdit.description" />
				</dd>
			</dl>
			<br />
			<br />
			<div class="d-flex gap-2">
				<NuxtLink :to="`/admin/events/${eventId}v2`" class="btn"
					>Cancel</NuxtLink
				>
				<button
					type="submit"
					class="d-flex align-items-center btn btn-success gap-3 px-3"
					:disabled="_eventEditStatus === 'pending'">
					<span
						v-if="isLoading"
						class="spinner-border spinner-border-sm"
						aria-hidden="true"></span>
					<i v-else class="bi bi-floppy2-fill"></i>
					<span role="status">Save edit</span>
				</button>
			</div>
		</form>
	</div>
</template>

<script setup>
	definePageMeta({
		layout: "main",
	});

	const eventId = useRoute().params.eventId;
	const EventDetails = useEventDetails();
	const { EventCategories, EventTypes } = useInputOptions();
	const errorMessage = ref("");
	const isLoading = ref(false);

	const LoadData = async () => {
		try {
			isLoading.value = true;
			const { data, error, success } = await $fetch(
				`/api/events/${eventId}`,
				{ method: "GET" }
			);

			if (error) {
				throw new Error(error);
			}

			EventDetails.value = data;
		} catch (err) {
			console.error(err.message);

			errorMessage.value = "Error while loading event details.";
			setTimeout(() => {
				errorMessage.value = "";
			}, 3000);
		} finally {
			isLoading.value = false;
		}
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

	const {
		data: _eventData,
		status: _eventEditStatus,
		execute: SaveEventEdit,
	} = await useFetch(`/api/events/${eventId}`, {
		method: "PATCH",
		body: EventEdit,
		immediate: false,
		watch: false,
	});

	const OnSaveEventEdit = async () => {
		isLoading.value = true;
		try {
			await SaveEventEdit();

			if (_eventData.value?.error) {
				throw new Error(_eventData.value?.error);
			}

			navigateTo(`/admin/events/${eventId}v2`);
		} catch {
			console.error(err.message);

			errorMessage.value = "Error while updating event details.";
			setTimeout(() => {
				errorMessage.value = "";
			}, 3000);
		} finally {
			isLoading.value = false;
		}
	};
</script>

<style scoped>
	.nav-link {
		color: #424242;
	}
	.nav-link.active {
		color: #242424 !important;
		font-weight: bold;
	}
</style>
