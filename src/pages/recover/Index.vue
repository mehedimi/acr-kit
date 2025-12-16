<script setup lang="ts">
import { Card, CardContent } from '@/components/ui/card'
import { MailCheck, Cog } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import Heading from '@/pages/recover/components/Heading.vue'
import { RouterLink } from 'vue-router'
import Content from '@/components/Content.vue'
</script>

<template>
  <Heading />
  <Content>
    <Card class="acr:rounded-md">
      <CardContent>
        <div class="acr:flex acr:gap-x-4 acr:items-center">
          <MailCheck class="acr:w-16 acr:h-16 acr:text-primary acr:-mt-3" />
          <div class="acr:flex-1">
            <h2 class="acr:my-0! acr:text-2xl! acr:text-muted-foreground!">Email Recovery</h2>
            <p class="acr:mt-1! acr:text-sm! acr:text-muted-foreground">
              Configure automated email notifications triggered when a cart is marked as abandoned.
            </p>
          </div>
          <div>
            <Button
              size="lg"
              :as="RouterLink"
              :to="{ name: 'recovery.options.email' }"
              variant="outline"
              ><Cog /> Configure Email</Button
            >
          </div>
        </div>
      </CardContent>
    </Card>
  </Content>
</template>
