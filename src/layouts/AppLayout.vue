<script setup lang="ts">
import NavMenu from '@/components/NavMenu.vue'
</script>

<template>
  <div class="acr:px-5 acr:py-5">
    <img class="acr:max-w-[150px]" src="../assets/logo.svg" alt="Logo" />
  </div>
  <NavMenu />
  <slot />
</template>
