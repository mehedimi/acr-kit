import type { AnyElement } from '@/types/builder.ts'

export const elements: Array<AnyElement> = [
  {
    type: 'Button',
    href: '#',
    text: 'Click here',
    style: {
      display: 'inline-block',
      padding: '12px 20px',
      backgroundColor: '#007bff',
      color: '#ffffff',
      textDecoration: 'none',
      borderRadius: '4px',
      fontSize: '14px',
      fontWeight: 'bold',
      textAlign: 'center',
      lineHeight: '1.2',
      fontFamily: 'Arial, sans-serif',
    },
    sectionStyle: {
      textAlign: 'left',
      margin: '16px 0',
    },
  },
  {
    type: 'Text',
    text: 'Your default text goes here.',
    style: {
      fontSize: '14px',
      lineHeight: '1.5',
      color: '#333333',
      fontFamily: 'Arial, sans-serif',
      margin: '0 0 12px 0',
    },
    sectionStyle: {
      padding: '0',
      margin: '0 0 12px 0',
    },
  },
  {
    type: 'Heading',
    heading: 'h2',
    text: 'Your Heading',
    style: {
      fontSize: '20px',
      lineHeight: '1.3',
      color: '#111111',
      fontFamily: 'Arial, sans-serif',
      fontWeight: 'bold',
      margin: '16px 0 8px 0',
    },
    sectionStyle: {
      padding: '0',
      margin: '16px 0 8px 0',
    },
  },
  {
    type: 'Image',
    src: '',
    alt: 'Image description',
    style: {
      width: '100%',
      maxWidth: '600px',
      display: 'block',
      border: '0',
    },
    sectionStyle: {
      textAlign: 'center',
      margin: '0 0 16px 0',
    },
  },
]
