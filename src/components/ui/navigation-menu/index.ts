import { cva } from 'class-variance-authority'

export { default as NavigationMenu } from './NavigationMenu.vue'
export { default as NavigationMenuContent } from './NavigationMenuContent.vue'
export { default as NavigationMenuIndicator } from './NavigationMenuIndicator.vue'
export { default as NavigationMenuItem } from './NavigationMenuItem.vue'
export { default as NavigationMenuLink } from './NavigationMenuLink.vue'
export { default as NavigationMenuList } from './NavigationMenuList.vue'
export { default as NavigationMenuTrigger } from './NavigationMenuTrigger.vue'
export { default as NavigationMenuViewport } from './NavigationMenuViewport.vue'

export const navigationMenuTriggerStyle = cva(
  'acr:group acr:inline-flex acr:h-9 acr:w-max acr:items-center acr:justify-center acr:rounded-md acr:bg-background acr:px-4 acr:py-2 acr:text-sm acr:font-medium acr:hover:bg-accent acr:hover:text-accent-foreground acr:focus:bg-accent acr:focus:text-accent-foreground acr:disabled:pointer-events-none acr:disabled:opacity-50 acr:data-[state=open]:hover:bg-accent acr:data-[state=open]:text-accent-foreground acr:data-[state=open]:focus:bg-accent acr:data-[state=open]:bg-accent/50 acr:focus-visible:ring-ring/50 acr:outline-none acr:transition-[color,box-shadow] acr:focus-visible:ring-[3px] acr:focus-visible:outline-1',
)
