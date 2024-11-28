<template>
	<div>
		<div class="d-flex justify-content-between">
			<div class="fw-bold text-secondary">Modality</div>
			<button
				type="button"
				class="btn btn-sm d-flex align-items-center text-secondary"
				@click="ToggleEdit">
				<Icon name="material-symbols:edit-outline-rounded" />
			</button>
		</div>
		<div v-if="!IsEditingModality">
			<div class="text-dark">{{ EventModality }}</div>
		</div>

		<form v-else @submit.prevent="OnSaveNewModality" class="mt-1">
			<select
				v-model="newModality"
				class="form-select border-secondary p-2 mb-3 w-100">
				<option value="" selected disabled hidden>
					{{ newModality }}
				</option>
				<option
					v-for="(mode, index) in Modes"
					:key="index"
					:value="mode">
					{{ mode }}
				</option>
			</select>
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
	const EventModality = defineModel("EventModality");

	const newModality = ref("");
	const IsEditingModality = ref(false);

	const ToggleEdit = () => {
		IsEditingModality.value = !IsEditingModality.value;
		if (IsEditingModality.value) {
			newModality.value = EventModality.value;
		}
	};

	const { status, execute, refresh } = await useFetch(
		`/api/events/${eventID}?column=modality`,
		{
			method: "PATCH",
			body: { value: newModality },
			immediate: false,
			watch: false,
		}
	);

	const OnSaveNewModality = async () => {
		try {
			await execute();
			ToggleEdit();
			EventModality.value = newModality.value;
		} catch (err) {
			console.log("Failed to update modality", err);
		}
	};

	const Modes = ["In-person", "Virtual"];
</script>

<style></style>
