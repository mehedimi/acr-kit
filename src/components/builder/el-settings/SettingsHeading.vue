<script setup lang="ts">
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useBuilderStore } from '@/stores/useBuilderStore.ts'
import type { HeadingElement } from '@/types/builder.ts'
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from '@/components/ui/select'
import FontSelect from '@/components/FontSelect.vue'
import { ColorPicker } from 'vue3-colorpicker'
import { Slider } from '@/components/ui/slider'

const store = useBuilderStore()

const currentElement = store.currentElement as HeadingElement

type HeadingOption = {
  label: string
  value: string
}

const headingOptions: HeadingOption[] = [
  { label: 'Heading 1', value: 'h1' },
  { label: 'Heading 2', value: 'h2' },
  { label: 'Heading 3', value: 'h3' },
  { label: 'Heading 4', value: 'h4' },
  { label: 'Heading 5', value: 'h5' },
  { label: 'Heading 6', value: 'h6' },
]
</script>

<template>
  <Tabs default-value="content" class="acr:m-4 acr:items-center">
    <TabsList>
      <TabsTrigger value="content">Content</TabsTrigger>
      <TabsTrigger value="style"> Style </TabsTrigger>
      <TabsTrigger value="container-style"> Container Style </TabsTrigger>
    </TabsList>
    <TabsContent value="content" class="acr:space-y-4 acr:w-full">
      <div class="acr:space-y-2">
        <Label for="heading-tag">Heading</Label>
        <Select v-model="currentElement.heading" id="heading-tag">
          <SelectTrigger>
            <SelectValue placeholder="Select a heading" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem v-for="hOption in headingOptions" :value="hOption.value">{{
              hOption.label
            }}</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div class="acr:space-y-2">
        <Label for="heading-text">Text</Label>
        <Input id="heading-text" v-model="currentElement.text" placeholder="Heading text" />
      </div>
    </TabsContent>
    <TabsContent value="style" class="acr:space-y-4 acr:w-full">
      <div class="acr:space-y-2">
        <Label for="heading-font">Font</Label>
        <FontSelect id="heading-font" v-model="currentElement.style.fontFamily" />
      </div>
      <div class="acr:space-y-2">
        <Label for="heading-color">Color</Label>
        <div class="acr:p-1 acr:border acr:rounded acr:inline-block">
          <ColorPicker
            id="heading-color"
            v-model:pure-color="currentElement.style.color"
            format="hex6"
          />
        </div>
      </div>
      <div class="acr:space-y-2">
        <Label for="heading-font-size" class="acr:justify-between">
          Font Size <span>{{ currentElement.style.fontSize }}</span>
        </Label>
        <Slider
          @update:model-value="(v) => (currentElement.style.fontSize = v?.[0] + 'px')"
          :model-value="[parseInt(currentElement.style?.fontSize || '14', 10)]"
          :min="8"
        />
      </div>
    </TabsContent>
    <TabsContent value="container-style"> Change your password here. </TabsContent>
  </Tabs>
</template>
