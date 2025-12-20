export function hasAnyItemsInCart() {
  const cookies = document.cookie.split('; ')
  return cookies.includes('woocommerce_items_in_cart=1')
}
