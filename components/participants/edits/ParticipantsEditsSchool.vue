<template>
	<div class="fs-7">
		<div class="d-flex justify-content-between">
			<div class="text-secondary">School</div>
			<button
				type="button"
				class="btn btn-sm d-flex align-items-center text-secondary"
				@click="ToggleEdit">
				<Icon name="material-symbols:edit-outline-rounded" />
			</button>
		</div>

		<p v-if="!isEditing" class="fw-bold lh-sm">
			{{ participant?.institutions?.name || "No available data." }}
		</p>

		<form
			v-else
			@submit.prevent="OnSaveParticipantEdit"
			class="mt-1 mb-3">
			<select
				class="form-select border-secondary mb-3"
				v-model="participantEdit.institution_id">
				<option
					v-for="institution in institutionOptions"
					:key="institution.id"
					:value="institution.id">
					{{ institution.name }}
				</option>
			</select>
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
	const participantId = useRoute().params.participantId;
	const errorMessage = ref("");
	const isEditing = ref(false);

	const participantEdit = ref({
		institution_id: participant.value?.institution_id,
	});

	const {
		data: _participantData,
		status: _participantStatus,
		execute: SaveParticipantEdit,
	} = await useFetch(`/api/participants/${participantId}`, {
		method: "PATCH",
		body: participantEdit,
		immediate: false,
		watch: false,
	});

	const { data: institutionOptions } = await useFetch(
		`/api/institutions/options`,
		{
			method: "GET",
		}
	);

	const OnSaveParticipantEdit = async () => {
		try {
			await SaveParticipantEdit();

			if (_participantData.value?.error) {
				throw new Error(
					"Error while updating participant institution."
				);
			}

			console.log(_participantData.value?.data);
			participant.value = _participantData.value?.data;
			ToggleEdit();
		} catch (err) {
			console.error(err.message);

			errorMessage.value = err.message;
			setTimeout(() => {
				errorMessage.value = "";
			}, 3000);
		}
	};

	const ToggleEdit = () => {
		isEditing.value = !isEditing.value;
	};
</script>

<style></style>
