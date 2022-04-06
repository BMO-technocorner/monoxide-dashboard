import dayjs from "dayjs";

export function getMinutesBetweenDates(startDate: string) {
  const start = dayjs(startDate);
  const end = dayjs();

  const diff = end.diff(start, "minutes");

  return diff;
}
