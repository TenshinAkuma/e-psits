<template>
	<div :id="`avatar-${name}-${id}`" class="d-flex align-items-center gap-3">
		<img
			:src="generateAvatarSrc()"
			alt="profile_image"
			class="ratio ratio-1x1 border rounded-circle border border-dark overflow-hidden"
			:style="{ width: size, height: size }" />

		<div>
			<slot name="Name"/>
		</div>
	</div>
</template>

<script setup>
	const props = defineProps({
		id: String,
		name: String,
		gender: String,
		size: String,
	});

	const generateAvatarSrc = () => {
		// Ensure gender is a valid string, defaulting to "unknown"
		const gender = props.gender?.toLowerCase() || "unknown";

		// Determine avatar gender based on the provided or default gender
		const avatarGender = gender === "male" ? "boy" : "girl";

		// Construct and return the avatar URL using the avatar gender and name
		return `https://avatar.iran.liara.run/public/${avatarGender}?username=${props.name || "guest"
			}`;
	};
</script>

<style></style>
