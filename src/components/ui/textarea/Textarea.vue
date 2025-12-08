<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { useVModel } from '@vueuse/core'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
  defaultValue?: string | number
  modelValue?: string | number
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
  <textarea
    v-model="modelValue"
    data-slot="textarea"
    :class="
      cn(
        'acr:!border-input acr:placeholder:text-muted-foreground acr:!focus-visible:border-ring acr:focus-visible:!ring-ring/50 acr:aria-invalid:ring-destructive/20 acr:dark:aria-invalid:ring-destructive/40 acr:aria-invalid:border-destructive acr:dark:bg-input/30 acr:flex acr:field-sizing-content acr:min-h-16 acr:w-full acr:rounded-md acr:border acr:bg-transparent acr:!px-3 acr:!py-2 acr:text-base acr:shadow-xs acr:transition-[color,box-shadow] acr:outline-none acr:focus-visible:ring-[3px] acr:disabled:cursor-not-allowed acr:disabled:opacity-50 acr:md:!text-sm',
        props.class,
      )
    "
  />
</template>
