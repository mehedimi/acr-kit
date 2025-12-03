export interface Element<T> {
  type: T
  style: Partial<CSSStyleDeclaration>
}

export interface ButtonElement extends Element<'EmailButton'> {
  text: string
  href: string
}

export interface TextElement extends Element<'EmailText'> {
  text: string
}

export interface HeadingElement extends Element<'EmailHeading'> {
  text: string
  heading: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export interface ImageElement extends Element<'EmailImage'> {
  src: string
  alt: string
}

export interface Template {
  style: Record<string, string>
  elements: Array<ButtonElement | TextElement | HeadingElement | ImageElement>
}
