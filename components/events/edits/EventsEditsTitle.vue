<template>
	<div>
		<div v-if="!IsEditing" class="d-flex align-items-start gap-2">
			<h1 id="event-title" class="fw-bold m-0">
				{{ newTitle.title }}
			</h1>
			<button
				type="button"
				class="btn btn-sm d-flex align-items-center text-secondary"
				@click="ToggleEdit">
				<Icon name="material-symbols:edit-outline-rounded" />
			</button>
		</div>

		<form
			v-else
			@submit.prevent="OnSaveNewTitle"
			class="d-flex align-items-center gap-2">
			<input
				type="text"
				class="form-control border-secondary fw-bold fs-4"
				style="font-size: 1.25rem"
				v-model="newTitle.title" />
			<button
				type="submit"
				class="d-flex align-items-center btn btn-success fw-bold gap-2"
				style="height: min-content"
				:disabled="status === 'pending'">
				<span
					v-if="status === 'pending'"
					class="spinner-border spinner-border-sm"
					aria-hidden="true" />
				<span role="status">Save</span>
			</button>
			<button
				class="btn btn-outline-secondary"
				style="height: min-content"
				:onclick="ToggleEdit">
				Cancel
			</button>
		</form>
	</div>
</template>

<script setup>
	const eventID = useRoute().params.eventID;
	const eventDetails = useEventDetails();

	const newTitle = ref({
		title: eventDetails.value?.title,
	});

	const IsEditing = ref(false);

	const ToggleEdit = () => {
		IsEditing.value = !IsEditing.value;
	};

	const { status, execute } = await useFetch(`/api/events/${eventID}`, {
		method: "PATCH",
		body: newTitle,
		immediate: false,
		watch: false,
	});

	const OnSaveNewTitle = async () => {
		// try {
		// 	await execute();
		// 	if (status.value == "success") {
		// 		ToggleEdit();
		// 		EventTitle.value = NewTitle.value;
		// 	}
		// } catch (err) {
		// 	NewTitle.value = err.message;
		// }
	};
</script>

<style scoped>
	#event-title {
		cursor: pointer;
	}
</style>
