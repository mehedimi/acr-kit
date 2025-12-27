<script setup lang="ts">
import { Html, Style, Head, Body } from '@vue-email/components'
import type { Template } from '@/types/builder.ts'
import EmailApp from '@/components/builder/EmailApp.vue'

defineProps<{
  template: Template
}>()
</script>

<template>
  <Html>
    <Head>
      <Style>
        *, *::before, *::after { box-sizing: border-box; } /* Prevent Outlook spacing issues */
        table, td { mso-table-lspace: 0; mso-table-rspace: 0; } /* Collapse tables and remove gaps
        */ table { border-collapse: collapse; border-spacing: 0; table-layout: fixed; margin: 0
        auto; } /* Images */ img { -ms-interpolation-mode: bicubic; /* smooth scaling in Outlook */
        border: 0; outline: none; text-decoration: none; display: block; } /* Body reset */ body {
        margin: 0; padding: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;
        font-family: Arial, Helvetica, sans-serif; background-color: #f5f5f5; } /* Links */ a {
        color: inherit; text-decoration: none; } /* iOS auto-link fix */ a[x-apple-data-detectors] {
        color: inherit !important; text-decoration: none !important; font-size: inherit !important;
        font-family: inherit !important; font-weight: inherit !important; line-height: inherit
        !important; } /* Gmail dark mode fix */ u + #body a { color: inherit; text-decoration: none;
        } /* Remove blue borders around linked images in Outlook */ img[tabindex='0'] + div {
        display: none; } /* Default typography */ body, table, td, p, a, li { font-family: Arial,
        Helvetica, sans-serif; } p, h1, h2, h3, h4, h5, h6 { margin: 0; }
      </Style>
    </Head>
    <Body :style="template.bodyStyle">
      <EmailApp :template="template" />
    </Body>
  </Html>
</template>
