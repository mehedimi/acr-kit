<script setup lang="ts">
import type { NavigationMenuContentEmits, NavigationMenuContentProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { NavigationMenuContent, useForwardPropsEmits } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<NavigationMenuContentProps & { class?: HTMLAttributes['class'] }>()
const emits = defineEmits<NavigationMenuContentEmits>()

const delegatedProps = reactiveOmit(props, 'class')

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <NavigationMenuContent
    data-slot="navigation-menu-content"
    v-bind="forwarded"
    :class="
      cn(
        'acr:data-[motion^=from-]:animate-in acr:data-[motion^=to-]:animate-out acr:data-[motion^=from-]:fade-in acr:data-[motion^=to-]:fade-out acr:data-[motion=from-end]:slide-in-from-right-52 acr:data-[motion=from-start]:slide-in-from-left-52 acr:data-[motion=to-end]:slide-out-to-right-52 acr:data-[motion=to-start]:slide-out-to-left-52 acr:top-0 acr:left-0 acr:w-full acr:p-2 acr:pr-2.5 acr:md:absolute acr:md:w-auto',
        'acr:group-data-[viewport=false]/navigation-menu:bg-popover acr:group-data-[viewport=false]/navigation-menu:text-popover-foreground acr:group-data-[viewport=false]/navigation-menu:data-[state=open]:animate-in acr:group-data-[viewport=false]/navigation-menu:data-[state=closed]:animate-out acr:group-data-[viewport=false]/navigation-menu:data-[state=closed]:zoom-out-95 acr:group-data-[viewport=false]/navigation-menu:data-[state=open]:zoom-in-95 acr:group-data-[viewport=false]/navigation-menu:data-[state=open]:fade-in-0 acr:group-data-[viewport=false]/navigation-menu:data-[state=closed]:fade-out-0 acr:group-data-[viewport=false]/navigation-menu:top-full acr:group-data-[viewport=false]/navigation-menu:mt-1.5 acr:group-data-[viewport=false]/navigation-menu:overflow-hidden acr:group-data-[viewport=false]/navigation-menu:rounded-md acr:group-data-[viewport=false]/navigation-menu:border acr:group-data-[viewport=false]/navigation-menu:shadow acr:group-data-[viewport=false]/navigation-menu:duration-200 acr:**:data-[slot=navigation-menu-link]:focus:ring-0 acr:**:data-[slot=navigation-menu-link]:focus:outline-none',
        props.class,
      )
    "
  >
    <slot />
  </NavigationMenuContent>
</template>
