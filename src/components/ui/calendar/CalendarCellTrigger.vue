<script lang="ts" setup>
import type { CalendarCellTriggerProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { CalendarCellTrigger, useForwardProps } from 'reka-ui'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

const props = withDefaults(
  defineProps<CalendarCellTriggerProps & { class?: HTMLAttributes['class'] }>(),
  {
    as: 'button',
  },
)

const delegatedProps = reactiveOmit(props, 'class')

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <CalendarCellTrigger
    data-slot="calendar-cell-trigger"
    :class="
      cn(
        buttonVariants({ variant: 'ghost' }),
        'acr:size-8 acr:p-0 acr:font-normal acr:aria-selected:opacity-100 acr:cursor-default',
        'acr:[&[data-today]:not([data-selected])]:bg-accent acr:[&[data-today]:not([data-selected])]:text-accent-foreground',
        // Selected
        'acr:data-[selected]:bg-primary acr:data-[selected]:text-primary-foreground acr:data-[selected]:opacity-100 acr:data-[selected]:hover:bg-primary acr:data-[selected]:hover:text-primary-foreground acr:data-[selected]:focus:bg-primary acr:data-[selected]:focus:text-primary-foreground',
        // Disabled
        'acr:data-[disabled]:text-muted-foreground acr:data-[disabled]:opacity-50',
        // Unavailable
        'acr:data-[unavailable]:text-destructive-foreground acr:data-[unavailable]:line-through',
        // Outside months
        'acr:data-[outside-view]:text-muted-foreground',
        props.class,
      )
    "
    v-bind="forwardedProps"
  >
    <slot />
  </CalendarCellTrigger>
</template>
