<template>
	<div class="mb-3">
		<div
			v-if="!IsEditing"
			class="d-flex justify-content-between align-items-center gap-1">
			<h1 id="event-title" class="fw-bold">{{ EventTitle }}</h1>
			<div class="hstack gap-2">
				<button
					type="button"
					class="btn btn-outline-success"
					style="height: min-content"
					@click="ToggleEdit">
					Edit
				</button>
				<button
					class="btn btn-primary"
					data-bs-toggle="modal"
					data-bs-target="#createEventModal">
					New event
				</button>
				<EventsDelete />
			</div>
		</div>

		<form
			v-else
			@submit.prevent="OnSaveNewTitle"
			class="hstack align-items-center gap-2">
			<input
				type="text"
				class="form-control border-secondary w-100 border p-2 me-3 fw-bold"
				style="font-size: 1.25rem"
				v-model="NewTitle" />
			<button
				type="submit"
				class="d-flex align-items-center btn btn-success fw-bold gap-2"
				style="height: min-content"
				:disabled="IsSaving">
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

		<EventsCreateModal />
	</div>
</template>

<script setup>
	const EventId = useRoute().params.eventID;
	const EventTitle = defineModel("EventTitle");

	const NewTitle = ref();

	const IsEditing = ref(false);
	const IsSaving = ref(false);

	const ToggleEdit = () => {
		IsEditing.value = !IsEditing.value;
		if (IsEditing.value) {
			NewTitle.value = EventTitle.value;
		}
	};

	const { status, execute, refresh } = await useFetch(
		`/api/events/${EventId}?column=title`,
		{
			method: "PATCH",
			body: { value: NewTitle },
			immediate: false,
			watch: false,
		}
	);

	const OnSaveNewTitle = async () => {
		IsSaving.value = true;
		try {
			await refresh();
			execute();
			ToggleEdit();
			EventTitle.value = NewTitle.value;
		} catch (err) {
			NewTitle.value = err.message;
		} finally {
			IsSaving.value = false;
		}
	};
</script>

<style scoped>
	#event-title {
		cursor: pointer;
	}
</style>
