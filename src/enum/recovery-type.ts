export const RecoveryType = {
  EMAIL: 1,
} as const

export type RecoveryType = (typeof RecoveryType)[keyof typeof RecoveryType]
