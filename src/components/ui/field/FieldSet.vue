<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <fieldset
    data-slot="field-set"
    :class="
      cn(
        'acr:flex acr:flex-col acr:gap-6',
        'acr:has-[>[data-slot=checkbox-group]]:gap-3 acr:has-[>[data-slot=radio-group]]:gap-3',
        props.class,
      )
    "
  >
    <slot />
  </fieldset>
</template>
