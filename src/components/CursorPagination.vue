<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { type RouteLocationRaw, RouterLink } from 'vue-router'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-vue-next'

defineProps<{
  to?: RouteLocationRaw
  next?: string
  prev?: string
  disabled?: boolean
}>()
</script>

<template>
  <div class="acr:p-4 acr:flex acr:justify-between">
    <Button
      :disabled="!prev || disabled"
      variant="outline"
      :as="prev ? RouterLink : 'button'"
      :to="{ ...((to as object) || {}), query: { cursor: prev } }"
      ><ChevronLeftIcon /> Previous</Button
    >
    <Button
      :disabled="!next || disabled"
      variant="outline"
      :as="next ? RouterLink : 'button'"
      :to="{ ...((to as object) || {}), query: { cursor: next } }"
      >Next <ChevronRightIcon />
    </Button>
  </div>
</template>
