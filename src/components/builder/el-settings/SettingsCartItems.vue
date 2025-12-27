<script setup lang="ts">
import Spacing from '@/components/builder/controls/Spacing.vue'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Slider } from '@/components/ui/slider'
import {
  ALargeSmallIcon,
  PaletteIcon,
  Grid2X2Icon,
  CircleCheckBigIcon,
  TextAlignJustifyIcon,
  BadgeInfoIcon,
} from 'lucide-vue-next'
import { Label } from '@/components/ui/label'
import { ColorPicker } from 'vue3-colorpicker'
import { useBuilderStore } from '@/stores/useBuilderStore.ts'
import type { CartItemsElement } from '@/types/builder.ts'
import { ButtonGroup } from '@/components/ui/button-group'
import { Button } from '@/components/ui/button'
import { ItemLayoutStyle } from '@/enum/item-layout-style.ts'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import FontSelect from '@/components/FontSelect.vue'
import SliderCustom from '@/components/SliderCustom.vue'
import TextAlign from '@/components/builder/controls/TextAlign.vue'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { computed } from 'vue'

const store = useBuilderStore()

const currentElement = computed(() => store.currentElement as CartItemsElement)

const layouts = [
  {
    title: 'List',
    icon: TextAlignJustifyIcon,
    layout: ItemLayoutStyle.LIST,
  },
  {
    title: 'Grid',
    icon: Grid2X2Icon,
    layout: ItemLayoutStyle.GRID,
  },
]
</script>

<template>
  <Tabs default-value="content" class="acr:m-4 acr:items-center">
    <TabsList class="acr:mb-4">
      <TabsTrigger value="content"><ALargeSmallIcon /> Content</TabsTrigger>
      <TabsTrigger value="style"> <PaletteIcon />Style </TabsTrigger>
      <TabsTrigger value="image"> <PaletteIcon />Image </TabsTrigger>
      <TabsTrigger value="title"> <PaletteIcon />Title </TabsTrigger>
      <TabsTrigger value="price"> <PaletteIcon />Price </TabsTrigger>
    </TabsList>
    <TabsContent value="content" class="acr:w-full acr:space-y-6">
      <Alert>
        <BadgeInfoIcon />
        <AlertDescription
          >These products are randomly selected from your store and are shown for design purposes
          only. Actual products will be displayed according to your selected
          style.</AlertDescription
        >
      </Alert>
      <div class="acr:space-y-2">
        <Label for="layout">Layout</Label>
        <ButtonGroup>
          <Button
            @click="currentElement.options.layout = l.layout"
            v-for="l in layouts"
            :variant="currentElement.options.layout === l.layout ? 'outline' : 'secondary'"
          >
            <CircleCheckBigIcon v-if="l.layout === currentElement.options.layout" />
            <component v-else :is="l.icon" />
            {{ l.title }}
          </Button>
        </ButtonGroup>
      </div>

      <div class="acr:space-y-2">
        <Label class="acr:flex acr:justify-between"
          >Gap <span class="acr:font-normal">{{ currentElement.options.gap || '0' }}px</span></Label
        >
        <Slider
          :min="0"
          :max="80"
          :modelValue="[currentElement.options.gap || 0]"
          @update:model-value="(v) => (currentElement.options.gap = v?.[0] || 0)"
        />
      </div>
      <div class="acr:space-y-2" v-if="currentElement.options.layout === ItemLayoutStyle.LIST">
        <Label>Size</Label>
        <ResizablePanelGroup direction="horizontal" class="acr:border acr:rounded">
          <ResizablePanel
            :min-size="10"
            :max-size="70"
            :default-size="currentElement.options.listItemSize"
            @resize="(s) => (currentElement.options.listItemSize = Math.round(s))"
            class="acr:text-center"
            >Image</ResizablePanel
          >
          <ResizableHandle with-handle />
          <ResizablePanel class="acr:text-center">Content</ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </TabsContent>
    <TabsContent value="style" class="acr:w-full acr:space-y-6">
      <div class="acr:space-y-2">
        <Label>Font</Label>
        <FontSelect v-model="currentElement.style.fontFamily" />
      </div>
      <div class="acr:space-y-2">
        <Label>Color</Label>
        <div class="acr:p-1 acr:border acr: acr:rounded acr:inline-block">
          <ColorPicker
            v-model:pure-color="currentElement.sectionStyle.color"
            format="hex6"
            class="acr:w-full"
          />
        </div>
      </div>
      <div class="acr:space-y-2">
        <Label>Background Color</Label>
        <div class="acr:p-1 acr:border acr: acr:rounded acr:inline-block">
          <ColorPicker
            v-model:pure-color="currentElement.sectionStyle.backgroundColor"
            format="hex6"
            class="acr:w-full"
          />
        </div>
      </div>
      <div class="acr:space-y-2">
        <Label>Text Align</Label>
        <TextAlign v-model="currentElement.sectionStyle.textAlign" />
      </div>
      <div class="acr:space-y-2" v-if="currentElement.options.layout === ItemLayoutStyle.LIST">
        <Label>Vertical Align</Label>
        <Select v-model="currentElement.style.verticalAlign" class="acr:w-full">
          <SelectTrigger>
            <SelectValue placeholder="Select a vertical align" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="top">Top</SelectItem>
            <SelectItem value="middle">Middle</SelectItem>
            <SelectItem value="bottom">Bottom</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div class="acr:space-y-2">
        <Label>Padding</Label>
        <Spacing v-model="currentElement.sectionStyle.padding as string" />
      </div>
      <div class="acr:space-y-2.5">
        <Label class="acr:justify-between"
          >Margin Top
          <span class="acr:text-muted-foreground">{{
            currentElement.sectionStyle.marginTop || '0px'
          }}</span></Label
        >
        <SliderCustom
          :min="0"
          :max="100"
          suffix="px"
          v-model="currentElement.sectionStyle.marginTop"
        />
      </div>
      <div class="acr:space-y-2.5">
        <Label class="acr:justify-between"
          >Margin Bottom
          <span class="acr:text-muted-foreground">{{
            currentElement.sectionStyle.marginBottom || '0px'
          }}</span></Label
        >
        <SliderCustom
          :min="0"
          :max="100"
          suffix="px"
          v-model="currentElement.sectionStyle.marginBottom"
        />
      </div>
    </TabsContent>
    <TabsContent value="image" class="acr:w-full acr:space-y-6">
      <div class="acr:space-y-2">
        <Label class="acr:flex acr:justify-between"
          >Image Max Width
          <span class="acr:font-normal">{{
            currentElement.imgStyle.maxWidth || '100%'
          }}</span></Label
        >
        <Slider
          :min="10"
          :step="2"
          :max="100"
          :modelValue="[parseInt((currentElement.imgStyle.maxWidth as string) || '100', 10)]"
          @update:model-value="(v) => (currentElement.imgStyle.maxWidth = v?.[0] + '%')"
        />
      </div>
      <div class="acr:space-y-2">
        <Label class="acr:flex acr:justify-between"
          >Border Radius
          <span class="acr:font-normal">{{
            currentElement.imgStyle.borderRadius || '0%'
          }}</span></Label
        >
        <Slider
          :min="0"
          :max="50"
          :modelValue="[parseInt((currentElement.imgStyle.borderRadius as string) || '0', 10)]"
          @update:model-value="(v) => (currentElement.imgStyle.borderRadius = v?.[0] + '%')"
        />
      </div>
      <div class="acr:space-y-2">
        <Label class="acr:flex acr:justify-between">Padding </Label>
        <Spacing v-model="currentElement.imgStyle.padding as string" />
      </div>
      <div class="acr:space-y-2">
        <Label class="acr:flex acr:justify-between">Margin</Label>
        <Spacing v-model="currentElement.imgStyle.margin as string" />
      </div>
    </TabsContent>
    <TabsContent value="title" class="acr:w-full acr:space-y-6">
      <div class="acr:space-y-2">
        <Label>Font</Label>
        <FontSelect v-model="currentElement.titleStyle.fontFamily" />
      </div>
      <div class="acr:space-y-2">
        <Label>Color</Label>
        <div class="acr:p-1 acr:border acr: acr:rounded acr:inline-block">
          <ColorPicker
            v-model:pure-color="currentElement.titleStyle.color"
            format="hex6"
            class="acr:w-full"
          />
        </div>
      </div>
      <div class="acr:space-y-2">
        <Label class="acr:flex acr:justify-between"
          >Size <span>{{ currentElement.titleStyle.fontSize || '-' }}</span></Label
        >
        <SliderCustom
          suffix="px"
          v-model="currentElement.titleStyle.fontSize"
          :min="10"
          :max="100"
        />
      </div>
      <div class="acr:space-y-2">
        <Label class="acr:flex acr:justify-between">Margin </Label>
        <Spacing v-model="currentElement.titleStyle.margin as string" />
      </div>
    </TabsContent>
    <TabsContent value="price" class="acr:w-full acr:space-y-6">
      <div class="acr:space-y-2">
        <Label>Font</Label>
        <FontSelect v-model="currentElement.priceStyle.fontFamily" />
      </div>
      <div class="acr:space-y-2">
        <Label>Color</Label>
        <div class="acr:p-1 acr:border acr: acr:rounded acr:inline-block">
          <ColorPicker
            v-model:pure-color="currentElement.priceStyle.color"
            format="hex6"
            class="acr:w-full"
          />
        </div>
      </div>
      <div class="acr:space-y-2">
        <Label class="acr:flex acr:justify-between"
          >Size <span>{{ currentElement.priceStyle.fontSize || '-' }}</span></Label
        >
        <SliderCustom
          suffix="px"
          v-model="currentElement.priceStyle.fontSize"
          :min="10"
          :max="100"
        />
      </div>
      <div class="acr:space-y-2">
        <Label class="acr:flex acr:justify-between">Margin </Label>
        <Spacing v-model="currentElement.priceStyle.margin as string" />
      </div>
    </TabsContent>
  </Tabs>
</template>
