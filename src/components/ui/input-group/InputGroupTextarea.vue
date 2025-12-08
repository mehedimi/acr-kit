<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { Textarea } from '@/components/ui/textarea'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <Textarea
    data-slot="input-group-control"
    :class="
      cn(
        'acr:flex-1 acr:resize-none acr:rounded-none acr:border-0 acr:bg-transparent acr:py-3 acr:shadow-none acr:focus-visible:ring-0 acr:dark:bg-transparent',
        props.class,
      )
    "
  />
</template>
