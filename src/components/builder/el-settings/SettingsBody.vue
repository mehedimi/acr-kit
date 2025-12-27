<script setup lang="ts">
import { ColorPicker } from 'vue3-colorpicker'
import { Label } from '@/components/ui/label'
import { useBuilderStore } from '@/stores/useBuilderStore.ts'
import FontSelect from '@/components/FontSelect.vue'

const builder = useBuilderStore()
</script>

<template>
  <div>
    <div class="acr:space-y-2 acr:p-4">
      <Label for="container-background-color">Container Background Color</Label>
      <div class="acr:p-1 acr:border acr: acr:rounded acr:inline-block">
        <ColorPicker
          v-model:pure-color="builder.style.backgroundColor"
          id="container-background-color"
          format="hex6"
        />
      </div>
    </div>
    <div class="acr:space-y-2 acr:p-4">
      <Label for="body-background-color">Body Background Color</Label>
      <div class="acr:p-1 acr:border acr: acr:rounded acr:inline-block">
        <ColorPicker
          v-model:pure-color="builder.bodyStyle.backgroundColor"
          id="body-background-color"
          format="hex6"
        />
      </div>
    </div>
  </div>
</template>
