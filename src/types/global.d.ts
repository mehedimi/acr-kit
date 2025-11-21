declare global {
  interface AcrApp {
    apiUrl: string
    nonce: string
    name: string
    homeUrl: string
    assetUrl: string
  }

  const acrApp: AcrApp
}

export {}
