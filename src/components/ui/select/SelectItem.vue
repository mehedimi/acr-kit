<script setup lang="ts">
import type { SelectItemProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { Check } from 'lucide-vue-next'
import { SelectItem, SelectItemIndicator, SelectItemText, useForwardProps } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<SelectItemProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <SelectItem
    data-slot="select-item"
    v-bind="forwardedProps"
    :class="
      cn(
        'acr:focus:bg-accent acr:focus:text-accent-foreground acr:[&_svg:not([class*=\'text-\'])]:text-muted-foreground acr:relative acr:flex acr:w-full acr:cursor-default acr:items-center acr:gap-2 acr:rounded-sm acr:py-1.5 acr:pr-8 acr:pl-2 acr:text-sm acr:outline-hidden acr:select-none acr:data-[disabled]:pointer-events-none acr:data-[disabled]:opacity-50 acr:[&_svg]:pointer-events-none acr:[&_svg]:shrink-0 acr:[&_svg:not([class*=\'size-\'])]:size-4 acr:*:[span]:last:flex acr:*:[span]:last:items-center acr:*:[span]:last:gap-2',
        props.class,
      )
    "
  >
    <span
      class="acr:absolute acr:right-2 acr:flex acr:size-3.5 acr:items-center acr:justify-center"
    >
      <SelectItemIndicator>
        <slot name="indicator-icon">
          <Check class="acr:size-4" />
        </slot>
      </SelectItemIndicator>
    </span>

    <SelectItemText>
      <slot />
    </SelectItemText>
  </SelectItem>
</template>
