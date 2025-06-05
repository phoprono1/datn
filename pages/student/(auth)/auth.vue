<template>
  <div>
    <UTabs
      :items="items"
      variant="link"
      class="gap-4 w-full"
      :ui="{ trigger: 'grow' }"
    >
      <template #login>
        <UForm :schema="loginSchema" :state="credential" @submit="login">
          <UFormField label="email" name="email">
            <UInput
              v-model="credential.email"
              type="email"
              label="Email"
              placeholder="Nhập email của bạn"
              required
            />
          </UFormField>
          <UFormField label="password" name="password">
            <UInput
              v-model="credential.password"
              type="password"
              label="Mật khẩu"
              placeholder="Nhập mật khẩu của bạn"
              required
            />
          </UFormField>
          <UButton type="submit" class="w-full">Đăng nhập</UButton>
        </UForm>
      </template>
      <template #register>
        <UForm :schema="registerSchema" :state="credential" @submit="register">
          <UFormField label="email" name="email">
            <UInput
              v-model="credential.email"
              type="email"
              label="Email"
              placeholder="Nhập email của bạn"
              required
            />
          </UFormField>
          <UFormField label="name" name="name">
            <UInput
              v-model="credential.name"
              type="text"
              label="Tên hiển thị"
              placeholder="Nhập tên hiển thị của bạn"
              required
            />
          </UFormField>
          <UFormField label="password" name="password">
            <UInput
              v-model="credential.password"
              type="password"
              label="Mật khẩu"
              placeholder="Nhập mật khẩu của bạn"
              required
            />
          </UFormField>
          <UButton type="submit" class="w-full">Đăng ký</UButton>
        </UForm>
      </template>
    </UTabs>
  </div>
</template>

<script lang="ts" setup>
import type { TabsItem } from "@nuxt/ui";
import { z } from "zod";

const items = ref<TabsItem[]>([
  {
    label: "Đăng nhập",
    description: "Đăng nhập ngay!",
    icon: "i-heroicons-arrow-right-on-rectangle-solid",
    slot: "login" as const,
  },
  {
    label: "Đăng ký",
    description: "Đăng ký tài khoản mới!",
    icon: "i-heroicons-user-plus-solid",
    slot: "register" as const,
  },
]);

const { loggedIn: _loggedIn, user, fetch: refreshSession } = useUserSession();

// Schema cho Đăng nhập (Login)
const loginSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
});

// Schema cho Đăng ký (Register)
const registerSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  name: z.string().min(1, "Tên hiển thị không được để trống"), // 'name' là bắt buộc cho đăng ký
  password: z.string().min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
});

// Type cho credential cần bao gồm tất cả các trường có thể có từ cả hai schema
type Credential = z.output<typeof loginSchema> &
  Partial<z.output<typeof registerSchema>>;

const credential = reactive<Credential>({
  email: "",
  name: undefined, // Bắt buộc cho Register, Optional cho Login
  password: "",
});

const toast = useToast();

// Trong hàm login() của frontend
async function login() {
  try {
    loginSchema.parse(credential);
    await $fetch("/api/auth/login", {
      method: "POST",
      body: credential,
    });
    await refreshSession();
    toast.add({
      title: "Đăng nhập thành công",
      description: `Xin chào ${user.value?.name}`,
      color: "success",
    });
    await navigateTo("/");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // Thay đổi type `unknown` thành `any` để dễ dàng truy cập thuộc tính
    console.error("Login failed:", error);

    // TRUY CẬP THÔNG BÁO LỖI TỪ RESPONSE BODY JSON
    const errorMessage =
      error.response?._data?.message ||
      error.message ||
      "Vui lòng kiểm tra thông tin đăng nhập của bạn.";

    toast.add({
      title: "Đăng nhập thất bại",
      description: errorMessage, // Sử dụng errorMessage đã được xử lý
      color: "error",
    });
  }
}

// Tương tự cho hàm register()
async function register() {
  try {
    registerSchema.parse(credential);
    await $fetch("/api/auth/register", {
      method: "POST",
      body: credential,
    });
    toast.add({
      title: "Đăng ký thành công",
      color: "success",
    });
    navigateTo("/auth/login");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // Thay đổi type `unknown` thành `any`
    console.error("Registration failed:", error);

    // TRUY CẬP THÔNG BÁO LỖI TỪ RESPONSE BODY JSON
    const errorMessage =
      error.response?._data?.message ||
      error.message ||
      "Vui lòng kiểm tra thông tin đăng ký của bạn.";

    toast.add({
      title: "Đăng ký thất bại",
      description: errorMessage, // Sử dụng errorMessage đã được xử lý
      color: "error",
    });
  }
}
</script>

<style></style>
