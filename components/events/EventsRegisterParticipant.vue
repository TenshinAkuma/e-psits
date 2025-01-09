<template>
	<Dialog
			id="registerParticipant"
			dialogTitle="Register Participant"
			openButtonStyle="btn-outline-dark fw-bold"
			ref="registerParticipantDialogRef">
			<template #ButtonLabel>
				<i class="bi bi-plus" /> Register Participant
			</template>
			<template #Body>
				<div
					class="d-flex justify-content-between align-items-center mb-2">
					<div class="fw-bold text-secondary">Participant</div>
					<a
						class="link-primary link-offset-2"
						style="font-size: 0.8rem">
						Register new participant
					</a>
				</div>
				<form
					id="registerParticipantForm"
					@submit.prevent="OnRegisterParticipant"
					class="mb-3">
					<input
						type="text"
						class="form-control border-secondary mb-1"
						placeholder="Search participant"
						list="participantListOptions"
						required
						v-model="searchQuery"
						@input="OnInputSearch" />

					<div
						v-if="errorMessage != ''"
						class="text-danger"
						style="font-size: 0.8rem">
						Error: {{ errorMessage }}
					</div>
				</form>

				<div
					class="vstack gap-3 overflow-y-auto"
					style="max-height: 360px; cursor: pointer">
					<div
						v-for="participant in searchResult"
						:key="participant.id"
						class="participant-link"
						@click="
							OnSelectParticipant(
								`${participant.first_name} ${participant.last_name}`,
								participant.id
							)
						">
						<Avatar
							:name="participant.first_name"
							:gender="participant.sex"
							size="48">
							<template #name>
								<p class="fw-bold m-0">
									{{
										`${participant.first_name} ${participant.last_name}`
									}}
								</p>
								<p
									class="text-secondary m-0"
									style="font-size: 0.8rem">
									{{ participant.institutions.name }}
								</p>
							</template>
						</Avatar>
					</div>
				</div>
			</template>

			<template #Submit>
				<button
					type="submit"
					form="registerParticipantForm"
					class="btn btn-success px-5 hstack gap-2"
					:disabled="_registrationStatus === 'pending'">
					<span
						v-if="_registrationStatus === 'pending'"
						class="spinner-border spinner-border-sm"
						aria-hidden="true" />
					<span>Register</span>
				</button>
			</template>
		</Dialog>
</template>

<script setup>
	const registerParticipantDialogRef = ref(null);
	const participantRegistrations = useParticipantRegistrations();
	const searchQuery = ref("");
	const errorMessage = ref("");

	const newRegistration = ref({
		event_id: Number(useRoute().params.eventID), // Ensures eventID is converted to a number
		participant_id: null,
	});

	const OnSelectParticipant = (participantName, participantId) => {
		searchQuery.value = participantName;
		newRegistration.value.participant_id = participantId;
	};

	const {
		data: _registration,
		status: _registrationStatus,
		error: _registrationError,
		execute: RegisterParticipant,
	} = await useFetch("/api/registrations/participants/ByParticipantId", {
		method: "POST",
		body: newRegistration,
		immediate: false,
		watch: false,
	});

	const OnRegisterParticipant = async () => {
		await RegisterParticipant();
		if (_registration.value?.error) {
			errorMessage.value = _registration.value.error;
			return;
		}

		participantRegistrations.value.push(_registration.value?.data);
		registerParticipantDialogRef.value?.closeDialog();
	};

	const { data: searchResult, execute: SearchParticipants } = await useFetch(
		`/api/participants/search`,
		{
			method: "GET",
			params: { query: searchQuery },
			immediate: false,
		}
	);

	// Debounced input search function
	const OnInputSearch = debounce(async () => {
		try {
			if (searchQuery.value == "") {
				newRegistration.value.participant_id = null;
				return;
			}

			await SearchParticipants();
			errorMessage.value = "";
		} catch (err) {
			console.error("Error during search:");
		}
	}, 300);
</script>

<style scoped>
	.participant-link:hover {
		color: #0d6efd;
	}
</style>
