<template>
	<div>
		<!-- <div
			v-if="status === 'success'"
			class="table-responsive rounded-3"
			style="height: 576px">
			<table class="table table-hover table-borderless">
				<thead class="table-secondary">
					<tr>
						<th scope="col">Name</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="registration in registrations"
						:key="registration.id"
						class="table-row"
						@click="ToEventDetailsPage(event.id)">
						<td>
							<div
								class="ratio ratio-1x1 border rounded-circle border overflow-hidden"
								style="width: 56px">
								<img
									:src="
										generateAvatarSrc(
											registration.participants
												.sex,
											registration.participants
												.first_name
										)
									"
									alt="profile_image"
									class="h-100 w-100" />
							</div>
						</td>
						<td>
							{{ registration.participants.first_name }}
						</td>
					</tr>
				</tbody>
			</table>
		</div> -->

		<div
			v-for="registration in registrations"
			:key="registration.id"
			class="d-flex align-items-center gap-3 p-3 mb-3">
			<div
				class="ratio ratio-1x1 border rounded-circle border overflow-hidden"
				style="width: 72px">
				<img
					:src="
						generateAvatarSrc(
							registration.participants.sex,
							registration.participants.first_name
						)
					"
					alt="profile_image"
					class="h-100 w-100" />
			</div>
			<div class="flex-grow-1">
				<h5 class="fw-bold m-0">
					{{
						`${registration.participants.first_name} ${registration.participants.surname}`
					}}
				</h5>
				<p class="text-secondary m-0">
					{{ registration.participants.institutions.name }}
				</p>
			</div>

			<RegistrationStatusUpdate
				:RegistrationStatus="registration.registration_status"
				:ParticipantRegistrationID="registration.id" />

			{{ registration.id }}
		</div>
	</div>
</template>

<script setup>
	const eventID = useRoute().params.eventID;
	const {
		data: registrations,
		status,
		error,
	} = await useFetch(`/api/events/${eventID}/getParticipants`);
</script>

<style scoped>
	table thead tr th {
		position: sticky;
		top: 0;
		z-index: 1;
	}
</style>
