<script setup lang="ts">
import type { NavigationMenuListProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { NavigationMenuList, useForwardProps } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<NavigationMenuListProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <NavigationMenuList
    data-slot="navigation-menu-list"
    v-bind="forwardedProps"
    :class="
      cn(
        'acr:group acr:flex acr:flex-1 acr:list-none acr:items-center acr:justify-center acr:gap-1',
        props.class,
      )
    "
  >
    <slot />
  </NavigationMenuList>
</template>
