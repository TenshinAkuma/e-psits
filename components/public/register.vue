<template>
	<section class="row justify-content-center py-5 h-100">
		<div class="col-12 col-md-8 col-lg-5 p-3">
			<div class="d-flex flex-column justify-content-between h-100">
				<div class="">
					<slot name="header">
						<h1 class="fw-bold lh-sm">
							Collaborate and Innovate for the Future
						</h1>
						<h5 class="text-secondary lh-sm">
							Register now and streamline your experience,
							and connect with other
							<code class="fw-bold text-primary"
								>Information Technology Students</code
							>
							across the region.
						</h5>
					</slot>
				</div>
				<div class="">
					<slot name="body" />
				</div>
			</div>
		</div>

		<div class="d-none d-lg-block col-lg-7 p-3">
			<div class="rounded-3 overflow-hidden h-100">
				<img
					src="public/img/sign-in-bg-img.png"
					alt="image"
					class="object-fit-cover h-100 w-100" />
			</div>
		</div>
	</section>
</template>

<script setup></script>

<style></style>
