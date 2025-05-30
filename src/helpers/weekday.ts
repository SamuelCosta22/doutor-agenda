import "dayjs/locale/pt-br";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.locale("pt-br");

export const formatWeekDay = (date: dayjs.Dayjs) => {
  return (
    date.format("dddd").split("-")[0].charAt(0).toUpperCase() +
    date.format("dddd").split("-")[0].slice(1)
  );
};
