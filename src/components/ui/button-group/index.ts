import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export { default as ButtonGroup } from './ButtonGroup.vue'
export { default as ButtonGroupSeparator } from './ButtonGroupSeparator.vue'
export { default as ButtonGroupText } from './ButtonGroupText.vue'

export const buttonGroupVariants = cva(
  "acr:flex acr:w-fit acr:items-stretch acr:[&>*]:focus-visible:z-10 acr:[&>*]:focus-visible:relative acr:[&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit acr:[&>input]:flex-1 acr:has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-md acr:has-[>[data-slot=button-group]]:gap-2",
  {
    variants: {
      orientation: {
        horizontal:
          'acr:[&>*:not(:first-child)]:rounded-l-none acr:[&>*:not(:first-child)]:border-l-0 acr:[&>*:not(:last-child)]:rounded-r-none',
        vertical:
          'acr:flex-col acr:[&>*:not(:first-child)]:rounded-t-none acr:[&>*:not(:first-child)]:border-t-0 acr:[&>*:not(:last-child)]:rounded-b-none',
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
    },
  },
)

export type ButtonGroupVariants = VariantProps<typeof buttonGroupVariants>
