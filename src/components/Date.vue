<script setup lang="ts">
import { Tooltip, TooltipProvider, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { DateFormatter } from '@internationalized/date'
import { formatUtcToHuman, timeAgo } from '@/lib/time.ts'

const props = defineProps<{ date: string }>()

const date = new Date(props.date)

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
        <span>{{ formatUtcToHuman(props.date) }}</span>
      </TooltipTrigger>
      <TooltipContent>
        <p class="acr:!m-0">{{ full.format(date) }}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
