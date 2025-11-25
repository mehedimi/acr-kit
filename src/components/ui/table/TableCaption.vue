<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <caption
    data-slot="table-caption"
    :class="cn('acr:text-muted-foreground acr:mt-4 acr:text-sm', props.class)"
  >
    <slot />
  </caption>
</template>
