<script setup lang="ts">
import type { ButtonElement } from '@/types/builder.ts'
import { Link } from '@vue-email/components'

defineProps<ButtonElement>()
</script>

<template>
  <Link :style="style" :href="href">{{ text }}</Link>
</template>
