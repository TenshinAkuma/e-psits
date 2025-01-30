<template>
	<Dialog
		:id="`event-registration-${eventData.id}`"
		:dialogTitle="`Register Participant to ${eventData.title}`"
		openButtonStyle="btn-outline-dark fw-bold hstack gap-2"
		ref="eventRegistrationRef">
		<template #ButtonLabel>
			<i class="bi bi-plus" /> Register participant
		</template>

		<template #Body>
			<form
				:id="`event-registration-form-${eventData.id}`"
				@submit.prevent="OnRegisterParticipant"
				class="mb-3">
				<input
					type="text"
					class="form-control bg-secondary bg-opacity-10 mb-2"
					placeholder="Search participant"
					required
					v-model="participantName"
					@input="OnInputSearch" />

				<div
					v-if="errorMessage"
					class="text-danger fs-7 text-center">
					Error: {{ errorMessage }}
				</div>
			</form>

			<div
				v-if="isLoading"
				class="d-flex flex-column justify-content-center align-items-center py-3">
				<div class="spinner-border text-secondary" role="status">
					<span class="visually-hidden">Loading...</span>
				</div>
			</div>

         <div v-else-if="participantOptions.length <= 0" class="py-3">
            <p class="text-secondary text-center">No participants found.</p>
         </div>

			<div v-else
				class="overflow-y-auto px-1"
				style="height: 360px; cursor: pointer">
				<div
					v-for="participant in participantOptions"
					:key="participant.id"
					class="participant-link border-bottom py-3"
					@click="OnSelectParticipant(participant)">
					<div class="fw-bold">
						{{ `${participant.first_name} ${participant.last_name}` }}
					</div>
					<div class="text-secondary fs-7">
						{{ participant.institutions.name }}
					</div>
				</div>
			</div>
		</template>

		<template #Submit>
			<button
				type="submit"
				:form="`event-registration-form-${eventData.id}`"
				class="btn btn-primary hstack gap-3"
				:disabled="isSaving || isLoading || participantOptions.length <= 0">
				<span
					v-if="isSaving"
					class="spinner-border spinner-border-sm"
					aria-hidden="true" />
				<i v-else class="bi bi-floppy2-fill"/>
				<span>Register participant</span>
			</button>
		</template>
	</Dialog>
</template>

<script setup>
   const eventRegistrationRef = ref(null);

   const props = defineProps({
      event: {
         type: Object,
         required: true,
      },
   });

   const emit = defineEmits(['onRegister']);

   const eventData = toRef(props, 'event');
   const participantName = ref('');
   const errorMessage = ref('');
   const isLoading = ref(false);
   const isSaving = ref(false);

   const participantOptions = ref([]);

   const newRegistration = ref({
      event_id: eventData.value?.id,
      participant_id: null,
   });

   const OnSelectParticipant = (participant) => {
      participantName.value = `${participant.first_name} ${participant.last_name}`;
      newRegistration.value.participant_id = participant.id;
   };

   const { data: _registrationData, execute: RegisterParticipant } = useFetch('/api/event-registrations', {
      method: 'POST',
      body: newRegistration,
      immediate: false,
      watch: false,
   });

   const OnRegisterParticipant = async () => {
      isSaving.value = true;
      try {
         await RegisterParticipant();

         if (_registrationData.value?.error) {
            throw new Error(_registrationData.value.error);
         }

         emit('onRegister');
         eventRegistrationRef.value?.closeDialog();
      } catch (error) {
         console.error(error.message);
         errorMessage.value = error.message;
         setTimeout(() => {
            errorMessage.value = '';
         }, 3000);
      } finally {
         isSaving.value = false;
      }
   };

   const { data: _participants, execute: LoadParticipants } = useFetch('/api/participants/search', {
      method: 'GET',
      params: { query: participantName },
      immediate: false,
   });

   const OnLoadParticipants = async () => {
      isLoading.value = true;
      try {
         await LoadParticipants();

         if (_participants.value?.error) {
            throw new Error(_participants.value.error);
         }

         participantOptions.value = _participants.value?.data;
      } catch (err) {
         console.error('Error during search: ', err.message);
         errorMessage.value = err.message;
         setTimeout(() => {
            errorMessage.value = '';
         }, 3000);
      } finally {
         isLoading.value = false;
      }
   };

   const OnInputSearch = debounce(async () => {
      await OnLoadParticipants();
   }, 300);

   await OnLoadParticipants();
</script>

<style scoped>
   .participant-link:hover {
      color: #0d6efd;
   }
</style>
