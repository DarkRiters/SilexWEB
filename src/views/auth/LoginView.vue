<template>
  <AuthForm
      :title="t('auth.login.title')"
      :onSubmit="onSubmit">
        <BaseInput
            id="email"
            :label="t('auth.fields.email')"
            type="email"
            :placeholder="t('auth.placeholders.email')"
            v-model="email"
            :error="emailError ? t(emailError) : ''"
        />

        <BaseInput
            id="password"
            :label="t('auth.fields.password')"
            type="password"
            :placeholder="t('auth.placeholders.password')"
            v-model="password"
            :error="passwordError ? t(passwordError) : ''"
        />
    <template #actions>
      <BaseButton type="submit" class="bg-green-600 hover:bg-green-500"> {{ t('auth.login.submit') }}</BaseButton>
    </template>
    <template #footer>
      <nav class="flex gap-4 justify-center">
        <RouterLink
            to="/register"
        >
          {{ t('auth.login.noAccount') }}
        </RouterLink>
        <RouterLink
            to="/forgot-password"
        >
          {{ t('auth.login.forgotPassword') }}
        </RouterLink>
      </nav>
    </template>
  </AuthForm>
</template>
<script setup lang="ts">
import {ref} from "vue";
import BaseButton from "../../components/ui/BaseButton.vue";
import BaseInput from "../../components/ui/BaseInput.vue";
import AuthForm from "../../components/ui/AuthForm.vue";
import {useI18n} from "../../composables/useI18n.ts";
import {validateEmail, validatePassword} from "../../modules/auth/validators.ts";
import type {MessageKey} from "../../i18n/messages.ts";
import {authStore} from "../../stores/AuthStore.ts";
import {router} from "../../router";

const auth = authStore();
const email = ref('');
const password = ref('');

const {t} = useI18n();
const emailError = ref<MessageKey | null>(null);
const passwordError = ref<MessageKey | null>(null);

async function onSubmit() {
  emailError.value = validateEmail(email.value) ?? null;
  passwordError.value = validatePassword(password.value) ?? null;

  if (emailError.value || passwordError.value) {
    return;
  }

    await auth.login(email.value, password.value);
    await router.push('/dashboard');
    console.log('Zalogowano:', auth.currentUser);
}
</script>
