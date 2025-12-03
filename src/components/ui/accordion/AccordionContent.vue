<script setup lang="ts">
import type { AccordionContentProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { AccordionContent } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<AccordionContentProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <AccordionContent
    data-slot="accordion-content"
    v-bind="delegatedProps"
    class="acr:data-[state=closed]:animate-accordion-up acr:data-[state=open]:animate-accordion-down acr:overflow-hidden acr:text-sm"
  >
    <div :class="cn('acr:p-4 acr:pt-0', props.class)">
      <slot />
    </div>
  </AccordionContent>
</template>
