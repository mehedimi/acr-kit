import type { CSSProperties } from 'vue'

export interface Element<T> {
  type: T
  style: CSSProperties
  sectionStyle: CSSProperties
}

export interface ButtonElement extends Element<'Button'> {
  text: string
  href: string
}

export interface TextElement extends Element<'Text'> {
  text: string
}

export interface HeadingElement extends Element<'Heading'> {
  text: string
  heading: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export interface ImageElement extends Element<'Image'> {
  src: string
  alt: string
}

export type AnyElement = ButtonElement | TextElement | ImageElement

export type ElementType = AnyElement['type']

export interface Template {
  style: CSSProperties
  bodyStyle: CSSProperties
  elements: Array<AnyElement>
}
