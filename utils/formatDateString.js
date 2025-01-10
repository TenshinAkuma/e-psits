// /**
//  * Converts a date string (YYYY-MM-DD) into a formatted date string.
//  * @param {string} dateString - The date in YYYY-MM-DD format.
//  * @returns {string} - The formatted date in "Monday, December 23, 2024" format.
//  */
// export function formatDateString(dateString) {
// 	if (!dateString) return "";

// 	const date = new Date(dateString);
// 	return date.toLocaleDateString("en-US", {
// 		weekday: "long",
// 		year: "numeric",
// 		month: "long",
// 		day: "numeric",
// 	});
// }

/**
 * Formats a Date object into "Friday, December 20, 2024, 08:30 AM".
 * @param {Date} date - The Date object to format.
 * @returns {string} The formatted date string.
 */
export function formatDateString(date) {
	if (!date) return "No available date";
	const _date = new Date(date);

	const options = {
		weekday: "long", // Full name of the day (e.g., Friday)
		year: "numeric", // Full year (e.g., 2024)
		month: "long", // Full month name (e.g., December)
		day: "numeric", // Day of the month (e.g., 20)
		hour: "2-digit", // Hour with leading zero if necessary
		minute: "2-digit", // Minutes with leading zero if necessary
		hour12: true, // Display in 12-hour format
	};

	return _date.toLocaleString("en-US", options);
}
