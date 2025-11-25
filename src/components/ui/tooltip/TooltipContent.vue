<script setup lang="ts">
import type { TooltipContentEmits, TooltipContentProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { TooltipArrow, TooltipContent, TooltipPortal, useForwardPropsEmits } from 'reka-ui'
import { cn } from '@/lib/utils'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(
  defineProps<TooltipContentProps & { class?: HTMLAttributes['class'] }>(),
  {
    sideOffset: 4,
  },
)

const emits = defineEmits<TooltipContentEmits>()

const delegatedProps = reactiveOmit(props, 'class')
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <TooltipPortal>
    <TooltipContent
      data-slot="tooltip-content"
      v-bind="{ ...forwarded, ...$attrs }"
      :class="
        cn(
          'acr:bg-foreground acr:text-background acr:animate-in acr:fade-in-0 acr:zoom-in-95 acr:data-[state=closed]:animate-out acr:data-[state=closed]:fade-out-0 acr:data-[state=closed]:zoom-out-95 acr:data-[side=bottom]:slide-in-from-top-2 acr:data-[side=left]:slide-in-from-right-2 acr:data-[side=right]:slide-in-from-left-2 acr:data-[side=top]:slide-in-from-bottom-2 acr:z-50 acr:w-fit acr:rounded-md acr:px-3 acr:py-1.5 acr:text-xs acr:text-balance',
          props.class,
        )
      "
    >
      <slot />

      <TooltipArrow
        class="acr:bg-foreground acr:fill-foreground acr:z-50 acr:size-2.5 acr:translate-y-[calc(-50%_-_2px)] acr:rotate-45 acr:rounded-[2px]"
      />
    </TooltipContent>
  </TooltipPortal>
</template>
