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
