<template>
  <AuthCard
      :title="t('auth.forgot.title')"
      :subtitle="t('auth.forgot.subtitle')"
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

      <button
          type="submit"
          class="w-full mt-2 inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm font-medium
               bg-sky-600 text-white hover:bg-sky-700
               disabled:opacity-60 disabled:cursor-not-allowed
               transition"
          :disabled="isSubmitting"
      >
        <span v-if="!isSubmitting">
          {{ t('auth.forgot.submit') }}
        </span>
        <span v-else>
          {{ t('auth.common.loading') }}
        </span>
      </button>
    </form>

    <template #footer>
      <p class="text-xs text-slate-500 dark:text-slate-400">
        {{ t('auth.forgot.backInfo') }}
        <RouterLink
            to="/auth/login"
            class="text-sky-600 hover:text-sky-500 dark:text-sky-400 dark:hover:text-sky-300 font-medium"
        >
          {{ t('auth.forgot.goToLogin') }}
        </RouterLink>
      </p>
    </template>
  </AuthCard>
</template>

<script setup lang="ts">
import { useRouter, RouterLink } from 'vue-router';
import { useForgotPasswordForm } from '../../modules/auth/useForgotPasswordForm';
import { useI18n } from '../../composables/useI18n';
import AuthField from '../../components/auth/AuthField.vue';
import AuthCard from '../../components/auth/AuthCard.vue';

const router = useRouter();
const { t } = useI18n();
const { values, errors, isSubmitting, submit } = useForgotPasswordForm();

async function onSubmit() {
  await submit(async () => {
    // Po wysłaniu maila resetującego – np. wróć na login
    await router.push('/auth/login');
  });
}
</script>
