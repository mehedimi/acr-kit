<script setup lang="ts">
import type { TextElement } from '@/types/builder.ts'
defineProps<TextElement>()
</script>

<template>
  <table
    align="center"
    width="100%"
    border="0"
    cellpadding="0"
    cellspacing="0"
    role="presentation"
    :style="sectionStyle"
  >
    <tbody>
      <tr>
        <td :style="style" v-html="text"></td>
      </tr>
    </tbody>
  </table>
</template>
