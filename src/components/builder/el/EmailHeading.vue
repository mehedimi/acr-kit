<script setup lang="ts">
import { Heading } from '@vue-email/components'
import type { HeadingElement } from '@/types/builder.ts'
defineProps<HeadingElement>()
</script>

<template>
  <Heading :as="heading" :style="style">{{ text }}</Heading>
</template>
