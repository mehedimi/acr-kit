import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

export { default as Item } from "./Item.vue"
export { default as ItemActions } from "./ItemActions.vue"
export { default as ItemContent } from "./ItemContent.vue"
export { default as ItemDescription } from "./ItemDescription.vue"
export { default as ItemFooter } from "./ItemFooter.vue"
export { default as ItemGroup } from "./ItemGroup.vue"
export { default as ItemHeader } from "./ItemHeader.vue"
export { default as ItemMedia } from "./ItemMedia.vue"
export { default as ItemSeparator } from "./ItemSeparator.vue"
export { default as ItemTitle } from "./ItemTitle.vue"

export const itemVariants = cva(
  'acr:group/item acr:flex acr:items-center acr:border acr:border-transparent acr:text-sm acr:rounded-md acr:transition-colors acr:[a]:hover:bg-accent/50 acr:[a]:transition-colors acr:duration-100 acr:flex-wrap acr:outline-none acr:focus-visible:border-ring acr:focus-visible:ring-ring/50 acr:focus-visible:ring-[3px]',
  {
    variants: {
      variant: {
        default: 'acr:bg-transparent',
        outline: 'acr:border-border',
        muted: 'acr:bg-muted/50',
      },
      size: {
        default: 'acr:p-4 acr:gap-4 acr:',
        sm: 'acr:py-3 acr:px-4 acr:gap-2.5',
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export const itemMediaVariants = cva(
  'acr:flex acr:shrink-0 acr:items-center acr:justify-center acr:gap-2 acr:group-has-[[data-slot=item-description]]/item:self-start acr:[&_svg]:pointer-events-none acr:group-has-[[data-slot=item-description]]/item:translate-y-0.5',
  {
    variants: {
      variant: {
        default: 'acr:bg-transparent',
        icon: 'acr:size-8 acr:border acr:rounded-sm acr:bg-muted acr:[&_svg:not([class*=\'size-\'])]:size-4',
        image:
          'acr:size-10 acr:rounded-sm acr:overflow-hidden acr:[&_img]:size-full acr:[&_img]:object-cover',
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export type ItemVariants = VariantProps<typeof itemVariants>
export type ItemMediaVariants = VariantProps<typeof itemMediaVariants>
