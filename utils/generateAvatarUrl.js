/**
 * Generates a URL for an avatar image based on gender and name.
 *
 * @param {string} gender - The gender of the avatar, e.g., "Male" or "Female".
 * @param {string} name - The name to be included in the avatar URL.
 * @returns {string} - A URL string pointing to the generated avatar image.
 *
 * @example
 * // Example usage:
 * const avatarSrc = generateAvatarUrl("Male", "JohnDoe");
 * console.log(avatarSrc);
 * // Output: https://avatar.iran.liara.run/public/boy?username=JohnDoe
 */
export const generateAvatarUrl = (gender, name) => {
	// Determine the avatar gender based on the input
	const avatarGender = gender.toLowerCase() === "male" ? "boy" : "girl";

	// Construct and return the avatar URL
	return `https://avatar.iran.liara.run/public/${avatarGender}?username=${name}`;
};
