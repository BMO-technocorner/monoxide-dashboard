import dayjs from "dayjs";

export function getMinutesBetweenDates(startDate: string) {
  const start = dayjs(startDate);
  const end = dayjs();

  const diff = end.diff(start, "minutes");

  return diff;
}

export function getQueryVariable(variable: string) {
  if (typeof window !== "undefined") {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (decodeURIComponent(pair[0]) == variable) {
        return decodeURIComponent(pair[1]);
      }
    }
  }
}
