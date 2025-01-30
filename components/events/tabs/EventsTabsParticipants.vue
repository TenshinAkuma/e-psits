<template>
	<div
		v-if="eventRegistrations == null || eventRegistrations.length == 0"
		class="d-flex flex-column justify-content-center align-items-center"
		style="height: 576px">
		<p class="fs-7">No participants as of now.</p>
	</div>
	<div v-else>
		<div class="row">
			<div v-for="registration in eventRegistrations"
				:key="registration.id"
				class="col-3 border border-secondary rounded-3 p-3">
				<Avatar
					:name="`${registration.participants.first_name} ${registration.participants.last_name}`"
					:gender="registration.participants.sex"
					size="72px"
					class="mb-2" />
				<p class="avatar-link text-dark fw-bold m-0"
					style="width: max-content"
					@click="navigateTo(`/admin/participants/${registration.participants.id}`)">
					{{ `${registration.participants.first_name} ${registration.participants.last_name}` }}
				</p>
				<p class="avatar-link text-secondary m-0"
					style="cursor: pointer; font-size: 0.8rem"
					@click="navigateTo(`/admin/institutions/${registration.participants.institutions.id}`)">
					{{ registration.participants.institutions.name }}
				</p>
				<br />
			</div>
		</div>
	</div>
</template>

<script setup>
	const eventRegistrations = useEventRegistrations();
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
