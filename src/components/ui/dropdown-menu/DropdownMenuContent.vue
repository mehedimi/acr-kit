<script setup lang="ts">
import type { DropdownMenuContentEmits, DropdownMenuContentProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { DropdownMenuContent, DropdownMenuPortal, useForwardPropsEmits } from 'reka-ui'
import { cn } from '@/lib/utils'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(
  defineProps<DropdownMenuContentProps & { class?: HTMLAttributes['class'] }>(),
  {
    sideOffset: 4,
  },
)
const emits = defineEmits<DropdownMenuContentEmits>()

const delegatedProps = reactiveOmit(props, 'class')

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <DropdownMenuPortal>
    <DropdownMenuContent
      data-slot="dropdown-menu-content"
      v-bind="{ ...$attrs, ...forwarded }"
      :class="
        cn(
          'acr:bg-popover acr:text-popover-foreground acr:data-[state=open]:animate-in acr:data-[state=closed]:animate-out acr:data-[state=closed]:fade-out-0 acr:data-[state=open]:fade-in-0 acr:data-[state=closed]:zoom-out-95 acr:data-[state=open]:zoom-in-95 acr:data-[side=bottom]:slide-in-from-top-2 acr:data-[side=left]:slide-in-from-right-2 acr:data-[side=right]:slide-in-from-left-2 acr:data-[side=top]:slide-in-from-bottom-2 acr:z-50 acr:max-h-(--reka-dropdown-menu-content-available-height) acr:min-w-[8rem] acr:origin-(--reka-dropdown-menu-content-transform-origin) acr:overflow-x-hidden acr:overflow-y-auto acr:rounded-md acr:border acr:p-1 acr:shadow-md',
          props.class,
        )
      "
    >
      <slot />
    </DropdownMenuContent>
  </DropdownMenuPortal>
</template>
