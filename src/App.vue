<script setup lang="ts">
import { Toaster } from 'vue-sonner'
import 'vue-sonner/style.css'
import 'vue3-colorpicker/style.css'
import { useRouter } from 'vue-router'

if (!acrApp.appToken) {
  useRouter().push({ name: 'connect' })
}
</script>

<template>
  <router-view />
  <Toaster position="top-right" />
</template>

<style>
.vc-color-wrap {
  margin-right: 0 !important;
}
</style>
