<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { Primitive } from "reka-ui"
import { cn } from "@/lib/utils"

const props = withDefaults(defineProps<PrimitiveProps & {
  size?: "sm" | "md"
  isActive?: boolean
  class?: HTMLAttributes["class"]
}>(), {
  as: "a",
  size: "md",
})
</script>

<template>
  <Primitive
    data-slot="sidebar-menu-sub-button"
    data-sidebar="menu-sub-button"
    :as="as"
    :as-child="asChild"
    :data-size="size"
    :data-active="isActive"
    :class="cn(
      'acr:text-sidebar-foreground acr:ring-sidebar-ring acr:hover:bg-sidebar-accent acr:hover:text-sidebar-accent-foreground acr:active:bg-sidebar-accent acr:active:text-sidebar-accent-foreground acr:[&>svg]:text-sidebar-accent-foreground acr:flex acr:h-7 acr:min-w-0 acr:-translate-x-px acr:items-center acr:gap-2 acr:overflow-hidden acr:rounded-md acr:px-2 acr:outline-hidden acr:focus-visible:ring-2 acr:disabled:pointer-events-none acr:disabled:opacity-50 acr:aria-disabled:pointer-events-none acr:aria-disabled:opacity-50 acr:[&>span:last-child]:truncate acr:[&>svg]:size-4 acr:[&>svg]:shrink-0',
      'acr:data-[active=true]:bg-sidebar-accent acr:data-[active=true]:text-sidebar-accent-foreground',
      size === 'acr:sm' && 'acr:text-xs',
      size === 'acr:md' && 'acr:text-sm',
      'acr:group-data-[collapsible=icon]:hidden',
      props.class,
    )"
  >
    <slot />
  </Primitive>
</template>
