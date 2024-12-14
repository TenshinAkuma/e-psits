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
								class="d-flex justify-content-between align-items-center">
								<p class="fw-bold text-secondary">
									Participant
								</p>

								<p>
									<a
										class="link-primary link-offset-2"
										style="font-size: 0.8rem">
										Register new participant
									</a>
								</p>
							</div>

							<input
								type="text"
								class="form-control border-secondary mb-3"
								placeholder="Search participant"
								list="participantListOptions"
								v-model="searchQuery" />

							<ul
								v-if="participants.length != 0"
								class="list-group mb-3"
								style="
									max-height: 360px;
									overflow-y: auto;
								">
								<button
									v-for="participant in participants"
									:key="participant.id"
									class="list-group-item list-group-item-action">
									{{
										`${participant.first_name} ${participant.surname}`
									}}
								</button>
							</ul>

							<div
								v-if="IsSearching === 'pending'"
								class="d-flex justify-content-center">
								<div
									class="spinner-border text-secondary"
									role="status">
									<span class="visually-hidden"
										>Loading...</span
									>
								</div>
							</div>

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
							class="btn btn-outline-secondary border-0">
							Cancel
						</button>
						<!-- <button
							type="submit"
							form="createEvent"
							class="d-flex align-items-center btn btn-primary gap-2"
							:disabled="status === 'pending'">
							<span
								v-if="status === 'pending'"
								class="spinner-border spinner-border-sm"
								aria-hidden="true" />
							<span role="status">Register</span>
						</button> -->
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	const registerParticipantRef = ref(null);
	let registerParticipant;

	const searchQuery = ref("");
	const selectedParticipantId = ref();

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

	const OnSelectParticipant = (id, participantName) => {
		searchQuery.value = participantName;
		selectedParticipantId.value = id;
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
