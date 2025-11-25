<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    data-slot="table-container"
    class="acr:relative acr:w-full acr:overflow-auto acr:bg-white acr:px-3 acr:py-1"
  >
    <table data-slot="table" :class="cn('acr:w-full acr:caption-bottom acr:text-sm', props.class)">
      <slot />
    </table>
  </div>
</template>
