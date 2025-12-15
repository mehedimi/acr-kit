<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { Primitive } from "reka-ui"
import { cn } from "@/lib/utils"

const props = defineProps<PrimitiveProps & {
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <Primitive
    data-slot="sidebar-group-action"
    data-sidebar="group-action"
    :as="as"
    :as-child="asChild"
    :class="cn(
      'acr:text-sidebar-foreground acr:ring-sidebar-ring acr:hover:bg-sidebar-accent acr:hover:text-sidebar-accent-foreground acr:absolute acr:top-3.5 acr:right-3 acr:flex acr:aspect-square acr:w-5 acr:items-center acr:justify-center acr:rounded-md acr:p-0 acr:outline-hidden acr:transition-transform acr:focus-visible:ring-2 acr:[&>svg]:size-4 acr:[&>svg]:shrink-0',
      'acr:after:absolute acr:after:-inset-2 acr:md:after:hidden',
      'acr:group-data-[collapsible=icon]:hidden',
      props.class,
    )"
  >
    <slot />
  </Primitive>
</template>
