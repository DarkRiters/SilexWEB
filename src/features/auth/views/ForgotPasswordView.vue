<template>
  <AuthForm :title="t('auth.forgot.title')" :onSubmit="onSubmit">
    <BaseInput
        id="email"
        :label="t('auth.forgot.subtitle')"
        type="email"
        :placeholder="t('auth.placeholders.email')"
        v-model="email"
        :error="emailError ? t(emailError) : ''"
    />

    <template #actions>
      <BaseButton type="submit" class="app-button w-full">
        {{ t("auth.forgot.submit") }}
      </BaseButton>
    </template>

    <template #footer>
      <nav class="flex gap-4 justify-center">
        <RouterLink class="app-link" to="/login">
          {{ t("auth.forgot.goToLogin") }}
        </RouterLink>
      </nav>
    </template>
  </AuthForm>
</template>

<script setup lang="ts">
import AuthForm from "../ui/AuthForm.vue";
import {ref} from "vue";
import BaseInput from "../../../shared/ui/BaseInput.vue";
import BaseButton from "../../../shared/ui/BaseButton.vue";
import {useI18n} from "../../../shared/composables/useI18n.ts";
import type {MessageKey} from "../../../shared/i18n/messages.ts";
import {validateEmail} from "../utils/validators.ts";
import {authStore} from "../stores/authStore.ts";
import {router} from "../../../app/router";
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

