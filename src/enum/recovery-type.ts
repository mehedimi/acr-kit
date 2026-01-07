export const RecoveryType = {
  EMAIL: 2,
  PUSH: 3,
} as const

export type RecoveryType = (typeof RecoveryType)[keyof typeof RecoveryType]
