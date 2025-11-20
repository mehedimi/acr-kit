import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export { default as Button } from './Button.vue'

export const buttonVariants = cva(
  "acr:inline-flex acr:items-center acr:justify-center acr:gap-2 acr:whitespace-nowrap acr:rounded-md acr:text-sm acr:font-medium acr:transition-all acr:disabled:pointer-events-none acr:disabled:opacity-50 acr:[&_svg]:pointer-events-none acr:[&_svg:not([class*='size-'])]:size-4 acr:shrink-0 acr:[&_svg]:shrink-0 acr:outline-none acr:focus-visible:border-ring acr:focus-visible:ring-ring/50 acr:focus-visible:ring-[3px] acr:aria-invalid:ring-destructive/20 acr:dark:aria-invalid:ring-destructive/40 acr:aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: 'acr:bg-primary acr:text-primary-foreground acr:hover:bg-primary/90',
        destructive:
          'acr:bg-destructive acr:text-white acr:hover:bg-destructive/90 acr:focus-visible:ring-destructive/20 acr:dark:focus-visible:ring-destructive/40 acr:dark:bg-destructive/60',
        outline:
          'acr:border acr:bg-background acr:shadow-xs acr:hover:bg-accent acr:hover:text-accent-foreground acr:dark:bg-input/30 acr:dark:border-input acr:dark:hover:bg-input/50',
        secondary: 'acr:bg-secondary acr:text-secondary-foreground acr:hover:bg-secondary/80',
        ghost: 'acr:hover:bg-accent acr:hover:text-accent-foreground acr:dark:hover:bg-accent/50',
        link: 'acr:text-primary acr:underline-offset-4 acr:hover:underline',
      },
      size: {
        default: 'acr:h-9 acr:px-4 acr:py-2 acr:has-[>svg]:px-3',
        sm: 'acr:h-8 acr:rounded-md acr:gap-1.5 acr:px-3 acr:has-[>svg]:px-2.5',
        lg: 'acr:h-10 acr:rounded-md acr:px-6 acr:has-[>svg]:px-4',
        icon: 'acr:size-9',
        'icon-sm': 'acr:size-8',
        'icon-lg': 'acr:size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)
export type ButtonVariants = VariantProps<typeof buttonVariants>
