<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <tfoot
    data-slot="table-footer"
    :class="cn('acr:bg-muted/50 acr:border-t acr:font-medium acr:[&>tr]:last:border-b-0', props.class)"
  >
    <slot />
  </tfoot>
</template>
