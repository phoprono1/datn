// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: ['@/assets/css/main.css'],
  hub: {
    workers: true,
    database: true
  },
  nitro: {
    preset: 'cloudflare-module',
    experimental: {
      openAPI: true,
      websocket: true
    }
  },
  vite: {
    plugins: [
      tailwindcss(),
    ]
  },
  ui: {
    prefix: 'U',
    fonts: true,
    colorMode: true,
    theme: {
      colors: ['primary', 'secondary', 'success', 'info', 'warning', 'error'],
      transitions: true,
    },
  },
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxt/ui',
    '@nuxthub/core',
    '@nuxtjs/color-mode',
    'nuxt-auth-utils',
    '@vueuse/nuxt'
  ]
})