<script setup lang="ts">
import Content from '@/components/Content.vue'
import { Skeleton } from '@/components/ui/skeleton'
import { usePushNotificationStore } from '@/stores/usePushNotificationStore.ts'
import { minutesToHumanReadable, percentFrom } from '@/lib/utils.ts'
import { Badge } from '@/components/ui/badge'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { MessageSquareOffIcon, MessageSquarePlusIcon } from 'lucide-vue-next'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'
import { Button } from '@/components/ui/button'
import { toast } from 'vue-sonner'
import PushNotificationOption from '@/pages/recover/components/PushNotificationOption.vue'

const store = usePushNotificationStore()

const { isLoaded } = store.fetch()

const { isCreating, create } = store.create()

function createNotification() {
  toast.promise(create(), {
    loading: 'Creating...',
    success: 'The new push notification has created.',
    error: 'Failed to create push notification.',
  })
}
</script>

<template>
  <div v-if="!isLoaded" class="acr:p-6 acr:border-b acr:space-y-2" v-for="_i in 5">
    <Skeleton class="acr:w-full acr:md:w-6/12 acr:h-4" />
    <Skeleton class="acr:w-40 acr:h-3" />
  </div>
  <template v-else-if="store.data.length">
    <Accordion type="multiple" collapsible class="acr:border acr:rounded-xl">
      <AccordionItem
        :value="push.id"
        v-for="push in store.data"
        :key="push.id"
        class="acr:[&>h3[data-state=open]]:border-dashed acr:[&>h3[data-state=open]]:border-b!"
      >
        <AccordionTrigger class="acr:group acr:gap-x-8 acr:relative">
          <div>
            <p class="acr:my-0! acr:text-lg! acr:capitalize">{{ push.name }}</p>
            <span class="acr:text-xs acr:font-normal acr:text-muted-foreground"
              >After {{ minutesToHumanReadable(push.recovery.runAfter) }}</span
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
              <h3 class="acr:group-hover:hidden!">{{ push.queued }}</h3>
              <h3 class="acr:hidden! acr:group-hover:block!">{{ push.sent }}</h3>
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
              <h3 class="acr:group-hover:hidden!">{{ percentFrom(push.clicked, push.sent) }}%</h3>
              <h3 class="acr:hidden! acr:group-hover:block!">{{ push.clicked }}</h3>
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
              <h3 class="acr:group-hover:hidden!">{{ percentFrom(push.recovered, push.sent) }}%</h3>
              <h3 class="acr:hidden! acr:group-hover:block!">{{ push.recovered }}</h3>
            </div>
          </div>
          <Badge
            :variant="push.recovery.enabled ? 'default' : 'outline'"
            class="acr:absolute acr:top-[50%] acr:-translate-y-[50%] acr:right-6"
            >{{ push.recovery.enabled ? 'Active' : 'Inactive' }}</Badge
          >
        </AccordionTrigger>

        <AccordionContent class="acr:bg-gray-50">
          <PushNotificationOption :push="push" />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </template>
  <Empty v-else class="border border-dashed">
    <EmptyHeader>
      <EmptyMedia variant="icon">
        <MessageSquareOffIcon />
      </EmptyMedia>
      <EmptyTitle>No Push Notifications Yet!</EmptyTitle>
      <EmptyDescription>
        Create your first push notification to remind customers about items left in their cart.
      </EmptyDescription>
    </EmptyHeader>
    <EmptyContent>
      <Button :disabled="isCreating" @click="createNotification" variant="outline">
        <MessageSquarePlusIcon /> Create Push Notification
      </Button>
    </EmptyContent>
  </Empty>
  <div class="acr:text-center acr:my-4" v-if="store.data.length">
    <Button :disabled="isCreating" @click="createNotification" variant="outline">
      <MessageSquarePlusIcon /> Create Push Notification
    </Button>
  </div>
</template>
