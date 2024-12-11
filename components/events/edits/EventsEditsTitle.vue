<template>
	<div>
		<div
			v-if="!IsEditing"
			class="d-flex justify-content-between align-items-start">
			<div id="event-title" class="h1 fw-bold m-0">
				{{ EventTitle }}
			</div>
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
			class="hstack align-items-center gap-2">
			<input
				type="text"
				class="form-control border-secondary w-100 border p-2 me-3 fw-bold"
				style="font-size: 1.25rem"
				v-model="NewTitle" />
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
				class="btn btn-sm btn-outline-secondary"
				style="height: min-content"
				:onclick="ToggleEdit">
				Cancel
			</button>
		</form>
	</div>
</template>

<script setup>
	const EventId = useRoute().params.eventID;
	const EventTitle = defineModel("EventTitle");

	const NewTitle = ref();

	const IsEditing = ref(false);

	const ToggleEdit = () => {
		IsEditing.value = !IsEditing.value;
		if (IsEditing.value) {
			NewTitle.value = EventTitle.value;
		}
	};

	const { status, execute } = await useFetch(
		`/api/events/${EventId}?column=title`,
		{
			method: "PATCH",
			body: { value: NewTitle },
			immediate: false,
			watch: false,
		}
	);

	const OnSaveNewTitle = async () => {
		try {
			await execute();
			if (status.value == "success") {
				ToggleEdit();
				EventTitle.value = NewTitle.value;
			}
		} catch (err) {
			NewTitle.value = err.message;
		}
	};
</script>

<style scoped>
	#event-title {
		cursor: pointer;
	}
</style>
