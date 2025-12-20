<script setup lang="ts">
import type { RadioGroupItemProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { CircleIcon } from 'lucide-vue-next'
import { RadioGroupIndicator, RadioGroupItem, useForwardProps } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<RadioGroupItemProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <RadioGroupItem
    data-slot="radio-group-item"
    v-bind="forwardedProps"
    :class="
      cn(
        'acr:border-input acr:text-primary acr:focus-visible:border-ring acr:focus-visible:ring-ring/50 acr:aria-invalid:ring-destructive/20 acr:dark:aria-invalid:ring-destructive/40 acr:aria-invalid:border-destructive acr:dark:bg-input/30 acr:aspect-square acr:size-4 acr:shrink-0 acr:rounded-full acr:border acr:shadow-xs acr:transition-[color,box-shadow] acr:outline-none acr:focus-visible:ring-[3px] acr:disabled:cursor-not-allowed acr:disabled:opacity-50',
        props.class,
      )
    "
  >
    <RadioGroupIndicator
      data-slot="radio-group-indicator"
      class="acr:relative acr:flex acr:items-center acr:justify-center"
    >
      <slot>
        <CircleIcon
          class="acr:fill-primary acr:absolute acr:top-1/2 acr:left-1/2 acr:size-2 acr:-translate-x-1/2 acr:-translate-y-1/2"
        />
      </slot>
    </RadioGroupIndicator>
  </RadioGroupItem>
</template>
