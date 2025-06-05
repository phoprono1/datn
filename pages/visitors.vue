<template>
  <div>
    <h1>Visitors: {{ visitors }}</h1>
  </div>
</template>

<script lang="ts" setup>
const visitors = ref(0);
const { open } = useWebSocket("/ws/visitors", {
  immediate: true,
  async onMessage(ws, event) {
    visitors.value = parseInt(
      typeof event.data === "string" ? event.data : await event.data.text()
    );
  },
});

onMounted(() => {
  open();
});
</script>

<style></style>
