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
