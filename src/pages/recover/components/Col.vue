<template>
  <div class="acr:md:flex acr:gap-x-12">
    <div class="acr:w-35 acr:md:w-40 acr:xl:w-55">
      <slot name="left" />
    </div>
    <div class="acr:flex-1">
      <slot />
    </div>
  </div>
</template>
