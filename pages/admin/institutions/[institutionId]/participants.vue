<template>
	<section class="mb-5">
		<article>
			<h1 class="fw-bold">{{ InstitutionData.name }}</h1>
		</article>

		<br />
		<InstitutionsTabs activeTab="participants" />
		<br />

		<article
			v-if="isLoading"
			class="d-flex flex-column justify-content-center align-items-center"
			style="height: 576px">
			<p>Loading institution participants...</p>
			<div class="spinner-border" role="status">
				<span class="visually-hidden">Loading...</span>
			</div>
		</article>

		<article
			v-else-if="
				ParticipantsList == null || ParticipantsList.length <= 0
			"
			class="d-flex flex-column justify-content-around align-items-center"
			style="height: 576px">
			<h4 class="fw-bold m-0">Institution Participants</h4>
			<div class="d-flex flex-column align-items-center">
				<p class="text-secondary text-center fs-7 lh-sm">
					No participant yet. Add some participants.
				</p>
				<InstitutionParticipantsCreate
					:institution="InstitutionData"
					@onCreate="HandleReload" />
			</div>
		</article>

		<article v-else>
			<br />
			<div class="d-flex justify-content-between align-items-center">
				<h4 class="fw-bold m-0">Edit Institution Info</h4>
				<InstitutionParticipantsCreate
					:institution="InstitutionData"
					@onCreate="HandleReload" />
			</div>

			<br />

			<div class="table-responsive">
				<table class="table table-bordered">
					<thead>
						<tr>
							<th scope="col">Name</th>
							<th scope="col">Email</th>
							<th scope="col">Events</th>
							<th scope="col" class="text-center">
								Actions
							</th>
						</tr>
					</thead>
					<tbody>
						<tr
							v-for="participant in ParticipantsList"
							:key="participant.id">
							<td class="fw-bold">
								<NuxtLink
									:to="`/admin/participants/${participant.id}`">
									{{
										GetFullname(
											participant.first_name,
											participant.last_name
										)
									}}
								</NuxtLink>
							</td>
							<td>{{ participant.email }}</td>
							<td>
								<div
									v-for="event in participant.event_registrations"
									:key="event.id"
									class="mb-2">
									<NuxtLink :to="`/admin/events/${event.event_id}v2/registrations`">
										{{ event.events.title }}
									</NuxtLink>
								</div>
							</td>
							<td>
								<div class="d-flex justify-content-center">
									<InstitutionParticipantsDelete :institution="participant" @onDelete="HandleReload"/>
								</div>
								 <!-- {{ participant }} -->
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</article>
	</section>
</template>

<script setup>
	definePageMeta({
		layout: "main",
	});

	const institutionId = useRoute().params.institutionId;
	const InstitutionData = ref({});
	const ParticipantsList = ref([]);
	const isLoading = ref(false);
	const errorMsg = ref("");

	async function LoadData() {
		isLoading.value = true;
		const { data, error } = await $fetch(
			`/api/institutions/${institutionId}`,
			{ method: "GET" }
		);

		const { data: participantsData, error: participantsError } =
			await $fetch(`/api/institution-participants/${institutionId}`, {
				method: "GET",
			});

		if (error || participantsError) {
			console.error(
				"Error loading institution data: ",
				error || participantsError
			);
			errorMsg.value = error || participantsError;

			setTimeout(() => {
				errorMsg.value = "";
			}, 3000);
		}

		InstitutionData.value = data;
		ParticipantsList.value = participantsData;
		isLoading.value = false;
	}

	await LoadData();

	function GetFullname(firstName, lastName) {
		return `${firstName} ${lastName}`;
	}

	async function HandleReload() {
		await LoadData();
	}
</script>
