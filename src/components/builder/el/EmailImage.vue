<script setup lang="ts">
import { Img } from '@vue-email/components'
import type { ImageElement } from '@/types/builder.ts'
const props = defineProps<ImageElement>()

const srcUrl = props.src
  ? props.src
  : acrApp.assetUrl.replace('dist/', 'assets/images/email-image-placeholder.png')
</script>

<template>
  <Img :src="srcUrl" :style="style" :alt="alt" />
</template>

<style scoped></style>
