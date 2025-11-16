<template>
  <AuthCard
      :title="t('auth.login.title')"
      :subtitle="t('auth.login.subtitle')"
  >
    <form
        class="space-y-4"
        @submit.prevent="onSubmit"
    >
      <AuthField
          id="email"
          name="email"
          type="email"
          autocomplete="email"
          :label="t('auth.fields.email')"
          :placeholder="t('auth.placeholders.email')"
          v-model="values.email"
          :error="errors.email"
      />

      <AuthPasswordField
          id="password"
          name="password"
          autocomplete="current-password"
          :label="t('auth.fields.password')"
          :placeholder="t('auth.placeholders.password')"
          v-model="values.password"
          :error="errors.password"
      />

      <div class="flex items-center justify-between text-xs">
        <RouterLink
            to="/auth/forgot-password"
            class="text-sky-600 hover:text-sky-500 dark:text-sky-400 dark:hover:text-sky-300"
        >
          {{ t('auth.login.forgotPassword') }}
        </RouterLink>
      </div>

      <button
          type="submit"
          class="w-full mt-2 inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm font-medium
               bg-sky-600 text-white hover:bg-sky-700
               disabled:opacity-60 disabled:cursor-not-allowed
               transition"
          :disabled="isSubmitting"
      >
        <span v-if="!isSubmitting">
          {{ t('auth.login.submit') }}
        </span>
        <span v-else>
          {{ t('auth.common.loading') }}
        </span>
      </button>
    </form>

    <template #footer>
      <p class="text-xs text-slate-500 dark:text-slate-400">
        {{ t('auth.login.noAccount') }}
        <RouterLink
            to="/auth/register"
            class="text-sky-600 hover:text-sky-500 dark:text-sky-400 dark:hover:text-sky-300 font-medium"
        >
          {{ t('auth.login.goToRegister') }}
        </RouterLink>
      </p>
    </template>
  </AuthCard>
</template>

<script setup lang="ts">
import { useRouter, RouterLink } from 'vue-router';
import {useLoginForm} from "../../modules/auth/useLoginForm.ts";
import {useI18n} from "../../composables/useI18n.ts";
import AuthPasswordField from "../../components/auth/AuthPasswordField.vue";
import AuthField from "../../components/auth/AuthField.vue";
import AuthCard from "../../components/auth/AuthCard.vue";

const router = useRouter();
const { t } = useI18n();
const { values, errors, isSubmitting, submit } = useLoginForm();

async function onSubmit() {
  await submit(async () => {
    await router.push('/app/dashboard');
  });
}
</script>
