export interface SelectOption {
  label: string
  value: string
}

export const emailSafeFonts: SelectOption[] = [
  // Sans-serif
  { label: 'Arial', value: 'Arial, Helvetica, sans-serif' },
  { label: 'Helvetica', value: 'Helvetica, Arial, sans-serif' },
  { label: 'Verdana', value: 'Verdana, Geneva, sans-serif' },
  { label: 'Tahoma', value: 'Tahoma, Verdana, sans-serif' },
  { label: 'Trebuchet MS', value: '"Trebuchet MS", Helvetica, sans-serif' },
  { label: 'Segoe UI', value: '"Segoe UI", Arial, sans-serif' },
  { label: 'Roboto', value: 'Roboto, Arial, sans-serif' },

  // Serif
  { label: 'Times New Roman', value: '"Times New Roman", Times, serif' },
  { label: 'Times', value: 'Times, "Times New Roman", serif' },
  { label: 'Georgia', value: 'Georgia, serif' },

  // Monospace
  { label: 'Courier New', value: '"Courier New", Courier, monospace' },
  { label: 'Courier', value: 'Courier, "Courier New", monospace' },
  { label: 'Consolas', value: 'Consolas, monospace' },
  { label: 'Menlo', value: 'Menlo, monospace' },
  { label: 'Roboto Mono', value: '"Roboto Mono", monospace' },
]

export const fontSizes = [
  '8px',
  '10px',
  '12px',
  '14px',
  '16px',
  '18px',
  '20px',
  '24px',
  '28px',
  '32px',
  '36px',
  '40px',
  '48px',
  '56px',
  '64px',
  '72px',
]

export const lineHeights = ['1', '1.1', '1.2', '1.3', '1.4', '1.5', '1.6', '1.7', '1.8', '2']

export const textTypes = [
  { label: 'Heading 1', value: 1 },
  { label: 'Heading 2', value: 2 },
  { label: 'Heading 3', value: 3 },
  { label: 'Heading 4', value: 4 },
  { label: 'Heading 5', value: 5 },
  { label: 'Heading 6', value: 6 },
  { label: 'Paragraph', value: 'p' },
] as const
