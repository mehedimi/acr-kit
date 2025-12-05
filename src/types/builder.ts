export interface Element<T> {
  type: T
  style: Partial<CSSStyleDeclaration>
  sectionStyle: Partial<CSSStyleDeclaration>
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

export type AnyElement = ButtonElement | TextElement | HeadingElement | ImageElement

export type ElementType = AnyElement['type']

export interface Template {
  style: Partial<CSSStyleDeclaration>
  elements: Array<AnyElement>
}
