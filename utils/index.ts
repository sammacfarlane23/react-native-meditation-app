import dayjs from "dayjs";
import capitalize from "lodash/capitalize";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime"

dayjs.extend(duration)
dayjs.extend(relativeTime)

export const parseDuration = (duration: number) => capitalize(dayjs.duration(duration, "seconds").humanize());
