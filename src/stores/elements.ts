import type { AnyElement } from '@/types/builder.ts'

export const elements: Array<AnyElement> = [
  {
    type: 'Button',
    href: '[cart-url]',
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
      textAlign: 'left',
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
]
