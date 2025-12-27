<script setup lang="ts">
import type { SplitterResizeHandleEmits, SplitterResizeHandleProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { GripVertical } from 'lucide-vue-next'
import { SplitterResizeHandle, useForwardPropsEmits } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<
  SplitterResizeHandleProps & { class?: HTMLAttributes['class']; withHandle?: boolean }
>()
const emits = defineEmits<SplitterResizeHandleEmits>()

const delegatedProps = reactiveOmit(props, 'class', 'withHandle')
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <SplitterResizeHandle
    data-slot="resizable-handle"
    v-bind="forwarded"
    :class="
      cn(
        'acr:bg-border acr:focus-visible:ring-ring acr:relative acr:flex acr:w-px acr:items-center acr:justify-center acr:after:absolute acr:after:inset-y-0 acr:after:left-1/2 acr:after:w-1 acr:after:-translate-x-1/2 acr:focus-visible:ring-1 acr:focus-visible:ring-offset-1 acr:focus-visible:outline-hidden acr:data-[orientation=vertical]:h-px acr:data-[orientation=vertical]:w-full acr:data-[orientation=vertical]:after:left-0 acr:data-[orientation=vertical]:after:h-1 acr:data-[orientation=vertical]:after:w-full acr:data-[orientation=vertical]:after:-translate-y-1/2 acr:data-[orientation=vertical]:after:translate-x-0 acr:[&[data-orientation=vertical]>div]:rotate-90',
        props.class,
      )
    "
  >
    <template v-if="props.withHandle">
      <div
        class="acr:bg-border acr:z-10 acr:flex acr:h-4 acr:w-3 acr:items-center acr:justify-center acr:rounded-xs acr:border"
      >
        <slot>
          <GripVertical class="acr:size-2.5" />
        </slot>
      </div>
    </template>
  </SplitterResizeHandle>
</template>
