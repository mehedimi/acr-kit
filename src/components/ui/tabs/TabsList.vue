<script setup lang="ts">
import type { TabsListProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { TabsList } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<TabsListProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <TabsList
    data-slot="tabs-list"
    v-bind="delegatedProps"
    :class="
      cn(
        'acr:bg-muted acr:text-muted-foreground acr:inline-flex acr:h-9 acr:w-fit acr:items-center acr:justify-center acr:rounded-lg acr:p-[3px]',
        props.class,
      )
    "
  >
    <slot />
  </TabsList>
</template>
