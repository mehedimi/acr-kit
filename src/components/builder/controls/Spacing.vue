<script setup lang="ts">
import { Input } from '@/components/ui/input'

const props = withDefaults(
  defineProps<{
    modelValue?: string
    max?: number
    min?: number
  }>(),
  {
    max: 100,
    min: 0,
  },
)

const emit = defineEmits(['update:modelValue'])

const normalizedValue = normalize(props.modelValue)

function normalize(value?: string): [number, number, number, number] {
  if (!value) return [0, 0, 0, 0]

  // Split by space and convert to integer
  const parts = value
    .trim()
    .split(/\s+/)
    .map((v) => parseInt(v, 10))

  // CSS shorthand expansion rules
  switch (parts.length) {
    case 1:
      // @ts-ignore
      return [parts[0], parts[0], parts[0], parts[0]]
    case 2:
      // @ts-ignore
      return [parts[0], parts[1], parts[0], parts[1]]
    case 3:
      // @ts-ignore
      return [parts[0], parts[1], parts[2], parts[1]]
    case 4:
      // @ts-ignore
      return [parts[0], parts[1], parts[2], parts[3]]
    default:
      return [0, 0, 0, 0]
  }
}

function handleInput(index: number, value: number) {
  normalizedValue[index] = value
  emit('update:modelValue', normalizedValue.map((s) => s + 'px').join(' '))
}
</script>

<template>
  <div class="acr:flex acr:gap-2 acr:[&_span]:text-muted-foreground">
    <div>
      <Input
        :modelValue="normalizedValue[0]"
        @update:model-value="handleInput(0, $event as number)"
        type="number"
        :min="min"
        :max="max"
        class="acr:h-8 acr:py-1"
      />
      <span>Top</span>
    </div>
    <div>
      <Input
        :modelValue="normalizedValue[1]"
        @update:model-value="handleInput(1, $event as number)"
        type="number"
        :min="min"
        :max="max"
        class="acr:h-8 acr:py-1"
      />
      <span>Right</span>
    </div>
    <div>
      <Input
        :modelValue="normalizedValue[2]"
        @update:model-value="handleInput(2, $event as number)"
        type="number"
        :min="min"
        :max="max"
        class="acr:h-8 acr:py-1"
      />
      <span>Bottom</span>
    </div>
    <div>
      <Input
        :modelValue="normalizedValue[3]"
        @update:model-value="handleInput(3, $event as number)"
        type="number"
        :min="min"
        :max="max"
        class="acr:h-8 acr:py-1"
      />
      <span>Left</span>
    </div>
  </div>
</template>
