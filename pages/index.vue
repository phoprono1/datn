<template>
  <div>
    <div>Đây là trang chủ</div>
    <h1 v-if="user">
      Xin chào {{ user?.name }} và email của bạn là {{ user?.email }}
    </h1>
    <button v-if="user" @click="logout">Đăng xuất</button>
    <div v-else>
      <p>Bạn chưa đăng nhập.</p>
      <nuxt-link to="/student/auth">Đăng nhập</nuxt-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { user, clear: clearSession } = useUserSession();
async function logout() {
  await clearSession();
  await navigateTo("/student/auth");
}
</script>

<style></style>
