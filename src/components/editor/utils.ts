import type { Editor } from '@tiptap/vue-3'
import { ref, watch } from 'vue'

export function useLinkTool() {
  const link = ref('')
  const openLinkInput = ref(false)
  let editor: Editor

  watch(openLinkInput, (value) => {
    if (!value) {
      return
    }

    link.value = editor.getAttributes('link')?.href || ''
  })

  function setEditor(editorInstance: Editor) {
    editor = editorInstance
  }

  function setLink() {
    if (!link.value) {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: link.value }).run()
    link.value = ''
  }

  return { link, setLink, setEditor, openLinkInput }
}
