<template>
	<Dialog
		:dialogId="`delete-institution-${InstitutionData.id}`"
		:dialogTitle="`Delete ${InstitutionData.name}`"
		openButtonStyle="btn-danger hstack gap-3"
		ref="deleteInstitutionRef">
		<template #ButtonLabel>
			<i class="bi bi-trash" /> Delete this institution
		</template>

		<template #Body>
			<p class="m-0">
				<strong>This action cannot be undone</strong> <br />
				<span class="text-secondary">
					Are you sure to delete this institution?
				</span>
			</p>
			<p class="fs-7 text-danger text-center my-2">
				{{ errMsg }}
			</p>
		</template>

		<template #Submit>
			<button
				@click="DeleteInstitution"
				type="button"
				class="btn btn-danger hstack gap-3"
				:disabled="isLoading">
				<span
					v-if="isLoading"
					class="spinner-border spinner-border-sm"
					aria-hidden="true" />
				<i v-else class="bi bi-trash-fill"></i>
				<span role="status">Confirm delete</span>
			</button>
		</template>
	</Dialog>
</template>

<script setup>
	let deleteInstitutionRef = ref(null);

	const props = defineProps({
		institution: {
			type: Object,
			required: true,
		},
	});

	const InstitutionData = toRef(props, "institution");
	const isLoading = ref(false);
	const errMsg = ref("");

	async function DeleteInstitution() {
		isLoading.value = true;
		const { data, error } = await $fetch(
			`/api/institutions/${InstitutionData.value?.coordinator_id}`,
			{
				method: "DELETE",
			}
		);

		if (error) {
			console.error("Error deleting institution: ", error);
			errMsg.value = "Internal server error. Please try again later.";
			setTimeout(() => {
				errMsg.value = "";
			}, 3000);
		}

		isLoading.value = false;

		if (data) {
			navigateTo(`/admin/institutions`);
			deleteInstitutionRef.value?.closeDialog();
		}
	}
</script>
