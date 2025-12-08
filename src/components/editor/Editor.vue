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
  TypeIcon,
  ChevronDownIcon,
  RulerIcon,
  PaletteIcon,
  ArrowUpDownIcon,
  HeadingIcon,
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
import Heading, { type Level } from '@tiptap/extension-heading'
import {
  TextStyle,
  FontFamily,
  FontSize,
  Color,
  BackgroundColor,
  LineHeight,
} from '@tiptap/extension-text-style'
import { BulletList, ListItem, OrderedList } from '@tiptap/extension-list'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { emailSafeFonts, fontSizes, lineHeights, textTypes } from '@/components/data.ts'
import { ColorPicker } from 'vue3-colorpicker'
import { Tabs, TabsContent, TabsTrigger, TabsList } from '@/components/ui/tabs'
import { computed } from 'vue'

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
    TextStyle,
    FontFamily,
    FontSize,
    Color,
    BackgroundColor,
    LineHeight,
    Heading,
  ],
  editorProps: {
    attributes: {
      class: 'acr:border-t acr:!prose acr:min-h-60',
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

function toggleFontFamily(fontFamily: string) {
  let style = editor.value?.getAttributes('textStyle')

  if (style && style.fontFamily === fontFamily) {
    editor.value?.chain().focus().unsetFontFamily().run()
  } else {
    editor.value?.chain().focus().setFontFamily(fontFamily).run()
  }
}

const color = computed({
  set(value: string) {
    editor.value?.chain().focus().setColor(value).run()
  },
  get() {
    return editor.value?.getAttributes('textStyle')['color'] ?? '#000'
  },
})

const background = computed({
  set(value: string) {
    editor.value?.chain().focus().setBackgroundColor(value).run()
  },
  get() {
    return editor.value?.getAttributes('textStyle')['backgroundColor'] ?? '#fff'
  },
})

function toggleTextType(type: string | number) {
  if (type === 'p') {
    editor.value?.chain().focus().setParagraph().run()
  } else {
    editor.value
      ?.chain()
      .focus()
      .toggleHeading({ level: type as number as Level })
      .run()
  }
}

function isTextTypeActive(type: string | number) {
  if (type === 'p') {
    return editor.value?.isActive('paragraph')
  }

  return editor.value?.isActive('heading', { level: type })
}
</script>
<template>
  <div v-if="editor" class="acr:m-2">
    <TooltipProvider>
      <ButtonGroup class="acr:mb-2">
        <ButtonGroup>
          <DropdownMenu v-slot="{ open }">
            <Tooltip>
              <DropdownMenuTrigger asChild>
                <TooltipTrigger asChild>
                  <Button
                    :class="{
                      'acr:bg-accent acr:text-accent-foreground':
                        editor.isActive('heading') || editor.isActive('paragraph') || open,
                    }"
                    variant="outline"
                    size="sm"
                  >
                    <HeadingIcon />
                    <ChevronDownIcon />
                  </Button>
                </TooltipTrigger>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  v-for="textType in textTypes"
                  class="acr:text-xs acr:text-gray-600"
                  :class="{
                    'acr:!bg-accent acr:!text-accent-foreground': isTextTypeActive(textType.value),
                  }"
                  @click="toggleTextType(textType.value)"
                >
                  {{ textType.label }}
                </DropdownMenuItem>
              </DropdownMenuContent>
              <TooltipContent>
                <p class="acr:!my-0 acr:!text-xs">Heading</p>
              </TooltipContent>
            </Tooltip>
          </DropdownMenu>
          <DropdownMenu v-slot="{ open }">
            <Tooltip>
              <DropdownMenuTrigger asChild>
                <TooltipTrigger asChild>
                  <Button
                    :class="{
                      'acr:bg-accent acr:text-accent-foreground':
                        (editor.isActive('textStyle') &&
                          editor.getAttributes('textStyle').fontFamily) ||
                        open,
                    }"
                    variant="outline"
                    size="sm"
                  >
                    <TypeIcon />
                    <ChevronDownIcon />
                  </Button>
                </TooltipTrigger>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  v-for="font in emailSafeFonts"
                  @click="toggleFontFamily(font.value)"
                  class="acr:text-xs acr:text-gray-600"
                  :class="{
                    'acr:!bg-accent acr:!text-accent-foreground': editor.isActive('textStyle', {
                      fontFamily: font.value,
                    }),
                  }"
                  :style="{ fontFamily: font.value }"
                >
                  {{ font.label }}
                </DropdownMenuItem>
              </DropdownMenuContent>
              <TooltipContent>
                <p class="acr:!my-0 acr:!text-xs">Font</p>
              </TooltipContent>
            </Tooltip>
          </DropdownMenu>
          <DropdownMenu v-slot="{ open }">
            <Tooltip>
              <DropdownMenuTrigger asChild>
                <TooltipTrigger asChild>
                  <Button
                    :class="{
                      'acr:bg-accent acr:text-accent-foreground':
                        (editor.isActive('textStyle') &&
                          editor.getAttributes('textStyle').fontSize) ||
                        open,
                    }"
                    variant="outline"
                    size="sm"
                  >
                    <RulerIcon />
                    <ChevronDownIcon />
                  </Button>
                </TooltipTrigger>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  v-for="fontSize in fontSizes"
                  class="acr:text-xs acr:text-gray-600"
                  :class="{
                    'acr:!bg-accent acr:!text-accent-foreground': editor.isActive('textStyle', {
                      fontSize,
                    }),
                  }"
                  @click="editor.chain().focus().setFontSize(fontSize).run()"
                >
                  {{ fontSize }}
                </DropdownMenuItem>
              </DropdownMenuContent>
              <TooltipContent>
                <p class="acr:!my-0 acr:!text-xs">Font Size</p>
              </TooltipContent>
            </Tooltip>
          </DropdownMenu>
          <Popover v-slot="{ open }">
            <Tooltip>
              <PopoverTrigger asChild>
                <TooltipTrigger asChild>
                  <Button
                    :class="{
                      'acr:bg-accent acr:text-accent-foreground': open,
                    }"
                    variant="outline"
                    size="icon-sm"
                  >
                    <PaletteIcon />
                  </Button>
                </TooltipTrigger>
              </PopoverTrigger>
              <PopoverContent class="acr:p-0">
                <Tabs default-value="color">
                  <TabsList>
                    <TabsTrigger value="color"> Color </TabsTrigger>
                    <TabsTrigger value="highlight"> Highlight </TabsTrigger>
                  </TabsList>
                  <TabsContent value="color">
                    <ColorPicker
                      v-model:pure-color="color"
                      class="acr:!mr-0"
                      isWidget
                      disableAlpha
                      format="hex6"
                    />
                  </TabsContent>
                  <TabsContent value="highlight">
                    <ColorPicker
                      v-model:pure-color="background"
                      class="acr:!mr-0"
                      isWidget
                      disableAlpha
                      format="hex6"
                    />
                  </TabsContent>
                </Tabs>
              </PopoverContent>
              <TooltipContent>
                <p class="acr:!my-0 acr:!text-xs">Color</p>
              </TooltipContent>
            </Tooltip>
          </Popover>
          <DropdownMenu v-slot="{ open }">
            <Tooltip>
              <DropdownMenuTrigger asChild>
                <TooltipTrigger asChild>
                  <Button
                    :class="{
                      'acr:bg-accent acr:text-accent-foreground': open,
                    }"
                    variant="outline"
                    size="sm"
                  >
                    <ArrowUpDownIcon />
                    <ChevronDownIcon />
                  </Button>
                </TooltipTrigger>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  v-for="lineHeight in lineHeights"
                  class="acr:text-xs acr:text-gray-600"
                  :class="{
                    'acr:!bg-accent acr:!text-accent-foreground': editor.isActive('textStyle', {
                      lineHeight,
                    }),
                  }"
                  @click="editor.chain().focus().setLineHeight(lineHeight).run()"
                >
                  {{ lineHeight }}
                </DropdownMenuItem>
              </DropdownMenuContent>
              <TooltipContent>
                <p class="acr:!my-0 acr:!text-xs">Line height</p>
              </TooltipContent>
            </Tooltip>
          </DropdownMenu>
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
                    size="sm"
                  >
                    <ListIcon />
                    <ChevronDownIcon />
                  </Button>
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
        </ButtonGroup>
      </ButtonGroup>
      <ButtonGroup>
        <ButtonGroup>
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
            <TooltipContent side="bottom">
              <p class="acr:!my-0 acr:!text-xs">Blockquote</p>
            </TooltipContent>
          </Tooltip>
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
            <TooltipContent side="bottom">
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
            <TooltipContent side="bottom">
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
            <TooltipContent side="bottom">
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
            <TooltipContent side="bottom">
              <p class="acr:!my-0 acr:!text-xs">Underline</p>
            </TooltipContent>
          </Tooltip>
          <Popover v-model:open="openLinkInput">
            <Tooltip>
              <PopoverTrigger asChild>
                <TooltipTrigger asChild>
                  <Button
                    :class="{
                      'acr:bg-accent acr:text-accent-foreground':
                        editor.isActive('link') || openLinkInput,
                    }"
                    variant="outline"
                    size="icon-sm"
                    ><LinkIcon />
                  </Button>
                </TooltipTrigger>
              </PopoverTrigger>
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
              <TooltipContent side="bottom">
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
              >
                <component :is="button.icon" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p class="acr:!my-0 acr:!text-xs">{{ button.text }}</p>
            </TooltipContent>
          </Tooltip>
        </ButtonGroup>
      </ButtonGroup>
    </TooltipProvider>
  </div>

  <EditorContent :editor="editor" />
</template>
