export interface Event {
  title: string; // The event's title as a string
  description: string; // The event's description as a string
  category: string; // The event's category as a string
  time_start: Date | null; // Start time of the event, can be a Date object or null
  time_end: Date | null; // End time of the event, can be a Date object or null
  date: Date | null; // Event date as a Date object or null
  venue: string; // The event venue as a string
  address: string; // The event address as a string
  registration_start: Date | null; // Registration start date, Date object or null
  registration_end: Date | null; // Registration end date, Date object or null
}
