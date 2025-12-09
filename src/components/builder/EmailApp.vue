<script setup lang="ts">
import { Container } from '@vue-email/components'
import Control from '@/components/builder/Control.vue'
import type { ElementType, Template } from '@/types/builder.ts'
// @ts-ignore
import EmailText from '@/components/builder/el/EmailText.vue'
import EmailButton from '@/components/builder/el/EmailButton.vue'
import EmailImage from '@/components/builder/el/EmailImage.vue'

function getComponent(type: ElementType) {
  switch (type) {
    case 'Text':
      return EmailText
    case 'Button':
      return EmailButton
    case 'Image':
      return EmailImage
  }
}

defineProps<{
  template: Template
  isEditing: boolean
}>()
</script>

<template>
  <Container class="container" :style="template.style">
    <template v-for="(element, index) in template.elements">
      <Control v-if="isEditing" :index="index" :key="index">
        <component :is="getComponent(element.type)" v-bind="element" />
      </Control>
      <component v-else :is="getComponent(element.type)" v-bind="element" />
    </template>
  </Container>
</template>
