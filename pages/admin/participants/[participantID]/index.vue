<template>
	<div>
		<div v-if="status === 'success'" class="row">
			<div class="col-3">
				<div
					class="ratio ratio-1x1 border rounded-circle border overflow-hidden mb-2 mx-auto"
					style="width: 144px">
					<img
						src="public\img\undraw_wait_in_line_o2aq.svg"
						alt="profile_image"
						class="h-100 w-100" />
				</div>

				<div
					class="d-flex justify-content-center align-items-center gap-2">
					<h2 class="fw-bold mb-0">
						{{ participant.name }}
					</h2>
					<span
						:class="`px-3 py-2 badge ${registrationStatus(
							participant.registration_status
						)}`"
						style="font-size: 0.7rem">
						{{ participant.registration_status }}
					</span>
				</div>
				<div class="text-secondary text-center">
					{{ participant.email }}
				</div>

				<hr />

				<p class="fw-bold">PERSONAL INFORMATION</p>
				<div class="fw-bold text-secondary">Date of birth</div>
				<p class="text-dark">
					{{ new Date(participant.dob).toDateString() }}
				</p>
				<div class="fw-bold text-secondary">Address</div>
				<p class="text-dark">
					{{ participant.address }}
				</p>
				<div class="fw-bold text-secondary">Contact number</div>
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
