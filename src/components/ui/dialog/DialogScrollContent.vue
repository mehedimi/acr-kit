<script setup lang="ts">
import type { DialogContentEmits, DialogContentProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { X } from 'lucide-vue-next'
import {
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  useForwardPropsEmits,
} from 'reka-ui'
import { cn } from '@/lib/utils'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<DialogContentProps & { class?: HTMLAttributes['class'] }>()
const emits = defineEmits<DialogContentEmits>()

const delegatedProps = reactiveOmit(props, 'class')

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <DialogPortal>
    <DialogOverlay
      class="acr:fixed acr:inset-0 acr:z-99999 acr:grid acr:place-items-center acr:overflow-y-auto acr:bg-black/80 acr: acr:data-[state=open]:animate-in acr:data-[state=closed]:animate-out acr:data-[state=closed]:fade-out-0 acr:data-[state=open]:fade-in-0"
    >
      <DialogContent
        :class="
          cn(
            'acr:relative acr:z-50 acr:grid acr:w-full acr:max-w-lg acr:my-8 acr:gap-4 acr:border acr:border-border acr:bg-background acr:p-6 acr:shadow-lg acr:duration-200 acr:sm:rounded-lg acr:md:w-full',
            props.class,
          )
        "
        v-bind="{ ...$attrs, ...forwarded }"
        @pointer-down-outside="
          (event) => {
            const originalEvent = event.detail.originalEvent
            const target = originalEvent.target as HTMLElement
            if (
              originalEvent.offsetX > target.clientWidth ||
              originalEvent.offsetY > target.clientHeight
            ) {
              event.preventDefault()
            }
          }
        "
      >
        <slot />

        <DialogClose
          class="acr:absolute acr:top-4 acr:right-4 acr:p-0.5 acr:transition-colors acr:rounded-md acr:hover:bg-secondary"
        >
          <X class="acr:w-4 acr:h-4" />
          <span class="acr:sr-only">Close</span>
        </DialogClose>
      </DialogContent>
    </DialogOverlay>
  </DialogPortal>
</template>
