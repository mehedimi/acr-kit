<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { spaceNormalize } from '@/lib/utils.ts'

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

const normalizedValue = spaceNormalize(props.modelValue)

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
