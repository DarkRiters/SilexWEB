<template>
  <AuthForm
      :title="t('auth.register.title')"
      :onSubmit="onSubmit">
    <BaseInput
        id="email"
        :label="t('auth.fields.email')"
        type="email"
        :placeholder="t('auth.placeholders.email')"
        v-model="email"
        :error="emailError ? t(emailError): ''"
    />
    <BaseInput
        id="password"
        :label="t('auth.fields.password')"
        type="password"
        :placeholder="t('auth.placeholders.password')"
        v-model="password"
        :error="passwordError ? t(passwordError) : confirmPasswordError ? t(confirmPasswordError)  : ''"
    />
    <BaseInput
        id="confirmpassword"
        :label="t('auth.fields.confirmPassword')"
        type="password"
        :placeholder="t('auth.placeholders.password')"
        v-model="confirmPassword"
        :error="passwordError ? t(passwordError) : confirmPasswordError ? t(confirmPasswordError)  : ''"
    />
    <template #actions>
      <BaseButton type="submit" class="bg-green-600 hover:bg-green-500">{{ t('auth.register.submit') }}</BaseButton>
    </template>
    <template #footer>
      <nav class="flex gap-4 justify-center">
        <RouterLink
            to="/login"
        >
          {{ t('auth.register.haveAccount') }}
        </RouterLink>
      </nav>
    </template>
  </AuthForm>
</template>

<script setup lang="ts">
import AuthForm from "../../components/ui/AuthForm.vue";
import {authStore} from "../../stores/AuthStore.ts";
import {ref} from "vue";
import BaseInput from "../../components/ui/BaseInput.vue";
import BaseButton from "../../components/ui/BaseButton.vue";
import {useI18n} from "../../composables/useI18n.ts";
import {validateEmail, validatePassword, validatePasswordConfirm} from "../../modules/auth/validators.ts";
import type {MessageKey} from "../../i18n/messages.ts";
import {router} from "../../router";

const auth = authStore();
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const {t} = useI18n();
const emailError = ref<MessageKey | null>(null);
const passwordError = ref<MessageKey | null>(null);
const confirmPasswordError = ref<MessageKey | null>(null);
async function onSubmit() {
  emailError.value = validateEmail(email.value) ?? null;
  passwordError.value = validatePassword(password.value) ?? null;
  confirmPasswordError.value = validatePasswordConfirm(password.value, confirmPassword.value) ?? null;

  if (emailError.value || passwordError.value || confirmPasswordError.value) {
    return;
  }

    await auth.register(email.value, password.value);
    await router.push('/dashboard');
    console.log('Zarejestrowano:', auth.currentUser);
}
</script>

