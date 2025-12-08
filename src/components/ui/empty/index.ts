import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export { default as Empty } from './Empty.vue'
export { default as EmptyContent } from './EmptyContent.vue'
export { default as EmptyDescription } from './EmptyDescription.vue'
export { default as EmptyHeader } from './EmptyHeader.vue'
export { default as EmptyMedia } from './EmptyMedia.vue'
export { default as EmptyTitle } from './EmptyTitle.vue'

export const emptyMediaVariants = cva(
  'acr:mb-2 acr:flex acr:shrink-0 acr:items-center acr:justify-center acr:[&_svg]:pointer-events-none acr:[&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'acr:bg-transparent',
        icon: "acr:bg-muted acr:text-foreground acr:flex acr:size-14 acr:shrink-0 acr:items-center acr:justify-center acr:rounded-lg acr:[&_svg:not([class*='size-'])]:size-8",
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export type EmptyMediaVariants = VariantProps<typeof emptyMediaVariants>
