// "jul '26"
export function formatMonth(date: Date) {
  return date
    .toLocaleDateString("en-US", { month: "short", year: "2-digit", timeZone: "UTC" })
    .toLowerCase()
    .replace(" ", " '");
}
