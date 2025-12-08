<script setup lang="ts">
import type { SelectTriggerProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { ChevronDown } from 'lucide-vue-next'
import { SelectIcon, SelectTrigger, useForwardProps } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = withDefaults(
  defineProps<SelectTriggerProps & { class?: HTMLAttributes['class']; size?: 'sm' | 'default' }>(),
  { size: 'default' },
)

const delegatedProps = reactiveOmit(props, 'class', 'size')
const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <SelectTrigger
    data-slot="select-trigger"
    :data-size="size"
    v-bind="forwardedProps"
    :class="
      cn(
        'acr:border-input acr:data-[placeholder]:text-muted-foreground acr:[&_svg:not([class*=\'text-\'])]:text-muted-foreground acr:focus-visible:border-ring acr:focus-visible:ring-ring/50 acr:aria-invalid:ring-destructive/20 acr:dark:aria-invalid:ring-destructive/40 acr:aria-invalid:border-destructive acr:dark:bg-input/30 acr:dark:hover:bg-input/50 acr:flex acr:w-fit acr:items-center acr:justify-between acr:gap-2 acr:rounded-md acr:border acr:bg-transparent acr:px-3 acr:py-2 acr:text-sm acr:whitespace-nowrap acr:shadow-xs acr:transition-[color,box-shadow] acr:outline-none acr:focus-visible:ring-[3px] acr:disabled:cursor-not-allowed acr:disabled:opacity-50 acr:data-[size=default]:h-9 acr:data-[size=sm]:h-8 acr:*:data-[slot=select-value]:line-clamp-1 acr:*:data-[slot=select-value]:flex acr:*:data-[slot=select-value]:items-center acr:*:data-[slot=select-value]:gap-2 acr:[&_svg]:pointer-events-none acr:[&_svg]:shrink-0 acr:[&_svg:not([class*=\'size-\'])]:size-4',
        props.class,
      )
    "
  >
    <slot />
    <SelectIcon as-child>
      <ChevronDown class="acr:size-4 acr:opacity-50" />
    </SelectIcon>
  </SelectTrigger>
</template>
