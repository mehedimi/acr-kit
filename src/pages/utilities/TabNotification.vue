<script setup lang="ts">
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import Help from '@/pages/recover/components/Help.vue'
import { Slider } from '@/components/ui/slider'
import { Input } from '@/components/ui/input'
import { ButtonGroup } from '@/components/ui/button-group'
import { Button } from '@/components/ui/button'
import { SendIcon, CircleCheckBigIcon } from 'lucide-vue-next'
import { useUtilityStore } from '@/stores/useUtilityStore.ts'
import LoaderView from '@/components/LoaderView.vue'
import { TabTriggerMode } from '@/enum/tab-trigger-mode.ts'
import { toast } from 'vue-sonner'

const utilityStore = useUtilityStore()

const { isLoading } = utilityStore.fetchTab()
const { isSubmitted, save } = utilityStore.saveTab()

const modes = [
  {
    title: 'Always',
    value: TabTriggerMode.ALWAYS,
  },
  {
    title: 'Only when cart has items',
    value: TabTriggerMode.CART_ITEM,
  },
]

function submit() {
  toast.promise(save(), {
    loading: 'Saving...',
    success: 'The tab notification settings saved.',
    error: 'Failed to save to tab notification settings.',
  })
}
</script>

<template>
  <LoaderView :is-loading="isLoading">
    <form @submit.prevent="submit" class="acr:space-y-8">
      <div>
        <div class="acr:flex acr:items-center acr:space-x-2">
          <Switch v-model="utilityStore.tab.enabled" id="tab-notification-enable" />
          <Label for="tab-notification-enable">Enable Tab Notification</Label>
        </div>

        <Help
          >Turn on browser tab notifications site-wide. When enabled, notifications activate based
          on your trigger settings below.</Help
        >
      </div>
      <div class="acr:space-y-3">
        <Label>Trigger Mode</Label>
        <ButtonGroup>
          <Button
            @click="utilityStore.tab.config.triggerMode = mode.value"
            type="button"
            v-for="mode in modes"
            variant="outline"
            :class="{
              'acr:text-primary!':
                mode.value === (utilityStore.tab.config.triggerMode || TabTriggerMode.CART_ITEM),
            }"
          >
            <CircleCheckBigIcon
              v-if="
                mode.value === (utilityStore.tab.config.triggerMode || TabTriggerMode.CART_ITEM)
              "
            />
            {{ mode.title }}
          </Button>
        </ButtonGroup>

        <Help
          >Choose when the notification should start. "Only when cart has items" avoids annoying
          visitors with empty carts.</Help
        >
      </div>
      <div class="acr:space-y-4">
        <Label class="acr:flex acr:justify-between acr:items-center"
          >Activation Delay
          <span class="acr:font-normal acr:text-xs">{{
            utilityStore.tab.config.delay || 5
          }}</span></Label
        >
        <Slider
          :min="1"
          :max="100"
          :modelValue="[utilityStore.tab.config.delay || 5]"
          @update:modelValue="
            (v) => {
              utilityStore.tab.config.delay = v?.[0] || 5
            }
          "
        />
        <Help
          >Delay in seconds after tab switch before notification starts. Prevents immediate
          triggering on quick switches.</Help
        >
      </div>
      <div class="acr:space-y-2">
        <Label for="notification-message">Message</Label>
        <Input
          id="notification-message"
          placeholder="Enter message that will blink. Supports emojis 😎!"
          required
          v-model="utilityStore.tab.config.message"
        />
        <Help>The message that will blink in the tab notification.</Help>
      </div>
      <Button :disabled="isSubmitted"> <SendIcon /> Save Changes</Button>
    </form>
  </LoaderView>
</template>
