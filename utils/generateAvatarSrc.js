/**
 * Generates the avatar source URL based on gender and avatar name.
 * @param {string} gender - The gender of the user ("Male" or "Female").
 * @param {string} avatarName - The username for the avatar.
 * @returns {string} - The generated avatar URL.
 */
export const generateAvatarSrc = (gender, avatarName) => {
	// Determine avatar gender based on the provided gender
	const avatarGender = gender === "Male" ? "boy" : "girl";

	// Construct and return the avatar URL using the avatar gender and name
	return `https://avatar.iran.liara.run/public/${avatarGender}?username=${avatarName}`;
};
