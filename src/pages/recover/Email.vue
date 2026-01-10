<script setup lang="ts">
import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from '@/components/ui/accordion'
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
import { minutesToHumanReadable, percentFrom } from '@/lib/utils'
import EmailOptions from '@/pages/recover/components/EmailOptions.vue'
import { useRoute } from 'vue-router'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'

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
      if (store.lastEmail?.id) {
        openedEmail.value = [store.lastEmail.id]
      }
      return 'Email created!'
    },
    error: 'Failed to create email!',
  })
}
</script>

<template>
  <template v-if="!isLoaded">
    <div class="acr:p-6 acr:border-b acr:space-y-2" v-for="_i in 5">
      <Skeleton class="acr:w-full acr:md:w-6/12 acr:h-4" />
      <Skeleton class="acr:w-40 acr:h-3" />
    </div>
  </template>
  <template v-else-if="store.data.length">
    <Accordion v-model="openedEmail" type="multiple" collapsible class="acr:border acr:rounded-xl">
      <AccordionItem
        :value="email.id"
        v-for="email in store.data"
        :key="email.id"
        class="acr:[&>h3[data-state=open]]:border-dashed acr:[&>h3[data-state=open]]:border-b!"
      >
        <AccordionTrigger class="acr:group acr:gap-x-8 acr:relative">
          <div>
            <p class="acr:my-0! acr:text-lg! acr:capitalize">{{ email.title }}</p>
            <span class="acr:text-xs acr:font-normal acr:text-muted-foreground"
              >After {{ minutesToHumanReadable(email.recovery.runAfter) }}</span
            >
          </div>
          <div
            class="acr:flex-1 acr:items-center acr:gap-y-2 acr:*:mt-1 acr:grid acr:grid-cols-3 acr:sm:grid-cols-5 acr:[&>div>h3]:text-gray-600! acr:[&>div>h3]:text-lg!"
          >
            <div class="acr:*:my-0!">
              <p
                class="acr:text-muted-foreground! acr:font-normal! acr:text-xs! acr:group-hover:hidden"
              >
                Queued
              </p>
              <p
                class="acr:text-muted-foreground! acr:font-normal! acr:text-xs! acr:hidden acr:group-hover:block"
              >
                Sent
              </p>
              <h3 class="acr:group-hover:hidden!">{{ email.queued }}</h3>
              <h3 class="acr:hidden! acr:group-hover:block!">{{ email.sent }}</h3>
            </div>
            <div class="acr:*:my-0!">
              <p
                class="acr:text-muted-foreground! acr:font-normal! acr:text-xs! acr:group-hover:hidden"
              >
                Open rate
              </p>
              <p
                class="acr:text-muted-foreground! acr:font-normal! acr:text-xs! acr:hidden acr:group-hover:block"
              >
                Open count
              </p>
              <h3 class="acr:group-hover:hidden!">{{ percentFrom(email.opened, email.sent) }}%</h3>
              <h3 class="acr:hidden! acr:group-hover:block!">{{ email.opened }}</h3>
            </div>
            <div class="acr:*:my-0!">
              <p
                class="acr:text-muted-foreground! acr:font-normal! acr:text-xs! acr:group-hover:hidden"
              >
                Click rate
              </p>
              <p
                class="acr:text-muted-foreground! acr:font-normal! acr:text-xs! acr:hidden acr:group-hover:block"
              >
                Click count
              </p>
              <h3 class="acr:group-hover:hidden!">{{ percentFrom(email.clicked, email.sent) }}%</h3>
              <h3 class="acr:hidden! acr:group-hover:block!">{{ email.clicked }}</h3>
            </div>
            <div class="acr:*:my-0!">
              <p
                class="acr:text-muted-foreground! acr:font-normal! acr:text-xs! acr:group-hover:hidden"
              >
                Recover rate
              </p>
              <p
                class="acr:text-muted-foreground! acr:font-normal! acr:text-xs! acr:hidden acr:group-hover:block"
              >
                Recover count
              </p>
              <h3 class="acr:group-hover:hidden!">
                {{ percentFrom(email.recovered, email.sent) }}%
              </h3>
              <h3 class="acr:hidden! acr:group-hover:block!">{{ email.recovered }}</h3>
            </div>
            <div class="acr:*:my-0!">
              <p
                class="acr:text-muted-foreground! acr:font-normal! acr:text-xs! acr:group-hover:hidden"
              >
                Unsubscribe rate
              </p>
              <p
                class="acr:text-muted-foreground! acr:font-normal! acr:text-xs! acr:hidden acr:group-hover:block"
              >
                Unsubscribe count
              </p>
              <h3 class="acr:group-hover:hidden!">
                {{ percentFrom(email.unsubscribed, email.sent) }}%
              </h3>
              <h3 class="acr:hidden! acr:group-hover:block!">{{ email.unsubscribed }}</h3>
            </div>
          </div>
          <Badge
            :variant="email.recovery.enabled ? 'default' : 'outline'"
            class="acr:absolute acr:top-[50%] acr:-translate-y-[50%] acr:right-6"
            >{{ email.recovery.enabled ? 'Active' : 'Inactive' }}</Badge
          >
        </AccordionTrigger>

        <AccordionContent class="acr:bg-gray-50">
          <EmailOptions :email="email" />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </template>
  <Empty v-else class="acr:border acr:border-dashed">
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
      <Button size="lg" @click="createEmail" :disabled="isCreating"
        ><MailPlus /> Create Recovery Email</Button
      >
    </EmptyContent>
  </Empty>

  <div class="acr:text-center acr:my-4" v-if="store.data.length">
    <Button @click="createEmail" :disabled="isCreating" size="lg" variant="outline"
      ><MailPlus /> Add New Email</Button
    >
  </div>
</template>
