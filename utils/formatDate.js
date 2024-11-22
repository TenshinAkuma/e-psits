/**
 * Formats a given Date object into a string with the format "Month day, year, day of the week".
 *
 * Example:
 *  - Input: new Date('2024-10-22')
 *  - Output: "October 22, 2024, Tuesday"
 *
 * @param {Date} date - The Date object to be formatted.
 * @returns {string} - A formatted date string.
 *
 * Usage:
 *  const formattedDate = formatDate(new Date());
 *  console.log(formattedDate); // Example: "October 22, 2024, Tuesday"
 */
export function formatDate(date) {
  // Define options for formatting the date
  const dateToFormat = new Date(date);
  const options = {
    weekday: "long", // Full name of the day (e.g., "Tuesday")
    year: "numeric", // Full year (e.g., "2024")
    month: "long", // Full name of the month (e.g., "October")
    day: "numeric", // Day of the month as a number (e.g., "22")
  };

  // Use Intl.DateTimeFormat to format the date based on the provided options
  return new Intl.DateTimeFormat("en-US", options).format(dateToFormat);
}
