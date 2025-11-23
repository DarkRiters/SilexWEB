<template>
  <AuthForm
      title="Widok Logowania"
      :onSubmit="onSubmit">
        <BaseInput
            id="email"
            label="E-mail"
            type="email"
            placeholder="Wpisz e-mail"
            v-model="email"
        />

        <BaseInput
            id="password"
            label="Hasło"
            type="password"
            placeholder="Wpisz hasło"
            v-model="password"
        />
    <template #actions>
      <BaseButton type="submit" class="bg-green-600 hover:bg-green-500"> Zaloguj</BaseButton>
    </template>
  </AuthForm>
</template>
<script setup lang="ts">
import {ref} from "vue";
import {useAuthStore} from "../../stores/authStore.ts";
import BaseButton from "../../components/ui/BaseButton.vue";
import BaseInput from "../../components/ui/BaseInput.vue";
import AuthForm from "../../components/ui/AuthForm.vue";

const auth = useAuthStore();
const email = ref('');
const password = ref('');

function onSubmit() {
  console.log('Email:', email.value);
  console.log('Password:', password.value);
  const dto = {
    id: 1,
    name: "user",
    email: "user@gmail.com",
    role: "admin",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  auth.loginFromDTO(dto);
}
</script>
