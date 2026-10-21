<template>
  <NuxtPage />
</template>

<script setup>
import { useRuntimeConfig, useHead } from '#imports'

useHead({
  htmlAttrs: {
    lang: 'ru'
  },
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
  ]
})

const config = useRuntimeConfig()
const headScripts = []


if (config.public.googleAnalyticsId) {
  headScripts.push({
    src: `https://www.googletagmanager.com/gtag/js?id=${config.public.googleAnalyticsId}`,
    async: true
  })
  headScripts.push({
    innerHTML: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${config.public.googleAnalyticsId}');
    `,
    type: 'text/javascript'
  })
}

if (headScripts.length > 0) {
  useHead({
    script: headScripts
  })
}
</script>
