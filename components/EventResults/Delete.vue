<template>
	<Dialog
		:dialogId="`delete-score-${scoreData.id}`"
		:dialogTitle="`Delete ${GetFullname()}'s Scores`"
		openButtonStyle="btn-sm text-secondary"
		ref="deleteScoresRef">
		<template #ButtonLabel>
			<i class="bi bi-trash-fill" style="font-size: 0.5rem" />
		</template>

		<template #Body>
			<p class="text-start">
				<b>This action will permanently delete the scores.</b>
				<br />
				Are you sure you want to delete this?
			</p>
		</template>

		<template #Submit>
			<button
				:id="`delete-score-form-${scoreData.participant_id}`"
				@click="OnDeleteScores"
				type="button"
				class="btn btn-danger hstack gap-3"
				:disabled="isLoading">
				<span
					v-if="isLoading"
					class="spinner-border spinner-border-sm"
					aria-hidden="true"></span>
				<i v-else class="bi bi-trash-fill"></i>
				<span role="status">Delete scores</span>
			</button>
		</template>
	</Dialog>
</template>

<script setup>
	let deleteScoresRef = ref(null);
	const props = defineProps({
		score: {
			type: Object,
			required: true,
		},
	});

	const emit = defineEmits(["onDelete"]);

	const scoreData = toRef(props, "score");
	const isLoading = ref(false);
	const errorMessage = ref("");

   const GetFullname = () =>
		`${scoreData.value?.participants.first_name} ${scoreData.value?.participants.last_name}`;

	const OnDeleteScores = async () => {
		isLoading.value = true;
		const { error } = await $fetch(
			`/api/event-results/${scoreData.value?.id}`,
			{
				method: "DELETE",
			}
		);

		if (error) {
			errorMessage.value = error;
			setTimeout(() => {
				errorMessage.value = "";
				isLoading.value = false;
			}, 3000);
		}
		emit("onDelete");
		deleteScoresRef.value.closeDialog();
		isLoading.value = false;
   };
</script>
