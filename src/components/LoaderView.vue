<script setup lang="ts">
import { LoaderIcon } from 'lucide-vue-next'
defineProps<{
  isLoading: boolean
}>()
</script>

<template>
  <div class="acr:relative">
    <div
      v-if="isLoading"
      class="acr:bg-white/70 acr:absolute acr:z-80 acr:flex acr:h-full acr:w-full acr:justify-center acr:items-center"
    >
      <LoaderIcon role="status" aria-label="Loading" class="acr:size-8 acr:animate-spin" />
    </div>
    <slot></slot>
  </div>
</template>
