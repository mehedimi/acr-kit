<script setup lang="ts">
import { Container } from '@vue-email/components'
import Control from '@/components/builder/Control.vue'
import type { Template } from '@/types/builder.ts'
// @ts-ignore
import EmailText from '@/components/builder/el/EmailText.vue'
import EmailButton from '@/components/builder/el/EmailButton.vue'
import EmailHeading from '@/components/builder/el/EmailHeading.vue'
import EmailImage from '@/components/builder/el/EmailImage.vue'

function getComponent(type: 'EmailText' | 'EmailButton' | 'EmailHeading' | 'EmailImage') {
  switch (type) {
    case 'EmailText':
      return EmailText
    case 'EmailButton':
      return EmailButton
    case 'EmailHeading':
      return EmailHeading
    case 'EmailImage':
      return EmailImage
  }
}

defineProps<{
  template: Template
  isEditing: boolean
}>()
</script>

<template>
  <Container class="container" style="background-color: #fff">
    <template v-for="element in template.elements">
      <Control v-if="isEditing">
        <component :is="getComponent(element.type)" v-bind="element" />
      </Control>
      <component v-else :is="getComponent(element.type)" v-bind="element" />
    </template>
  </Container>
</template>
