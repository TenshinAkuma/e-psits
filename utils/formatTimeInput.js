/**
 * Converts a Date object into a time string (e.g., "10:30").
 *
 * @param {Date} date - The Date object to format.
 * @returns {string} - The formatted time string in "HH:mm" format.
 */
export const formatTimeInput = (date) => {
	if (!(date instanceof Date)) {
		throw new Error("Invalid argument: Expected a Date object.");
	}

	// Extract hours and minutes from the Date object
	const hours = date.getHours(); // Returns hours (0-23)
	const minutes = date.getMinutes(); // Returns minutes (0-59)

	// Format hours and minutes to always have two digits
	// const formattedHours = String(hours).padStart(2, "0");
	// const formattedMinutes = String(minutes).padStart(2, "0");

	// Combine hours and minutes into "HH:mm" format
	return `${hours}:${minutes}`;
};
