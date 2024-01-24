import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import relativeTime from 'dayjs/plugin/relativeTime'
import advancedFormat from 'dayjs/plugin/advancedFormat'

dayjs.extend(duration)
dayjs.extend(relativeTime)
dayjs.extend(advancedFormat)

export const parseDuration = (duration: number): string => {
  const durationObject = dayjs.duration(duration, 'seconds')

  return durationObject.format(
    `${durationObject.hours() ? 'H[h]' : ''} ${
      durationObject.minutes() ? 'm[m]' : ''
    } ${durationObject.minutes() ? '' : 's[s]'}`
  )
}

export const parseDate = (date: string): string => dayjs(date).format('HH:mm, Do MMM')
