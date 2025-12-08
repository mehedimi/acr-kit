<script setup lang="ts">
import type { TabsTriggerProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { TabsTrigger, useForwardProps } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<TabsTriggerProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <TabsTrigger
    data-slot="tabs-trigger"
    :class="
      cn(
        'acr:data-[state=active]:bg-background acr:dark:data-[state=active]:text-foreground acr:focus-visible:border-ring acr:focus-visible:ring-ring/50 acr:focus-visible:outline-ring acr:dark:data-[state=active]:border-input acr:dark:data-[state=active]:bg-input/30 acr:text-foreground acr:dark:text-muted-foreground acr:inline-flex acr:h-[calc(100%-1px)] acr:flex-1 acr:items-center acr:justify-center acr:gap-1.5 acr:rounded-md acr:border acr:border-transparent acr:px-2 acr:py-1 acr:text-sm acr:font-medium acr:whitespace-nowrap acr:transition-[color,box-shadow] acr:focus-visible:ring-[3px] acr:focus-visible:outline-1 acr:disabled:pointer-events-none acr:disabled:opacity-50 acr:data-[state=active]:shadow-sm acr:[&_svg]:pointer-events-none acr:[&_svg]:shrink-0 acr:[&_svg:not([class*=\'size-\'])]:size-4',
        props.class,
      )
    "
    v-bind="forwardedProps"
  >
    <slot />
  </TabsTrigger>
</template>
