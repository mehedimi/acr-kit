declare global {
  interface AcrApp {
    apiUrl: string
    nonce: string
    name: string
    homeUrl: string
  }

  const acrApp: AcrApp
}

export {}
