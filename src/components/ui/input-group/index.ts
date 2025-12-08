import type { VariantProps } from 'class-variance-authority'
import type { HTMLAttributes } from 'vue'
import type { ButtonVariants } from '@/components/ui/button'
import { cva } from 'class-variance-authority'

export { default as InputGroup } from './InputGroup.vue'
export { default as InputGroupAddon } from './InputGroupAddon.vue'
export { default as InputGroupButton } from './InputGroupButton.vue'
export { default as InputGroupInput } from './InputGroupInput.vue'
export { default as InputGroupText } from './InputGroupText.vue'
export { default as InputGroupTextarea } from './InputGroupTextarea.vue'

export const inputGroupAddonVariants = cva(
  "acr:text-muted-foreground acr:flex acr:h-auto acr:cursor-text acr:items-center acr:justify-center acr:gap-2 acr:py-1.5 acr:text-sm acr:font-medium acr:select-none acr:[&>svg:not([class*='size-'])]:size-4 acr:[&>kbd]:rounded-[calc(var(--radius)-5px)] acr:group-data-[disabled=true]/input-group:opacity-50",
  {
    variants: {
      align: {
        'inline-start':
          'acr:order-first acr:pl-3 acr:has-[>button]:ml-[-0.45rem] acr:has-[>kbd]:ml-[-0.35rem]',
        'inline-end':
          'acr:order-last acr:pr-3 acr:has-[>button]:mr-[-0.45rem] acr:has-[>kbd]:mr-[-0.35rem]',
        'block-start':
          'acr:order-first acr:w-full acr:justify-start acr:px-3 acr:pt-3 acr:[.border-b]:pb-3 acr:group-has-[>input]/input-group:pt-2.5',
        'block-end':
          'acr:order-last acr:w-full acr:justify-start acr:px-3 acr:pb-3 acr:[.border-t]:pt-3 acr:group-has-[>input]/input-group:pb-2.5',
      },
    },
    defaultVariants: {
      align: 'inline-start',
    },
  },
)

export type InputGroupVariants = VariantProps<typeof inputGroupAddonVariants>

export const inputGroupButtonVariants = cva(
  'acr:text-sm acr:shadow-none acr:flex acr:gap-2 acr:items-center',
  {
    variants: {
      size: {
        xs: "acr:h-6 acr:gap-1 acr:px-2 acr:rounded-[calc(var(--radius)-5px)] acr:[&>svg:not([class*='size-'])]:size-3.5 acr:has-[>svg]:px-2",
        sm: 'acr:h-8 acr:px-2.5 acr:gap-1.5 acr:rounded-md acr:has-[>svg]:px-2.5',
        'icon-xs': 'acr:size-6 acr:rounded-[calc(var(--radius)-5px)] acr:p-0 acr:has-[>svg]:p-0',
        'icon-sm': 'acr:size-8 acr:p-0 acr:has-[>svg]:p-0',
      },
    },
    defaultVariants: {
      size: 'xs',
    },
  },
)

export type InputGroupButtonVariants = VariantProps<typeof inputGroupButtonVariants>

export interface InputGroupButtonProps {
  variant?: ButtonVariants['variant']
  size?: InputGroupButtonVariants['size']
  class?: HTMLAttributes['class']
}
