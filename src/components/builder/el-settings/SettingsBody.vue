<script setup lang="ts">
import { ColorPicker } from 'vue3-colorpicker'
import { Label } from '@/components/ui/label'
import { useBuilderStore } from '@/stores/useBuilderStore.ts'

const builder = useBuilderStore()
</script>

<template>
  <div class="acr:space-y-2">
    <Label for="body-background-color">Body Background Color</Label>
    <div class="acr:p-1 acr:border acr: acr:rounded acr:inline-block">
      <ColorPicker
        v-model:pure-color="builder.style.backgroundColor"
        id="body-background-color"
        format="hex6"
      />
    </div>
  </div>
</template>
