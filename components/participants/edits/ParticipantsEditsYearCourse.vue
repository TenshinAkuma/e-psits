<template>
	<div class="fs-7">
		<div class="d-flex justify-content-between">
			<div class="text-secondary">Year level & Course</div>
			<button
				type="button"
				class="btn btn-sm d-flex align-items-center text-secondary"
				@click="ToggleEdit">
				<Icon name="material-symbols:edit-outline-rounded" />
			</button>
		</div>

		<p v-if="!isEditing" class="fw-bold lh-sm">
			{{ participant.year_level || "No data available." }}, {{ participant.course || "No course provided." }}
		</p>

		<form v-else @submit.prevent="OnSaveParticipantEdit" class="mt-1 mb-3">
			<div class="input-group mb-2">
				<span class="input-group-text text-secondary w-25"
					>Year</span
				>
				<input
					type="number"
					max="5"
					min="1"
					class="form-control border-secondary"
					v-model="newParticipant.year_level" />
			</div>
			<div class="input-group mb-3">
				<span class="input-group-text text-secondary w-25"
					>Course</span
				>
				<input
					type="text"
					class="form-control border-secondary"
					v-model="newParticipant.course" />
			</div>

			<p class="fs-7 text-danger">
				{{ errorMessage }}
			</p>
			
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
	const participantId = useRoute().params.participantId;
	const participant = useParticipantDetails();
	const errorMessage = ref("")

	const isEditing = ref(false);

	const newParticipant = ref({
		year_level: participant.value?.year_level,
		course: participant.value?.course,
	});

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
				throw new Error("Error while updating participant course and year level.")
			}

			participant.value = _participantData.value?.data
			ToggleEdit()
		} catch (err) {
			console.log(err.message);

			errorMessage.value = err.message
			setTimeout(() => {
				errorMessage.value = ""
			}, 3000)
		}
	};

	const ToggleEdit = () => {
		isEditing.value = !isEditing.value;
	};
</script>

<style></style>
