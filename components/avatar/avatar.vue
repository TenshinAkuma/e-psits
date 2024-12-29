<template>
	<div class="d-flex align-items-center gap-3">
		<div
			class="ratio ratio-1x1 border rounded-circle border overflow-hidden"
			:style="{ width: size + 'px' }">
			<img
				:src="generateAvatarSrc()"
				alt="profile_image"
				class="h-100 w-100" />
		</div>

		<div class="">
			<slot name="name">
				<div class="m-0">{{ name }}</div>
			</slot>
		</div>
	</div>
</template>

<script setup>
	const props = defineProps({
		name: String,
		gender: String,
		size: String,
	});

	const generateAvatarSrc = () => {
		// Determine avatar gender based on the provided gender
		const avatarGender = props.gender === "Male" ? "boy" : "girl";

		// Construct and return the avatar URL using the avatar gender and name
		return `https://avatar.iran.liara.run/public/${avatarGender}?username=${props.name}`;
	};
</script>

<style></style>
