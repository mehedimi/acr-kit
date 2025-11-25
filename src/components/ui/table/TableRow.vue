<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <tr
    data-slot="table-row"
    :class="cn('acr:hover:bg-muted/50 acr:data-[state=selected]:bg-muted acr:border-b acr:transition-colors', props.class)"
  >
    <slot />
  </tr>
</template>
