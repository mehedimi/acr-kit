import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export { default as Badge } from './Badge.vue'

export const badgeVariants = cva(
  'acr:inline-flex acr:items-center acr:justify-center acr:rounded-full acr:border acr:px-2 acr:py-0.5 acr:text-xs acr:font-medium acr:w-fit acr:whitespace-nowrap acr:shrink-0 acr:[&>svg]:size-3 acr:gap-1 acr:[&>svg]:pointer-events-none acr:focus-visible:border-ring acr:focus-visible:ring-ring/50 acr:focus-visible:ring-[3px] acr:aria-invalid:ring-destructive/20 acr:dark:aria-invalid:ring-destructive/40 acr:aria-invalid:border-destructive acr:transition-[color,box-shadow] acr:overflow-hidden',
  {
    variants: {
      variant: {
        default:
          'acr:border-transparent acr:bg-primary acr:text-primary-foreground acr:[a&]:hover:bg-primary/90',
        secondary:
          'acr:border-transparent acr:bg-secondary acr:text-secondary-foreground acr:[a&]:hover:bg-secondary/90',
        destructive:
          'acr:border-transparent acr:bg-destructive acr:text-white acr:[a&]:hover:bg-destructive/90 acr:focus-visible:ring-destructive/20 acr:dark:focus-visible:ring-destructive/40 acr:dark:bg-destructive/60',
        outline:
          'acr:text-foreground acr:[a&]:hover:bg-accent acr:[a&]:hover:text-accent-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)
export type BadgeVariants = VariantProps<typeof badgeVariants>
