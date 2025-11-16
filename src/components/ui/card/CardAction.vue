<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    data-slot="card-action"
    :class="cn('acr:col-start-2 acr:row-span-2 acr:row-start-1 acr:self-start acr:justify-self-end', props.class)"
  >
    <slot />
  </div>
</template>
