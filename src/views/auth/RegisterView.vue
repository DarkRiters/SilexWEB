<template>
  <AuthForm
      title="Rejestracja"
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
    <BaseInput
        id="confirmpassword"
        label="Potwierdź hasło"
        type="password"
        placeholder="Wpisz hasło"
        v-model="confirmPassword"
    />
    <template #actions>
      <BaseButton type="submit" class="bg-green-600 hover:bg-green-500">Zarejestruj</BaseButton>
    </template>
  </AuthForm>
</template>

<script setup lang="ts">
import AuthForm from "../../components/ui/AuthForm.vue";
import {useAuthStore} from "../../stores/authStore.ts";
import {ref} from "vue";
import BaseInput from "../../components/ui/BaseInput.vue";
import BaseButton from "../../components/ui/BaseButton.vue";

const auth = useAuthStore();
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
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

