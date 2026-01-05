<script setup lang="ts">
import type { CartItemsElement } from '@/types/builder.ts'
import type { Woo } from '@/composables/useWP.ts'
import { chunk } from 'lodash'
import { computed } from 'vue'
import { formatPrice } from '@/lib/utils.ts'
const currency = acrKitApp.currency

const props = defineProps<CartItemsElement & { products: Woo.Product[] }>()

const productChunks = computed(() => chunk(props.products, props.options.gridItems))
</script>

<template>
  <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
    <tbody>
      <template v-for="(productChunk, chunkIndex) in productChunks">
        <tr>
          <template v-for="(product, index) in productChunk">
            <td>
              <img :style="imgStyle" :src="product.image" :alt="product.name" />
              <h2 :style="titleStyle">{{ product.name }}</h2>
              <p :style="priceStyle">
                Quantity: 2 — Price: {{ formatPrice(Number(product.price), currency) }}
              </p>
            </td>
            <td v-if="productChunk.length != index + 1" :style="{ width: options.gap + 'px' }"></td>
          </template>
        </tr>
        <tr v-if="productChunks.length != chunkIndex + 1">
          <td :style="{ height: options.gap + 'px' }" :colspan="options.gridItems * 2 - 1"></td>
        </tr>
      </template>
    </tbody>
  </table>
</template>
