<template>
	<div>
		<div class="d-flex justify-content-between">
			<div class="fw-bold text-secondary">Date</div>
			<button
				type="button"
				class="btn btn-sm d-flex align-items-center text-secondary"
				@click="ToggleEdit">
				<Icon name="material-symbols:edit-outline-rounded" />
			</button>
		</div>
		<div v-if="!IsEditingDate">{{ formatDate(EventDate) }}</div>

		<form v-else @submit.prevent="OnSaveNewDate" class="mt-1">
			<input
				v-model="newDate"
				type="date"
				class="form-control border-secondary p-2 mb-3 w-100" />
			<div class="d-flex justify-content-end gap-2">
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
					type="button"
					class="btn btn-outline-secondary"
					@click="ToggleEdit">
					Cancel
				</button>
			</div>
		</form>
	</div>
</template>

<script setup>
	const eventID = useRoute().params.eventID;
	const EventDate = defineModel("EventDate");

	const newDate = ref();
	const IsEditingDate = ref(false);

	const { status, execute, refresh } = await useFetch(
		`/api/events/${eventID}?column=date`,
		{
			method: "PATCH",
			body: { value: newDate },
			immediate: false,
			watch: false,
		}
	);

	const OnSaveNewDate = async () => {
		try {
			await execute();

			ToggleEdit();
			EventDate.value = newDate.value;
		} catch (err) {
			console.log("Failed to update date", err);
		}
	};

	const ToggleEdit = () => {
		IsEditingDate.value = !IsEditingDate.value;
		if (IsEditingDate.value) {
			const date = new Date(EventDate.value); // Convert EventDate to YYYY-MM-DD format (if not already)
			newDate.value = isNaN(date.getTime())
				? "" // Handle invalid dates gracefully
				: date.toISOString().split("T")[0]; // Extract YYYY-MM-DD
		}
	};
</script>

<style></style>
