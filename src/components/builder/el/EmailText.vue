<script setup lang="ts">
import { Text, Section } from '@vue-email/components'
import type { TextElement } from '@/types/builder.ts'
defineProps<TextElement>()
</script>

<template>
  <Section>
    <Text :style="style">{{ text }}</Text>
  </Section>
</template>
