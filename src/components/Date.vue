<script setup lang="ts">
import { Tooltip, TooltipProvider, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { getLocalTimeZone, DateFormatter } from '@internationalized/date'

const props = defineProps<{ date: string }>()

const date = new Date(props.date)
const locale = acrApp.locale.replace('_', '-')
const short = new DateFormatter(locale, {
  timeZone: getLocalTimeZone(),
  dateStyle: 'short',
  timeStyle: 'short',
})

const full = new DateFormatter(locale, {
  timeZone: getLocalTimeZone(),
  dateStyle: 'full',
  timeStyle: 'full',
})
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger as-child>
        <span>{{ short.format(date) }}</span>
      </TooltipTrigger>
      <TooltipContent>
        <p class="acr:!m-0">{{ full.format(date) }}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
