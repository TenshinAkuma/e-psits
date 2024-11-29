<template>
	<div class="container-sm">
		<h3 class="fw-bold">Create an event</h3>
		<hr />

		<form @submit.prevent="AddEvent" class="row">
			<!-- TITLE -->
			<div class="col-12 mb-3">
				<label for="event_title" class="fw-bold mb-1">Title</label>
				<input
					type="text"
					class="form-control"
					id="event_title"
					v-model="title" />
			</div>

			<!-- CATEGORY -->
			<div class="col-6 mb-3">
				<label for="event-category" class="fw-bold mb-1"
					>Category</label
				>
				<select
					class="form-select"
					name="event-category"
					id="event-category"
					v-model="category">
					<option selected disabled value="">
						Select event category
					</option>
					<option
						v-for="(category, index) in event_categories"
						:key="index"
						:value="category">
						{{ category }}
					</option>
				</select>
			</div>

			<!-- MODALITY -->
			<div class="col-6 mb-3">
				<label for="event-modality" class="fw-bold mb-1"
					>Modality</label
				>
				<select
					class="form-select"
					name="event-modality"
					id="event-category"
					v-model="modality">
					<option selected disabled hidden value="">
						Select event modality
					</option>
					<option
						v-for="(modality, index) in event_modalities"
						:key="index"
						:value="modality">
						{{ modality }}
					</option>
				</select>
			</div>

			<!-- DESCRIPTION -->
			<div class="col-12 mb-3">
				<label for="event-description" class="fw-bold mb-1"
					>Description</label
				>
				<textarea
					v-model="description"
					name="description"
					class="form-control"
					rows="3"
					style="resize: none"
					id="event-description"
					wrap="hard" />
			</div>

			<!-- EVENT DATE -->
			<div class="col-6 mb-3">
				<label for="event-date" class="fw-bold mb-1">Date</label>
				<input
					type="date"
					class="form-control"
					id="event-date"
					v-model="date" />
			</div>

			<!-- EVENT TIME -->
			<div class="col-6 mb-3">
				<label for="event-time" class="fw-bold mb-1">Time</label>
				<input type="time" class="form-control" v-model="time" />
			</div>

			<!-- REGISTRATION PERIOD -->
			<div class="col-12 mb-3">
				<label class="fw-bold mb-1">Registration period</label>
				<div class="hstack align-items-center text-secondary gap-2">
					<input
						type="date"
						class="form-control"
						v-model="registration_start" />
					<div>
						<Icon
							name="material-symbols:arrow-right-alt-rounded"></Icon>
					</div>
					<input
						type="date"
						class="form-control"
						v-model="registration_end" />
				</div>
			</div>

			<!-- VENUE -->
			<div class="col-4 mb-5">
				<label for="event-location" class="fw-bold mb-1"
					>Venue</label
				>
				<div class="input-group">
					<input
						type="text"
						class="form-control"
						id="event-location"
						v-model="venue" />
				</div>
			</div>

			<!-- ADDRESS -->
			<div class="col-8 mb-5">
				<label for="event-location" class="fw-bold mb-1"
					>Address</label
				>
				<div class="input-group">
					<input
						type="text"
						class="form-control"
						id="event-location"
						v-model="address" />
				</div>
			</div>
			<div class="col-12 d-flex justify-content-end gap-2">
				<NuxtLink
					to="/admin/events"
					class="btn btn-outline-primary d-flex align-items-center gap-2 px-5">
					<Icon name="material-symbols:close-rounded" />
					Cancel
				</NuxtLink>

				<button
					v-if="loading"
					class="btn btn-primary d-flex align-items-center gap-2 px-5"
					type="button"
					disabled>
					<span
						class="spinner-grow spinner-grow-sm"
						aria-hidden="true"></span>
					<span role="status">Saving...</span>
				</button>

				<button
					v-else
					type="submit"
					class="btn btn-primary d-flex align-items-center gap-2 px-5">
					<Icon name="material-symbols:add-rounded" />
					Create
				</button>
			</div>
		</form>
	</div>
</template>

<script setup>
	definePageMeta({
		layout: "main",
	});

	const title = ref("");
	const description = ref("");
	const category = ref("");
	const modality = ref("");
	const time = ref();
	const date = ref();
	const venue = ref("");
	const address = ref("");
	const registration_start = ref();
	const registration_end = ref();

	const { PostEvent, loading, isSuccess, eventId } = useCreateEvent();

	const AddEvent = async () => {
		const eventDetails = {
			title: title.value,
			description: description.value,
			category: category.value,
			modality: modality.value,
			time: date.value,
			date: date.value,
			venue: venue.value,
			address: address.value,
			registration_start: registration_start.value,
			registration_end: registration_end.value,
		};

		// this method this to be await to wait for the promise to return to get the
		await PostEvent(eventDetails);
		if (isSuccess) {
			await navigateTo(`/admin/events/${eventId.value}`);
		}
	};
	const event_categories = [
		"Competition",
		"Workshop",
		"Career fair",
		"Keynote speech",
	];

	const event_modalities = ["Face-to-face", "Virtual"];
</script>
