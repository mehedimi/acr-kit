<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ALargeSmallIcon, PaletteIcon, ChevronDownIcon, LinkIcon } from 'lucide-vue-next'
import { Label } from '@/components/ui/label'
import Spacing from '@/components/builder/controls/Spacing.vue'
import { Slider } from '@/components/ui/slider'
import { useBuilderStore } from '@/stores/useBuilderStore.ts'
import type { ImageElement } from '@/types/builder.ts'
import { ButtonGroup } from '@/components/ui/button-group'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import TextAlign from '@/components/builder/controls/TextAlign.vue'
import { useWpMediaPicker } from '@/composables/useWpMediaPicker.ts'
import { ref } from 'vue'

const openedTab = ref('content')

const store = useBuilderStore()

const currentElement = store.currentElement as ImageElement

const media = useWpMediaPicker({
  type: 'image',
})

const selectImage = () => {
  media.open((images) => {
    const image = images[0]

    if (!image) return

    store.$patch((innerStore) => {
      let e = innerStore.elements.find((el) => currentElement === el) as ImageElement

      e.src = image.url
      e.alt = (image.alt ?? image.title) || 'Image'
      openedTab.value = 'style'
    })
  })
}
</script>

<template>
  <Tabs v-model="openedTab" class="acr:m-4 acr:items-center">
    <TabsList>
      <TabsTrigger value="content"><ALargeSmallIcon /> Content</TabsTrigger>
      <TabsTrigger value="style"><PaletteIcon /> Style</TabsTrigger>
    </TabsList>
    <TabsContent value="content" class="acr:space-y-4 acr:w-full">
      <ButtonGroup>
        <ButtonGroup>
          <Button @click="selectImage" variant="outline"
            >{{ currentElement.src ? 'Replace' : 'Select' }} from media
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button variant="outline" size="icon" aria-label="More Options">
                <ChevronDownIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" class="w-52">
              <DropdownMenuGroup>
                <DropdownMenuItem> <LinkIcon /> Insert image from link </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </ButtonGroup>
      </ButtonGroup>
    </TabsContent>
    <TabsContent value="style" class="acr:w-full acr:space-y-6">
      <div class="acr:space-y-2">
        <Label>Align</Label>
        <TextAlign v-model="currentElement.sectionStyle.textAlign" />
      </div>
      <div class="acr:space-y-2">
        <Label>Padding</Label>
        <Spacing v-model="currentElement.style.padding as string" />
      </div>
      <div class="acr:space-y-2.5">
        <Label class="acr:justify-between"
          >Max Width
          <span class="acr:text-muted-foreground">{{
            currentElement.style.maxWidth || '100%'
          }}</span></Label
        >
        <Slider
          :min="0"
          :max="100"
          :modelValue="[parseInt((currentElement.style.maxWidth as string) || '0', 10)]"
          @update:model-value="(v) => (currentElement.style.maxWidth = v?.[0] + '%')"
        />
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
          :modelValue="[parseInt((currentElement.sectionStyle.marginTop as string) || '0', 10)]"
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
          :modelValue="[parseInt((currentElement.sectionStyle.marginBottom as string) || '0', 10)]"
          @update:model-value="(v) => (currentElement.sectionStyle.marginBottom = v?.[0] + 'px')"
        />
      </div>
    </TabsContent>
  </Tabs>
</template>
