<template>
	<div>
		<Dialog
			:dialogId="`deleteCriteria-${criteria_id}`"
			dialogTitle="Remove Criteria"
			ref="deleteCriteriaDialog">
			<template #ButtonLabel>
				<i
					class="bi bi-trash-fill text-secondary"
					style="font-size: 0.8rem" />
			</template>

			<template #Body>
				<b>This action cannot be undone.</b> <br />
				Are you sure you want to delete this criteria?
			</template>

			<template #Submit>
				<button
					@click="OnDeleteCriteria"
					type="button"
					class="btn btn-danger hstack gap-2"
					:disabled="_criteriaStatus === 'pending'">
					<span
						v-if="_criteriaStatus === 'pending'"
						class="spinner-border spinner-border-sm"
						aria-hidden="true" />
					<span>Delete criteria</span>
				</button>
			</template>
		</Dialog>
	</div>
</template>

<script setup>
	const props = defineProps({
		criteriaId: Number,
	});

	const criteria_id = toRef(props, "criteriaId")

	const eventCriteria = useEventCriteria();
	const deleteCriteriaDialog = ref(null);
	const errorMessage = ref("");

	const {
		data: _criteriaData,
		status: _criteriaStatus,
		execute: DeleteCriteria,
	} = await useFetch(`/api/event-criteria`, {
		method: "DELETE",
		query: { id: criteria_id.value },
		immediate: false,
		watch: false,
	});

	const OnDeleteCriteria = async () => {
		try {
			await DeleteCriteria();

			if (_criteriaData.value?.error) {
				throw new Error(_criteriaData.value?.error);
			}

			const criteriaIndex = eventCriteria.value?.findIndex(
				(c) => c.id === criteria_id.value
			);

			if (criteriaIndex < 0) {
				throw new Error("Error while deleting criteria");
			}

			eventCriteria.value?.splice(criteriaIndex, 1);
			deleteCriteriaDialog.value?.closeDialog();
		} catch (err) {
			errorMessage.value = err.message;

			setTimeout(() => {
				errorMessage.value = "";
			}, 3000);
		}
	};
</script>

<style></style>
