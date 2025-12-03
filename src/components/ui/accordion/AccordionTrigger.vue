<script setup lang="ts">
import type { AccordionTriggerProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { ChevronDown } from 'lucide-vue-next'
import { AccordionHeader, AccordionTrigger } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<AccordionTriggerProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <AccordionHeader class="acr:!my-0 acr:transition-colors acr:px-4 acr:hover:bg-gray-50">
    <AccordionTrigger
      data-slot="accordion-trigger"
      v-bind="delegatedProps"
      :class="
        cn(
          'acr:focus-visible:border-ring acr:w-full acr:justify-between acr:focus-visible:ring-ring/50 acr:flex acr:flex-1 acr:items-start acr:gap-4 acr:rounded-md acr:py-4 acr:text-left acr:text-sm acr:font-medium acr:transition-all acr:outline-none acr:focus-visible:ring-[3px] acr:disabled:pointer-events-none acr:disabled:opacity-50 acr:[&[data-state=open]>svg]:rotate-180',
          props.class,
        )
      "
    >
      <slot />
      <slot name="icon">
        <ChevronDown
          class="acr:text-muted-foreground acr:pointer-events-none acr:size-4 acr:shrink-0 acr:translate-y-0.5 acr:transition-transform acr:duration-200"
        />
      </slot>
    </AccordionTrigger>
  </AccordionHeader>
</template>
