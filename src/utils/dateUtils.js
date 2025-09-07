export function formatYYYYMMDD(date) {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export function getMonthName(monthIndex) {
  return [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ][monthIndex];
}
