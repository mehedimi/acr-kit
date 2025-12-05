<script setup lang="ts">
import Header from '@/components/Header.vue'
import { type RouteLocationRaw, RouterLink, useRoute } from 'vue-router'
import { useEmailStore } from '@/stores/useEmailStore.ts'
import { reactive, ref } from 'vue'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Check, Monitor, Tablet, Smartphone } from 'lucide-vue-next'
import { ButtonGroup } from '@/components/ui/button-group'
import IFrame from '@/components/builder/IFrame.vue'
import { Control, type ControlAction } from '@/enum/control.ts'
import ControlHeading from '@/components/builder/ControlHeading.vue'
import ControlBody from '@/components/builder/ControlBody.vue'
import { useBuilderStore } from '@/stores/useBuilderStore.ts'

const route = useRoute()

const emailStore = useEmailStore()

const urls: Array<{ title: string; href: RouteLocationRaw }> = reactive([
  {
    title: 'Email Recovery',
    href: { name: 'recovery.options.email' },
  },
  {
    title: 'Template Editor',
    href: { name: route.name, params: route.params },
  },
])

emailStore.find(route.params.emailId as string).then(() => {
  if (!emailStore.firstEmail) {
    return
  }

  ;(urls[urls.length - 1] as { title: string }).title = emailStore.firstEmail.title
})

const builderStore = useBuilderStore()

builderStore.setTemplate({
  style: {
    backgroundColor: '#ddd',
  },
  elements: [
    {
      type: 'Heading',
      heading: 'h2',
      text: 'You Left Something Behind!',
      style: {
        fontSize: '22px',
        fontWeight: 'bold',
        color: '#111111',
        fontFamily: 'Arial, sans-serif',
        margin: '0 0 12px 0',
      },
      sectionStyle: {
        margin: '0 0 20px 0',
      },
    },

    {
      type: 'Text',
      text: 'Looks like you added some items to your cart but didn’t complete your purchase.',
      style: {
        fontSize: '14px',
        lineHeight: '1.5',
        color: '#333333',
        fontFamily: 'Arial, sans-serif',
      },
      sectionStyle: {
        margin: '0 0 12px 0',
      },
    },

    {
      type: 'Text',
      text: 'Don’t worry—your items are still waiting for you!',
      style: {
        fontSize: '14px',
        lineHeight: '1.5',
        fontFamily: 'Arial, sans-serif',
      },
      sectionStyle: {
        margin: '0 0 20px 0',
      },
    },

    {
      type: 'Image',
      src: '',
      alt: 'Cart items preview',
      style: {
        width: '100%',
        maxWidth: '600px',
        display: 'block',
        border: '0',
      },
      sectionStyle: {
        textAlign: 'center',
        margin: '20px 0',
      },
    },

    {
      type: 'Button',
      href: '#',
      text: 'Return to Cart',
      style: {
        display: 'inline-block',
        padding: '12px 20px',
        backgroundColor: '#007bff',
        color: '#ffffff',
        textDecoration: 'none',
        borderRadius: '4px',
        fontSize: '14px',
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif',
        lineHeight: '1.2',
      },
      sectionStyle: {
        textAlign: 'center',
        margin: '20px 0',
      },
    },

    {
      type: 'Text',
      text: 'If you have any questions or need help, feel free to reach out to us anytime.',
      style: {
        fontSize: '13px',
        lineHeight: '1.5',
        color: '#555',
        fontFamily: 'Arial, sans-serif',
      },
      sectionStyle: {
        margin: '20px 0 0 0',
      },
    },
  ],
})

function handleAction(action: ControlAction, index: number) {
  switch (action) {
    case Control.DELETE:
      builderStore.deleteElement(index)
      break
    case Control.EDIT:
    case Control.ADD_AFTER:
    case Control.ADD_BEFORE:
      builderStore.setAction(action, index)
      break

    case Control.MOVE_UP:
      builderStore.moveElement(index, index - 1)
      break
    case Control.MOVE_DOWN:
      builderStore.moveElement(index, index + 1)
      break
  }
}
</script>

<template>
  <Header
    title="Recovery Options"
    description="Design your email content, add images and buttons, and preview it live before sending. Perfect for automated messages like abandoned cart reminders, welcome emails, and promotions."
    :href="{
      name: 'recovery.options',
    }"
    :links="urls"
  />

  <div class="acr:flex acr:justify-between acr:px-4 acr:my-4">
    <Button size="icon" variant="outline" :as="RouterLink" :to="{ name: 'recovery.options.email' }">
      <ArrowLeft />
    </Button>
    <ButtonGroup>
      <Button title="Desktop" size="icon" variant="outline"><Monitor /></Button>
      <Button title="Tablet" size="icon" variant="outline"><Tablet /></Button>
      <Button title="Mobile" size="icon" variant="outline"><Smartphone /></Button>
    </ButtonGroup>
    <Button variant="outline"> <Check /> Save & Exit </Button>
  </div>
  <div class="acr:flex">
    <div class="acr:flex-1">
      <IFrame @action="handleAction" :isEditing="true" :template="builderStore" />
    </div>
    <div
      class="acr:w-[400px] acr:flex-col acr:justify-between acr:bg-white acr:border-l acr:border-gray-200 acr:flex-shrink-0 acr:flex"
    >
      <ControlHeading />
      <ControlBody />
      <Button
        @click="builderStore.closeAction()"
        v-if="builderStore.action"
        variant="outline"
        class="acr:m-2"
        >Close</Button
      >
    </div>
  </div>
</template>
