<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <Input
    data-slot="input-group-control"
    :class="
      cn(
        'acr:flex-1 acr:rounded-none acr:border-0 acr:bg-transparent acr:shadow-none acr:focus-visible:ring-0 acr:dark:bg-transparent',
        props.class,
      )
    "
  />
</template>
