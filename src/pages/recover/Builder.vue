<script setup lang="ts">
import Header from '@/components/Header.vue'
import { type RouteLocationRaw, RouterLink, useRoute, useRouter } from 'vue-router'
import { useEmailStore } from '@/stores/useEmailStore.ts'
import { computed, reactive, ref, watch } from 'vue'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Check, Monitor, Tablet, Smartphone, LayoutTemplateIcon } from 'lucide-vue-next'
import { ButtonGroup } from '@/components/ui/button-group'
import IFrame from '@/components/builder/IFrame.vue'
import { Control, type ControlAction } from '@/enum/control.ts'
import ControlHeading from '@/components/builder/ControlHeading.vue'
import ControlBody from '@/components/builder/ControlBody.vue'
import { useBuilderStore } from '@/stores/useBuilderStore.ts'
import { render } from '@vue-email/render'
import EmailPreview from '@/components/builder/EmailPreview.vue'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Dialog, DialogHeader, DialogScrollContent, DialogTitle } from '@/components/ui/dialog'
import { useEmailTemplateStore } from '@/stores/useEmailTemplateStore.ts'
import Content from '@/components/Content.vue'
import { toast } from 'vue-sonner'

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
const emailTemplateStore = useEmailTemplateStore()

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
    case Control.DUPLICATE:
      builderStore.duplicateElement(index)
      break
  }
}

const isSaving = ref(false)

async function handleSave() {
  isSaving.value = true
  const template = {
    style: builderStore.style,
    bodyStyle: builderStore.bodyStyle,
    elements: builderStore.elements,
  }

  toast.promise(
    async function () {
      const body = await render(EmailPreview, {
        template,
      })

      await emailStore.updateTemplate({
        template,
        body,
      })

      await router.push({
        name: 'recovery.options.email',
        query: {
          emailId: emailStore.firstEmail?.id as string,
        },
      })
    },
    {
      success() {
        isSaving.value = false
        return 'The template has updated.'
      },
      loading: 'Updating...',
      error() {
        isSaving.value = false
        return 'Failed to update the template.'
      },
    },
  )
}

const selectedView = ref(0)

const views = [
  {
    title: 'Desktop View',
    icon: Monitor,
  },
  {
    title: 'Tablet View',
    icon: Tablet,
  },
  {
    title: 'Mobile View',
    icon: Smartphone,
  },
]

const iframeWidth = computed(() => {
  switch (selectedView.value) {
    case 1:
      return '768px'
    case 2:
      return '375px'
    default:
      return '100%'
  }
})

const pickFromTemplate = ref(false)

watch(pickFromTemplate, (value) => {
  if (value) {
    emailTemplateStore.lazyFetch()
  }
})

async function applyTemplate(id: number) {
  pickFromTemplate.value = false
  const template = await emailTemplateStore.get(id)

  builderStore.setTemplate(template.body)
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

  <TooltipProvider>
    <div class="acr:flex acr:justify-between acr:px-4 acr:my-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            variant="outline"
            :as="RouterLink"
            :to="{
              name: 'recovery.options.email',
              query: { emailId: emailStore.firstEmail?.id as string },
            }"
          >
            <ArrowLeft />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Back to emails</TooltipContent>
      </Tooltip>

      <ButtonGroup>
        <Tooltip v-for="(view, index) in views" :key="index">
          <TooltipTrigger asChild>
            <Button
              @click="selectedView = index"
              size="icon"
              :variant="index === selectedView ? 'secondary' : 'outline'"
            >
              <component :is="view.icon" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>{{ view.title }}</TooltipContent>
        </Tooltip>
      </ButtonGroup>
      <ButtonGroup>
        <Button @click="pickFromTemplate = true" variant="outline">
          <LayoutTemplateIcon /> Pick from Template
        </Button>
        <Button :disabled="isSaving" @click="handleSave" variant="outline">
          <Check /> Save & Exit
        </Button>
      </ButtonGroup>
    </div>
  </TooltipProvider>

  <Content>
    <div class="acr:flex">
      <div class="acr:flex-1 acr:[&>iframe]:mx-auto">
        <IFrame
          v-if="emailStore.firstEmail"
          @action="handleAction"
          isEditing
          :template="builderStore"
          :width="iframeWidth"
        />
      </div>
      <div
        class="acr:w-[400px] acr:flex-col acr:justify-between acr:bg-white acr:border-l acr:border-gray-200 acr:shrink-0 acr:flex"
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
  </Content>

  <Dialog v-model:open="pickFromTemplate">
    <DialogScrollContent class="acr:max-w-[1000px]">
      <DialogHeader>
        <DialogTitle>Choose Email Template</DialogTitle>
        <div class="acr:grid acr:gap-x-4 acr:md:grid-cols-3 acr:mt-4">
          <div
            @click="applyTemplate(template.id)"
            v-for="template in emailTemplateStore.data"
            class="acr:rounded-lg acr:cursor-pointer acr:border-2 acr:hover:-translate-y-1 acr:hover:shadow acr:transition-all acr:p-4 acr:hover:border-primary"
            :key="template.id"
          >
            <img
              :src="template.thumbnail"
              :alt="template.name"
              class="acr:rounded acr:object-contain"
            />
            <div class="acr:mt-4">
              <h2 class="acr:mb-2!">{{ template.name }}</h2>
              <p class="acr:my-0! acr:text-muted-foreground">{{ template.description }}</p>
            </div>
          </div>
        </div>
      </DialogHeader>
    </DialogScrollContent>
  </Dialog>
</template>
