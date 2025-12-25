<script setup lang="ts">
import { Slider } from '@/components/ui/slider'

const props = defineProps<{
  modelValue?: string | number
  defaultValue?: string | number
  suffix?: string
}>()

const emit = defineEmits(['update:modelValue'])

function handleUpdate(value?: number[]) {
  if (!value) {
    return
  }

  let v: string | number = value[0] as number

  if (props.suffix) {
    v = String(v).concat(props.suffix)
  }

  emit('update:modelValue', v)
}
</script>

<template>
  <Slider
    :modelValue="[parseInt((modelValue as string | undefined) || (defaultValue as string), 10)]"
    @update:modelValue="handleUpdate"
  />
</template>
