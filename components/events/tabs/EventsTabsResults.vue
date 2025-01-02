<template>
	<div>
		<div class="mb-3">
			<ResultsCreate />
		</div>
		<div class="table-responsive">
			<table class="table table-borderless align-middle">
				<thead>
					<tr>
						<th scope="col">Participant</th>
						<th scope="col">Total</th>
					</tr>
				</thead>
				<tbody>
				</tbody>
			</table>
		</div>
		{{ eventScores }}
	</div>
</template>

<script setup>
	const eventScores = useEventScores();

</script>
