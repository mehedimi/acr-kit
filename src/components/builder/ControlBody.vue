<script setup lang="ts">
import { Control } from '@/enum/control.ts'
import SettingsBody from '@/components/builder/el-settings/SettingsBody.vue'
import ElEdit from '@/components/builder/el-settings/ElEdit.vue'
import ElAdd from '@/components/builder/el-settings/ElAdd.vue'
import { computed } from 'vue'
import { useBuilderStore } from '@/stores/useBuilderStore.ts'

const store = useBuilderStore()

const settingsComponent = computed(() => {
  switch (store.action?.action) {
    case Control.EDIT:
      return ElEdit
    case Control.ADD_AFTER:
    case Control.ADD_BEFORE:
      return ElAdd
    default:
      return SettingsBody
  }
})
</script>

<template>
  <div class="acr:flex-1">
    <component :is="settingsComponent" />
  </div>
</template>
