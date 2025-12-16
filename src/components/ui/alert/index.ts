import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export { default as Alert } from './Alert.vue'
export { default as AlertDescription } from './AlertDescription.vue'
export { default as AlertTitle } from './AlertTitle.vue'

export const alertVariants = cva(
  'acr:relative acr:w-full acr:rounded-lg acr:border acr:px-4 acr:py-3 acr:text-sm acr:grid acr:has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] acr:grid-cols-[0_1fr] acr:has-[>svg]:gap-x-3 acr:gap-y-0.5 acr:items-start acr:[&>svg]:size-4 acr:[&>svg]:translate-y-0.5 acr:[&>svg]:text-current',
  {
    variants: {
      variant: {
        default: 'acr:bg-card acr:text-card-foreground',
        destructive:
          'acr:text-destructive acr:bg-card acr:[&>svg]:text-current acr:*:data-[slot=alert-description]:text-destructive/90',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export type AlertVariants = VariantProps<typeof alertVariants>
