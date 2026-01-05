<script setup lang="ts">
import type { CartItemsElement } from '@/types/builder.ts'
import type { Woo } from '@/composables/useWP.ts'
import { formatPrice } from '@/lib/utils.ts'

defineProps<CartItemsElement & { products: Woo.Product[] }>()
const currency = acrKitApp.currency
</script>

<template>
  <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
    <tbody>
      <template v-for="(item, index) in products" :key="index">
        <tr>
          <td :style="{ width: options.listItemSize + '%' }">
            <img :style="imgStyle" :src="item.image" :alt="item.name" />
          </td>
          <td :style="style">
            <h2 :style="titleStyle">{{ item.name }}</h2>
            <p :style="priceStyle">
              Quantity: 2 — Price: {{ formatPrice(Number(item.price), currency) }}
            </p>
          </td>
        </tr>
        <tr v-if="index + 1 < products.length">
          <td :style="{ height: options.gap + 'px' }" colspan="2"></td>
        </tr>
      </template>
    </tbody>
  </table>
</template>
