<script setup lang="ts">
import { useBuilderStore } from '@/stores/useBuilderStore.ts'
import SettingsText from '@/components/builder/el-settings/SettingsText.vue'
import SettingsImage from '@/components/builder/el-settings/SettingsImage.vue'
import SettingsButton from '@/components/builder/el-settings/SettingsButton.vue'
import SettingsHeading from '@/components/builder/el-settings/SettingsHeading.vue'

const store = useBuilderStore()
function getComponent() {
  switch (store.currentElement?.type) {
    case 'Text':
      return SettingsText
    case 'Image':
      return SettingsImage
    case 'Button':
      return SettingsButton
    case 'Heading':
      return SettingsHeading
  }
}
</script>

<template>
  <component :is="getComponent()"></component>
</template>
