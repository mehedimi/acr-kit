<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'

const props = defineProps<{
  showIcon?: boolean
  class?: HTMLAttributes['class']
}>()

const width = computed(() => {
  return `${Math.floor(Math.random() * 40) + 50}%`
})
</script>

<template>
  <div
    data-slot="sidebar-menu-skeleton"
    data-sidebar="menu-skeleton"
    :class="cn('acr:flex acr:h-8 acr:items-center acr:gap-2 acr:rounded-md acr:px-2', props.class)"
  >
    <Skeleton v-if="showIcon" class="acr:size-4 acr:rounded-md" data-sidebar="menu-skeleton-icon" />

    <Skeleton
      class="acr:h-4 acr:max-w-(--skeleton-width) acr:flex-1"
      data-sidebar="menu-skeleton-text"
      :style="{ '--skeleton-width': width }"
    />
  </div>
</template>
