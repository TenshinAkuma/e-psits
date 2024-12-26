<template>
	<div>
		<button
			class="btn btn-outline-dark"
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
							@click="closeModal"
							aria-label="Close"></button>
					</div>

					<div class="modal-body">
						<form
							@submit="OnSaveRegistration"
							id="registerParticipant">
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
								@input="OnInputSearch"
								required />

							<ul
								class="list-group mb-3"
								style="
									max-height: 360px;
									overflow-y: auto;
								">
								<button
									type="button"
									v-for="participant in SearchResult"
									:key="participant.id"
									class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
									@click="
										OnSelectParticipant(
											participant.id,
											`${participant.first_name} ${participant.last_name}`
										)
									">
									<div>
										<div class="">
											{{
												`${participant.first_name} ${participant.last_name}`
											}}
										</div>
										<div
											class="text-secondary"
											style="
												font-size: 0.9rem;
											">
											{{
												participant
													.institutions
													.name
											}}
										</div>
									</div>
								</button>
							</ul>
							{{ newRegistration.participant_id }}
							{{ newRegistration.event_id }}
						</form>
					</div>

					<div class="modal-footer">
						<button
							type="button"
							class="btn"
							@click="closeModal">
							Cancel
						</button>
						<button
							type="submit"
							form="registerParticipant"
							class="d-flex align-items-center btn btn-primary gap-2">
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

	// Reactive variables
	const searchQuery = ref("");

	const newRegistration = ref({
		event_id: useRoute().params.eventID,
		participant_id: null,
	});

	const canRegister = ref(true);

	// Fetch setup for saving registration
	const { status: SavingRegistration, execute: SaveRegistration } =
		await useFetch("/api/registrations/participants/ByParticipantId", {
			headers: useRequestHeaders(["cookie"]),
			method: "POST",
			body: newRegistration,
			immediate: false,
			watch: false,
		});

	// Function to save a registration
	const OnSaveRegistration = async () => {
		try {
			await SaveRegistration();
			if (registration.value.success) {
				closeModal();
			}
		} catch (err) {
			console.error(registration.value.error);
		}
	};

	// Function to select a participant
	const OnSelectParticipant = (id, participantName) => {
		searchQuery.value = participantName;
		newRegistration.value.participant_id = id;
	};

	// Fetch setup for participant search
	const { data: SearchResult, execute: SearchParticipants } = await useFetch(
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
				canRegister.value = false;
			}
			await SearchParticipants();
		} catch (err) {
			console.error("Error during search:");
		}
	}, 300);

	const closeModal = () => {
		if (registerParticipant) {
			registerParticipant.hide();
			searchQuery.value = "";
			newRegistration.value.participant_id = null;
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
