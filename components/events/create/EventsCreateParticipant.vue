<template>
	<div>
		<button
			class="btn btn-outline-secondary"
			data-bs-toggle="modal"
			data-bs-target="#registerParticipant">
			Register Participant
		</button>
		<div
			class="modal"
			id="registerParticipant"
			data-bs-backdrop="static"
			data-bs-keyboard="false"
			tabindex="-1"
			aria-labelledby="registerParticipant"
			aria-hidden="true"
			ref="registerParticipantRef">
			<div class="modal-dialog modal-dialog-centered">
				<div class="modal-content">
					<div class="modal-header">
						<h5
							class="modal-title fw-bold"
							id="staticBackdropLabel">
							Register Participant
						</h5>
						<button
							type="button"
							class="btn-close"
							data-bs-dismiss="modal"
							aria-label="Close"></button>
					</div>

					<div class="modal-body">
						<form
							@submit.prevent="OnRegisterParticipant"
							id="createEvent">
							<div
								class="d-flex justify-content-between align-items-center mb-2">
								<div class="fw-bold text-secondary">
									Participant
								</div>
								<a
									class="link-primary link-offset-2"
									style="font-size: 0.8rem">
									Register new participant
								</a>
							</div>

							<input
								type="text"
								class="form-control border-secondary mb-3"
								placeholder="Search participant"
								list="participantListOptions"
								v-model="searchQuery"
								required />

							<p
								v-if="isRegistrationExist"
								style="font-size: 0.8rem"
								class="text-danger text-center">
								Particiapnt already registererd
							</p>

							<ul
								v-if="participants.length != 0"
								class="list-group mb-3"
								style="
									max-height: 360px;
									overflow-y: auto;
								">
								<button
									type="button"
									v-for="participant in participants"
									:key="participant.id"
									class="list-group-item list-group-item-action"
									@click="
										OnSelectParticipant(
											participant.id,
											`${participant.first_name} ${participant.surname}`
										)
									">
									<div class="">
										{{
											`${participant.first_name} ${participant.surname}`
										}}
									</div>
									<div
										class="text-secondary"
										style="font-size: 0.9rem">
										{{
											participant.institutions
												.name
										}}
									</div>
								</button>
							</ul>

							<ul
								v-if="participants.length === 0"
								class="list-group">
								<li class="list-group-item">
									Sorry, could not find participant.
								</li>
							</ul>
						</form>
					</div>

					<div class="modal-footer">
						<button
							type="button"
							data-bs-dismiss="modal"
							class="btn">
							Cancel
						</button>
						<button
							type="submit"
							form="createEvent"
							class="d-flex align-items-center btn btn-primary gap-2"
							:disabled="
								isRegistrationExist ||
								SavingRegistration === 'pending'
							">
							<span
								v-if="SavingRegistration === 'pending'"
								class="spinner-border spinner-border-sm"
								aria-hidden="true" />
							<span role="status">Register</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	const registerParticipantRef = ref(null);
	let registerParticipant;

	const eventID = useRoute().params.eventID;

	const searchQuery = ref("");
	const selectedParticipantId = ref();

	const isRegistrationExist = ref(false);

	const {
		data: participants,
		status: IsSearching,
		execute: OnSearch,
	} = await useFetch(`/api/participants/search`, {
		method: "GET",
		params: {
			query: searchQuery,
		},
	});

	const {
		status: SavingRegistration,
		execute: SaveRegistration,
		error,
	} = await useFetch(`/api/registrations/participants`, {
		headers: useRequestHeaders(["cookie"]),
		method: "POST",
		immediate: false,
		watch: false,
	});

	const { data: registrationExist, execute: checkRegistrationExist } =
		await useFetch(`/api/registrations/participants/exists`, {
			headers: useRequestHeaders(["cookie"]),
			method: "GET",
			params: {
				eventID: eventID,
				participantID: selectedParticipantId,
			},
			immediate: false,
			watch: false,
		});

	const OnSaveRegistration = async () => {
		try {
			await SaveRegistration();
			if (SavingRegistration.value == "success") {
				closeModal();
			}
		} catch {
			console.log(error);
		}
	};

	const OnSelectParticipant = async (id, participantName) => {
		searchQuery.value = participantName;
		selectedParticipantId.value = id;

		await checkRegistrationExist();
		if (registrationExist.value != null) {
			isRegistrationExist.value = true;
		} else {
			isRegistrationExist.value = false;
		}
	};

	const closeModal = () => {
		if (registerParticipant) {
			registerParticipant.hide();
		}
	};

	onMounted(() => {
		// Access the global `bootstrap` object to initialize the Modal
		if (registerParticipantRef.value) {
			registerParticipant = new bootstrap.Modal(
				registerParticipantRef.value
			);
		}
	});
</script>
