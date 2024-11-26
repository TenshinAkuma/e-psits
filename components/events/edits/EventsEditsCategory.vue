<template>
	<div>
		<div class="d-flex justify-content-between">
			<div class="fw-bold text-secondary">Category</div>
			<button
				class="btn btn-sm d-flex align-items-center text-secondary"
				@click="StartEditingCategory">
				<Icon name="material-symbols:edit-outline-rounded" />
			</button>
		</div>
		<div v-if="!IsEditingCategory">
			<div class="text-dark">
				{{ EventCategory }}
			</div>
		</div>

		<form v-else class="mt-2">
			<select
				v-model="newCategory"
				class="form-select border-secondary p-2 mb-3 w-100">
				<option :value="newCategory" selected disabled hidden>
					{{ newCategory }}
				</option>
				<option
					v-for="(category, index) in categories"
					:key="index"
					:value="index">
					{{ category }}
				</option>
			</select>
			<div class="d-flex justify-content-end gap-2">
				<button
					class="btn btn-outline-secondary"
					:onclick="
						() => (IsEditingCategory = !IsEditingCategory)
					">
					Cancel
				</button>
				<button class="btn btn-success">Save</button>
			</div>
		</form>
	</div>
</template>

<script setup>
	const props = defineProps({
		EventCategory: String,
	});

	const newCategory = ref("");
	const IsEditingCategory = ref(false);

	const StartEditingCategory = () => {
		newCategory.value = props.EventCategory;
		IsEditingCategory.value = true;
	};

	const categories = [
		"Competition",
		"Workshop",
		"Career Fare",
		"Keynote Speech",
	];
</script>
