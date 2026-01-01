<script lang="ts" setup>
import type { ClassValue } from 'clsx'

const props = defineProps<{
  class?: ClassValue
}>()
</script>

<template>
  <div class="acr:px-4 acr:my-4">
    <div :class="props.class" class="acr:bg-white acr:rounded-md">
      <slot />
    </div>
  </div>
</template>
