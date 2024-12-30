<template>
	<div>
		<div class="mb-3">
			<RulesCreate :rulesId="0" />
		</div>
		<ul class="list-group">
			<li class="list-group-item p-3">
				<div class="d-flex justify-content-between">
					<p class="fw-bold m-0">Name</p>
					<div class="hstack gap-2">
						<button class="btn btn-sm">
							<i class="bi bi-pencil-fill" />
						</button>
						<button class="btn btn-sm">
							<i class="bi bi-trash-fill" />
						</button>
					</div>
				</div>
				<p class="fs-7 text-secondary lh-sm">Description</p>
			</li>
		</ul>
	</div>
</template>

<script setup></script>

<style></style>
