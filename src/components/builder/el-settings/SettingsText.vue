<script setup lang="ts">
import Editor from '@/components/editor/Editor.vue'
import type { TextElement } from '@/types/builder.ts'
import { useBuilderStore } from '@/stores/useBuilderStore.ts'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Label } from '@/components/ui/label'
import Spacing from '@/components/builder/controls/Spacing.vue'
import { Slider } from '@/components/ui/slider'
import { ALargeSmallIcon, PaletteIcon } from 'lucide-vue-next'

const store = useBuilderStore()

const currentElement: TextElement = store.currentElement as TextElement
</script>

<template>
  <Tabs default-value="content" class="acr:m-4 acr:items-center">
    <TabsList>
      <TabsTrigger value="content"><ALargeSmallIcon /> Content</TabsTrigger>
      <TabsTrigger value="style"><PaletteIcon /> Style</TabsTrigger>
    </TabsList>
    <TabsContent value="content">
      <Editor v-model="currentElement.text" />
    </TabsContent>
    <TabsContent value="style" class="acr:w-full acr:space-y-6">
      <div class="acr:space-y-2">
        <Label>Padding</Label>
        <Spacing v-model="currentElement.style.padding" />
      </div>
      <div class="acr:space-y-2.5">
        <Label class="acr:justify-between"
          >Margin Top
          <span class="acr:text-muted-foreground">{{
            currentElement.sectionStyle.marginTop || '0px'
          }}</span></Label
        >
        <Slider
          :min="0"
          :max="100"
          :modelValue="[parseInt(currentElement.sectionStyle.marginTop || '0', 10)]"
          @update:model-value="(v) => (currentElement.sectionStyle.marginTop = v?.[0] + 'px')"
        />
      </div>
      <div class="acr:space-y-2.5">
        <Label class="acr:justify-between"
          >Margin Bottom
          <span class="acr:text-muted-foreground">{{
            currentElement.sectionStyle.marginBottom || '0px'
          }}</span></Label
        >
        <Slider
          :min="0"
          :max="100"
          :modelValue="[parseInt(currentElement.sectionStyle.marginBottom || '0', 10)]"
          @update:model-value="(v) => (currentElement.sectionStyle.marginBottom = v?.[0] + 'px')"
        />
      </div>
    </TabsContent>
  </Tabs>
</template>
