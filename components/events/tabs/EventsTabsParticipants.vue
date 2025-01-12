<template>
	<div
		v-if="participantRegistrations == null || participantRegistrations.length == 0"
		class="d-flex flex-column justify-content-center align-items-center"
		style="height: 576px">
		<p class="fs-7">No participants as of now.</p>
		<EventsRegisterParticipant />
	</div>
	<div v-else>
		<div class="mb-3">
			<EventsRegisterParticipant />
		</div>
		<div class="table-responsive">
			<table class="table table-borderless align-middle">
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
						v-for="registration in participantRegistrations"
						:key="registration.id"
						style="height: 114px">
						<td>
							<Avatar
								:name="registration.participants
									.first_name
									"
								:gender="registration.participants.sex"
								size="56px">
								<template #name>
									<div class="flex-grow-1">
										<p
											class="avatar-link text-dark fw-bold m-0"
											style="width: max-content;"
											@click="
												navigateTo(
													`/admin/participants/${registration.participants.id}`)">
											{{
												`${registration.participants.first_name} ${registration.participants.last_name}`
											}}
										</p>
										<p
											class="avatar-link text-secondary m-0"
											style="
												cursor: pointer;
												font-size: 0.8rem;"
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
								</template>
							</Avatar>
						</td>

						<td class="text-end">
							<RegistrationsStatusUpdate
								:RegistrationStatus="registration.registration_status
									"
								:ParticipantRegistrationID="registration.id
									" />
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script setup>
	const participantRegistrations = useParticipantRegistrations();
</script>

<style scoped>
	.avatar-link {
		cursor: pointer;
	}

	.avatar-link:hover {
		color: #1976d2 !important;
	}

	table thead tr th {
		position: sticky;
		top: 0;
		z-index: 1;
	}
</style>
