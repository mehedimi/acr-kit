import type { ClassValue } from 'clsx'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function names(names: (string | null | undefined)[], defaultName = '—') {
  const n = names.filter(Boolean)
  return n.length ? n.join(' ') : defaultName
}

export function formatPrice(value: number, currency = 'USD') {
  return new Intl.NumberFormat(acrApp.locale.replace('_', '-'), {
    style: 'currency',
    currency,
  }).format(value)
}

export function minutesToHumanReadable(totalMinutes: number): string {
  const minutes = totalMinutes
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(minutes / (60 * 24))
  const weeks = Math.floor(minutes / (60 * 24 * 7))

  if (weeks >= 1) return weeks === 1 ? '1 week' : `${weeks} weeks`
  if (days >= 1) return days === 1 ? '1 day' : `${days} days`
  if (hours >= 1) return hours === 1 ? '1 hour' : `${hours} hours`
  return minutes === 1 ? '1 minute' : `${minutes} minutes`
}

export function percentFrom(part: number, total: number): number {
  if (total === 0) return 0
  return (part / total) * 100
}

export function spaceNormalize(value?: string): [number, number, number, number] {
  if (!value) return [0, 0, 0, 0]

  // Split by space and convert to integer
  const parts = value
    .trim()
    .split(/\s+/)
    .map((v) => parseInt(v, 10))

  // CSS shorthand expansion rules
  switch (parts.length) {
    case 1:
      // @ts-ignore
      return [parts[0], parts[0], parts[0], parts[0]]
    case 2:
      // @ts-ignore
      return [parts[0], parts[1], parts[0], parts[1]]
    case 3:
      // @ts-ignore
      return [parts[0], parts[1], parts[2], parts[1]]
    case 4:
      // @ts-ignore
      return [parts[0], parts[1], parts[2], parts[3]]
    default:
      return [0, 0, 0, 0]
  }
}
