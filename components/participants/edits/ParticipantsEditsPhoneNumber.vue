<template>
	<div>
		<div class="d-flex justify-content-between">
			<div class="fw-bold text-secondary">Phone number</div>
			<button
				type="button"
				class="btn btn-sm d-flex align-items-center text-secondary"
				@click="ToggleEdit">
				<Icon name="material-symbols:edit-outline-rounded" />
			</button>
		</div>

		<p v-if="!isEditing" class="text-dark">
			{{ ParticipantPhoneNumber }}
		</p>

		<form v-else @submit.prevent="OnSaveNewPhoneNumber" class="mt-1">
			<input
				type="text"
				v-model="participant.phone_number"
				class="form-control border-secondary p-2 mb-3 w-100" />
			<div class="d-flex justify-content-end gap-2">
				<button
					type="submit"
					class="d-flex align-items-center btn btn-sm btn-success fw-bold gap-2"
					style="height: min-content"
					:disabled="status === 'pending'">
					<span
						v-if="status === 'pending'"
						class="spinner-border spinner-border-sm"
						aria-hidden="true" />
					<span role="status">Save</span>
				</button>
				<button
					type="button"
					class="btn btn-sm btn-outline-secondary"
					@click="ToggleEdit">
					Cancel
				</button>
			</div>
		</form>
	</div>
</template>

<script setup>
	const participantID = useRoute().params.participantID;
	const ParticipantPhoneNumber = defineModel("ParticipantPhoneNumber");

	const isEditing = ref(false);

	const participant = ref({
		phone_number: ParticipantPhoneNumber.value,
	});

	const { status, error, execute } = await useFetch(
		`/api/participants/${participantID}`,
		{
			method: "PATCH",
			body: participant,
			immediate: false,
			watch: false,
		}
	);

	const OnSaveNewPhoneNumber = async () => {
		try {
			await execute();
			if (status.value == "success") {
				ToggleEdit();
				ParticipantPhoneNumber.value =
					participant.value.phone_number;
			}
		} catch {
			console.log(error);
		}
	};

	const ToggleEdit = () => {
		isEditing.value = !isEditing.value;
	};
</script>

<style></style>
