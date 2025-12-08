<script setup lang="ts">
import type { AcceptableValue } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit, useVModel } from '@vueuse/core'
import { ChevronDownIcon } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<{
  modelValue?: AcceptableValue | AcceptableValue[]
  class?: HTMLAttributes['class']
}>()

const emit = defineEmits<{
  'update:modelValue': AcceptableValue
}>()

const modelValue = useVModel(props, 'modelValue', emit, {
  passive: true,
  defaultValue: '',
})

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <div
    class="acr:group/native-select acr:relative acr:w-fit acr:has-[select:disabled]:opacity-50"
    data-slot="native-select-wrapper"
  >
    <select
      v-bind="{ ...$attrs, ...delegatedProps }"
      v-model="modelValue"
      data-slot="native-select"
      :class="
        cn(
          'acr:border-input acr:placeholder:text-muted-foreground acr:selection:bg-primary acr:selection:text-primary-foreground acr:dark:bg-input/30 acr:dark:hover:bg-input/50 acr:h-9 acr:w-full acr:min-w-0 acr:appearance-none acr:rounded-md acr:border acr:bg-transparent acr:px-3 acr:py-2 acr:pr-9 acr:text-sm acr:shadow-xs acr:transition-[color,box-shadow] acr:outline-none acr:disabled:pointer-events-none acr:disabled:cursor-not-allowed',
          'acr:focus-visible:border-ring acr:focus-visible:ring-ring/50 acr:focus-visible:ring-[3px]',
          'acr:aria-invalid:ring-destructive/20 acr:dark:aria-invalid:ring-destructive/40 acr:aria-invalid:border-destructive',
          props.class,
        )
      "
    >
      <slot />
    </select>
    <ChevronDownIcon
      class="acr:text-muted-foreground acr:pointer-events-none acr:absolute acr:top-1/2 acr:right-3.5 acr:size-4 acr:-translate-y-1/2 acr:opacity-50 acr:select-none"
      aria-hidden="true"
      data-slot="native-select-icon"
    />
  </div>
</template>
