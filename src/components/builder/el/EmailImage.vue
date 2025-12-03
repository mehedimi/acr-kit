<script setup lang="ts">
import { Img } from '@vue-email/components'
import type { ImageElement } from '@/types/builder.ts'
defineProps<ImageElement>()
</script>

<template>
  <Img :src="src" :style="style" :alt="alt" />
</template>

<style scoped></style>
