<script setup lang="ts">
import type { DialogContentEmits, DialogContentProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { X } from 'lucide-vue-next'
import { DialogClose, DialogContent, DialogPortal, useForwardPropsEmits } from 'reka-ui'
import { cn } from '@/lib/utils'
import DialogOverlay from './DialogOverlay.vue'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(
  defineProps<
    DialogContentProps & { class?: HTMLAttributes['class']; showCloseButton?: boolean }
  >(),
  {
    showCloseButton: true,
  },
)
const emits = defineEmits<DialogContentEmits>()

const delegatedProps = reactiveOmit(props, 'class')

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <DialogPortal>
    <DialogOverlay />
    <DialogContent
      data-slot="dialog-content"
      v-bind="{ ...$attrs, ...forwarded }"
      :class="
        cn(
          'acr:bg-background acr:data-[state=open]:animate-in acr:data-[state=closed]:animate-out acr:data-[state=closed]:fade-out-0 acr:data-[state=open]:fade-in-0 acr:data-[state=closed]:zoom-out-95 acr:data-[state=open]:zoom-in-95 acr:fixed acr:top-[100px] acr:left-[50%] acr:z-[9999] acr:grid acr:translate-x-[-50%] acr:gap-4 acr:rounded-lg acr:border acr:p-6 acr:shadow-lg acr:duration-200',
          props.class,
        )
      "
    >
      <slot />

      <DialogClose
        v-if="showCloseButton"
        data-slot="dialog-close"
        class="acr:ring-offset-background acr:focus:ring-ring acr:data-[state=open]:bg-accent acr:data-[state=open]:text-muted-foreground acr:absolute acr:top-4 acr:right-4 acr:rounded-xs acr:opacity-70 acr:transition-opacity acr:hover:opacity-100 acr:focus:ring-2 acr:focus:ring-offset-2 acr:focus:outline-hidden acr:disabled:pointer-events-none acr:[&_svg]:pointer-events-none acr:[&_svg]:shrink-0 acr:[&_svg:not([class*='size-'])]:size-4"
      >
        <X />
        <span class="acr:sr-only">Close</span>
      </DialogClose>
    </DialogContent>
  </DialogPortal>
</template>
