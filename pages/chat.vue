<template>
  <div>
    <div>
      Đây là trang chat. Bạn có thể sử dụng nó để trò chuyện với những người
      khác.
    </div>
    <div class="chat-messages">
      <div v-for="(msg, index) in messages" :key="index">
        {{ msg }}
      </div>
    </div>
    <UInput v-model="message" placeholder="Type your message..." />
    <UButton @click="sendMessage">Gửi</UButton>
  </div>
</template>

<script lang="ts" setup>
const message = ref("");
const messages = ref<string[]>([]);
const { user } = useUserSession();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { open, send } = useWebSocket("/ws/chat", {
  immediate: true,
  async onMessage(ws, event) {
    const receivedMessage =
      typeof event.data === "string" ? event.data : await event.data.text();
    messages.value.push(receivedMessage);
  },
});

function sendMessage() {
  if (message.value.trim() === "") return; // Ngăn gửi tin nhắn trống

  // Lấy tên người dùng, nếu undefined hoặc null thì dùng 'Anonymous'
  // Thêm ': ' để phân tách tên và nội dung tin nhắn cho dễ đọc
  const senderName = user.value?.name || "Anonymous";
  send(`${senderName}: ${message.value}`);

  message.value = ""; // Xóa nội dung input sau khi gửi
}
</script>

<style></style>
