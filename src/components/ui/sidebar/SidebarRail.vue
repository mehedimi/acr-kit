<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"
import { useSidebar } from "./utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()

const { toggleSidebar } = useSidebar()
</script>

<template>
  <button
    data-sidebar="rail"
    data-slot="sidebar-rail"
    aria-label="Toggle Sidebar"
    :tabindex="-1"
    title="Toggle Sidebar"
    :class="cn(
      'acr:hover:after:bg-sidebar-border acr:absolute acr:inset-y-0 acr:z-20 acr:hidden acr:w-4 acr:-translate-x-1/2 acr:transition-all acr:ease-linear acr:group-data-[side=left]:-right-4 acr:group-data-[side=right]:left-0 acr:after:absolute acr:after:inset-y-0 acr:after:left-1/2 acr:after:w-[2px] acr:sm:flex',
      'acr:in-data-[side=left]:cursor-w-resize acr:in-data-[side=right]:cursor-e-resize',
      'acr:[[data-side=left][data-state=collapsed]_&]:cursor-e-resize acr:[[data-side=right][data-state=collapsed]_&]:cursor-w-resize',
      'acr:hover:group-data-[collapsible=offcanvas]:bg-sidebar acr:group-data-[collapsible=offcanvas]:translate-x-0 acr:group-data-[collapsible=offcanvas]:after:left-full',
      'acr:[[data-side=left][data-collapsible=offcanvas]_&]:-right-2',
      'acr:[[data-side=right][data-collapsible=offcanvas]_&]:-left-2',
      props.class,
    )"
    @click="toggleSidebar"
  >
    <slot />
  </button>
</template>
