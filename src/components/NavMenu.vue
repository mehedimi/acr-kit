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
  <div class="acr:bg-white acr:p-4">
    <NavigationMenu>
      <NavigationMenuList class="acr:gap-x-2">
        <NavigationMenuItem class="acr:!mb-0" v-for="(link, index) in links" :key="index">
          <NavigationMenuLink as-child>
            <RouterLink
              :to="{ name: link.name }"
              class="acr:flex-row acr:items-center acr:gap-2 acr:!text-gray-500 acr:px-4 acr:!rounded-full"
              ><component :is="link.icon" /> <span>{{ link.title }}</span></RouterLink
            >
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  </div>
</template>
