<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { Home, ShoppingCart, Repeat, Wrench, Settings } from 'lucide-vue-next'

const links = [
  {
    name: 'overview',
    title: 'Overview',
    icon: Home,
  },
  {
    name: 'cart.index',
    title: 'Carts',
    icon: ShoppingCart,
  },
  {
    name: 'recovery.options',
    title: 'Recovery Options',
    icon: Repeat,
  },
  {
    name: 'utilities',
    title: 'Utilities',
    icon: Wrench,
  },
  {
    name: 'configurations',
    title: 'Configurations',
    icon: Settings,
  },
]
</script>

<template>
  <div class="acr:bg-white acr:px-4">
    <NavigationMenu>
      <NavigationMenuList class="acr:gap-x-5">
        <NavigationMenuItem class="acr:!mb-0" v-for="(link, index) in links" :key="index">
          <NavigationMenuLink as-child>
            <RouterLink
              class="acr:py-3 acr:flex acr:flex-row acr:items-center acr:gap-x-1 acr:!transition-colors acr:rounded-b-none acr:hover:border-b-gray-500 acr:border-b-3 acr:border-b-transparent acr:!text-gray-500"
              :to="{ name: link.name }"
              ><component :is="link.icon" /> <span>{{ link.title }}</span></RouterLink
            >
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  </div>
</template>
