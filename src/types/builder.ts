import type { CSSProperties } from 'vue'
import type { ItemLayoutStyleType } from '@/enum/item-layout-style.ts'

export interface Element<T> {
  type: T
  style: CSSProperties
  sectionStyle: CSSProperties
  isEditing?: boolean
}

export interface ButtonElement extends Element<'Button'> {
  text: string
  href: string
}

export interface TextElement extends Element<'Text'> {
  text: string
}

export interface ImageElement extends Element<'Image'> {
  src: string
  alt: string
}

export interface CartItemsElement extends Element<'CartItems'> {
  options: {
    layout: ItemLayoutStyleType
    gridItems: number
    gap: number
    listItemSize: number
  }
  imgStyle: CSSProperties
  titleStyle: CSSProperties
  priceStyle: CSSProperties
}

export type AnyElement = ButtonElement | TextElement | ImageElement | CartItemsElement

export type ElementType = AnyElement['type']

export interface Template {
  style: CSSProperties
  bodyStyle: CSSProperties
  elements: Array<AnyElement>
}
