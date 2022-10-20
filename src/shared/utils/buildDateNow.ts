export function buildDateNow() {
  return new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'long' }).format(new Date(Date.now()));
}

export function addDays(date: Date, days: number) {
  const timeLoopDate = new Date(date);
  timeLoopDate.setDate(timeLoopDate.getDate() + days);
  return timeLoopDate;
}

export function addHours(date: Date, hours: number) {
  const timeLoopDate = new Date(date);
  timeLoopDate.setTime(timeLoopDate.getTime() + hours * 60 * 60 * 1000);
  return timeLoopDate;
}
