<template>
	<div>
		<div v-if="status === 'success'">
			<div class="d-flex align-items-center gap-3">
				<div
					class="ratio ratio-1x1 border rounded-circle border overflow-hidden"
					style="width: 144px">
					<img
						src="public\img\undraw_wait_in_line_o2aq.svg"
						alt="profile_image"
						class="h-100 w-100" />
				</div>
				<div>
					<h2 class="fw-bold mb-2">
						{{ participant.name }}
					</h2>
					<div class="d-flex align-items-center gap-2">
						<div
							:class="`px-3 py-2 rounded-pill badge ${registrationStatus(
								participant.registration_status
							)}`"
							style="font-size: 0.7rem">
							{{ participant.registration_status }}
						</div>

						<div class="text-secondary">
							<b>{{ participant.name }}</b> will
							participate on
							<a
								:href="`/admin/events/${participant.event_id}`"
								class="link-secondary link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover fw-bold">
								{{ participant.events.title }}
							</a>

							event.
						</div>
					</div>
				</div>
			</div>

			<hr />
			<div class="row">
				<div class="col-4">
					<p class="fw-bold">PERSONAL INFORMATION</p>

					<div class="fw-bold text-secondary">Date of birth</div>
					<p class="text-dark">
						{{ new Date(participant.dob).toDateString() }}
					</p>

					<div class="fw-bold text-secondary">Address</div>
					<p class="text-dark">
						{{ participant.address }}
					</p>

					<hr />
					<p class="fw-bold">CONTACT INFORMATION</p>

					<div class="fw-bold text-secondary">Email</div>
					<p class="text-dark">
						{{ participant.email }}
					</p>

					<div class="fw-bold text-secondary">
						Contact number
					</div>
					<p class="text-dark">
						{{ participant.phone_number }}
					</p>

					<hr />

					<p class="fw-bold">ACADEMIC INFORMATION</p>
					<div class="fw-bold text-secondary">School</div>
					<p class="text-dark">
						{{ participant.school }}
					</p>
					<div class="fw-bold text-secondary">
						Year level & Course
					</div>
					<p class="text-dark">
						{{ `${participant.year}, ${participant.course}` }}
					</p>
				</div>
			</div>
		</div>

		<div v-else>
			<div class="spinner-border" role="status">
				<span class="visually-hidden">Loading...</span>
			</div>
		</div>
	</div>
</template>

<script setup>
	definePageMeta({
		layout: "main",
	});

	const participantID = useRoute().params.participantID;

	const { data: participant, status } = useFetch(
		`/api/participants/${participantID}`,
		{
			headers: useRequestHeaders(["cookie"]),
			method: "GET",
		}
	);

	const registrationStatus = (status) => {
		switch (status) {
			case "Registered":
				return "text-bg-primary";
			case "Cancelled":
				return "text-bg-danger";
			default:
				return "text-bg-secondary";
		}
	};
</script>
