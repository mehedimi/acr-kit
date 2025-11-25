<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { cn } from "@/lib/utils"
import TableCell from "./TableCell.vue"
import TableRow from "./TableRow.vue"

const props = withDefaults(defineProps<{
  class?: HTMLAttributes["class"]
  colspan?: number
}>(), {
  colspan: 1,
})

const delegatedProps = reactiveOmit(props, "class")
</script>

<template>
  <TableRow>
    <TableCell
      :class="
        cn(
          'acr:p-4 acr:whitespace-nowrap acr:align-middle acr:text-sm acr:text-foreground',
          props.class,
        )
      "
      v-bind="delegatedProps"
    >
      <div class="acr:flex acr:items-center acr:justify-center acr:py-10">
        <slot />
      </div>
    </TableCell>
  </TableRow>
</template>
