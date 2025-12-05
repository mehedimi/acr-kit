<script setup lang="ts">
import { EditorContent, useEditor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import { ButtonGroup } from '@/components/ui/button-group'
import { Button } from '@/components/ui/button'
import { Bold, Italic, Strikethrough, Underline, Hi } from 'lucide-vue-next'
import Highlight from '@tiptap/extension-highlight'
import Typography from '@tiptap/extension-typography'
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'

const props = defineProps<{
  modelValue?: string
}>()

const emit = defineEmits(['update:modelValue'])

const editor = useEditor({
  content: props.modelValue,
  extensions: [StarterKit, Highlight, Typography],
  editorProps: {
    attributes: {
      class: 'acr:px-4 acr:border-y acr:!prose',
    },
  },
  onUpdate() {
    emit('update:modelValue', editor.value?.getHTML())
  },
})
</script>
<template>
  <div v-if="editor" class="acr:m-2">
    <TooltipProvider>
      <ButtonGroup>
        <ButtonGroup>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                :class="{ 'acr:bg-accent acr:text-accent-foreground': editor.isActive('bold') }"
                @click="editor.chain().focus().toggleBold().run()"
                variant="outline"
                size="icon-sm"
                ><Bold
              /></Button>
            </TooltipTrigger>
            <TooltipContent>
              <p class="acr:!my-0 acr:!text-xs">Bold</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                :class="{ 'acr:bg-accent acr:text-accent-foreground': editor.isActive('italic') }"
                @click="editor.chain().focus().toggleItalic().run()"
                variant="outline"
                size="icon-sm"
                ><Italic
              /></Button>
            </TooltipTrigger>
            <TooltipContent>
              <p class="acr:!my-0 acr:!text-xs">Italic</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                :class="{ 'acr:bg-accent acr:text-accent-foreground': editor.isActive('strike') }"
                @click="editor.chain().focus().toggleStrike().run()"
                variant="outline"
                size="icon-sm"
                ><Strikethrough
              /></Button>
            </TooltipTrigger>
            <TooltipContent>
              <p class="acr:!my-0 acr:!text-xs">Strikethrough</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                :class="{
                  'acr:bg-accent acr:text-accent-foreground': editor.isActive('underline'),
                }"
                @click="editor.chain().focus().toggleUnderline().run()"
                variant="outline"
                size="icon-sm"
                ><Underline
              /></Button>
            </TooltipTrigger>
            <TooltipContent>
              <p class="acr:!my-0 acr:!text-xs">Underline</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                :class="{
                  'acr:bg-accent acr:text-accent-foreground': editor.isActive('underline'),
                }"
                @click="editor.chain().focus().toggleUnderline().run()"
                variant="outline"
                size="icon-sm"
                ><Underline
              /></Button>
            </TooltipTrigger>
            <TooltipContent>
              <p class="acr:!my-0 acr:!text-xs">Underline</p>
            </TooltipContent>
          </Tooltip>
        </ButtonGroup>
      </ButtonGroup>
    </TooltipProvider>
  </div>

  <EditorContent :editor="editor" />
</template>
