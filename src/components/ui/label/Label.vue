<script setup lang="ts">
import type { LabelProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { Label } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<LabelProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <Label
    data-slot="label"
    v-bind="delegatedProps"
    :class="
      cn(
        'acr:flex acr:items-center acr:gap-2 acr:text-sm acr:leading-none acr:font-medium acr:select-none acr:group-data-[disabled=true]:pointer-events-none acr:group-data-[disabled=true]:opacity-50 acr:peer-disabled:cursor-not-allowed acr:peer-disabled:opacity-50',
        props.class,
      )
    "
  >
    <slot />
  </Label>
</template>
