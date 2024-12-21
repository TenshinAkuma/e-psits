<template>
	<nav>
		<div class="nav nav-tabs" id="nav-tab" role="tablist">
			<slot>
				<button
					class="nav-link active"
					id="nav-home-tab"
					data-bs-toggle="tab"
					data-bs-target="#nav-home"
					type="button"
					role="tab"
					aria-controls="nav-home"
					aria-selected="true">
					Tab Header
				</button>
			</slot>
		</div>
	</nav>
</template>
