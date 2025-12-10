<script setup lang="ts">
import Header from '@/components/Header.vue'
import { type RouteLocationRaw, RouterLink, useRoute, useRouter } from 'vue-router'
import { useEmailStore } from '@/stores/useEmailStore.ts'
import { reactive, ref, toRef } from 'vue'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Check, Monitor, Tablet, Smartphone } from 'lucide-vue-next'
import { ButtonGroup } from '@/components/ui/button-group'
import IFrame from '@/components/builder/IFrame.vue'
import { Control, type ControlAction } from '@/enum/control.ts'
import ControlHeading from '@/components/builder/ControlHeading.vue'
import ControlBody from '@/components/builder/ControlBody.vue'
import { useBuilderStore } from '@/stores/useBuilderStore.ts'

const route = useRoute()
const router = useRouter()

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

const builderStore = useBuilderStore()

emailStore.find(route.params.emailId as string).then(() => {
  if (!emailStore.firstEmail) {
    return
  }

  builderStore.setTemplate(emailStore.firstEmail.template)
  ;(urls[urls.length - 1] as { title: string }).title = emailStore.firstEmail.title
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

const isSaving = ref(false)

async function handleSave() {
  isSaving.value = true

  await emailStore.updateTemplate({
    style: builderStore.style,
    bodyStyle: builderStore.bodyStyle,
    elements: builderStore.elements,
  })
  isSaving.value = false
  await router.push({
    name: 'recovery.options.email',
    query: {
      emailId: emailStore.firstEmail?.id as string,
    },
  })
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
    <Button
      size="icon"
      variant="outline"
      :as="RouterLink"
      :to="{
        name: 'recovery.options.email',
      }"
    >
      <ArrowLeft />
    </Button>
    <ButtonGroup>
      <Button title="Desktop" size="icon" variant="outline"><Monitor /></Button>
      <Button title="Tablet" size="icon" variant="outline"><Tablet /></Button>
      <Button title="Mobile" size="icon" variant="outline"><Smartphone /></Button>
    </ButtonGroup>
    <Button :disabled="isSaving" @click="handleSave" variant="outline">
      <Check /> Save & Exit
    </Button>
  </div>
  <div class="acr:flex">
    <div class="acr:flex-1">
      <IFrame
        v-if="emailStore.firstEmail"
        @action="handleAction"
        isEditing
        :template="builderStore"
      />
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
