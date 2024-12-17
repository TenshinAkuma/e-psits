/**
 * Debounce Function
 *
 * This utility function ensures that a given function is executed only after a specified
 * delay has passed since the last time it was called. This is useful for optimizing
 * performance in cases such as handling user input events, API requests, or resizing events.
 *
 * @param {Function} func - The function to be debounced.
 * @param {number} wait - The delay in milliseconds to wait before executing the function.
 * @returns {Function} - A debounced version of the given function.
 */
export function debounce(func, wait) {
	// Initialize a variable to store the timer ID
	let timeout;

	// Return a new function that wraps the original function
	return function (...args) {
		// Save the context of the current function call
		const context = this;

		// Clear any existing timer to reset the delay
		clearTimeout(timeout);

		// Set a new timer to call the function after the specified delay
		timeout = setTimeout(() => {
			func.apply(context, args); // Execute the original function with the proper context and arguments
		}, wait);
	};
}
