<script setup lang="ts">
import Heading from '@/pages/recover/components/Heading.vue'
import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from '@/components/ui/accordion'
import Content from '@/components/Content.vue'
import { useEmailStore } from '@/stores/useEmailStore.ts'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'
import { Button } from '@/components/ui/button'
import { MailQuestionMark, MailPlus } from 'lucide-vue-next'
import { ref } from 'vue'
import { toast } from 'vue-sonner'
import { minutesToHumanReadable } from '@/lib/utils'
import EmailOptions from '@/pages/recover/components/EmailOptions.vue'
import { useRoute } from 'vue-router'
import { Skeleton } from '@/components/ui/skeleton'

const store = useEmailStore()
const route = useRoute()

const openedEmail = ref(route.query.emailId ? [route.query.emailId as string] : [])

const { isLoaded } = store.fetch(() => {
  if (openedEmail.value.length === 0 && store.firstEmail?.id) {
    openedEmail.value = [store.firstEmail.id]
  }
})

const { isCreating, create } = store.create()

async function createEmail() {
  toast.promise(create(), {
    loading: 'Creating email...',
    success: () => {
      if (openedEmail.value.length === 0 && store.lastEmail?.id) {
        openedEmail.value = [store.lastEmail.id]
      }
      return 'Email created!'
    },
    error: 'Failed to create email!',
  })
}
</script>

<template>
  <Heading
    title="Email Recovery"
    :href="{ name: 'recovery.options.email' }"
    description="Configure automated email notifications triggered when a cart is marked as abandoned."
  />

  <Content>
    <template v-if="!isLoaded">
      <div class="acr:p-6 acr:border-b acr:space-y-2" v-for="_i in 5">
        <Skeleton class="acr:w-full acr:md:w-6/12 acr:h-4" />
        <Skeleton class="acr:w-40 acr:h-3" />
      </div>
    </template>
    <template v-else-if="store.data.length">
      <Accordion v-model="openedEmail" type="multiple" collapsible>
        <AccordionItem :value="email.id" v-for="email in store.data" :key="email.id">
          <AccordionTrigger>
            <div>
              <p class="acr:my-0! acr:text-lg! acr:capitalize">{{ email.title }}</p>
              <span class="acr:text-xs acr:font-normal acr:text-muted-foreground"
                >After {{ minutesToHumanReadable(email.recovery.runAfter) }}</span
              >
            </div>
          </AccordionTrigger>
          <AccordionContent class="acr:bg-gray-50">
            <EmailOptions :email="email" />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </template>
    <Empty v-else class="border border-dashed">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <MailQuestionMark />
        </EmptyMedia>
        <EmptyTitle>No Recovery Emails Yet</EmptyTitle>
        <EmptyDescription>
          Create your first recovery email to remind customers about their abandoned carts.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button @click="createEmail" :disabled="isCreating" variant="outline"
          ><MailPlus /> Create Recovery Email</Button
        >
      </EmptyContent>
    </Empty>
  </Content>
  <div class="acr:text-center acr:my-4" v-if="store.data.length">
    <Button @click="createEmail" :disabled="isCreating" variant="outline" size="lg"
      ><MailPlus /> Add New Email</Button
    >
  </div>
</template>
