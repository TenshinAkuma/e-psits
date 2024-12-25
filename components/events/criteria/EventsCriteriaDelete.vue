<template>
	<div>
		<Dialog
			dialogId="deleteCrtieria"
			dialogTitle="Remove Criteria"
			ref="criteriaDeleteDialog">
			<template #ButtonLabel>
				<i
					class="bi bi-trash-fill text-secondary"
					style="font-size: 0.8rem" />
			</template>

			<template #Body>
				This action cannot be undone. <br />
				<b>Are you sure you want to delete this criteria?</b>
			</template>

			<template #Submit>
				<button
					@click="OnDeleteCriteria"
					type="button"
					class="btn btn-danger hstack gap-2"
					:disabled="status === 'pending'">
					<span
						v-if="status === 'pending'"
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
	const eventID = useRoute().params.eventID;
	const criteriaDeleteDialog = ref(null);

	const {
		data: criteriaData,
		status,
		execute: DeleteCriteria,
	} = await useFetch(`/api/events/${eventID}/criteria/${props.criteriaId}`, {
		method: "DELETE",
		immediate: false,
		watch: false,
	});

	const OnDeleteCriteria = async () => {
		console.error("Delete");
		try {
			await DeleteCriteria();
			if (criteriaData.value.success) {
				criteriaDeleteDialog.value.closeDialog();
			}
		} catch (error) {
			console.error(error);
		}
	};
</script>

<style></style>
