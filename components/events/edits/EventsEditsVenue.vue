<template>
	<div>
		<div class="d-flex justify-content-between">
			<div class="text-secondary fs-7">Venue</div>
			<button
				type="button"
				class="btn btn-sm d-flex align-items-center text-secondary"
				@click="ToggleEdit">
				<Icon name="material-symbols:edit-outline-rounded" />
			</button>
		</div>
		<p v-if="!IsEditingVenue" class="fw-bold fs-7 lh-sm">
			{{ EventVenue || `To be announced` }}
		</p>

		<form v-else @submit.prevent="OnSaveNewVenue" class="mt-1 mb-3">
			<input
				type="text"
				v-model="newVenue"
				class="form-control border-secondary p-2 mb-3 w-100" />
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
	const eventID = useRoute().params.eventID;
	const EventVenue = defineModel("EventVenue");

	const newVenue = ref();
	const IsEditingVenue = ref(false);

	const { status, execute } = await useFetch(
		`/api/events/${eventID}?column=venue`,
		{
			method: "PATCH",
			body: { value: newVenue },
			immediate: false,
			watch: false,
		}
	);

	const OnSaveNewVenue = async () => {
		try {
			await execute();
			ToggleEdit();
			EventVenue.value = newVenue.value;
		} catch (err) {
			console.log("Failed to update venue", err);
		}
	};

	const ToggleEdit = () => {
		IsEditingVenue.value = !IsEditingVenue.value;
		if (IsEditingVenue.value) {
			newVenue.value = EventVenue.value;
		}
	};
</script>

<style></style>
