<template>
	<div>
		<Dialog
			:dialogId="`deleteCriteria-${criteriaId}`"
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

	const eventCriteria = useEventCriteria();
	const eventID = useRoute().params.eventID;
	const deleteCriteriaDialog = ref(null);
	const errorMessage = ref("");

	const {
		data: _criteria,
		status: _criteriaStatus,
		execute: DeleteCriteria,
	} = await useFetch(`/api/events/${eventID}/criteria/${props.criteriaId}`, {
		method: "DELETE",
		immediate: false,
		watch: false,
	});

	const OnDeleteCriteria = async () => {
		try {
			await DeleteCriteria();

			if (_criteria.value?.error) {
				throw new Error(criteria.value?.error);
			}

			const criteriaIndex = eventCriteria.value?.findIndex(
				(c) => c.id === props.criteriaId
			);

			if (criteriaIndex < 0) {
				throw new Error("Could not delete criteria");
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
