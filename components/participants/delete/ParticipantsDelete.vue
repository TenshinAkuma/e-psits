<template>
	<div>
		<button
			type="button"
			data-bs-toggle="modal"
			data-bs-target="#deleteParticipant"
			class="btn btn-sm btn-outline-danger">
			Remove
		</button>

		<div
			class="modal fade"
			id="deleteParticipant"
			tabindex="-1"
			aria-labelledby="deleteParticipantModal"
			aria-hidden="true"
			ref="deleteParticipantModalRef">
			<div class="modal-dialog modal-dialog-centered">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title fw-bold">
							REMOVE PARTICIPANT
						</h5>
						<button
							type="button"
							class="btn-close"
							data-bs-dismiss="modal"
							aria-label="Close"></button>
					</div>

					<div class="modal-body">
						<p class="text-secondary">
							This will permanently remove participant from
							the database.
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
							@click="OnDeleteParticipant">
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
	const participantID = useRoute().params.participantID;
	const deleteParticipantModalRef = ref(null);
	let deleteParticipantModal;

	const { status, error, execute } = await useFetch(
		`/api/participants/${participantID}`,
		{
			headers: useRequestHeaders(["cookie"]),
			method: "DELETE",
			immediate: false,
			watch: false,
		}
	);

	const OnDeleteParticipant = async () => {
		try {
			await execute();
			if (status.value == "success") {
				closeDeleteModal();
				navigateTo("/admin/participants");
			}
		} catch {
			console.log("Failed deleting participant", error.message);
		}
	};

	const closeDeleteModal = () => {
		if (deleteParticipantModal) {
			deleteParticipantModal.hide();
		}
	};

	onMounted(() => {
		if (deleteParticipantModalRef.value) {
			deleteParticipantModal = new bootstrap.Modal(
				deleteParticipantModalRef.value
			);
		}
	});
</script>

<style></style>
