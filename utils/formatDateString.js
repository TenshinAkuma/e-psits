/**
 * Converts a date string (YYYY-MM-DD) into a formatted date string.
 * @param {string} dateString - The date in YYYY-MM-DD format.
 * @returns {string} - The formatted date in "Monday, December 23, 2024" format.
 */
export function formatDateString(dateString) {
	if (!dateString) return "";

	const date = new Date(dateString);
	return date.toLocaleDateString("en-US", {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	});
}
