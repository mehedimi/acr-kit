<script setup lang="ts">
import { type Editor, EditorContent, useEditor } from '@tiptap/vue-3'
import { ButtonGroup } from '@/components/ui/button-group'
import { Button } from '@/components/ui/button'
import {
  Bold,
  Italic,
  Strikethrough,
  Underline,
  LinkIcon,
  TextAlignEndIcon,
  TextAlignStartIcon,
  TextAlignCenterIcon,
  TextAlignJustifyIcon,
  ListIcon,
  TextQuoteIcon,
  ListOrderedIcon,
} from 'lucide-vue-next'
import Document from '@tiptap/extension-document'
import Typography from '@tiptap/extension-typography'
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group'
import { useLinkTool } from '@/components/editor/utils.ts'
import Link from '@tiptap/extension-link'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import BoldExtension from '@tiptap/extension-bold'
import ItalicExtension from '@tiptap/extension-italic'
import StrikeExtension from '@tiptap/extension-strike'
import UnderlineExtension from '@tiptap/extension-underline'
import TextAlignExtension from '@tiptap/extension-text-align'
import Blockquote from '@tiptap/extension-blockquote'
import { BulletList, ListItem, OrderedList } from '@tiptap/extension-list'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'

const props = defineProps<{
  modelValue?: string
}>()

const emit = defineEmits(['update:modelValue'])

const { link, setLink, setEditor, openLinkInput } = useLinkTool()

const editor = useEditor({
  content: props.modelValue,
  extensions: [
    Document,
    Paragraph,
    Text,
    Link.configure({
      defaultProtocol: 'https',
      openOnClick: false,
    }),
    Typography,
    BoldExtension,
    ItalicExtension,
    StrikeExtension,
    UnderlineExtension,
    TextAlignExtension.configure({
      types: ['heading', 'paragraph'],
    }),
    BulletList,
    ListItem,
    OrderedList,
    Blockquote,
  ],
  editorProps: {
    attributes: {
      class: 'acr:px-4 acr:border-y acr:!prose',
    },
  },
  onUpdate() {
    emit('update:modelValue', editor.value?.getHTML())
  },
  onCreate() {
    setEditor(editor.value as Editor)
  },
})

const textAlignButtons = [
  {
    icon: TextAlignStartIcon,
    align: 'left',
    text: 'Align left',
  },
  {
    icon: TextAlignCenterIcon,
    align: 'center',
    text: 'Align center',
  },
  {
    icon: TextAlignEndIcon,
    align: 'right',
    text: 'Align right',
  },
  {
    icon: TextAlignJustifyIcon,
    align: 'justify',
    text: 'Align justify',
  },
]
</script>
<template>
  <div v-if="editor" class="acr:m-2">
    <TooltipProvider>
      <ButtonGroup>
        <ButtonGroup>
          <DropdownMenu v-slot="{ open }">
            <Tooltip>
              <DropdownMenuTrigger asChild>
                <TooltipTrigger asChild>
                  <Button
                    :class="{
                      'acr:bg-accent acr:text-accent-foreground':
                        editor.isActive('bulletList') || editor.isActive('orderedList') || open,
                    }"
                    variant="outline"
                    size="icon-sm"
                    ><ListIcon
                  /></Button>
                </TooltipTrigger>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  @click="editor.chain().focus().toggleBulletList().run()"
                  class="acr:text-xs acr:text-gray-600"
                  :class="{
                    'acr:!bg-accent acr:!text-accent-foreground': editor.isActive('bulletList'),
                  }"
                >
                  <ListIcon /> Bullet list
                </DropdownMenuItem>
                <DropdownMenuItem
                  @click="editor.chain().focus().toggleOrderedList().run()"
                  class="acr:text-xs acr:text-gray-600"
                  :class="{
                    'acr:!bg-accent acr:!text-accent-foreground': editor.isActive('orderedList'),
                  }"
                >
                  <ListOrderedIcon /> Ordered list
                </DropdownMenuItem>
              </DropdownMenuContent>
              <TooltipContent>
                <p class="acr:!my-0 acr:!text-xs">List</p>
              </TooltipContent>
            </Tooltip>
          </DropdownMenu>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                :class="{
                  'acr:bg-accent acr:text-accent-foreground': editor.isActive('blockquote'),
                }"
                @click="editor.chain().focus().toggleBlockquote().run()"
                variant="outline"
                size="icon-sm"
                ><TextQuoteIcon
              /></Button>
            </TooltipTrigger>
            <TooltipContent>
              <p class="acr:!my-0 acr:!text-xs">Blockquote</p>
            </TooltipContent>
          </Tooltip>
        </ButtonGroup>
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
          <Popover v-model:open="openLinkInput">
            <Tooltip>
              <PopoverTrigger asChild
                ><TooltipTrigger asChild>
                  <Button
                    :class="{
                      'acr:bg-accent acr:text-accent-foreground':
                        editor.isActive('link') || openLinkInput,
                    }"
                    variant="outline"
                    size="icon-sm"
                    ><LinkIcon
                  /></Button> </TooltipTrigger
              ></PopoverTrigger>
              <PopoverContent class="acr:p-0">
                <InputGroup class="acr:h-8">
                  <InputGroupInput
                    v-model="link"
                    @keyup.enter="setLink()"
                    class="acr:border-none acr:placeholder:!text-gray-400 acr:text-gray-500 acr:!text-xs"
                    placeholder="Paste a link"
                    read-only
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton
                      @click="setLink()"
                      aria-label="Enter"
                      title="enter"
                      size="icon-sm"
                    >
                      <svg
                        width="24"
                        height="24"
                        class="tiptap-button-icon"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M21 4C21 3.44772 20.5523 3 20 3C19.4477 3 19 3.44772 19 4V11C19 11.7956 18.6839 12.5587 18.1213 13.1213C17.5587 13.6839 16.7956 14 16 14H6.41421L9.70711 10.7071C10.0976 10.3166 10.0976 9.68342 9.70711 9.29289C9.31658 8.90237 8.68342 8.90237 8.29289 9.29289L3.29289 14.2929C2.90237 14.6834 2.90237 15.3166 3.29289 15.7071L8.29289 20.7071C8.68342 21.0976 9.31658 21.0976 9.70711 20.7071C10.0976 20.3166 10.0976 19.6834 9.70711 19.2929L6.41421 16H16C17.3261 16 18.5979 15.4732 19.5355 14.5355C20.4732 13.5979 21 12.3261 21 11V4Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
              </PopoverContent>
              <TooltipContent>
                <p class="acr:!my-0 acr:!text-xs">Link</p>
              </TooltipContent>
            </Tooltip>
          </Popover>
        </ButtonGroup>
        <ButtonGroup>
          <Tooltip v-for="button in textAlignButtons" :key="button.align">
            <TooltipTrigger asChild>
              <Button
                :class="{
                  'acr:bg-accent acr:text-accent-foreground': editor.isActive({
                    textAlign: button.align,
                  }),
                }"
                @click="editor.chain().focus().setTextAlign(button.align).run()"
                variant="outline"
                size="icon-sm"
                ><component :is="button.icon"
              /></Button>
            </TooltipTrigger>
            <TooltipContent>
              <p class="acr:!my-0 acr:!text-xs">{{ button.text }}</p>
            </TooltipContent>
          </Tooltip>
        </ButtonGroup>
      </ButtonGroup>
    </TooltipProvider>
  </div>

  <EditorContent :editor="editor" />
</template>
