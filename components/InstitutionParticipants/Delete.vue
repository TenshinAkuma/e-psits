<template>
	<Dialog
		:dialogId="`delete-participant-event-${ParticipantData.id}`"
		:dialogTitle="`Delete ${ParticipantData.first_name}'s data'.`"
		openButtonStyle="btn-sm"
		ref="deleteInstitutionParticipantRef">
		<template #ButtonLabel>
			<i class="bi bi-trash-fill fs-7 text-secondary" />
		</template>

		<template #Body>
			<p>This action cannot be undone.</p>
		</template>
		<template #Submit>
			<button
				class="btn btn-danger hstack gap-3"
				:disabled="isLoading"
				@click="DeleteInstitutionParticipant()">
				<span
					v-if="isLoading"
					class="spinner-border spinner-border-sm"
					aria-hidden="true"></span>
				<i v-else class="bi bi-trash-fill"></i>
				<span role="status">Confirm delete</span>
			</button>
		</template>
	</Dialog>
</template>

<script setup>
	let deleteInstitutionParticipantRef = ref(null);

	const props = defineProps({
		institution: {
			type: Object,
			required: true,
		},
	});

	const emit = defineEmits(["onDelete"]);

	const ParticipantData = toRef(props, "institution");
	const isLoading = ref(false);
	const errorMessage = ref("");

	const DeleteInstitutionParticipant = async () => {
		isLoading.value = true;
		const { error } = await $fetch(
			`/api/institution-participants/${ParticipantData.value?.id}`,
			{
				method: "DELETE",
			}
		);

		if (error) {
			console.error(error.message);
			errorMessage.value = error.message;
			setTimeout(() => {
				errorMessage.value = "";
			}, 3000);
		}

		emit("onDelete");
      isLoading.value = false;
		deleteInstitutionParticipantRef.value?.closeDialog();
	};
</script>
