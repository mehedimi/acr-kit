<script setup lang="ts">
import { Section } from '@vue-email/components'
import type { ImageElement } from '@/types/builder.ts'

defineProps<ImageElement>()

const defaultSrc = acrApp.assetUrl.replace('dist/', 'assets/images/email-image-placeholder.png')
</script>

<template>
  <Section :style="sectionStyle">
    <img :src="src ? src : defaultSrc" :style="style" :alt="alt" />
  </Section>
</template>

<style scoped></style>
