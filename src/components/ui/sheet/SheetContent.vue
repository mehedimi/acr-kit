<script setup lang="ts">
import type { DialogContentEmits, DialogContentProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { X } from 'lucide-vue-next'
import { DialogClose, DialogContent, DialogPortal, useForwardPropsEmits } from 'reka-ui'
import { cn } from '@/lib/utils'
import SheetOverlay from './SheetOverlay.vue'

interface SheetContentProps extends DialogContentProps {
  class?: HTMLAttributes['class']
  side?: 'top' | 'right' | 'bottom' | 'left'
}

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<SheetContentProps>(), {
  side: 'right',
})
const emits = defineEmits<DialogContentEmits>()

const delegatedProps = reactiveOmit(props, 'class', 'side')

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <DialogPortal>
    <SheetOverlay />
    <DialogContent
      data-slot="sheet-content"
      :class="
        cn(
          'acr:bg-background acr:data-[state=open]:animate-in acr:data-[state=closed]:animate-out acr:fixed acr:z-50 acr:flex acr:flex-col acr:gap-4 acr:shadow-lg acr:transition acr:ease-in-out acr:data-[state=closed]:duration-300 acr:data-[state=open]:duration-500',
          side === 'acr:right' &&
            'acr:data-[state=closed]:slide-out-to-right acr:data-[state=open]:slide-in-from-right acr:inset-y-0 acr:right-0 acr:h-full acr:w-3/4 acr:border-l acr:sm:max-w-sm',
          side === 'acr:left' &&
            'acr:data-[state=closed]:slide-out-to-left acr:data-[state=open]:slide-in-from-left acr:inset-y-0 acr:left-0 acr:h-full acr:w-3/4 acr:border-r acr:sm:max-w-sm',
          side === 'acr:top' &&
            'acr:data-[state=closed]:slide-out-to-top acr:data-[state=open]:slide-in-from-top acr:inset-x-0 acr:top-0 acr:h-auto acr:border-b',
          side === 'acr:bottom' &&
            'acr:data-[state=closed]:slide-out-to-bottom acr:data-[state=open]:slide-in-from-bottom acr:inset-x-0 acr:bottom-0 acr:h-auto acr:border-t',
          props.class,
        )
      "
      v-bind="{ ...$attrs, ...forwarded }"
    >
      <slot />

      <DialogClose
        class="acr:ring-offset-background acr:focus:ring-ring acr:data-[state=open]:bg-secondary acr:absolute acr:top-4 acr:right-4 acr:rounded-xs acr:opacity-70 acr:transition-opacity acr:hover:opacity-100 acr:focus:ring-2 acr:focus:ring-offset-2 acr:focus:outline-hidden acr:disabled:pointer-events-none"
      >
        <X class="acr:size-4" />
        <span class="acr:sr-only">Close</span>
      </DialogClose>
    </DialogContent>
  </DialogPortal>
</template>
