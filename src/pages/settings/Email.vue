<script setup lang="ts">
import { useSettingsStore } from '@/stores/useSettingsStore.ts'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import Help from '@/pages/recover/components/Help.vue'
import { SendIcon } from 'lucide-vue-next'
import { toast } from 'vue-sonner'
import LoaderView from '@/components/LoaderView.vue'

const settingsStore = useSettingsStore()

const { isLoaded } = settingsStore.fetchEmail()
const { isSaving, save } = settingsStore.saveEmail()

const pages = settingsStore.getPages()

async function handleSubmit() {
  toast.promise(save(), {
    loading: 'Saving...',
    error: 'Failed to update the settings.',
    success: 'The settings has been updated successfully.',
  })
}
</script>

<template>
  <LoaderView :is-loading="isLoaded">
    <form @submit.prevent="handleSubmit" class="acr:space-y-8">
      <div class="acr:space-y-2">
        <Label for="email-settings-from-name">From Name</Label>
        <Input
          placeholder="Your Store Name"
          v-model="settingsStore.email.fromName"
          id="email-settings-from-name"
          autocomplete="organization"
        />
        <Help
          >The name shown as the sender in the recipient’s inbox. This helps customers quickly
          recognize who the email is from.</Help
        >
      </div>
      <div class="acr:space-y-2">
        <Label for="email-settings-from-email">From Email</Label>
        <Input
          placeholder="support@yourstore.com"
          v-model="settingsStore.email.fromEmail"
          id="email-settings-from-email"
          type="email"
          autocomplete="email"
        />
        <Help
          >The email address used to send messages. Customer replies will be delivered to this
          address unless a reply-to email is specified.</Help
        >
      </div>
      <div class="acr:space-y-2">
        <Label for="email-settings-reply-to-name">Reply-To Name</Label>
        <Input
          placeholder="Customer Support"
          v-model="settingsStore.email.replyToName"
          id="email-settings-from-name"
          autocomplete="organization"
        />
        <Help
          >The name displayed when customers reply to the email. If left empty, the From Name will
          be used.</Help
        >
      </div>
      <div class="acr:space-y-2">
        <Label for="email-settings-reply-to-email">Reply-To Email</Label>
        <Input
          placeholder="help@yourstore.com"
          v-model="settingsStore.email.replyToEmail"
          id="email-settings-from-email"
          type="email"
          autocomplete="email"
        />
        <Help
          >The email address that receives customer replies. If not set, replies will be sent to the
          From Email address.</Help
        >
      </div>
      <div class="acr:space-y-2">
        <Label for="email-settings-page">Unsubscribe Page</Label>
        <Select v-model="settingsStore.email.unsubscribePageId" id="email-settings-page">
          <SelectTrigger class="acr:w-full">
            <SelectValue placeholder="Select a page" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Pages</SelectLabel>
              <SelectItem :value="page.id" v-for="page in pages">{{
                page.title.rendered
              }}</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Help
          >The page customers are redirected to after unsubscribing from emails. If no page is
          selected, they will be redirected to the homepage by default.</Help
        >
      </div>
      <div class="acr:space-y-2">
        <Button :disabled="isSaving"><SendIcon /> Save Changes</Button>
      </div>
    </form>
  </LoaderView>
</template>
