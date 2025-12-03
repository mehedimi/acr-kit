<template>
  <div class="acr:md:flex acr:gap-x-12">
    <div class="acr:md:w-[300px]">
      <slot name="left" />
    </div>
    <div class="acr:flex-1">
      <slot />
    </div>
  </div>
</template>
