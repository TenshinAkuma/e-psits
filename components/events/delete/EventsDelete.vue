<template>
	<div>
		<button
			type="button"
			data-bs-toggle="modal"
			data-bs-target="#deleteEvent"
			class="btn btn-outline-danger">
			Remove
		</button>

		<div
			class="modal fade"
			id="deleteEvent"
			tabindex="-1"
			aria-labelledby="deleteEventModal"
			aria-hidden="true"
			ref="deleteEventModalRef">
			<div class="modal-dialog modal-dialog-centered">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title fw-bold">DELETE EVENT</h5>
						<button
							type="button"
							class="btn-close"
							data-bs-dismiss="modal"
							aria-label="Close"></button>
					</div>

					<div class="modal-body">
						<p class="text-secondary">
							This will permanently delete this event.
						</p>
					</div>

					<div class="modal-footer">
						<button
							class="btn btn-outline-secondary border-0"
							@click="closeDeleteModal">
							Cancel
						</button>
						<button
							type="button"
							class="btn btn-danger d-flex align-items-center gap-2"
							:disabled="status === 'pending'"
							@click="OnDeleteEvent">
							<span
								v-if="status === 'pending'"
								class="spinner-border spinner-border-sm"
								aria-hidden="true" />
							<span role="status">Delete</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	const eventID = useRoute().params.eventID;
	const deleteEventModalRef = ref(null);
	let deleteEventModal;

	const { status, error, execute } = await useFetch(
		`/api/events/${eventID}`,
		{
			headers: useRequestHeaders(["cookie"]),
			method: "DELETE",
			immediate: false,
			watch: false,
		}
	);

	const OnDeleteEvent = async () => {
		try {
			await execute();
			if (status.value == "success") {
				closeDeleteModal();
				navigateTo("/admin/events");
			}
		} catch {
			console.log("Failed deleting event", error.message);
		}
	};

	const closeDeleteModal = () => {
		if (deleteEventModal) {
			deleteEventModal.hide();
		}
	};

	onMounted(() => {
		if (deleteEventModalRef.value) {
			deleteEventModal = new bootstrap.Modal(
				deleteEventModalRef.value
			);
		}
	});
</script>

<style></style>
