<script setup lang="ts">
import type { SidebarProps } from "."
import { cn } from "@/lib/utils"
import { Sheet, SheetContent } from '@/components/ui/sheet'
import SheetDescription from '@/components/ui/sheet/SheetDescription.vue'
import SheetHeader from '@/components/ui/sheet/SheetHeader.vue'
import SheetTitle from '@/components/ui/sheet/SheetTitle.vue'
import { SIDEBAR_WIDTH_MOBILE, useSidebar } from "./utils"

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<SidebarProps>(), {
  side: "left",
  variant: "sidebar",
  collapsible: "offcanvas",
})

const { isMobile, state, openMobile, setOpenMobile } = useSidebar()
</script>

<template>
  <div
    v-if="collapsible === 'none'"
    data-slot="sidebar"
    :class="cn('acr:bg-sidebar acr:text-sidebar-foreground acr:flex acr:h-full acr:w-(--sidebar-width) acr:flex-col', props.class)"
    v-bind="$attrs"
  >
    <slot />
  </div>

  <Sheet v-else-if="isMobile" :open="openMobile" v-bind="$attrs" @update:open="setOpenMobile">
    <SheetContent
      data-sidebar="sidebar"
      data-slot="sidebar"
      data-mobile="true"
      :side="side"
      class="acr:bg-sidebar acr:text-sidebar-foreground acr:w-(--sidebar-width) acr:p-0 acr:[&>button]:hidden"
      :style="{
        '--sidebar-width': SIDEBAR_WIDTH_MOBILE,
      }"
    >
      <SheetHeader class="acr:sr-only">
        <SheetTitle>Sidebar</SheetTitle>
        <SheetDescription>Displays the mobile sidebar.</SheetDescription>
      </SheetHeader>
      <div class="acr:flex acr:h-full acr:w-full acr:flex-col">
        <slot />
      </div>
    </SheetContent>
  </Sheet>

  <div
    v-else
    class="acr:group acr:peer acr:text-sidebar-foreground acr:hidden acr:md:block"
    data-slot="sidebar"
    :data-state="state"
    :data-collapsible="state === 'collapsed' ? collapsible : ''"
    :data-variant="variant"
    :data-side="side"
  >
    <!-- This is what handles the sidebar gap on desktop  -->
    <div
      :class="cn(
        'acr:relative acr:w-(--sidebar-width) acr:bg-transparent acr:transition-[width] acr:duration-200 acr:ease-linear',
        'acr:group-data-[collapsible=offcanvas]:w-0',
        'acr:group-data-[side=right]:rotate-180',
        variant === 'floating' || variant === 'inset'
          ? 'acr:group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]'
          : 'acr:group-data-[collapsible=icon]:w-(--sidebar-width-icon)',
      )"
    />
    <div
      :class="cn(
        'acr:fixed acr:inset-y-0 acr:z-10 acr:hidden acr:h-svh acr:w-(--sidebar-width) acr:transition-[left,right,width] acr:duration-200 acr:ease-linear acr:md:flex',
        side === 'left'
          ? 'acr:left-0 acr:group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]'
          : 'acr:right-0 acr:group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]',
        // Adjust the padding for floating and inset variants.
        variant === 'floating' || variant === 'inset'
          ? 'acr:p-2 acr:group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]'
          : 'acr:group-data-[collapsible=icon]:w-(--sidebar-width-icon) acr:group-data-[side=left]:border-r acr:group-data-[side=right]:border-l',
        props.class,
      )"
      v-bind="$attrs"
    >
      <div
        data-sidebar="sidebar"
        class="acr:bg-sidebar acr:group-data-[variant=floating]:border-sidebar-border acr:flex acr:h-full acr:w-full acr:flex-col acr:group-data-[variant=floating]:rounded-lg acr:group-data-[variant=floating]:border acr:group-data-[variant=floating]:shadow-sm"
      >
        <slot />
      </div>
    </div>
  </div>
</template>
