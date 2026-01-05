<script setup lang="ts">
import type { EmailRecovery, RecoveryOption } from '@/types/recovery-option.ts'
import Col from '@/pages/recover/components/Col.vue'
import { Switch } from '@/components/ui/switch'
import Help from '@/pages/recover/components/Help.vue'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import IFrame from '@/components/builder/IFrame.vue'
import { Button } from '@/components/ui/button'
import { ButtonGroup } from '@/components/ui/button-group'
import { CircleCheckBig, Trash2Icon, SaveAllIcon, MailsIcon } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialog,
} from '@/components/ui/alert-dialog'
import { useEmailStore } from '@/stores/useEmailStore.ts'
import { ref } from 'vue'
import { toast } from 'vue-sonner'
import { scheduleOptions } from '@/stores/recovery-utils.ts'

const { email } = defineProps<{
  email: EmailRecovery<RecoveryOption>
}>()

const emailStore = useEmailStore()

const isDeleting = ref(false)

async function handleDelete() {
  isDeleting.value = true
  toast.promise(emailStore.delete(email.id), {
    loading: 'Deleting',
    success() {
      isDeleting.value = false
      return 'The email has been deleted.'
    },
    error() {
      isDeleting.value = false
      return 'Failed to delete the email'
    },
  })
}

const isSaving = ref(false)
async function saveEmail() {
  isSaving.value = true
  toast.promise(emailStore.updateEmail(email), {
    loading: 'Saving',
    success() {
      isSaving.value = false
      return 'The email has been updated.'
    },
    error() {
      isSaving.value = false
      return 'Failed to update email'
    },
  })
}
</script>

<template>
  <form>
    <Col class="acr:py-4">
      <template v-slot:left>
        <h3 class="acr:my-0! acr:text-lg!">General</h3>
        <Help
          >Set up the basics of this recovery option. Turn it on or off, choose when it should run,
          and pick what kind of action it performs.</Help
        >
      </template>
      <div class="acr:space-y-8">
        <div>
          <div class="acr:flex acr:items-center acr:space-x-2">
            <Switch v-model="email.recovery.enabled" :id="`${email.id}-enable`" />
            <Label :for="`${email.id}-enable`">Enable email</Label>
          </div>
          <Help>Toggle to enable or disable this recovery option.</Help>
        </div>
        <div class="acr:space-y-1.5">
          <Label :for="`${email.id}-title`">Name</Label>
          <Input
            v-model="email.title"
            :id="`${email.id}-title`"
            type="text"
            placeholder="Enter name"
          />
          <Help
            >Provide a name to help you recognize this email in your dashboard. This value is for
            internal reference only and will not appear in the email sent to customers.</Help
          >
        </div>
        <div class="acr:space-y-1.5">
          <Label :for="`${email.id}-run-after`">Send after</Label>
          <Select :id="`${email.id}-run-after`" v-model="email.recovery.runAfter">
            <SelectTrigger class="acr:bg-white acr:w-full">
              <SelectValue placeholder="Select interval" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="option in scheduleOptions" :value="option.value">{{
                option.label
              }}</SelectItem>
            </SelectContent>
          </Select>
          <Help>Choose how long after the trigger this email should be sent to your customer.</Help>
        </div>
        <div class="acr:space-y-1.5">
          <Label :for="`${email.id}-subject`">Email subject</Label>
          <Input
            v-model="email.subject"
            :id="`${email.id}-subject`"
            type="text"
            placeholder="Enter subject"
          />
          <Help
            >This is the subject line that your customer will see in their inbox. Make it clear and
            engaging to encourage them to open the email.</Help
          >
        </div>
      </div>
    </Col>
    <Col class="acr:py-4">
      <template v-slot:left>
        <h3 class="acr:my-0! acr:text-lg!">Template Overview</h3>
        <Help
          >This preview displays the final output of your email, including layout, text, images, and
          styling. Use the editor to modify any part of the template and instantly update the
          customer-facing version.</Help
        >
      </template>
      <div>
        <ButtonGroup class="acr:mb-2 acr:mx-auto">
          <Button variant="outline" disabled>
            <CircleCheckBig />
            Preview
          </Button>
          <Button
            :as="RouterLink"
            :to="{ name: 'recovery.email.builder', params: { emailId: email.id } }"
            variant="outline"
            ><MailsIcon /> Edit Template</Button
          >
        </ButtonGroup>
        <IFrame class="acr:rounded" :template="email.template" />
        <div class="acr:flex acr:justify-between acr:mt-4">
          <Button @click="saveEmail" :disabled="isSaving"><SaveAllIcon /> Save Changes</Button>
          <AlertDialog>
            <AlertDialogTrigger as-child>
              <Button variant="destructive"><Trash2Icon /> Delete email!</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Email?</AlertDialogTitle>
                <AlertDialogDescription>
                  This email will be deleted permanently. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  :disabled="isDeleting"
                  variant="destructive"
                  @click="handleDelete"
                  >Continue</AlertDialogAction
                >
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </Col>
  </form>
</template>
