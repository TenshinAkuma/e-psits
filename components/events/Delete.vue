<template>
	<Dialog
		:dialogId="`delete-event-${eventId}`"
		:dialogTitle="`Delete ${eventData.title}`"
		openButtonStyle="btn-danger hstack gap-3">
		<template #ButtonLabel>
			<i class="bi bi-trash" /> Delete this event
		</template>

		<div
			class="modal fade"
			id="deleteEvent"
			tabindex="-1"
			aria-labelledby="deleteEventModal"
			aria-hidden="true"
			ref="deleteEventRef">
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
							@click="DeleteEvent">
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
	</Dialog>
</template>

<script setup>
	let deleteEventRef = ref(null);

	const props = ({
		event: {
			type: Object,
			required: true,
		}
	})

	const eventData = toRef(props, "event")
	const eventId = useRoute().params.eventId;
	const isLoading = ref(false);
	const errMsg = ref("");

	async function DeleteEvent() {
		isLoading.value = true;
		const { error } = await $fetch(`/api/events/${eventId}`, {
			method: "DELETE",
		});

		if (error) {
			errMsg.value = error;
			setTimeout(() => {
				errMsg.value = "";
			}, 3000);
		}

		isLoading.value = false;
		navigateTo(`/admin/events`);
		deleteEventRef.value?.closeDialog();
	}
</script>

<style></style>
