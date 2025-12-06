<script setup lang="ts">
import type { DropdownMenuRadioItemEmits, DropdownMenuRadioItemProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { Circle } from 'lucide-vue-next'
import { DropdownMenuItemIndicator, DropdownMenuRadioItem, useForwardPropsEmits } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<DropdownMenuRadioItemProps & { class?: HTMLAttributes['class'] }>()

const emits = defineEmits<DropdownMenuRadioItemEmits>()

const delegatedProps = reactiveOmit(props, 'class')

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <DropdownMenuRadioItem
    data-slot="dropdown-menu-radio-item"
    v-bind="forwarded"
    :class="
      cn(
        'acr:focus:bg-accent acr:focus:text-accent-foreground acr:relative acr:flex acr:cursor-default acr:items-center acr:gap-2 acr:rounded-sm acr:py-1.5 acr:pr-2 acr:pl-8 acr:text-sm acr:outline-hidden acr:select-none acr:data-[disabled]:pointer-events-none acr:data-[disabled]:opacity-50 acr:[&_svg]:pointer-events-none acr:[&_svg]:shrink-0 acr:[&_svg:not([class*=\'size-\'])]:size-4',
        props.class,
      )
    "
  >
    <span
      class="acr:pointer-events-none acr:absolute acr:left-2 acr:flex acr:size-3.5 acr:items-center acr:justify-center"
    >
      <DropdownMenuItemIndicator>
        <slot name="indicator-icon">
          <Circle class="acr:size-2 acr:fill-current" />
        </slot>
      </DropdownMenuItemIndicator>
    </span>
    <slot />
  </DropdownMenuRadioItem>
</template>
