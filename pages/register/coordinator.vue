<template>
	<div>
		<PublicRegister>
			<template #header>
				<h1 class="fw-bold lh-sm">
					Lead the Way for the Future Innovators
				</h1>
				<h5 class="text-secondary lh-sm">
					Create your account to represent your school and
					streamline event management effortlessly.
				</h5>
			</template>
			<template #body>
				<form>
					<div class="mb-5">
						<h5 class="fw-bold">Tell Us About Yourself</h5>
						<p
							class="text-secondary lh-sm"
							style="font-size: 0.8rem">
							Your personal information is kept private and
							secure, used only to enhance your experience
							and ensure seamless registration.
						</p>
						<div class="d-flex gap-2 mb-3">
							<input
								type="text"
								class="form-control border-secondary"
								placeholder="First name" />
							<input
								type="text"
								class="form-control border-secondary"
								placeholder="Last name" />
						</div>

						<div class="d-flex gap-3">
							<input
								type="text"
								class="form-control border-secondary mb-3"
								placeholder="Position" />
							<p
								class="text-secondary fst-italic lh-sm"
								style="font-size: 0.8rem">
								Enter your official role or title within
								the institution.
							</p>
						</div>

						<input
							type="email"
							class="form-control border-secondary mb-3"
							placeholder="Email" />
						<input
							type="password"
							class="form-control border-secondary"
							placeholder="Password" />
					</div>
					<div class="d-flex justify-content-between mt-5">
						<NuxtLink to="/register" class="btn hstack gap-2">
							<i class="bi bi-arrow-left" />Back
						</NuxtLink>
						<button
							type="submit"
							class="btn btn-primary px-5">
							Apply
						</button>
					</div>
				</form>
			</template>
		</PublicRegister>
	</div>
</template>

<script setup>
	definePageMeta({
		layout: "auth",
	});
</script>

<style></style>
