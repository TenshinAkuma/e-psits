<template>
	<div>
		<div class="d-flex justify-content-between">
			<div class="fw-bold text-secondary">Category</div>
			<button
				type="button"
				class="btn btn-sm d-flex align-items-center text-secondary"
				@click="ToggleEdit">
				<Icon name="material-symbols:edit-outline-rounded" />
			</button>
		</div>
		<div v-if="!IsEditingCategory">
			<div class="text-dark">
				{{ EventCategory }}
			</div>
		</div>

		<form v-else @submit.prevent="OnSaveNewCategory" class="mt-1">
			<select
				v-model="newCategory"
				class="form-select border-secondary p-2 mb-3 w-100">
				<option :value="newCategory" selected disabled hidden>
					{{ newCategory }}
				</option>
				<option
					v-for="(category, index) in categories"
					:key="index"
					:value="category">
					{{ category }}
				</option>
			</select>
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
	const EventCategory = defineModel("EventCategory");

	const newCategory = ref("");
	const IsEditingCategory = ref(false);

	const ToggleEdit = () => {
		IsEditingCategory.value = !IsEditingCategory.value;
		if (IsEditingCategory.value) {
			newCategory.value = EventCategory.value;
		}
	};

	const { status, execute, refresh } = await useFetch(
		`/api/events/${eventID}?column=category`,
		{
			method: "PATCH",
			body: { value: newCategory },
			immediate: false,
			watch: false,
		}
	);

	const OnSaveNewCategory = async () => {
		try {
			await execute();
			ToggleEdit();
			EventCategory.value = newCategory.value;
		} catch (err) {
			console.log("Failed to update category", err);
		}
	};

	const categories = [
		"Competition",
		"Workshop",
		"Career Fare",
		"Keynote Speech",
	];
</script>
