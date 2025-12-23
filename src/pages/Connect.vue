<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { CircleCheckBig, ZapIcon } from 'lucide-vue-next'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { get } from '@/composables/useHttp.ts'
import { ref } from 'vue'
import { toast } from 'vue-sonner'

const features = [
  'Automatic abandoned cart detection and tracking',
  'Smart email recovery campaigns',
  'Real-time analytics and recovery insights',
  'Recover up to 30% of abandoned carts',
  'And more...',
]

const { execute } = get<{ redirectUrl: string }>('/connect')

const isSending = ref(false)

async function connect() {
  isSending.value = true

  toast.promise(
    async () => {
      return execute()
        .then(({ data }) => {
          window.location.href = data.value?.redirectUrl as string
        })
        .finally(() => {
          isSending.value = false
        })
    },
    {
      loading: 'Connecting...',
      success: 'Redirecting to the app',
      error: 'Failed to connect!',
    },
  )
}
</script>

<template>
  <Card class="acr:max-w-lg acr:mx-auto acr:mt-10">
    <CardContent>
      <div class="acr:text-center acr:mt-4">
        <img class="acr:mx-auto acr:max-w-32" src="./../assets/logo.svg" alt="ACR">
        <h2 class="acr:text-2xl!">Connect Your Store</h2>
        <p>Your plugin is installed!</p>
        <p>
          Connect to
          <a href="https://abandonedcartrecover.com/" target="_blank">Abandoned Cart Recover</a>
          to activate powerful cart recovery features and start converting abandoned carts into
          completed orders.
        </p>
      </div>

      <ul>
        <li v-for="feature in features" class="acr:flex acr:items-center acr:gap-2">
          <CircleCheckBig class="acr:w-4 acr:text-primary" />
          <span class="acr:text-muted-foreground">{{ feature }}</span>
        </li>
      </ul>
      <CardFooter class="acr:justify-center acr:mt-8">
        <Button size="lg" :disabled="isSending" @click="connect"> <ZapIcon /> Connect now!</Button>
      </CardFooter>
    </CardContent>
  </Card>
  <p class="acr:text-center acr:text-muted-foreground">
    By connecting, you agree to the
    <a href="https://abandonedcartrecover.com/terms-and-conditions/" target="_blank">Terms</a> and
    <a href="https://abandonedcartrecover.com/privacy-policy/" target="_blank">Privacy Policy</a>
  </p>
</template>
