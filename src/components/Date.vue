<script setup lang="ts">
import { timeAgo } from '@/lib/time.ts'
import { DateFormatter, getLocalTimeZone, parseAbsolute, toZoned } from '@internationalized/date'
import { Tooltip, TooltipProvider, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

const props = defineProps<{ date: string }>()

const date = toZoned(parseAbsolute(props.date, 'UTC'), getLocalTimeZone()).toDate()
const locale = acrApp.locale.replace('_', '-')

const full = new DateFormatter(locale, {
  timeZone: 'UTC',
  dateStyle: 'full',
  timeStyle: 'medium',
})
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger as-child>
        <span>{{ timeAgo(date) }}</span>
      </TooltipTrigger>
      <TooltipContent>
        <p class="acr:!m-0">{{ full.format(date) }}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
