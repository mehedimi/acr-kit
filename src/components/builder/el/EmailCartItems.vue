<script setup lang="ts">
import type { CartItemsElement } from '@/types/builder.ts'
import ListCartItems from '@/components/builder/el/ListCartItems.vue'
import GridCartItems from '@/components/builder/el/GridCartItems.vue'
import { ItemLayoutStyle } from '@/enum/item-layout-style.ts'
import { ref } from 'vue'
import { getProducts, type Woo } from '@/composables/useWP.ts'

const props = defineProps<CartItemsElement>()

let products = ref<Array<Woo.Product>>([])

if (props.isEditing) {
  getProducts().then((items) => {
    products.value = items
  })
}
</script>

<template>
  <table
    :style="sectionStyle"
    align="center"
    width="100%"
    border="0"
    cellpadding="0"
    cellspacing="0"
    role="presentation"
  >
    <tbody>
      <tr>
        <td :style="sectionStyle">
          <template v-if="isEditing">
            <ListCartItems
              :products="products"
              v-if="options.layout === ItemLayoutStyle.LIST"
              v-bind="props"
            />
            <GridCartItems
              :products="products"
              v-else-if="options.layout === ItemLayoutStyle.GRID"
              v-bind="props"
            />
          </template>
          <template v-else>[cart-items]</template>
        </td>
      </tr>
    </tbody>
  </table>
</template>
