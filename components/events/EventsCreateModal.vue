<template>
	<div
		class="modal fade"
		id="createEventModal"
		data-bs-backdrop="static"
		data-bs-keyboard="false"
		tabindex="-1"
		aria-labelledby="createEventModal"
		aria-hidden="true"
		ref="createEventModalRef">
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header">
					<h5
						class="modal-title fw-bold"
						id="staticBackdropLabel">
						ADD NEW EVENT
					</h5>
					<button
						type="button"
						class="btn-close"
						data-bs-dismiss="modal"
						aria-label="Close"></button>
				</div>

				<div class="modal-body">
					<form id="createEvent">
						<input
							type="text"
							placeholder="Event name"
							class="form-control mb-3" />

						<div class="d-flex gap-2 mb-2">
							<div class="w-100">
								<label
									class="text-secondary"
									for="eventDate"
									>Date</label
								>
								<input
									type="date"
									class="form-control"
									id="eventDate"
									v-model="dateInput" />
							</div>
							<div>
								<label
									class="text-secondary"
									for="eventTime"
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
							{{ formatDate(dateInput) }} at
							{{ timeInput }}
						</p>

						<select class="form-select mb-3" v-model="type">
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
							v-if="type == 'Virtual'"
							type="text"
							placeholder="Meeting link"
							class="form-control mb-3" />

						<div v-else>
							<input
								type="text"
								placeholder="Venue"
								class="form-control mb-3" />

							<input
								type="text"
								placeholder="Address"
								class="form-control mb-3" />
						</div>

						<select class="form-select mb-3">
							<option value="" hidden selected>
								Choose category
							</option>
							<option
								v-for="(
									category, index
								) in eventCategories"
								:key="index"
								:value="category">
								{{ category }}
							</option>
						</select>

						<textarea
							class="form-control mb-3"
							placeholder="Description"
							rows="5"
							style="
								max-height: 288px;
								resize: vertical;
							" />
					</form>
				</div>

				<div class="modal-footer">
					<button
						data-bs-dismiss="modal"
						class="btn btn-outline-secondary border-0">
						Cancel
					</button>
					<button
						type="button"
						@click="closeModal"
						form="createEvent"
						class="btn btn-primary">
						Create
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	const createEventModalRef = ref(null);
	let createEventModal;

	const date = ref(new Date());
	const type = ref("");

	const dateInput = computed(() => {
		return new Date().toISOString().split("T")[0];
	});

	const timeInput = computed(() => {
		const _date = new Date();
		const hours = _date.getHours().toLocaleString().padStart(2, "0");
		const minutes = _date.getMinutes().toString().padStart(2, "0");
		return `${hours}:${minutes}`;
	});

	onMounted(() => {
		// Access the global `bootstrap` object to initialize the Modal
		if (createEventModalRef.value) {
			createEventModal = new bootstrap.Modal(
				createEventModalRef.value
			);
		}
	});

	const closeModal = () => {
		if (createEventModal) {
			createEventModal.hide();
		}
	};

	const eventCategories = [
		"Competition",
		"Workshop",
		"Career fair",
		"Keynote speech",
	];

	const eventTypes = ["Face-to-face", "Virtual"];
</script>
