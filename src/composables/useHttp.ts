import { wpHttp } from '@/lib/http.ts'
import type { AxiosRequestConfig } from 'axios'
import { useAxios } from '@vueuse/integrations/useAxios'

export function get<D>(path: string, config?: AxiosRequestConfig<D>) {
  return useAxios<D>(
    path,
    {
      method: 'get',
      ...config,
    },
    wpHttp,
    {
      immediate: false,
    },
  )
}
