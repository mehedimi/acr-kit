<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'

const links = [
  {
    name: 'overview',
    title: 'Overview',
  },
  {
    name: 'cart.index',
    title: 'Carts',
  },
  {
    name: 'recovery.options',
    title: 'Recovery Options',
  },
  {
    name: 'utilities',
    title: 'Utilities',
  },
  {
    name: 'configurations',
    title: 'Configurations',
  },
]
</script>

<template>
  <div class="acr:bg-white acr:px-4">
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem class="acr:!mb-0" v-for="(link, index) in links" :key="index">
          <NavigationMenuLink as-child>
            <RouterLink
              class="acr:py-3 acr:!transition-colors acr:rounded-b-none acr:hover:!text-primary acr:border-b-3 acr:border-b-transparent acr:!text-foreground"
              :to="{ name: link.name }"
              >{{ link.title }}</RouterLink
            >
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  </div>
</template>
