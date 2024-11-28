<template>
	<div
		class="modal fade"
		id="createEventModal"
		data-bs-backdrop="static"
		data-bs-keyboard="false"
		tabindex="-1"
		aria-labelledby="staticBackdropLabel"
		aria-hidden="true"
		ref="createEventModalRef">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h1 class="modal-title fs-5" id="staticBackdropLabel">
						Create event
					</h1>
					<button
						type="button"
						class="btn-close"
						data-bs-dismiss="modal"
						aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<form id="createEvent" class="row">
						<!-- TITLE -->
						<div class="col-12 mb-3">
							<label for="event_title" class="fw-bold mb-1"
								>Title</label
							>
							<input
								type="text"
								class="form-control"
								id="event_title"
								v-model="title" />
						</div>

						<!-- CATEGORY -->
						<div class="col-6 mb-3">
							<label
								for="event-category"
								class="fw-bold mb-1"
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
									v-for="(
										category, index
									) in event_categories"
									:key="index"
									:value="category">
									{{ category }}
								</option>
							</select>
						</div>

						<!-- MODALITY -->
						<div class="col-6 mb-3">
							<label
								for="event-modality"
								class="fw-bold mb-1"
								>Modality</label
							>
							<select
								class="form-select"
								name="event-modality"
								id="event-category"
								v-model="modality">
								<option selected disabled value="">
									Select event modality
								</option>
								<option
									v-for="(
										modality, index
									) in event_modalities"
									:key="index"
									:value="modality">
									{{ modality }}
								</option>
							</select>
						</div>

						<!-- DESCRIPTION -->
						<div class="col-12 mb-3">
							<label
								for="event-description"
								class="fw-bold mb-1"
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
							<label for="event-date" class="fw-bold mb-1"
								>Date</label
							>
							<input
								type="date"
								class="form-control"
								id="event-date"
								v-model="date" />
						</div>

						<!-- EVENT TIME -->
						<div class="col-6 mb-3">
							<label for="event-time" class="fw-bold mb-1"
								>Time</label
							>
							<input
								type="time"
								class="form-control"
								v-model="time" />
						</div>

						<!-- REGISTRATION PERIOD -->
						<div class="col-12 mb-3">
							<label class="fw-bold mb-1"
								>Registration period</label
							>
							<div
								class="hstack align-items-center text-secondary gap-2">
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
							<label
								for="event-location"
								class="fw-bold mb-1"
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
							<label
								for="event-location"
								class="fw-bold mb-1"
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
					</form>
				</div>
				<div class="modal-footer">
					<button
						data-bs-dismiss="modal"
						class="btn btn-outline-primary d-flex align-items-center gap-2 px-5">
						<Icon name="material-symbols:close-rounded" />
						Cancel
					</button>

					<button
						type="button"
						@click="closeModal"
						class="btn btn-primary d-flex align-items-center gap-2 px-5">
						<Icon name="material-symbols:add-rounded" />
						Create
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	const createEventModalRef = ref(null);
	let exampleModalInstance;

	onMounted(() => {
		// Access the global `bootstrap` object to initialize the Modal
		if (createEventModalRef.value) {
			exampleModalInstance = new bootstrap.Modal(
				createEventModalRef.value
			);
		}
	});

	const closeModal = () => {
		if (exampleModalInstance) {
			exampleModalInstance.hide();
		}
	};
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
</script>
