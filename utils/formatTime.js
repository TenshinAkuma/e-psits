/**
 * Formats a given date into a human-readable time string.
 *
 * @function formatTime
 * @param {string|Date} date - The input date to format. It can be a date string or a JavaScript Date object.
 * @returns {string} A formatted time string in the "hh:mm AM/PM" format (e.g., "02:15 PM").
 *
 * @example
 * // For a date string
 * const time = formatTime("2024-12-22T14:15:00");
 * console.log(time); // Output: "02:15 PM"
 *
 * @example
 * // For a Date object
 * const now = new Date();
 * const time = formatTime(now);
 * console.log(time); // Output: "hh:mm AM/PM" based on the current time
 *
 * @remarks
 * - Uses the `toLocaleTimeString` method to ensure the time format adheres to the user's locale preferences.
 * - The options object `{ hour: "2-digit", minute: "2-digit" }` ensures a consistent 2-digit hour and minute format.
 */
export const formatTime = (date) =>
	new Date(date).toLocaleTimeString([], {
		hour: "2-digit", // Ensures the hour is displayed as two digits (e.g., "02" instead of "2").
		minute: "2-digit", // Ensures the minute is displayed as two digits (e.g., "15").
	});
