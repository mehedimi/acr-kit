<script setup lang="ts">
import type { SelectContentEmits, SelectContentProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { SelectContent, SelectPortal, SelectViewport, useForwardPropsEmits } from 'reka-ui'
import { cn } from '@/lib/utils'
import { SelectScrollDownButton, SelectScrollUpButton } from '.'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(
  defineProps<SelectContentProps & { class?: HTMLAttributes['class'] }>(),
  {
    position: 'popper',
  },
)
const emits = defineEmits<SelectContentEmits>()

const delegatedProps = reactiveOmit(props, 'class')

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <SelectPortal>
    <SelectContent
      data-slot="select-content"
      v-bind="{ ...$attrs, ...forwarded }"
      :class="
        cn(
          'acr:bg-popover acr:text-popover-foreground acr:data-[state=open]:animate-in acr:data-[state=closed]:animate-out acr:data-[state=closed]:fade-out-0 acr:data-[state=open]:fade-in-0 acr:data-[state=closed]:zoom-out-95 acr:data-[state=open]:zoom-in-95 acr:data-[side=bottom]:slide-in-from-top-2 acr:data-[side=left]:slide-in-from-right-2 acr:data-[side=right]:slide-in-from-left-2 acr:data-[side=top]:slide-in-from-bottom-2 acr:relative acr:z-[99999] acr:max-h-(--reka-select-content-available-height) acr:min-w-[8rem] acr:overflow-x-hidden acr:overflow-y-auto acr:rounded-md acr:border acr:shadow-md',
          position === 'popper' &&
            'acr:data-[side=bottom]:translate-y-1 acr:data-[side=left]:-translate-x-1 acr:data-[side=right]:translate-x-1 acr:data-[side=top]:-translate-y-1',
          props.class,
        )
      "
    >
      <SelectScrollUpButton />
      <SelectViewport
        :class="
          cn(
            'acr:p-1',
            position === 'popper' &&
              'acr:h-[var(--reka-select-trigger-height)] acr:w-full acr:min-w-[var(--reka-select-trigger-width)] acr:scroll-my-1',
          )
        "
      >
        <slot />
      </SelectViewport>
      <SelectScrollDownButton />
    </SelectContent>
  </SelectPortal>
</template>
