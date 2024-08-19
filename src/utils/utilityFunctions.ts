import { subDays, subMonths, addDays, subYears } from "date-fns";

export async function downloadFile(url: string) {
  const link = document.createElement("a");
  link.href = url;
  link.target = "_blank";

  link.click();
  link.remove();
}

export function getISODate(date: Date) {
  return date.toISOString().split("T")[0];
}

export function prepareFiltersDate() {
  const dateBeforeExact = getISODate(new Date());
  const dateBeforeOneDayBehind = getISODate(subDays(dateBeforeExact, 1));
  const dateBeforeOneDayAhead = getISODate(addDays(dateBeforeExact, 1));

  const sixMonthsAgo = getISODate(subMonths(dateBeforeOneDayAhead, 6));
  const oneMonthAgo = getISODate(subMonths(dateBeforeOneDayAhead, 1));
  const oneYearAgo = getISODate(subYears(dateBeforeOneDayAhead, 1));

  return {
    dateBefore: dateBeforeOneDayBehind,
    dateAfter: {
      sixMonthsAgo,
      oneMonthAgo,
      oneYearAgo,
    },
  };
}
