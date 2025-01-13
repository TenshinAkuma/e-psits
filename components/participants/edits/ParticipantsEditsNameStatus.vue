<template>
	<div class="w-100">
		<div>
			<div
				v-if="!isEditing"
				class="d-flex justify-content-center align-items-start gap-2">
				<h2 class="fw-bold mb-0">
					{{ `${participant.first_name} ${participant.last_name}` }}
				</h2>

				<button
					type="button"
					class="btn btn-sm d-flex align-items-center text-secondary"
					@click="ToggleEdit">
					<Icon name="material-symbols:edit-outline-rounded" />
				</button>
			</div>

			<form
				v-else
				@submit.prevent="OnSaveParticipantEdit"
				id="editNameStatusForm"
				class="mb-2">
				<input
					type="text"
					class="form-control border-secondary w-100 p-2 mb-2 fw-bold"
					placeholder="First name"
					v-model="newParticipant.first_name" />
					<input
					type="text"
					class="form-control border-secondary w-100 p-2 mb-3 fw-bold"
					placeholder="Last name"
					v-model="newParticipant.last_name" />

				<div class="d-flex justify-content-end gap-2">
					<button
						type="button"	
						class="btn"
						@click="ToggleEdit">
						Cancel
					</button>
					<button
					form="editNameStatusForm"
						type="submit"
						class="d-flex align-items-center btn btn-success gap-2 px-5"
						:disabled="_participantStatus === 'pending'">
						<span
							v-if="_participantStatus === 'pending'"
							class="spinner-border spinner-border-sm"
							aria-hidden="true" />
						<span role="status">Save</span>
					</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script setup>
	const participantId = useRoute().params.participantId
	const participant = useParticipantDetails()

	const newParticipant = ref({
		first_name: participant.value?.first_name,
		last_name: participant.value?.last_name
	});

	const isEditing = ref(false);

	const { data: _participantData, status: _participantStatus, execute: SaveParticipantEdit } = await useFetch(
		`/api/participants/${participantId}`,
		{
			method: "PATCH",
			body: newParticipant,
			immediate: false,
			watch: false,
		}
	);

	const OnSaveParticipantEdit = async () => {
		try {
			await SaveParticipantEdit();

			if (_participantData.value?.error) {
				throw new Error("Error while updating participants. Please try again")
			}

			participant.value = _participantData.value?.data
			ToggleEdit();
		} catch (err) {
			console.log(err.message);
		}
	};

	const ToggleEdit = () => {
		isEditing.value = !isEditing.value;
	};
</script>

<style></style>
