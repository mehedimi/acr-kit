declare global {
  interface AcrApp {
    apiUrl: string
    nonce: string
    name: string
    homeUrl: string
    assetUrl: string
    appToken?: string
    appUrl: string
    locale: string
  }

  const acrApp: AcrApp
}

export {}

export type SnakeCase<S extends string> = S extends `${infer T}${infer U}`
  ? `${T extends Capitalize<T> ? '_' : ''}${Lowercase<T>}${SnakeCase<U>}`
  : S
