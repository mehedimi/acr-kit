<script setup lang="ts">
import type { DropdownMenuSubContentEmits, DropdownMenuSubContentProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { DropdownMenuSubContent, useForwardPropsEmits } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<DropdownMenuSubContentProps & { class?: HTMLAttributes['class'] }>()
const emits = defineEmits<DropdownMenuSubContentEmits>()

const delegatedProps = reactiveOmit(props, 'class')

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <DropdownMenuSubContent
    data-slot="dropdown-menu-sub-content"
    v-bind="forwarded"
    :class="
      cn(
        'acr:bg-popover acr:text-popover-foreground acr:data-[state=open]:animate-in acr:data-[state=closed]:animate-out acr:data-[state=closed]:fade-out-0 acr:data-[state=open]:fade-in-0 acr:data-[state=closed]:zoom-out-95 acr:data-[state=open]:zoom-in-95 acr:data-[side=bottom]:slide-in-from-top-2 acr:data-[side=left]:slide-in-from-right-2 acr:data-[side=right]:slide-in-from-left-2 acr:data-[side=top]:slide-in-from-bottom-2 acr:z-50 acr:min-w-[8rem] acr:origin-(--reka-dropdown-menu-content-transform-origin) acr:overflow-hidden acr:rounded-md acr:border acr:p-1 acr:shadow-lg',
        props.class,
      )
    "
  >
    <slot />
  </DropdownMenuSubContent>
</template>
