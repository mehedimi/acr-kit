<script setup lang="ts">
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { emailSafeFonts } from '@/components/data.ts'
</script>

<template>
  <Select>
    <SelectTrigger>
      <SelectValue placeholder="Select a font" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem
        :style="{ fontFamily: font.value }"
        v-for="font in emailSafeFonts"
        :value="font.value"
        >{{ font.label }}</SelectItem
      >
    </SelectContent>
  </Select>
</template>
