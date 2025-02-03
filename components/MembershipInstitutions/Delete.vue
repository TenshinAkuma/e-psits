<template>
	<Dialog
		:dialogId="`delete-member-institution-${InstitutionsData.id}`"
		:dialogTitle="`Remove ${InstitutionsData.name}`"
		openButtonStyle="btn-sm"
		ref="deleteInstitutionsRef">
		
		<template #ButtonLabel>
			<i class="bi bi-trash-fill text-secondary fs-7" />
		</template>

		<template #Body>
			<p class="m-0">
				<strong>This action cannot be undone</strong> <br />
				<span class="text-secondary">
					Are you sure to remove this institution as a member?
				</span>
			</p>
			<p class="fs-7 text-danger text-center my-2">
				{{ errMsg }}
			</p>
		</template>

		<template #Submit>
			<button
				@click="DeleteInstitutions"
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
   let deleteInstitutionsRef = ref(null);
   
	const props = defineProps({
		institution: {
			type: Object,
			required: true,
		},
   });

   const emit = defineEmits(["onDelete"])

	const InstitutionsData = toRef(props, "institution");
	const isLoading = ref(false);
	const errMsg = ref("");

	async function DeleteInstitutions() {
		isLoading.value = true;
		const { error } = await $fetch(
			`/api/membership-institutions/${InstitutionsData.value?.id}`,
			{
				method: "DELETE",
			}
		);

		if (error) {
			console.error("Error deleting member institutions: ", error);
			errMsg.value = error;
			setTimeout(() => {
				errMsg.value = "";
			}, 3000);
      }
      
      isLoading.value = false
      emit("onDelete")
		deleteInstitutionsRef.value?.closeDialog();
	}
</script>
