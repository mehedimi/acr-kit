<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ALargeSmallIcon, PaletteIcon, LayoutTemplateIcon } from 'lucide-vue-next'
import { Label } from '@/components/ui/label'
import Spacing from '@/components/builder/controls/Spacing.vue'
import { Slider } from '@/components/ui/slider'
import { useBuilderStore } from '@/stores/useBuilderStore.ts'
import type { ButtonElement } from '@/types/builder.ts'
import TextAlign from '@/components/builder/controls/TextAlign.vue'
import { ColorPicker } from 'vue3-colorpicker'
import { Input } from '@/components/ui/input'
import Help from '@/pages/recover/components/Help.vue'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { emailSafeFonts } from '@/components/data.ts'

const store = useBuilderStore()

const currentElement = store.currentElement as ButtonElement
</script>

<template>
  <Tabs default-value="content" class="acr:m-4 acr:items-center">
    <TabsList>
      <TabsTrigger value="content"><ALargeSmallIcon /> Content</TabsTrigger>
      <TabsTrigger value="style"><PaletteIcon /> Style</TabsTrigger>
      <TabsTrigger value="section-style"><LayoutTemplateIcon /> Section Style</TabsTrigger>
    </TabsList>
    <TabsContent value="content" class="acr:space-y-4 acr:w-full">
      <div class="acr:space-y-2">
        <Label for="button-text">Text</Label>
        <Input id="button-text" placeholder="Button Text" v-model="currentElement.text" />
      </div>
      <div class="acr:space-y-2">
        <Label for="button-href">Href</Label>
        <Input id="button-href" placeholder="Enter url" v-model="currentElement.href" />
        <Help>Use <code>[cart-link]</code> as the value to insert the dynamic cart URL here.</Help>
      </div>
    </TabsContent>
    <TabsContent value="style" class="acr:w-full acr:space-y-6">
      <div class="acr:space-y-2">
        <Label for="button-color">Color</Label>
        <div class="acr:p-1 acr:border acr: acr:rounded acr:inline-block">
          <ColorPicker
            id="button-color"
            v-model:pure-color="currentElement.style.color"
            format="hex6"
            class="acr:w-full"
          />
        </div>
      </div>
      <div class="acr:space-y-2">
        <Label for="button-bg-color">Background Color</Label>
        <div class="acr:p-1 acr:border acr: acr:rounded acr:inline-block">
          <ColorPicker
            id="button-bg-color"
            v-model:pure-color="currentElement.style.backgroundColor"
            format="hex6"
            class="acr:w-full"
          />
        </div>
      </div>
      <div class="acr:space-y-2">
        <Label for="button-font">Font Family</Label>
        <Select id="button-font" v-model="currentElement.style.fontFamily">
          <SelectTrigger>
            <SelectValue placeholder="Select a font" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem
                :style="{ fontFamily: font.value }"
                v-for="font in emailSafeFonts"
                :value="font.value"
                >{{ font.label }}</SelectItem
              >
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div class="acr:space-y-2">
        <Label>Align</Label>
        <TextAlign v-model="currentElement.sectionStyle.textAlign" />
      </div>
      <div class="acr:space-y-2.5">
        <Label class="acr:justify-between"
          >Border Radius
          <span class="acr:text-muted-foreground">{{
            currentElement.style.borderRadius || '0px'
          }}</span></Label
        >
        <Slider
          :min="0"
          :max="100"
          :modelValue="[parseInt((currentElement.style.borderRadius as string) || '0', 10)]"
          @update:model-value="(v) => (currentElement.style.borderRadius = v?.[0] + 'px')"
        />
      </div>
      <div class="acr:space-y-2">
        <Label>Padding</Label>
        <Spacing v-model="currentElement.style.padding as string" />
      </div>
    </TabsContent>
    <TabsContent value="section-style" class="acr:w-full acr:space-y-6">
      <div class="acr:space-y-2">
        <Label for="button-section-bg-color">Background Color</Label>
        <div class="acr:p-1 acr:border acr: acr:rounded acr:inline-block">
          <ColorPicker
            id="button-section-bg-color"
            v-model:pure-color="currentElement.sectionStyle.backgroundColor"
            format="hex6"
            class="acr:w-full"
          />
        </div>
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
