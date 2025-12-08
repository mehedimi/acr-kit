<script setup lang="ts">
import { Section } from '@vue-email/components'
import type { TextElement } from '@/types/builder.ts'
defineProps<TextElement>()
</script>

<template>
  <Section :style="sectionStyle">
    <div :style="style" v-html="text"></div>
  </Section>
</template>
