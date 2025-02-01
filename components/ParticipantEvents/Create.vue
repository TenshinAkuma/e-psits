<template>
	<Dialog
		:id="`participant-event-${ParticipantData.id}`"
		:dialogTitle="`Register ${GetFullname()} to an event`"
		openButtonStyle="btn-outline-dark fw-bold hstack gap-2"
		ref="createParticipantRegistrationRef">
		<template #ButtonLabel>
			<i class="bi bi-plus-lg" /> Register to an event
		</template>

		<template #Body>
			<form
				:id="`participant-event-form-${ParticipantData.id}`"
				@submit.prevent="OnCreateParticipantEvent"
            ref="ParticipantEventForm"
				class="mb-3">
				<input
					type="text"
					class="form-control bg-secondary bg-opacity-10 mb-2"
					placeholder="Search event"
					required
					v-model="eventTitle"
					@input="OnInputSearch" />

				<p
					v-if="errorMessage"
					class="bg-danger bg-opacity-25 text-danger fs-7 text-center">
					<b>Error:</b> {{ errorMessage }}
				</p>
			</form>

			<div
				v-if="isLoading"
				class="d-flex flex-column justify-content-center align-items-center py-3">
				<div class="spinner-border text-secondary" role="status">
					<span class="visually-hidden">Loading...</span>
				</div>
			</div>

			<div v-else-if="EventOptions.length <= 0" class="py-3">
				<p class="text-secondary text-center">No events found.</p>
			</div>

			<div
				v-else
				class="overflow-y-auto px-1"
				style="height: 360px; cursor: pointer">
				<div
					v-for="event in EventOptions"
					:key="event.id"
					class="event-link border-bottom py-3"
					@click="OnSelectEvent(event)">
					<div class="fw-bold">
						{{ `${event.title}` }}
					</div>
					<div class="text-secondary fs-7">
						{{ event.category }}
					</div>
				</div>
			</div>
         {{ newRegistration }}
		</template>

		<template #Submit>
			<button
				type="submit"
				:form="`participant-event-form-${ParticipantData.id}`"
				class="btn btn-primary hstack gap-3"
				:disabled="
					isSaving || isLoading || EventOptions.length <= 0
				">
				<span
					v-if="isSaving"
					class="spinner-border spinner-border-sm"
					aria-hidden="true" />
				<i v-else class="bi bi-floppy2-fill" />
				<span>Register event</span>
			</button>
		</template>
	</Dialog>
</template>

<script setup>
	let createParticipantRegistrationRef = ref(null);
   let ParticipantEventForm = ref(null);

	const props = defineProps({
		participant: {
			type: Object,
			required: true,
		},
	});

	const emit = defineEmits(["onCreate"]);

	const ParticipantData = toRef(props, "participant");
	const eventTitle = ref("");
	const EventOptions = ref([]);

	const errorMessage = ref("");
	const isLoading = ref(false);
	const isSaving = ref(false);

	const newRegistration = ref({
		participant_id: ParticipantData.value?.id,
		event_id: null,
	});

	const GetEventOptions = async () => {
		isLoading.value = true;
		const { data, error } = await $fetch(
			"/api/participant-events/search",
			{
				method: "GET",
            params: {
               query: eventTitle.value
            }
			}
		);

		if (error) {
			EventOptions.value = [];
		}

		EventOptions.value = data;
		isLoading.value = false;
   };

   await GetEventOptions();

	const OnCreateParticipantEvent = async () => {
		isSaving.value = true;
		const { error } = await $fetch("/api/participant-events", {
			method: "POST",
			body: newRegistration.value,
		});

		if (error) {
			console.error(error.message);
			errorMessage.value = error.message;
			setTimeout(() => {
				errorMessage.value = "";
				isSaving.value = false;
				return;
			}, 3000);
		}

      emit("OnCreate");
      ParticipantEventForm.value?.reset();
		isSaving.value = false;
		createParticipantRegistrationRef.value?.closeDialog();
	};

	const OnInputSearch = debounce(() => {
		GetEventOptions();
	}, 500);

	const OnSelectEvent = (event) => {
		eventTitle.value = `${event.title}`;
		newRegistration.value.event_id = event.id;
	};

	const GetFullname = () =>
		`${ParticipantData.value?.first_name} ${ParticipantData.value?.last_name}`;
</script>

<style scoped>
	.event-link:hover {
		color: #0d6efd;
	}
</style>
