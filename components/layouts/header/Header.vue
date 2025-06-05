<template>
  <header
    class="bg-emerald-200/75 dark:bg-emerald-900/75 backdrop-blur border-b border-default h-(--ui-header-height) sticky top-0 z-50"
  >
    <UContainer
      aria-label="Main"
      class="w-full max-w-(--ui-container) mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 h-full"
    >
      <div class="lg:flex-1 flex items-center gap-1.5 min-w-0">
        <Logo />
      </div>
      <div class="hidden lg:flex">
        <UNavigationMenu
          :items="items"
          class="relative flex gap-1.5 [&>div]:min-w-0 items-center justify-between"
        />
      </div>
      <div class="flex items-center justify-end lg:flex-1 gap-1.5">
        <ColorModeButton />
      </div>
    </UContainer>
  </header>
</template>

<script lang="ts" setup>
import type { NavigationMenuItem } from "@nuxt/ui";
import Logo from "./Logo.vue";

const items = ref<NavigationMenuItem[]>([
  {
    label: "Trang chủ",
    href: "/",
    icon: "i-lucide-home",
  },
  {
    label: "Đăng nhập",
    href: "/student/auth",
    icon: "i-lucide-log-in",
  },
]);
</script>

<style scoped></style>
