<script setup lang="ts">
import type { PushRecovery, RecoveryOption } from '@/types/recovery-option.ts'
import Col from '@/pages/recover/components/Col.vue'
import Help from '@/pages/recover/components/Help.vue'
import { scheduleOptions } from '@/stores/recovery-utils.ts'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { SaveAllIcon, Trash2Icon } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { usePushNotificationStore } from '@/stores/usePushNotificationStore.ts'
import { toast } from 'vue-sonner'

const { push } = defineProps<{
  push: PushRecovery<RecoveryOption>
}>()

const store = usePushNotificationStore()

const { isUpdating, update } = store.update()

async function handleUpdate() {
  toast.promise(update(push), {
    loading: 'Updating...',
    success: 'The push notification has been updated successfully.',
    error: 'Failed to update the push notification.',
  })
}
</script>

<template>
  <form @submit.prevent="handleUpdate">
    <Col class="acr:py-4">
      <template v-slot:left>
        <h3 class="acr:my-0! acr:text-lg!">General</h3>
        <Help>
          Set up the essentials of this push notification. Turn it on or off, choose the timing, and
          decide how customers will receive the reminder.
        </Help>
      </template>

      <div class="acr:space-y-8">
        <div>
          <div class="acr:flex acr:items-center acr:space-x-2">
            <Switch v-model="push.recovery.enabled" :id="`${push.id}-enable`" />
            <Label :for="`${push.id}-enable`">Enable</Label>
          </div>
          <Help>Toggle to enable or disable this push notification.</Help>
        </div>
        <div class="acr:space-y-1.5">
          <Label :for="`${push.id}-name`">Name</Label>
          <Input v-model="push.name" :id="`${push.id}-name`" type="text" placeholder="Enter name" />
          <Help>
            Provide a name to help you recognize this notification in your dashboard. This is for
            internal reference only and will not be visible to customers.
          </Help>
        </div>
        <div class="acr:space-y-1.5">
          <Label :for="`${push.id}-run-after`">Send after</Label>
          <Select :id="`${push.id}-run-after`" v-model="push.recovery.runAfter">
            <SelectTrigger class="acr:bg-white acr:w-full">
              <SelectValue placeholder="Select interval" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="option in scheduleOptions" :value="option.value">{{
                option.label
              }}</SelectItem>
            </SelectContent>
          </Select>
          <Help>
            Choose how long after the trigger this push notification should be sent to the customer.
          </Help>
        </div>
        <div class="acr:space-y-1.5">
          <Label :for="`${push.id}-title`">Title</Label>
          <Input
            v-model="push.title"
            :id="`${push.id}-title`"
            type="text"
            placeholder="Enter name"
          />
          <Help>
            The main headline shown in the push notification. Keep it short and clear so customers
            can quickly understand what the message is about. Longer titles may be cut off on some
            devices.
          </Help>
        </div>
        <div class="acr:space-y-1.5">
          <Label :for="`${push.id}-body`">Body</Label>
          <Input v-model="push.body" :id="`${push.id}-body`" type="text" placeholder="Enter body" />
          <Help>
            The short message displayed below the title in the push notification. Use this space to
            gently remind customers about their abandoned cart and encourage them to return and
            complete checkout. Messages that are too long may be truncated, especially on mobile
            devices.
          </Help>
        </div>
        <div class="acr:flex acr:justify-between acr:mt-4">
          <Button :disabled="isUpdating"><SaveAllIcon /> Save Changes</Button>
          <AlertDialog>
            <AlertDialogTrigger as-child>
              <Button variant="destructive"><Trash2Icon /> Delete!</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete push notification?</AlertDialogTitle>
                <AlertDialogDescription>
                  This push notification will be deleted permanently. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <Button variant="destructive">Continue</Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </Col>
  </form>
</template>
