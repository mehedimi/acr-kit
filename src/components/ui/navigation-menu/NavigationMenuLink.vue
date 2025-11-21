<script setup lang="ts">
import type { NavigationMenuLinkEmits, NavigationMenuLinkProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { NavigationMenuLink, useForwardPropsEmits } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<NavigationMenuLinkProps & { class?: HTMLAttributes['class'] }>()
const emits = defineEmits<NavigationMenuLinkEmits>()

const delegatedProps = reactiveOmit(props, 'class')
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <NavigationMenuLink
    data-slot="navigation-menu-link"
    v-bind="forwarded"
    :class="
      cn(
        'acr:focus:bg-accent acr:focus:text-accent-foreground acr:ring-ring/10 acr:dark:ring-ring/20 acr:dark:outline-ring/40 acr:outline-ring/50 acr:[&_svg:not([class*=\'text-\'])]:text-muted-foreground acr:flex acr:flex-col acr:gap-1 acr:rounded-sm acr:p-2 acr:text-sm acr:transition-[color,box-shadow] acr:focus-visible:ring-4 acr:focus-visible:outline-1 acr:[&_svg:not([class*=\'size-\'])]:size-4',
        props.class,
      )
    "
  >
    <slot />
  </NavigationMenuLink>
</template>
