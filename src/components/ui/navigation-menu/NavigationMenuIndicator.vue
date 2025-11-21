<script setup lang="ts">
import type { NavigationMenuIndicatorProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { NavigationMenuIndicator, useForwardProps } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<NavigationMenuIndicatorProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <NavigationMenuIndicator
    data-slot="navigation-menu-indicator"
    v-bind="forwardedProps"
    :class="
      cn(
        'acr:data-[state=visible]:animate-in acr:data-[state=hidden]:animate-out acr:data-[state=hidden]:fade-out acr:data-[state=visible]:fade-in acr:top-full acr:z-[1] acr:flex acr:h-1.5 acr:items-end acr:justify-center acr:overflow-hidden',
        props.class,
      )
    "
  >
    <div
      class="acr:bg-border acr:relative acr:top-[60%] acr:h-2 acr:w-2 acr:rotate-45 acr:rounded-tl-sm acr:shadow-md"
    />
  </NavigationMenuIndicator>
</template>
