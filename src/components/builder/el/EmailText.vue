<script setup lang="ts">
import { Text, Section } from '@vue-email/components'
import type { TextElement } from '@/types/builder.ts'
defineProps<TextElement>()
</script>

<template>
  <Section :style="sectionStyle">
    <Text :style="style" v-html="text"></Text>
  </Section>
</template>
