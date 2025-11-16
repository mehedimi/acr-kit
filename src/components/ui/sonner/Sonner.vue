<script lang="ts" setup>
import type { ToasterProps } from "vue-sonner"
import { CircleCheckIcon, InfoIcon, Loader2Icon, OctagonXIcon, TriangleAlertIcon, XIcon } from "lucide-vue-next"
import { Toaster as Sonner } from "vue-sonner"
import { cn } from "@/lib/utils"

const props = defineProps<ToasterProps>()
</script>

<template>
  <Sonner
    :class="cn('acr:toaster acr:group', props.class)"
    :style="{
      '--normal-bg': 'var(--popover)',
      '--normal-text': 'var(--popover-foreground)',
      '--normal-border': 'var(--border)',
      '--border-radius': 'var(--radius)',
    }"
    v-bind="props"
  >
    <template #success-icon>
      <CircleCheckIcon class="acr:size-4" />
    </template>
    <template #info-icon>
      <InfoIcon class="acr:size-4" />
    </template>
    <template #warning-icon>
      <TriangleAlertIcon class="acr:size-4" />
    </template>
    <template #error-icon>
      <OctagonXIcon class="acr:size-4" />
    </template>
    <template #loading-icon>
      <div>
        <Loader2Icon class="acr:size-4 acr:animate-spin" />
      </div>
    </template>
    <template #close-icon>
      <XIcon class="acr:size-4" />
    </template>
  </Sonner>
</template>
