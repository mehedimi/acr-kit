<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { Label } from '@/components/ui/label'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <Label
    data-slot="field-label"
    :class="
      cn(
        'acr:group/field-label acr:peer/field-label acr:flex acr:w-fit acr:gap-2 acr:leading-snug acr:group-data-[disabled=true]/field:opacity-50',
        'acr:has-[>[data-slot=field]]:w-full acr:has-[>[data-slot=field]]:flex-col acr:has-[>[data-slot=field]]:rounded-md acr:has-[>[data-slot=field]]:border acr:[&>*]:data-[slot=field]:p-4',
        'acr:has-data-[state=checked]:bg-primary/5 acr:has-data-[state=checked]:border-primary acr:dark:has-data-[state=checked]:bg-primary/10',
        props.class,
      )
    "
  >
    <slot />
  </Label>
</template>
