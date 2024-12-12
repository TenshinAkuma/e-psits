<template>
	<div class="d-flex align-items-center gap-3 p-3 mb-3">
		<div
			class="ratio ratio-1x1 border rounded-circle border overflow-hidden"
			style="width: 72px">
			<img
				:src="generateAvatarSrc(sex, first_name)"
				alt="profile_image"
				class="h-100 w-100" />
		</div>
		<div class="flex-grow-1">
			<a
				class="participant-link text-dark text-decoration-none h4 fw-bold m-0">
				{{ `${first_name} ${surname}` }}
			</a>
			<p class="text-secondary m-0">
				{{ institution }}
			</p>
		</div>

		<RegistrationsStatusUpdate
			:RegistrationStatus="registration_status"
			:ParticipantRegistrationID="registration_id" />
	</div>
</template>

<script setup>
	const props = defineProps({
		first_name: String,
		surname: String,
		sex: String,
		institution: String,
		registration_status: String,
		registration_id: Number,
	});
</script>

<style scoped>
	.participant-link {
		cursor: pointer;
	}

	.participant-link:hover {
		color: #1976d2 !important;
	}
</style>
