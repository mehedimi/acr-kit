import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export { default as Button } from './Button.vue'

export const buttonVariants = cva(
  "cn:inline-flex cn:items-center cn:justify-center cn:gap-2 cn:whitespace-nowrap cn:rounded-md cn:text-sm cn:font-medium cn:transition-all cn:disabled:pointer-events-none cn:disabled:opacity-50 cn:[&_svg]:pointer-events-none cn:[&_svg:not([class*='size-'])]:size-4 cn:shrink-0 cn:[&_svg]:shrink-0 cn:outline-none cn:focus-visible:border-ring cn:focus-visible:ring-ring/50 cn:focus-visible:ring-[3px] cn:aria-invalid:ring-destructive/20 cn:dark:aria-invalid:ring-destructive/40 cn:aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: 'cn:bg-primary cn:text-primary-foreground cn:hover:bg-primary/90',
        destructive:
          'cn:bg-destructive cn:text-white cn:hover:bg-destructive/90 cn:focus-visible:ring-destructive/20 cn:dark:focus-visible:ring-destructive/40 cn:dark:bg-destructive/60',
        outline:
          'cn:border cn:bg-background cn:shadow-xs cn:hover:bg-accent cn:hover:text-accent-foreground cn:dark:bg-input/30 cn:dark:border-input cn:dark:hover:bg-input/50',
        secondary: 'cn:bg-secondary cn:text-secondary-foreground cn:hover:bg-secondary/80',
        ghost: 'cn:hover:bg-accent cn:hover:text-accent-foreground cn:dark:hover:bg-accent/50',
        link: 'cn:text-primary cn:underline-offset-4 cn:hover:underline',
      },
      size: {
        default: 'cn:h-9 cn:px-4 cn:py-2 cn:has-[>svg]:px-3',
        sm: 'cn:h-8 cn:rounded-md cn:gap-1.5 cn:px-3 cn:has-[>svg]:px-2.5',
        lg: 'cn:h-10 cn:rounded-md cn:px-6 cn:has-[>svg]:px-4',
        icon: 'cn:size-9',
        'icon-sm': 'cn:size-8',
        'icon-lg': 'cn:size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)
export type ButtonVariants = VariantProps<typeof buttonVariants>
