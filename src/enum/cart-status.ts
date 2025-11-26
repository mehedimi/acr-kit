export const CartStatus = {
  ACTIVE: 1,
  ABANDONED: 2,
  RECOVERED: 3,
  COMPLETED: 4,
  EXPIRED: 5,
} as const

export type CartStatus = (typeof CartStatus)[keyof typeof CartStatus]

export function toStatusTitle(status: CartStatus): string {
  switch (status) {
    case CartStatus.ACTIVE:
      return 'Shopping'
    case CartStatus.ABANDONED:
      return 'Abandoned'
    case CartStatus.RECOVERED:
      return 'Recovered'
    case CartStatus.COMPLETED:
      return 'Completed'
    case CartStatus.EXPIRED:
      return 'Expired'
  }
}

export function toStatusVariant(
  status: CartStatus,
): 'secondary' | 'default' | 'destructive' | 'outline' {
  switch (status) {
    case CartStatus.RECOVERED:
    case CartStatus.COMPLETED:
      return 'default'
    case CartStatus.ACTIVE:
      return 'secondary'
    case CartStatus.ABANDONED:
      return 'outline'
    case CartStatus.EXPIRED:
      return 'destructive'
  }
}
