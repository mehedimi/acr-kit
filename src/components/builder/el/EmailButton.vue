<script setup lang="ts">
import type { ButtonElement } from '@/types/builder.ts'
import { Link, Section } from '@vue-email/components'

defineProps<ButtonElement>()
</script>

<template>
  <Section :style="sectionStyle">
    <Link :style="style" :href="href">{{ text }}</Link>
  </Section>
</template>
