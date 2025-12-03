<script setup lang="ts">
import type { SwitchRootEmits, SwitchRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { SwitchRoot, SwitchThumb, useForwardPropsEmits } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<SwitchRootProps & { class?: HTMLAttributes['class'] }>()

const emits = defineEmits<SwitchRootEmits>()

const delegatedProps = reactiveOmit(props, 'class')

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <SwitchRoot
    v-slot="slotProps"
    data-slot="switch"
    v-bind="forwarded"
    :class="
      cn(
        'acr:peer acr:data-[state=checked]:bg-primary acr:data-[state=unchecked]:bg-input acr:focus-visible:border-ring acr:focus-visible:ring-ring/50 acr:dark:data-[state=unchecked]:bg-input/80 acr:inline-flex acr:h-[1.15rem] acr:w-8 acr:shrink-0 acr:items-center acr:rounded-full acr:border acr:border-transparent acr:shadow-xs acr:transition-all acr:outline-none acr:focus-visible:ring-[3px] acr:disabled:cursor-not-allowed acr:disabled:opacity-50',
        props.class,
      )
    "
  >
    <SwitchThumb
      data-slot="switch-thumb"
      :class="
        cn(
          'acr:bg-background acr:dark:data-[state=unchecked]:bg-foreground acr:dark:data-[state=checked]:bg-primary-foreground acr:pointer-events-none acr:block acr:size-4 acr:rounded-full acr:ring-0 acr:transition-transform acr:data-[state=checked]:translate-x-[calc(100%-2px)] acr:data-[state=unchecked]:translate-x-0',
        )
      "
    >
      <slot name="thumb" v-bind="slotProps" />
    </SwitchThumb>
  </SwitchRoot>
</template>
