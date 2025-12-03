<script setup lang="ts">
import { Item, ItemContent, ItemDescription } from '@/components/ui/item'
import { type RouteLocationRaw, RouterLink } from 'vue-router'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import Help from '@/pages/recover/components/Help.vue'

const props = defineProps<{
  title: string
  description: string
  href: RouteLocationRaw
  links?: Array<{ title: string; href: RouteLocationRaw }>
}>()

const urls: Array<{ title: string; href: RouteLocationRaw }> = [
  {
    title: props.title,
    href: props.href,
  },
].concat(props.links ?? [])
</script>

<template>
  <Item variant="outline" class="acr:bg-white acr:border-t acr:rounded-none">
    <ItemContent>
      <Breadcrumb class="acr-header-breadcrumb">
        <BreadcrumbList class="acr:!mx-0 acr:!text-base">
          <template v-for="({ title, href }, index) in urls" :key="index">
            <BreadcrumbItem>
              <BreadcrumbLink class="acr:text-sm" :as="RouterLink" :to="href">{{
                title
              }}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </template>
        </BreadcrumbList>
      </Breadcrumb>
      <Help class="acr:[&]:!mb-0 acr:[&]:!mt-1">{{ description }}</Help>
    </ItemContent>
  </Item>
</template>

<style>
@reference '../admin.css';

.acr-header-breadcrumb ol li:last-child > svg {
  @apply acr:hidden;
}

.acr-header-breadcrumb .router-link-exact-active {
  @apply acr:text-gray-500;
}
.acr-header-breadcrumb ol li {
  @apply acr:!my-0;
}

.acr-header-breadcrumb li a:not(.router-link-exact-active) {
  @apply acr:!text-primary;
}
</style>
