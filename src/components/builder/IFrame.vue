<script setup lang="ts">
import { createApp, ref } from 'vue'
import EmailApp from '@/components/builder/EmailApp.vue'
import type { Template } from '@/types/builder.ts'

const iframeEl = ref<HTMLIFrameElement>()

function mountIframe() {
  if (!iframeEl.value?.contentWindow?.document?.body) {
    return
  }

  const iframeApp = createApp(EmailApp, {
    isEditing: false,
    template: {
      style: {},
      elements: [
        {
          type: 'EmailText',
          text: 'adasdas',
          style: {
            fontSize: '20px',
          },
        },
        {
          type: 'EmailButton',
          text: 'Button',
          href: '#',
          style: {
            backgroundColor: '#000',
            padding: '10px 20px',
            borderRadius: '5px',
            color: '#fff',
            display: 'inline-block',
          },
        },
        {
          type: 'EmailHeading',
          text: 'Button he',
          heading: 'h1',
          style: {
            backgroundColor: '#000',
            padding: '10px 20px',
            borderRadius: '5px',
            color: '#fff',
          },
        },
        {
          type: 'EmailImage',
          src: 'https://cdn.dribbble.com/userupload/14199720/file/original-1c5f2b0cbb7cefdccd578856de57dca0.jpg?resize=1504x1128&vertical=center',
          alt: 'Image',
          style: {
            maxWidth: '100%',
            borderRadius: '5px',
            padding: '15px',
            backgroundColor: '#ddd',
            display: 'block',
          },
        },
      ],
    },
  } satisfies {
    isEditing: boolean
    template: Template
  })

  iframeApp.mount(iframeEl.value?.contentWindow?.document?.body)

  resizeIframe()

  new MutationObserver(resizeIframe).observe(iframeEl.value?.contentDocument?.body as Node, {
    childList: true,
    subtree: true,
  })
}

function resizeIframe() {
  if (!iframeEl.value) {
    return
  }

  iframeEl.value.style.height =
    (iframeEl.value?.contentDocument?.body?.scrollHeight || 0) + 1 + 'px'
}

const iframeSrc = acrApp.assetUrl.replace('dist/', 'assets/email.html')
</script>

<template>
  <div class="acr:flex">
    <iframe @load="mountIframe" :src="iframeSrc" width="100%" height="100%" ref="iframeEl"></iframe>
  </div>
</template>
