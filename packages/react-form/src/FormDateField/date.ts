/**
 *
 * FormDateField/date
 *
 */

/** Strips the time from the passed date and converts it to UTC. It sets only the following: YEAR, MONTH and DATE (leaves the hours to 0 so that the date is not pushed in the past/feature). */
export function stripTime(date: Date) {
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
}
