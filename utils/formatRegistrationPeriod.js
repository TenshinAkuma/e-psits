/**
 * Formats the given start and end dates into a string in the format "MM/DD/YYYY - MM/DD/YYYY".
 *
 * @param {Date} start - The start date of the event registration. Must be a valid Date object.
 * @param {Date} end - The end date of the event registration. Must be a valid Date object.
 * @returns {string} A string representing the registration period in the format "MM/DD/YYYY - MM/DD/YYYY".
 *
 * @example
 * const registrationStart = new Date("2024-09-01");
 * const registrationEnd = new Date("2024-10-01");
 * console.log(formatRegistrationPeriod(registrationStart, registrationEnd));
 * // Output: "09/01/2024 - 10/01/2024"
 */
export function formatRegistrationPeriod(start, end) {
  // Convert the start date to a localized string in the format "MM/DD/YYYY"
  const startDate = start.toLocaleDateString("en-US", {
    year: "numeric", // Include the year in the output (e.g., "2024")
    month: "numeric", // Use the numeric form of the month (e.g., "09" for September)
    day: "numeric", // Use the numeric form of the day (e.g., "01" for the first day of the month)
  });

  // Convert the end date to a localized string in the same "MM/DD/YYYY" format
  const endDate = end.toLocaleDateString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  // Return a formatted string in the form "startDate - endDate" (e.g., "09/01/2024 - 10/01/2024")
  return `${startDate} - ${endDate}`;
}
