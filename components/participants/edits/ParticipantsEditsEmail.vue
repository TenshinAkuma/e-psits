<template>
	<div class="fs-7">
		<div class="d-flex justify-content-between">
			<div class="text-secondary">Email</div>
			<button
				type="button"
				class="btn btn-sm d-flex align-items-center text-secondary"
				@click="ToggleEdit">
				<Icon name="material-symbols:edit-outline-rounded" />
			</button>
		</div>

		<p v-if="!isEditing" class="fw-bold lh-sm">
			{{ participant.email || "No data available." }}
		</p>

		<form v-else @submit.prevent="OnSaveParticipantEdit" class="mt-1 mb-3">
			<input
				type="text"
				v-model="participantEdit.email"
				class="form-control border-secondary p-2 mb-3 w-100" />

			<div class="d-flex justify-content-end gap-2">
				<button
					type="button"
					class="btn"
					@click="ToggleEdit">
					Cancel
				</button>
				<button
					type="submit"
					class="d-flex align-items-center btn btn-success fw-bold gap-2"
					style="height: min-content"
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
</template>

<script setup>
	const participant = useParticipantDetails();
	const participantId = useRoute().params.participantId
	const errorMessage = ref("")
	const isEditing = ref(false);

	const participantEdit = ref({
		email: participant.value?.email,
	});

	const { data: _participantData, status: _participantStatus, execute: SaveParticipantEdit } = await useFetch(
		`/api/participants/${participantId}`,
		{
			method: "PATCH",
			body: participantEdit,
			immediate: false,
			watch: false,
		}
	);

	const OnSaveParticipantEdit = async () => {
		try {
			await SaveParticipantEdit();
			if (_participantData.value?.error) {
				throw new Error("Error while updating participant email.")
			}

			participant.value = _participantData.value?.data
			ToggleEdit()
		} catch (err) {
			console.error(err.message)

			errorMessage.value = err.message
			setTimeout(() => {
				errorMessage.value = ''
			}, 3000)
		}
	};

	const ToggleEdit = () => {
		isEditing.value = !isEditing.value;
	};
</script>

<style></style>
