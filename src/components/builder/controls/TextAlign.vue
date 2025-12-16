<script setup lang="ts">
import { ButtonGroup } from '@/components/ui/button-group'
import { Button } from '@/components/ui/button'
import {
  TextAlignEndIcon,
  TextAlignStartIcon,
  TextAlignCenterIcon,
  CircleCheckBigIcon,
} from 'lucide-vue-next'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

defineProps<{
  modelValue?: string
}>()

const emit = defineEmits(['update:modelValue'])

const aligns = [
  {
    icon: TextAlignStartIcon,
    text: 'Left',
    value: 'left',
  },
  {
    icon: TextAlignCenterIcon,
    text: 'Center',
    value: 'center',
  },
  {
    icon: TextAlignEndIcon,
    text: 'Right',
    value: 'right',
  },
]
</script>

<template>
  <TooltipProvider>
    <ButtonGroup>
      <ButtonGroup>
        <Tooltip v-for="align in aligns">
          <TooltipTrigger asChild>
            <Button
              @click="emit('update:modelValue', align.value)"
              :disabled="modelValue === align.value"
              variant="outline"
            >
              <CircleCheckBigIcon v-if="align.value === modelValue" />
              <component :is="align.icon" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p class="acr:!my-0">{{ align.text }}</p>
          </TooltipContent>
        </Tooltip>
      </ButtonGroup>
    </ButtonGroup>
  </TooltipProvider>
</template>
