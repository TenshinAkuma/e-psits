<template>
	<div>
		<Dialog
			:dialogId="`delete-criteria-${criteriaData.id}`"
			:dialogTitle="`Remove ${criteriaData.name}`"
			ref="deleteCriteriaRef">
			<template #ButtonLabel>
				<i
					class="bi bi-trash-fill text-secondary fs-7"/>
			</template>

			<template #Body>
				<b>This action cannot be undone.</b> <br />
				Are you sure you want to delete this criteria?
			</template>

			<template #Submit>
				<button
					@click="OnDeleteCriteria"
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
	</div>
</template>

<script setup>
	let deleteCriteriaRef = ref(null);

	const props = defineProps({
		criteria: {
			type: Object,
			required: true
		},
	});

	const emit = defineEmits(["onDelete"])

	const criteriaData = toRef(props, "criteria");
	const isLoading = ref(false);
	const errorMessage = ref("");

	const {
		data: _criteriaData,
		execute: DeleteCriteria,
	} = await useFetch(`/api/event-criteria/${criteriaData.value?.id}`, {
		method: "DELETE",
		immediate: false,
		watch: false,
	});

	const OnDeleteCriteria = async () => {
		isLoading.value = true;
		try {
			await DeleteCriteria();

			if (_criteriaData.value?.error) {
				throw new Error(_criteriaData.value?.error);
			}

			emit("onDelete")
			deleteCriteriaRef.value?.closeDialog();
		} catch (err) {
			errorMessage.value = err.message;

			setTimeout(() => {
				errorMessage.value = "";
			}, 3000);
		} finally {
		isLoading.value = false;
		}
	};
</script>

<style></style>
