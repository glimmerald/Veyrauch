<template>
  <NuxtPage />
</template>

<script setup>
import { useRuntimeConfig, useHead } from '#imports'

const config = useRuntimeConfig()
const headScripts = []

if (config.public.yandexMetrikaId) {
  headScripts.push({
    innerHTML: `
      (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
      m[i].l=1*new Date();
      for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
      k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
      (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

      ym(${config.public.yandexMetrikaId}, "init", {
           ssr:true,
           webvisor:true,
           clickmap:true,
           ecommerce:"dataLayer",
           referrer: document.referrer,
           url: location.href,
           accurateTrackBounce:true,
           trackLinks:true
      });
    `,
    type: 'text/javascript'
  })
}

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
