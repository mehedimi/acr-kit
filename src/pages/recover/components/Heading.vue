<script setup lang="ts">
import Header from '@/components/Header.vue'
import type { RouteLocationRaw } from 'vue-router'

const props = defineProps<{
  title?: string
  description?: string
  href?: RouteLocationRaw
}>()

const urls: Array<{
  title: string
  href: RouteLocationRaw
}> = []

if (props.title && props.href) {
  urls.push({
    title: props.title,
    href: props.href,
  })
}
</script>

<template>
  <Header
    title="Recovery Options"
    :description="
      description ||
      'Control when a cart becomes abandoned and define your recovery workflow to maximize conversions.'
    "
    :href="{
      name: 'recovery.options',
    }"
    :links="urls"
  />
</template>
