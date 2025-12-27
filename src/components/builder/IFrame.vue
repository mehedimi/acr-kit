<script setup lang="ts">
import { createApp, onBeforeUnmount, ref, watch } from 'vue'
import EmailApp from '@/components/builder/EmailApp.vue'
import type { Template } from '@/types/builder.ts'
import type { ControlAction, ControlData } from '@/enum/control.ts'

const iframeEl = ref<HTMLIFrameElement>()

const props = defineProps<{
  isEditing?: boolean
  template: Template
  width?: string
}>()

const emit = defineEmits<{
  action: [action: ControlAction, index: number]
}>()

let observer = new ResizeObserver(() => {
  resizeIframe()
})
const iframeApp = createApp(EmailApp, props)

function mountIframe() {
  const document = iframeEl.value?.contentDocument as Document
  const appEl = document.body

  if (props.isEditing) {
    document.body.style.paddingTop = '30px'
    document.body.style.paddingBottom = '30px'

    window.addEventListener('message', (e: MessageEvent<ControlData>) => {
      if (e.data.name !== 'acr:action') {
        return
      }

      emit('action', e.data.action, e.data.index)
    })
  }

  iframeApp.mount(appEl)

  watch(
    () => props.template.bodyStyle.backgroundColor,
    (value) => {
      document.body.style.backgroundColor = value || '#eee'
    },
    {
      immediate: true,
    },
  )

  resizeIframe()

  observer.observe(appEl)
}

function resizeIframe() {
  if (!iframeEl.value) {
    return
  }

  iframeEl.value.style.minHeight =
    (iframeEl.value?.contentDocument?.body?.scrollHeight || 0) + 1 + 'px'
}

const iframeSrc = acrApp.assetUrl.replace('dist/', 'assets/email.html')

onBeforeUnmount(() => {
  if (iframeEl.value?.contentDocument?.body) {
    observer.unobserve(iframeEl.value?.contentDocument.body)
  }
  iframeApp.unmount()
})
</script>

<template>
  <iframe
    @load="mountIframe"
    :src="iframeSrc"
    :width="width || '100%'"
    height="100%"
    ref="iframeEl"
    class="acr:transition-all"
  />
</template>
