<script setup lang="ts">
import type { NavigationMenuViewportProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { NavigationMenuViewport, useForwardProps } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<NavigationMenuViewportProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <div
    class="acr:absolute acr:top-full acr:left-0 acr:isolate acr:z-50 acr:flex acr:justify-center"
  >
    <NavigationMenuViewport
      data-slot="navigation-menu-viewport"
      v-bind="forwardedProps"
      :class="
        cn(
          'acr:origin-top-center acr:bg-popover acr:text-popover-foreground acr:data-[state=open]:animate-in acr:data-[state=closed]:animate-out acr:data-[state=closed]:zoom-out-95 acr:data-[state=open]:zoom-in-90 acr:relative acr:mt-1.5 acr:h-[var(--reka-navigation-menu-viewport-height)] acr:w-full acr:overflow-hidden acr:rounded-md acr:border acr:shadow acr:md:w-[var(--reka-navigation-menu-viewport-width)] acr:left-[var(--reka-navigation-menu-viewport-left)]',
          props.class,
        )
      "
    />
  </div>
</template>
