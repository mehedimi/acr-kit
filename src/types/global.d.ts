import type { TabUtilities } from '@/types/utilities.ts'

declare global {
  interface AcrKitApp {
    apiUrl: string
    nonce: string
    name: string
    homeUrl: string
    assetUrl: string
    appToken?: string
    appUrl: string
    locale: string
    currency: string
    utilities?: {
      tab?: TabUtilities['config']
    }
  }

  const acrKitApp: AcrKitApp
}

export {}

export type SnakeCase<S extends string> = S extends `${infer T}${infer U}`
  ? `${T extends Capitalize<T> ? '_' : ''}${Lowercase<T>}${SnakeCase<U>}`
  : S
