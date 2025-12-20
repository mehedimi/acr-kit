export const TabFavicon = {
  DISABLE: 0,
  EMOJI: 1,
}

export type TabFaviconType = (typeof TabFavicon)[keyof typeof TabFavicon]
