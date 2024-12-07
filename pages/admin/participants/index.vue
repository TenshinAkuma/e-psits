<template>
	<div class="">
		<div class="d-flex justify-content-between align-items-center gap-3">
			<h4 class="fw-bold m-0">PARTICIPANTS</h4>
			<ParticipantsCreateModal />
		</div>

		<hr />
		<div
			v-if="status === 'success'"
			class="table-responsive rounded-3"
			style="height: 576px">
			<table class="table table-hover table-borderless">
				<thead class="table-secondary">
					<tr>
						<th scope="col">Name</th>
						<th scope="col">School</th>
						<th scope="col">Event</th>
						<th scope="col">Email</th>
						<th scope="col">Status</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="participant in participants"
						:key="participant.id"
						class="table-row"
						@click="
							toParticipantProfile(
								participant.participants.id
							)
						">
						<td>{{ participant.participants.name }}</td>
						<td>{{ participant.participants.school }}</td>
						<td>{{ participant.events.title }}</td>
						<td>{{ participant.participants.email }}</td>
						<td>
							{{ participant.registration_status }}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div
			v-else
			class="d-flex justify-content-center align-items-center m-auto">
			<div class="spinner-border text-secondary" role="status">
				<span class="visually-hidden">Loading...</span>
			</div>
		</div>
	</div>
</template>

<script setup>
	definePageMeta({
		layout: "main",
	});

	const { data: participants, status } = useFetch("/api/participants");

	const toParticipantProfile = async (participantID) => {
		await navigateTo(`/admin/participants/${participantID}`);
	};
</script>

<style scoped>
	.table-row:hover {
		cursor: pointer;
	}

	table thead tr th {
		position: sticky;
		top: 0;
		z-index: 1;
	}
</style>
