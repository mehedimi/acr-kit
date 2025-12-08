<script setup lang="ts">
import type { SliderRootEmits, SliderRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { SliderRange, SliderRoot, SliderThumb, SliderTrack, useForwardPropsEmits } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<SliderRootProps & { class?: HTMLAttributes['class'] }>()
const emits = defineEmits<SliderRootEmits>()

const delegatedProps = reactiveOmit(props, 'class')

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <SliderRoot
    v-slot="{ modelValue }"
    data-slot="slider"
    :class="
      cn(
        'acr:relative acr:flex acr:w-full acr:touch-none acr:items-center acr:select-none acr:data-[disabled]:opacity-50 acr:data-[orientation=vertical]:h-full acr:data-[orientation=vertical]:min-h-44 acr:data-[orientation=vertical]:w-auto acr:data-[orientation=vertical]:flex-col',
        props.class,
      )
    "
    v-bind="forwarded"
  >
    <SliderTrack
      data-slot="slider-track"
      class="acr:bg-muted acr:relative acr:grow acr:overflow-hidden acr:rounded-full acr:data-[orientation=horizontal]:h-1.5 acr:data-[orientation=horizontal]:w-full acr:data-[orientation=vertical]:h-full acr:data-[orientation=vertical]:w-1.5"
    >
      <SliderRange
        data-slot="slider-range"
        class="acr:bg-primary acr:absolute acr:data-[orientation=horizontal]:h-full acr:data-[orientation=vertical]:w-full"
      />
    </SliderTrack>

    <SliderThumb
      v-for="(_, key) in modelValue"
      :key="key"
      data-slot="slider-thumb"
      class="acr:bg-white acr:border-primary acr:ring-ring/50 acr:block acr:size-4 acr:shrink-0 acr:rounded-full acr:border acr:shadow-sm acr:transition-[color,box-shadow] acr:hover:ring-4 acr:focus-visible:ring-4 acr:focus-visible:outline-hidden acr:disabled:pointer-events-none acr:disabled:opacity-50"
    />
  </SliderRoot>
</template>
