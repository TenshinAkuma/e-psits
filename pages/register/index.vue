<template>
	<div>
		<PublicRegister>
			<template #body>
				<h5 class="fw-bold lh-sm">Who Are You Registering For?</h5>
				<p class="text-secondary" style="font-size: 0.9rem">
					Choose your registration type to get started—whether as
					a participant or as an institution representative.
				</p>

				<div class="d-flex flex-column gap-3">
					<div
						@click="ToRegisterPage('participant')"
						class="role-select d-flex align-items-center border border-secondary rounded-3 gap-4 p-4 w-100">
						<i class="bi bi-person-fill fs-5" />
						<div>
							<div class="fw-bold">Participant</div>
							<p class="m-0" style="font-size: 0.8rem">
								Sign up as an individual to participate
								in events and activities.
							</p>
						</div>
					</div>

					<div
						@click="ToRegisterPage('coordinator')"
						class="role-select d-flex align-items-center border border-secondary rounded-3 gap-4 p-4 w-100">
						<i class="bi bi-building-fill fs-5" />
						<div>
							<div class="fw-bold">
								School or Institution
							</div>
							<p class="m-0" style="font-size: 0.8rem">
								Register your school or institution to
								represent and manage participants.
							</p>
						</div>
					</div>
				</div>
			</template>
		</PublicRegister>
	</div>
</template>

<script setup>
	definePageMeta({
		layout: "auth",
	});

	const ToRegisterPage = (route) => {
		navigateTo(`/register/${route}`);
	};
</script>

<style scoped>
	.role-select:hover {
		cursor: pointer;
		border: solid 1px #0d6efd !important;
		color: #0d6efd !important;
	}
</style>
