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
					<form id="createEvent">...</form>
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
</script>
