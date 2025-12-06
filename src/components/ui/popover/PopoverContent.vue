<script setup lang="ts">
import type { PopoverContentEmits, PopoverContentProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { PopoverContent, PopoverPortal, useForwardPropsEmits } from 'reka-ui'
import { cn } from '@/lib/utils'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(
  defineProps<PopoverContentProps & { class?: HTMLAttributes['class'] }>(),
  {
    align: 'center',
    sideOffset: 4,
  },
)
const emits = defineEmits<PopoverContentEmits>()

const delegatedProps = reactiveOmit(props, 'class')

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <PopoverPortal>
    <PopoverContent
      data-slot="popover-content"
      v-bind="{ ...$attrs, ...forwarded }"
      :class="
        cn(
          'acr:bg-popover acr:text-popover-foreground acr:data-[state=open]:animate-in acr:data-[state=closed]:animate-out acr:data-[state=closed]:fade-out-0 acr:data-[state=open]:fade-in-0 acr:data-[state=closed]:zoom-out-95 acr:data-[state=open]:zoom-in-95 acr:data-[side=bottom]:slide-in-from-top-2 acr:data-[side=left]:slide-in-from-right-2 acr:data-[side=right]:slide-in-from-left-2 acr:data-[side=top]:slide-in-from-bottom-2 acr:z-50 acr:w-72 acr:rounded-md acr:border acr:p-4 acr:shadow-md acr:origin-(--reka-popover-content-transform-origin) acr:outline-hidden',
          props.class,
        )
      "
    >
      <slot />
    </PopoverContent>
  </PopoverPortal>
</template>
