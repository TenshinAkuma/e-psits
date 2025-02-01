<template>
	<Dialog
		:dialogId="`delete-participant-event-${registrationData.id}`"
		:dialogTitle="`Delete ${registrationData.participants.first_name}'s registration data.`"
		openButtonStyle="btn-sm"
		ref="deleteParticipantEventRef">
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
				@click="OnDeleteRegistration()">
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
	let deleteParticipantEventRef = ref(null);

	const props = defineProps({
		registration: {
			type: Object,
			required: true,
		},
	});

	const emit = defineEmits(["onDelete"]);

	const registrationData = toRef(props, "registration");
	const isLoading = ref(false);
	const errorMessage = ref("");

	const OnDeleteRegistration = async () => {
		isLoading.value = true;
		const { error } = await $fetch(
			`/api/participant-events/${registrationData.value?.id}`,
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
			isLoading.value = false;
			return;
		}

		emit("onDelete");
      isLoading.value = false;
		deleteParticipantEventRef.value?.closeDialog();
	};
</script>
