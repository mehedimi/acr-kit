<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { watch } from 'vue'

const route = useRoute()

function moveToChild(name: string) {
  if (name === 'configurations') {
    useRouter().replace({
      name: 'configurations.email',
    })
  }
}

moveToChild(route.name as string)

watch(
  () => route.name,
  (name) => {
    moveToChild(name as string)
  },
)
</script>
<template></template>
