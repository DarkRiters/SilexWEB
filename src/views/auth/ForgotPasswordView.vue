<template>
  <AuthForm
      :title="t('auth.forgot.title')"
      :onSubmit="onSubmit">
    <BaseInput
        id="email"
        :label="t('auth.forgot.subtitle')"
        type="email"
        :placeholder="t('auth.placeholders.email')"
        v-model="email"
        :error="emailError ? t(emailError): ''"
    />
    <template #actions>
      <BaseButton type="submit" class="bg-red-600 hover:bg-red-500">{{ t('auth.forgot.submit') }}</BaseButton>
    </template>
    <template #footer>
      <nav class="flex gap-4 justify-center">
        <RouterLink
            to="/login"
        >
          {{ t('auth.forgot.goToLogin') }}
        </RouterLink>
      </nav>
    </template>
  </AuthForm>
</template>
<script setup lang="ts">
import AuthForm from "../../components/ui/AuthForm.vue";
import {ref} from "vue";
import BaseInput from "../../components/ui/BaseInput.vue";
import BaseButton from "../../components/ui/BaseButton.vue";
import {useI18n} from "../../composables/useI18n.ts";
import type {MessageKey} from "../../i18n/messages.ts";
import {validateEmail} from "../../modules/auth/validators.ts";
import {authStore} from "../../stores/AuthStore.ts";
import {router} from "../../router";
const auth = authStore();

const email = ref('');
const {t} = useI18n();
const emailError = ref<MessageKey | null>(null);
async function onSubmit() {
  emailError.value = validateEmail(email.value) ?? null;

  if(emailError.value) {
    return;
  }

    await auth.requestPasswordReset(email.value);
    await router.push('/dashboard');
}
</script>

