<script setup lang="ts">
import NavMenu from '@/components/NavMenu.vue'
</script>

<template>
  <div class="acr:flex acr:bg-white acr:px-4 acr:py-2 acr:gap-x-8 acr:items-center">
    <RouterLink :to="{ name: 'overview' }" class="acr:block">
      <img class="acr:max-w-[130px]" src="../assets/logo.svg" alt="Logo" />
    </RouterLink>

    <NavMenu />
  </div>

  <slot />
</template>
