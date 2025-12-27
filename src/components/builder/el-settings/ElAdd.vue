<script setup lang="ts">
import { FileText, ImageIcon, LinkIcon, ShoppingBasketIcon } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import type { ElementType } from '@/types/builder.ts'
import { useBuilderStore } from '@/stores/useBuilderStore.ts'

const store = useBuilderStore()

const items: Array<{ title: ElementType; icon: any }> = [
  {
    title: 'Text',
    icon: FileText,
  },
  {
    title: 'Button',
    icon: LinkIcon,
  },
  {
    title: 'Image',
    icon: ImageIcon,
  },
  {
    title: 'CartItems',
    icon: ShoppingBasketIcon,
  },
]
</script>

<template>
  <div class="acr:grid acr:grid-cols-3 acr:gap-4 acr:m-4">
    <Button
      class="acr:cursor-pointer"
      size="lg"
      variant="outline"
      v-for="item in items"
      :key="item.title"
      @click="store.addElement(item.title)"
    >
      <component :is="item.icon" />
      <p>{{ item.title }}</p>
    </Button>
  </div>
</template>
