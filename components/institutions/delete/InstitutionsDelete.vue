<template>
	<div>
		<button
			type="button"
			data-bs-toggle="modal"
			data-bs-target="#deleteInstitution"
			class="btn btn-sm btn-outline-danger">
			Delete
		</button>

		<div
			class="modal fade"
			id="deleteInstitution"
			tabindex="-1"
			aria-labelledby="deleteInstitutionModal"
			aria-hidden="true"
			ref="deleteInstitutionModalRef">
			<div class="modal-dialog modal-dialog-centered">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title fw-bold">
							Remove Institution
						</h5>
						<button
							type="button"
							class="btn-close"
							data-bs-dismiss="modal"
							aria-label="Close" />
					</div>

					<div class="modal-body">
						<p class="text-secondary">
							This action cannot be undone. Are you sure to
							delete this institution?
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
							@click="OnDeleteInstitution">
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
	const institutionID = useRoute().params.institutionID;
	const deleteInstitutionModalRef = ref(null);
	let deleteInstitutionModal;

	const { status, error, execute } = await useFetch(
		`/api/institutions/${institutionID}`,
		{
			headers: useRequestHeaders(["cookie"]),
			method: "DELETE",
			immediate: false,
			watch: false,
		}
	);

	const OnDeleteInstitution = async () => {
		try {
			await execute();
			if (status.value == "success") {
				closeDeleteModal();
				navigateTo("/admin/institutions");
			}
		} catch {
			console.log("Failed deleting participant", error.message);
		}
	};

	const closeDeleteModal = () => {
		if (deleteInstitutionModal) {
			deleteInstitutionModal.hide();
		}
	};

	onMounted(() => {
		if (deleteInstitutionModalRef.value) {
			deleteInstitutionModal = new bootstrap.Modal(
				deleteInstitutionModalRef.value
			);
		}
	});
</script>

<style></style>
