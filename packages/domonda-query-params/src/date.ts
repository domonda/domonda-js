/** Strips the time from the passed date and converts it to UTC. It sets only the following: YEAR, MONTH and DATE (leaves the hours to 0 so that the date is not pushed in the past/feature). */
export function stripTime(date: Date) {
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
}

/** Parses the provided string formatted as an ISO date to a UTC date. (Strips time) */
export function parseISOToDate(str: string): Date {
  return stripTime(new Date(str));
}
