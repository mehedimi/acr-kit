<script setup lang="ts">
import { computed } from 'vue'
import { Control } from '@/enum/control.ts'
import { useBuilderStore } from '@/stores/useBuilderStore.ts'

const store = useBuilderStore()

const text = computed(() => {
  switch (store.action?.action) {
    case Control.ADD_AFTER:
      return 'Select element to add after: ' + store.currentElement?.type.replace('Email', '')
    case Control.ADD_BEFORE:
      return 'Select element to add before: ' + store.currentElement?.type.replace('Email', '')
    case Control.EDIT:
      return 'Edit element of: ' + store.currentElement?.type.replace('Email', '')
    default:
      return 'Edit email body style'
  }
})
</script>

<template>
  <h2
    class="acr:!my-0 acr:bg-white acr:!font-medium acr:p-4 acr:border-b acr:!text-muted-foreground"
  >
    {{ text }}
  </h2>
</template>
