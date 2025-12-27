import { wpEndpoint, wpHttp } from '@/lib/http.ts'

export namespace Woo {
  export interface Product {
    name: string
    price: string
    image?: string
  }
}

export async function getProducts() {
  return wpHttp
    .get<Array<{ name: string; price: string; images: Array<{ thumbnail: string }> }>>(
      wpEndpoint('/wc/v3/products'),
      {
        params: {
          per_page: 3,
        },
      },
    )
    .then(({ data }) => {
      return data.map((d) => {
        return {
          name: d.name,
          price: d.price,
          image: d.images?.[0]?.thumbnail,
        }
      })
    })
}
