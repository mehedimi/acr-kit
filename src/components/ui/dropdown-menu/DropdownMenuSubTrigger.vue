<script setup lang="ts">
import type { DropdownMenuSubTriggerProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { ChevronRight } from 'lucide-vue-next'
import { DropdownMenuSubTrigger, useForwardProps } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<
  DropdownMenuSubTriggerProps & { class?: HTMLAttributes['class']; inset?: boolean }
>()

const delegatedProps = reactiveOmit(props, 'class', 'inset')
const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <DropdownMenuSubTrigger
    data-slot="dropdown-menu-sub-trigger"
    v-bind="forwardedProps"
    :class="
      cn(
        'acr:focus:bg-accent acr:focus:text-accent-foreground acr:data-[state=open]:bg-accent acr:data-[state=open]:text-accent-foreground acr:flex acr:cursor-default acr:items-center acr:rounded-sm acr:px-2 acr:py-1.5 acr:text-sm acr:outline-hidden acr:select-none acr:data-[inset]:pl-8',
        props.class,
      )
    "
  >
    <slot />
    <ChevronRight class="acr:ml-auto acr:size-4" />
  </DropdownMenuSubTrigger>
</template>
