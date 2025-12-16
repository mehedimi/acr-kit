<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { Primitive } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<
  PrimitiveProps & {
    class?: HTMLAttributes['class']
  }
>()
</script>

<template>
  <Primitive
    data-slot="sidebar-group-label"
    data-sidebar="group-label"
    :as="as"
    :as-child="asChild"
    :class="
      cn(
        'acr:text-sidebar-foreground/70 acr:ring-sidebar-ring acr:flex acr:h-8 acr:shrink-0 acr:items-center acr:rounded-md acr:px-2 acr:text-xs acr:font-medium acr:outline-hidden acr:transition-[margin,opacity] acr:duration-200 acr:ease-linear acr:focus-visible:ring-2 acr:[&>svg]:size-4 acr:[&>svg]:shrink-0',
        'acr:group-data-[collapsible=icon]:-mt-8 acr:group-data-[collapsible=icon]:opacity-0',
        props.class,
      )
    "
  >
    <slot />
  </Primitive>
</template>
