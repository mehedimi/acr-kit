<script setup lang="ts">
import type { ButtonElement } from '@/types/builder.ts'
import { Link } from '@vue-email/components'

defineProps<ButtonElement>()
</script>

<template>
  <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
    <tbody>
      <tr>
        <td :style="sectionStyle">
          <Link :style="style" :href="href">{{ text }}</Link>
        </td>
      </tr>
    </tbody>
  </table>
</template>
