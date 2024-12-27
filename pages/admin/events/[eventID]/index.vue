<template>
	<div class="w-100 pb-5">
		<EventsDetails>
			<template #tabs>
				<!-- <EventsRegisterParticipant /> -->
				<EventsRegisterParticipantV2 />
				<div>
					<div class="table-responsive">
						<table
							class="table table-borderless align-middle"
							style="cursor: pointer">
							<thead>
								<tr>
									<th scope="col">Participants</th>
									<th scope="col" class="text-end">
										Registration status
									</th>
								</tr>
							</thead>
							<tbody>
								<tr
									v-for="registration in eventParticipants"
									:key="registration.id">
									<td>
										<Avatar
											:name="
												registration
													.participants
													.first_name
											"
											:gender="
												registration
													.participants
													.sex
											"
											size="56">
											<template #name>
												<div
													class="flex-grow-1">
													<p
														class="avatar-link text-dark fw-bold m-0"
														style="
															width: max-content;
														"
														@click="
															navigateTo(
																`/admin/participants/${registration.participants.id}`
															)
														">
														{{
															`${registration.participants.first_name} ${registration.participants.last_name}`
														}}
													</p>
													<p
														class="avatar-link text-secondary m-0"
														style="
															cursor: pointer;
															font-size: 0.8rem;
														"
														@click="
															navigateTo(
																`/admin/institutions/${registration.participants.institutions.id}`
															)
														">
														{{
															registration
																.participants
																.institutions
																.name
														}}
													</p>
												</div>
											</template></Avatar
										>
									</td>

									<td class="text-end">
										<RegistrationsStatusUpdate
											:RegistrationStatus="
												registration.registration_status
											"
											:ParticipantRegistrationID="
												registration.id
											" />
									</td>
								</tr>
							</tbody>
						</table>
						{{ eventParticipants }}
					</div>
				</div>
			</template>
		</EventsDetails>
	</div>
</template>

<script setup>
	definePageMeta({
		layout: "main",
	});

	const eventID = useRoute().params.eventID;
	const { eventParticipants, loading, getAllEventParticipants } =
		useEventRegistrations();

	onMounted(async () => {
		await getAllEventParticipants(eventID);
	});
</script>

<style scoped>
	.avatar-link {
		cursor: pointer;
	}

	.avatar-link:hover {
		color: #1976d2 !important;
	}
</style>
