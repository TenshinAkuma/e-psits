<template>
	<div class="tab-content" id="nav-tabContent">
		<slot>
			<div
				class="tab-pane fade show active"
				id="nav-home"
				role="tabpanel"
				aria-labelledby="nav-home-tab"
				tabindex="0">
				Tab Content
			</div>
		</slot>
	</div>
</template>
