<template>
  <div
    class="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col"
  >
    <Header />

    <div class="flex-1 overflow-y-auto main-content-wrapper">
      <main class="container mx-auto">
        <slot />
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Header from "~/components/layouts/header/Header.vue";
</script>

<style></style>
