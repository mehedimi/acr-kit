import type { VariantProps } from 'class-variance-authority'
import type { HTMLAttributes } from 'vue'
import { cva } from 'class-variance-authority'

export interface SidebarProps {
  side?: 'left' | 'right'
  variant?: 'sidebar' | 'floating' | 'inset'
  collapsible?: 'offcanvas' | 'icon' | 'none'
  class?: HTMLAttributes['class']
}

export { default as Sidebar } from './Sidebar.vue'
export { default as SidebarContent } from './SidebarContent.vue'
export { default as SidebarFooter } from './SidebarFooter.vue'
export { default as SidebarGroup } from './SidebarGroup.vue'
export { default as SidebarGroupAction } from './SidebarGroupAction.vue'
export { default as SidebarGroupContent } from './SidebarGroupContent.vue'
export { default as SidebarGroupLabel } from './SidebarGroupLabel.vue'
export { default as SidebarHeader } from './SidebarHeader.vue'
export { default as SidebarInput } from './SidebarInput.vue'
export { default as SidebarInset } from './SidebarInset.vue'
export { default as SidebarMenu } from './SidebarMenu.vue'
export { default as SidebarMenuAction } from './SidebarMenuAction.vue'
export { default as SidebarMenuBadge } from './SidebarMenuBadge.vue'
export { default as SidebarMenuButton } from './SidebarMenuButton.vue'
export { default as SidebarMenuItem } from './SidebarMenuItem.vue'
export { default as SidebarMenuSkeleton } from './SidebarMenuSkeleton.vue'
export { default as SidebarMenuSub } from './SidebarMenuSub.vue'
export { default as SidebarMenuSubButton } from './SidebarMenuSubButton.vue'
export { default as SidebarMenuSubItem } from './SidebarMenuSubItem.vue'
export { default as SidebarProvider } from './SidebarProvider.vue'
export { default as SidebarRail } from './SidebarRail.vue'
export { default as SidebarSeparator } from './SidebarSeparator.vue'
export { default as SidebarTrigger } from './SidebarTrigger.vue'

export { useSidebar } from './utils'

export const sidebarMenuButtonVariants = cva(
  'acr:peer/menu-button acr:flex acr:w-full acr:items-center acr:gap-2 acr:overflow-hidden acr:rounded-md acr:p-2 acr:text-left acr:text-sm acr:outline-hidden acr:ring-sidebar-ring acr:transition-[width,height,padding] acr:hover:bg-sidebar-accent acr:hover:text-sidebar-accent-foreground acr:focus-visible:ring-2 acr:active:bg-sidebar-accent acr:active:text-sidebar-accent-foreground acr:disabled:pointer-events-none acr:disabled:opacity-50 acr:group-has-data-[sidebar=menu-action]/menu-item:pr-8 acr:aria-disabled:pointer-events-none acr:aria-disabled:opacity-50 acr:data-[active=true]:bg-sidebar-accent acr:data-[active=true]:font-medium acr:data-[active=true]:text-sidebar-accent-foreground acr:data-[state=open]:hover:bg-sidebar-accent acr:data-[state=open]:hover:text-sidebar-accent-foreground acr:group-data-[collapsible=icon]:size-8! acr:group-data-[collapsible=icon]:p-2! acr:[&>span:last-child]:truncate acr:[&>svg]:size-4 acr:[&>svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'acr:hover:bg-sidebar-accent acr:hover:text-sidebar-accent-foreground',
        outline:
          'acr:bg-background acr:shadow-[0_0_0_1px_hsl(var(--sidebar-border))] acr:hover:bg-sidebar-accent acr:hover:text-sidebar-accent-foreground acr:hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]',
      },
      size: {
        default: 'acr:h-8 acr:text-sm',
        sm: 'acr:h-7 acr:text-xs',
        lg: 'acr:h-12 acr:text-sm acr:group-data-[collapsible=icon]:p-0!',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export type SidebarMenuButtonVariants = VariantProps<typeof sidebarMenuButtonVariants>
