<script setup lang="ts">
import { Toaster } from 'vue-sonner'
import 'vue-sonner/style.css'
import { useRouter } from 'vue-router'

if (!acrApp.appToken) {
  useRouter().push({ name: 'connect' })
}
</script>

<template>
  <router-view />
  <Toaster position="top-center" />
</template>
