<template>
	<div class="d-flex align-items-center gap-3 py-2 mb-3">
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
			<h4
				class="participant-card-link text-dark user-select-none fw-bold m-0"
				style="width: max-content">
				<a
					@click="
						navigateTo(
							`/admin/participants/${registration.participants.id}`
						)
					">
					{{
						`${registration.participants.first_name} ${registration.participants.surname}`
					}}
				</a>
			</h4>
			<p
				class="participant-card-link text-secondary user-select-none m-0"
				style="cursor: pointer; width: max-content"
				@click="
					navigateTo(
						`/admin/institutions/${registration.participants.institutions.id}`
					)
				">
				{{ registration.participants.institutions.name }}
			</p>
		</div>

		<RegistrationsStatusUpdate
			:RegistrationStatus="registration.registration_status"
			:ParticipantRegistrationID="registration.id" />
	</div>
</template>

<script setup>
	const props = defineProps({
		registration: {},
	});
</script>

<style scoped>
	.participant-card-link {
		cursor: pointer;
	}

	.participant-card-link:hover {
		color: #1976d2 !important;
	}
</style>
