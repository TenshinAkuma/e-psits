<template>
	<Dialog
		:dialogId="`delete-event-${eventId}`"
		:dialogTitle="`Delete ${eventData.title}`"
		openButtonStyle="btn-danger hstack gap-3"
		ref="deleteEventRef">
		<template #ButtonLabel>
			<i class="bi bi-trash" /> Delete this event
		</template>

		<template #Body>
			<p class="m-0">
				<strong>This action cannot be undone</strong> <br />
				<span class="text-secondary">
					Are you sure to remove this guideline?
				</span>
			</p>
			<p class="fs-7 text-danger text-center my-2">
				{{ errMsg }}
			</p>
		</template>

		<template #Submit>
			<button
				@click="DeleteEvent"
				type="button"
				class="btn btn-danger hstack gap-3"
				:disabled="isLoading">
				<span
					v-if="isLoading"
					class="spinner-border spinner-border-sm"
					aria-hidden="true" />
					<i v-else class="bi bi-trash-fill"></i>
					<span role="status">Confirm delete</span>
			</button>
		</template>
	</Dialog>
</template>

<script setup>
	let deleteEventRef = ref(null);

	const props = defineProps({
		event: {
			type: Object,
			required: true,
		},
	})

	const eventData = toRef(props, "event")
	const eventId = useRoute().params.eventId;
	const isLoading = ref(false);
	const errMsg = ref("");

	async function DeleteEvent() {
		isLoading.value = true;
		const { error } = await $fetch(`/api/events/${eventId}`, {
			method: "DELETE",
		});

		if (error) {
			errMsg.value = error;
			setTimeout(() => {
				errMsg.value = "";
			}, 3000);
		}

		isLoading.value = false;
		navigateTo(`/admin/events`);
		deleteEventRef.value?.closeDialog();
	}
</script>

<style></style>
