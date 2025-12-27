export const ItemLayoutStyle = {
  LIST: 1,
  GRID: 2,
} as const

export type ItemLayoutStyleType = (typeof ItemLayoutStyle)[keyof typeof ItemLayoutStyle]
