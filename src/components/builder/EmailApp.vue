<script setup lang="ts">
import { Container } from '@vue-email/components'
import Control from '@/components/builder/Control.vue'
import { Control as ControlEnum } from '@/enum/control.ts'
import type { ElementType, Template } from '@/types/builder.ts'
import { useBuilderStore } from '@/stores/useBuilderStore.ts'

// @ts-ignore
import EmailText from '@/components/builder/el/EmailText.vue'
import EmailButton from '@/components/builder/el/EmailButton.vue'
import EmailImage from '@/components/builder/el/EmailImage.vue'
import EmailCartItems from '@/components/builder/el/EmailCartItems.vue'

function getComponent(type: ElementType) {
  switch (type) {
    case 'Text':
      return EmailText
    case 'Button':
      return EmailButton
    case 'Image':
      return EmailImage
    case 'CartItems':
      return EmailCartItems
  }
}

defineProps<{
  template: Template
  isEditing?: boolean
}>()

const store = useBuilderStore()
</script>

<template>
  <Container class="container" :style="template.style">
    <template v-for="(element, index) in template.elements">
      <Control v-if="isEditing" :index="index" :key="index">
        <component :isEditing="isEditing" :is="getComponent(element.type)" v-bind="element" />
      </Control>
      <component v-else :isEditing="isEditing" :is="getComponent(element.type)" v-bind="element" />
    </template>
    <div class="empty-el" v-if="isEditing && template.elements.length === 0">
      <button @click="store.setAction(ControlEnum.ADD_AFTER, 0)">Add element</button>
    </div>
  </Container>
</template>
