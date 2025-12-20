export const TabTriggerMode = {
  ALWAYS: 1,
  CART_ITEM: 2,
} as const

export type TabTriggerModeType = (typeof TabTriggerMode)[keyof typeof TabTriggerMode]
