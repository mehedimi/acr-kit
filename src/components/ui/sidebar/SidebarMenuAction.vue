<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { Primitive } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = withDefaults(
  defineProps<
    PrimitiveProps & {
      showOnHover?: boolean
      class?: HTMLAttributes['class']
    }
  >(),
  {
    as: 'button',
  },
)
</script>

<template>
  <Primitive
    data-slot="sidebar-menu-action"
    data-sidebar="menu-action"
    :class="
      cn(
        'acr:text-sidebar-foreground acr:ring-sidebar-ring acr:hover:bg-sidebar-accent acr:hover:text-sidebar-accent-foreground acr:peer-hover/menu-button:text-sidebar-accent-foreground acr:absolute acr:top-1.5 acr:right-1 acr:flex acr:aspect-square acr:w-5 acr:items-center acr:justify-center acr:rounded-md acr:p-0 acr:outline-hidden acr:transition-transform acr:focus-visible:ring-2 acr:[&>svg]:size-4 acr:[&>svg]:shrink-0',
        'acr:after:absolute acr:after:-inset-2 acr:md:after:hidden',
        'acr:peer-data-[size=sm]/menu-button:top-1',
        'acr:peer-data-[size=default]/menu-button:top-1.5',
        'acr:peer-data-[size=lg]/menu-button:top-2.5',
        'acr:group-data-[collapsible=icon]:hidden',
        showOnHover &&
          'acr:peer-data-[active=true]/menu-button:text-sidebar-accent-foreground acr:group-focus-within/menu-item:opacity-100 acr:group-hover/menu-item:opacity-100 acr:data-[state=open]:opacity-100 acr:md:opacity-0',
        props.class,
      )
    "
    :as="as"
    :as-child="asChild"
  >
    <slot />
  </Primitive>
</template>
