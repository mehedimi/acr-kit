<script setup lang="ts">
import { computed } from 'vue'
import { Control } from '@/enum/control.ts'
import { useBuilderStore } from '@/stores/useBuilderStore.ts'

const store = useBuilderStore()

const text = computed(() => {
  switch (store.action?.action) {
    case Control.ADD_AFTER:
      if (store.currentElement?.type) {
        return 'Select element to add after: ' + store.currentElement?.type
      } else {
        return 'Select element to add after'
      }
    case Control.ADD_BEFORE:
      return 'Select element to add before: ' + store.currentElement?.type
    case Control.EDIT:
      return store.currentElement?.type
    default:
      return 'Edit email body style'
  }
})
</script>

<template>
  <div>
    <h2
      class="acr:!my-0 acr:text-center acr:bg-white acr:!font-medium acr:p-4 acr:border-b acr:!text-muted-foreground"
    >
      {{ text }}
    </h2>
  </div>
</template>
