<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { useVModel } from '@vueuse/core'
import { cn } from '@/lib/utils'

const props = defineProps<{
  defaultValue?: string | number
  modelValue?: string | number
  class?: HTMLAttributes['class']
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
})
</script>

<template>
  <input
    v-model="modelValue"
    data-slot="input"
    :class="
      cn(
        'acr:file:text-foreground acr:placeholder:text-neutral-400! acr:selection:bg-primary acr:selection:text-primary-foreground acr:dark:bg-input/30 acr:border-input! acr:h-9 acr:w-full acr:min-w-0 acr:rounded-md acr:border! acr:bg-transparent acr:px-3! acr:py-1 acr:text-base acr:shadow-xs acr:transition-[color,box-shadow] acr:outline-none acr:file:inline-flex acr:file:h-7 acr:file:border-0 acr:file:bg-transparent acr:file:text-sm acr:file:font-medium acr:disabled:pointer-events-none acr:disabled:cursor-not-allowed acr:disabled:opacity-50 acr:md:text-sm',
        'acr:focus-visible:border-ring! acr:focus-visible:ring-ring/50! acr:!focus-visible:ring-[3px]',
        'acr:aria-invalid:ring-destructive/20 acr:dark:aria-invalid:ring-destructive/40 acr:aria-invalid:border-destructive',
        props.class,
      )
    "
  />
</template>
