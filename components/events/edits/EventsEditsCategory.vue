<template>
	<div>
		<div class="d-flex justify-content-between">
			<div class="text-secondary fs-7">Category</div>
			<button
				type="button"
				class="btn btn-sm d-flex align-items-center text-secondary"
				@click="ToggleEdit">
				<Icon name="material-symbols:edit-outline-rounded" />
			</button>
		</div>
		<p v-if="!IsEditing" class="fw-bold fs-7 lh-sm">
			{{ eventDetails.category }}
		</p>

		<form v-else @submit.prevent="OnSaveEventEdit" class="mt-1 mb-3">
			<select
				v-model="newCategory.category"
				class="form-select border-secondary p-2 mb-2 w-100">
				<option value="" selected disabled hidden>
					{{ newCategory.category }}
				</option>
				<option
					v-for="(category, index) in categories"
					:key="index"
					:value="category">
					{{ category }}
				</option>
			</select>

			<p class="fs-7 text-danger">
				{{ errorMessage }}
			</p>

			<div class="d-flex justify-content-end gap-2">
				<button
					type="submit"
					class="d-flex align-items-center btn btn-sm btn-success fw-bold gap-2"
					style="height: min-content"
					:disabled="_eventStatus === 'pending'">
					<span
						v-if="_eventStatus === 'pending'"
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
	const eventDetails = useEventDetails();
	const errorMessage = ref("");

	const newCategory = ref({
		category: eventDetails.value?.category,
	});

	const IsEditing = ref(false);

	const ToggleEdit = () => {
		IsEditing.value = !IsEditing.value;

		if (!IsEditing.value) {
			newCategory.value.category = eventDetails.value?.category;
		}
	};

	const {
		data: _event,
		status: _eventStatus,
		execute: SaveEventEdit,
	} = await useFetch(`/api/events/${eventID}`, {
		method: "PATCH",
		body: newCategory,
		immediate: false,
		watch: false,
	});

	const OnSaveEventEdit = async () => {
		await SaveEventEdit();

		if (_event.value?.error) {
			errorMessage.value = _event.value?.error;

			setTimeout(() => {
				errorMessage.value = "";
			}, 3000);

			return;
		}

		eventDetails.value = _event.value?.data;
		IsEditing.value = false;
	};

	const categories = [
		"Competition",
		"Workshop",
		"Career Fare",
		"Keynote Speech",
	];
</script>
