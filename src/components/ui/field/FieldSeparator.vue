<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    data-slot="field-separator"
    :data-content="!!$slots.default"
    :class="
      cn(
        'acr:relative acr:-my-2 acr:h-5 acr:text-sm acr:group-data-[variant=outline]/field-group:-mb-2',
        props.class,
      )
    "
  >
    <Separator class="acr:absolute acr:inset-0 acr:top-1/2" />
    <span
      v-if="$slots.default"
      class="acr:bg-background acr:text-muted-foreground acr:relative acr:mx-auto acr:block acr:w-fit acr:px-2"
      data-slot="field-separator-content"
    >
      <slot />
    </span>
  </div>
</template>
