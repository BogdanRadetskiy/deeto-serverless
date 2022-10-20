export function buildBrowserDetails(browser, system, date) {
  if (!browser || !system || !date) {
    throw new Error('BuildBrowserDetails invalid input ');
  }
  return `${browser}, ${system} at ${date}`;
}
