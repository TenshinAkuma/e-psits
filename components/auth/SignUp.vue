<template>
	<div class="d-flex gap-5 py-5 overflow-hidden h-100">
		<div
			class="d-flex flex-column justify-content-between"
			style="width: 720px">
			<div class="mb-5">
				<slot name="header">
					<h1 class="fw-bold lh-sm">
						Collaborate and Innovate for the Future
					</h1>
					<h5 class="text-secondary lh-sm">
						Sign up now and streamline your experience, and
						connect with other
						<code class="fw-bold text-primary"
							>Information Technology Students</code
						>
						across the region.
					</h5>
				</slot>
			</div>
			<div class="overflow-y-auto">
				<slot name="body" />
			</div>
		</div>
		<div class="rounded-3 overflow-hidden">
			<img
				src="public/img/sign-in-bg-img.png"
				alt="image"
				class="object-fit-cover h-100 w-100" />
		</div>
	</div>
</template>

<script setup></script>

<style></style>
