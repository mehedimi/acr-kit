import { getLocalTimeZone, toZoned, parseAbsolute } from '@internationalized/date'

const intervals = [
  ['year', 31536000],
  ['month', 2592000],
  ['week', 604800],
  ['day', 86400],
  ['hour', 3600],
  ['minute', 60],
  ['second', 1],
] as const

const formatter = new Intl.RelativeTimeFormat(acrApp.locale.replace('_', '-'), {
  numeric: 'auto',
})

export function timeAgo(date: Date) {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000)

  for (const [unit, value] of intervals) {
    const count = Math.floor(seconds / value)
    if (Math.abs(count) >= 1) {
      // Past dates must be negative for RelativeTimeFormat
      return formatter.format(-count, unit)
    }
  }

  return 'just now'
}

export function formatUtcToHuman(utcDate: string) {
  const zdt = parseAbsolute(utcDate, 'UTC')

  return timeAgo(toZoned(zdt, getLocalTimeZone()).toDate())
}
