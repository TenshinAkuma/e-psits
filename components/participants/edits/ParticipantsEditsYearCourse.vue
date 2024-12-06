<template>
	<div>
		<div class="d-flex justify-content-between">
			<div class="fw-bold text-secondary">Year level & Course</div>
			<button
				type="button"
				class="btn btn-sm d-flex align-items-center text-secondary"
				@click="ToggleEdit">
				<Icon name="material-symbols:edit-outline-rounded" />
			</button>
		</div>

		<p v-if="!isEditing" class="text-dark">
			{{ `${ParticipantYear}, ${ParticipantCourse}` }}
		</p>

		<form v-else @submit.prevent="OnSaveNewPhoneNumber" class="mt-1">
			<div class="input-group mb-2">
				<span class="input-group-text text-secondary w-25"
					>Year</span
				>
				<input
					type="number"
					max="5"
					min="1"
					class="form-control border-secondary"
					v-model="participant.year" />
			</div>
			<div class="input-group mb-3">
				<span class="input-group-text text-secondary w-25"
					>Course</span
				>
				<input
					type="text"
					class="form-control border-secondary"
					v-model="participant.course" />
			</div>
			<div class="d-flex justify-content-end gap-2">
				<button
					type="submit"
					class="d-flex align-items-center btn btn-sm btn-success fw-bold gap-2"
					style="height: min-content"
					:disabled="status === 'pending'">
					<span
						v-if="status === 'pending'"
						class="spinner-border spinner-border-sm"
						aria-hidden="true" />
					<span role="status">Save</span>
				</button>
				<button
					type="button"
					class="btn btn-sm btn-outline-secondary"
					@click="ToggleEdit">
					Cancel
				</button>
			</div>
		</form>
	</div>
</template>

<script setup>
	const participantID = useRoute().params.participantID;
	const ParticipantYear = defineModel("ParticipantYear");
	const ParticipantCourse = defineModel("ParticipantCourse");

	const isEditing = ref(false);

	const participant = ref({
		year: ParticipantYear.value,
		course: ParticipantCourse.value,
	});

	const { status, error, execute } = await useFetch(
		`/api/participants/${participantID}`,
		{
			method: "PATCH",
			body: participant,
			immediate: false,
			watch: false,
		}
	);

	const OnSaveNewPhoneNumber = async () => {
		try {
			await execute();
			if (status.value == "success") {
				ToggleEdit();
				ParticipantYear.value = participant.value.year;
				ParticipantCourse.value = participant.value.course;
			}
		} catch {
			console.log(error);
		}
	};

	const ToggleEdit = () => {
		isEditing.value = !isEditing.value;
	};
</script>

<style></style>
