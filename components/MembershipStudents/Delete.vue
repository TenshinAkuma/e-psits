<template>
	<Dialog
		:dialogId="`delete-participant-${ParticipantData.id}`"
		:dialogTitle="`Remove ${Fullname()}`"
		openButtonStyle="btn-sm"
		ref="deleteParticipantRef">
		
		<template #ButtonLabel>
			<i class="bi bi-trash-fill text-secondary fs-7" />
		</template>

		<template #Body>
			<p class="m-0">
				<strong>This action cannot be undone</strong> <br />
				<span class="text-secondary">
					Are you sure to remove this student member?
				</span>
			</p>
			<p class="fs-7 text-danger text-center my-2">
				{{ errMsg }}
			</p>
		</template>

		<template #Submit>
			<button
				@click="DeleteParticipant"
				type="button"
				class="btn btn-danger hstack gap-3"
				:disabled="isLoading">
				<span
					v-if="isLoading"
					class="spinner-border spinner-border-sm"
					aria-hidden="true" />
					<i v-else class="bi bi-trash-fill"></i>
					<span role="status">Remove</span>
			</button>
		</template>
	</Dialog>
</template>

<script setup>
	let deleteParticipantRef = ref(null);
	const props = defineProps({
		participant: {
			type: Object,
			required: true,
		},
   });

   const emit = defineEmits(["onDelete"])

	const ParticipantData = toRef(props, "participant");
	const isLoading = ref(false);
	const errMsg = ref("");

	async function DeleteParticipant() {
		isLoading.value = true;
		const { error } = await $fetch(
			`/api/participants/${ParticipantData.value?.id}`,
			{
				method: "DELETE",
			}
		);

		if (error) {
			console.error("Error deleting participant: ", error);
			errMsg.value = error;
			setTimeout(() => {
				errMsg.value = "";
			}, 3000);
      }
      
      isLoading.value = false
      emit("onDelete")
		deleteParticipantRef.value?.closeDialog();
	}

	const Fullname = () =>
		`${ParticipantData.value?.first_name} ${ParticipantData.value?.last_name}`;
</script>
