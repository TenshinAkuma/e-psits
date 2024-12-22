<template>
	<div>
		<button
			class="btn btn-outline-dark"
			id="createCriteriaBtn"
			data-bs-toggle="modal"
			data-bs-target="#createCriteria">
			Add criteria
		</button>
		<div
			class="modal"
			id="createCriteria"
			data-bs-backdrop="static"
			data-bs-keyboard="false"
			tabindex="-1"
			aria-labelledby="createCriteriaBtn"
			aria-hidden="true"
			ref="createCriteriaRef">
			<div class="modal-dialog modal-dialog-centered">
				<div class="modal-content">
					<div class="modal-header">
						<h5
							class="modal-title fw-bold"
							id="staticBackdropLabel">
							ADD NEW CRITERIA
						</h5>
						<button
							type="button"
							class="btn-close"
							data-bs-dismiss="modal"
							aria-label="Close"></button>
					</div>

					<div class="modal-body">
						<form id="createCriteria">
							<input
								type="text"
								class="form-control border-secondary mb-3"
								placeholder="Name"
								required />

							<textarea
								class="form-control border-secondary mb-5"
								placeholder="Description"
								rows="3"
								style="
									resize: vertical;
									max-height: 216px;
								"></textarea>
						</form>
					</div>

					<div class="modal-footer">
						<button
							type="button"
							data-bs-dismiss="modal"
							class="btn btn-outline-secondary border-0">
							Cancel
						</button>
						<button
							type="submit"
							form="createCriteria"
							class="d-flex align-items-center btn btn-primary gap-2"
							:disabled="status === 'pending'">
							<span
								v-if="status === 'pending'"
								class="spinner-border spinner-border-sm"
								aria-hidden="true" />
							<span role="status">Add criteria</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	const createCriteriaRef = ref(null);
	let createCriteria;

	const closeModal = () => {
		if (createCriteria) {
			createCriteria.hide();
		}
	};

	onMounted(() => {
		// Access the global `bootstrap` object to initialize the Modal
		if (createCriteriaRef.value) {
			createCriteria = new bootstrap.Modal(createCriteriaRef.value);
		}
	});
</script>
