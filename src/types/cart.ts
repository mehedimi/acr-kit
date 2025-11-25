export interface Cart {
  id: string
  idPlain: string
  firstName?: string | null
  lastName?: string | null
  email?: string | null
  phone?: string | null
  isGuest: boolean
  lineItems: LineItem[] // or replace `any` with a proper LineItem type if available
  ipAddress: string
  totalPrice: number
  currency: string
  createdAt: string // or Date if you convert it
  updatedAt: string // or Date if you convert it
}

export interface LineItem {
  id: string
  name: string
  price: number
  quantity: number
  tax: number
  thumbnailMd: string
  thumbnailSm: string
}
