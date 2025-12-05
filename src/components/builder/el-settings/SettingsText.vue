<script setup lang="ts">
import Editor from '@/components/editor/Editor.vue'
import type { TextElement } from '@/types/builder.ts'
import { useBuilderStore } from '@/stores/useBuilderStore.ts'

const store = useBuilderStore()

const currentElement: TextElement = store.currentElement as TextElement
</script>

<template>
  <div>
    <Editor v-model="currentElement.text" />
  </div>
</template>
