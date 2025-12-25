import type { AnyElement } from '@/types/builder.ts'
import { ItemLayoutStyle } from '@/enum/item-layout-style.ts'

export const elements: Array<AnyElement> = [
  {
    type: 'Button',
    href: '[cart-link]',
    text: 'Go to your cart!',
    style: {
      display: 'inline-block',
      padding: '12px 20px',
      backgroundColor: '#007bff',
      color: '#ffffff',
      textDecoration: 'none',
      borderRadius: '4px',
      fontSize: '14px',
      fontWeight: 'bold',
      lineHeight: '1.2',
    },
    sectionStyle: {
      textAlign: 'center',
      marginTop: '10px',
      marginBottom: '10px',
    },
  },
  {
    type: 'Text',
    text: '<p>Your default text goes here.</p>',
    style: {
      fontSize: '14px',
      lineHeight: '1.5',
      color: '#333333',
      fontFamily: 'Arial, sans-serif',
      padding: '0 10px 0 10px',
    },
    sectionStyle: {
      marginTop: '10px',
      marginBottom: '10px',
    },
  },
  {
    type: 'Image',
    src: '',
    alt: 'Image description',
    style: {
      maxWidth: '100%',
      display: 'inline-block',
    },
    sectionStyle: {
      textAlign: 'center',
      marginTop: '10px',
      marginBottom: '10px',
    },
  },
  {
    type: 'CartItems',
    options: {
      layout: ItemLayoutStyle.LIST,
      gridItems: 2,
      listItemSize: 40,
      gap: 4,
    },
    imgStyle: {
      maxWidth: '100%',
      display: 'inline-block',
    },
    style: {
      padding: '0',
    },
    titleStyle: {
      margin: '2px 0 2px 0',
    },
    priceStyle: {
      margin: '2px 0 2px 0',
    },
    sectionStyle: {
      marginTop: '10px',
      marginBottom: '10px',
    },
  },
]
