<script setup lang="ts">
import type { DropdownMenuItemProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { DropdownMenuItem, useForwardProps } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = withDefaults(
  defineProps<
    DropdownMenuItemProps & {
      class?: HTMLAttributes['class']
      inset?: boolean
      variant?: 'default' | 'destructive'
    }
  >(),
  {
    variant: 'default',
  },
)

const delegatedProps = reactiveOmit(props, 'inset', 'variant', 'class')

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <DropdownMenuItem
    data-slot="dropdown-menu-item"
    :data-inset="inset ? '' : undefined"
    :data-variant="variant"
    v-bind="forwardedProps"
    :class="
      cn(
        'acr:focus:bg-accent acr:focus:text-accent-foreground acr:data-[variant=destructive]:text-destructive acr:data-[variant=destructive]:focus:bg-destructive/10 acr:dark:data-[variant=destructive]:focus:bg-destructive/20 acr:data-[variant=destructive]:focus:text-destructive acr:data-[variant=destructive]:*:[svg]:!text-destructive acr:[&_svg:not([class*=\'text-\'])]:text-muted-foreground acr:relative acr:flex acr:cursor-default acr:items-center acr:gap-2 acr:rounded-sm acr:px-2 acr:py-1.5 acr:text-sm acr:outline-hidden acr:select-none acr:data-[disabled]:pointer-events-none acr:data-[disabled]:opacity-50 acr:data-[inset]:pl-8 acr:[&_svg]:pointer-events-none acr:[&_svg]:shrink-0 acr:[&_svg:not([class*=\'size-\'])]:size-4',
        props.class,
      )
    "
  >
    <slot />
  </DropdownMenuItem>
</template>
